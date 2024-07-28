import express from 'express';
import AWS from 'aws-sdk';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

// AWS region and Lambda function configuration
const region = "us-east-2";
const lambdaFunctionName = "fetchSecretsFunction_gr8";

// Function to invoke Lambda and fetch secrets
async function getSecretFromLambda() {
  const lambda = new AWS.Lambda({ region: region });
  const params = {
    FunctionName: lambdaFunctionName,
  };

  try {
    const response = await lambda.invoke(params).promise();
    const payload = JSON.parse(response.Payload);
    if (payload.errorMessage) {
      throw new Error(payload.errorMessage);
    }
    const body = JSON.parse(payload.body);
    return JSON.parse(body.secret);
  } catch (error) {
    console.error('Error invoking Lambda function:', error);
    throw error;
  }
}

// Function to start the service
async function startService() {
  let secrets;
  try {
    secrets = await getSecretFromLambda();
  } catch (error) {
    console.error(`Error starting service: ${error}`);
    return;
  }

  const app = express();
  const port = 8083;

  app.use(cors());
  app.use(express.json());

  // Configure AWS DynamoDB
  AWS.config.update({
    region: region,
    accessKeyId: secrets.AWS_ACCESS_KEY_ID,
    secretAccessKey: secrets.AWS_SECRET_ACCESS_KEY,
  });

  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  // Swagger setup
  const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'List User Service API',
        version: '1.0.0',
        description: 'API for listing users',
      },
    },
    apis: ['./src/index.js'],
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  /**
   * @swagger
   * /users:
   *   get:
   *     description: Get the list of users
   *     responses:
   *       200:
   *         description: Successful response
   */
  app.get('/users', async (req, res) => {
    const params = {
      TableName: 'UsersList_gr8',
    };

    try {
      const data = await dynamoDB.scan(params).promise();
      res.send(data.Items);
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).send({ message: 'Error fetching users', error: err });
    }
  });

  // Root route to check if the server is running
  app.get('/', (req, res) => {
    res.send('List User Service Running');
  });

  app.listen(port, () => {
    console.log(`List User service listening at http://localhost:${port}`);
  });
}

startService();
