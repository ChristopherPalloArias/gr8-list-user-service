# List User Service

This is the microservice for listining User in the +Kotas App.

## Group Members

- Christopher Pallo
- Brayan Dávila

## Table of Contents

1. [Microservice Description](#microservice-description)
2. [Installation](#installation)
   - [Requirements](#requirements)
   - [Clone the Repository](#clone-the-repository)
   - [Install Dependencies](#install-dependencies)
   - [Start the Server](#start-the-server)
   - [Evidence](#evidence)
3. [Usage](#usage)
   - [Verify Server Functionality](#verify-server-functionality)
   - [List Users](#list-users)


## Microservice Description

The `list-user-service` microservice is responsible for managing the list of users in the +kotas App. Allows you to list products using an HTTP GET request to the corresponding route.

## Installation

### Requirements

- Node.js
- npm (Node Package Manager)

### Clone the Repository

```sh
https://github.com/ChristopherPalloArias/gr8-list-user-service.git
cd list-product-service
```

### Install Dependencies
```sh
npm install
```

### Starting the Server
Before starting the application you must change the database credentials in the index.js file if you want to use the application locally and independently, this is because initially the application is configured to be used in conjunction with the rest of Microservices.
Repository: [https://github.com/ChristopherPalloArias/kotas-frontend](https://github.com/ChristopherPalloArias/kotas-frontend.git)

### Evidence
![image](https://github.com/user-attachments/assets/08637b39-8637-49c6-b737-44cb2e0a3c87)

## Usage
### Verify Server Functionality

Method: GET  
URL: `[http://localhost:8083/](http://gr8-load-balancer-users-1719093065.us-east-2.elb.amazonaws.com:8083/)`  
Description: This route displays a message to verify that the server is running.
![image](https://github.com/user-attachments/assets/6e4f1828-f76d-457e-9e0d-0ce917159fcb)


### List the Users

Method: GET  
URL: `http://gr8-load-balancer-users-1719093065.us-east-2.elb.amazonaws.com:8083/users`  
Description: This route returns the list of users in the +kotas app.
![image](https://github.com/user-attachments/assets/3bfef50e-4a0b-4fec-97b2-85619b180a36)

