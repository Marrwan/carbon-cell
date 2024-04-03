# Carbon Cell Backend API

Welcome to the Carbon Cell Backend API repository! This API serves as the backend solution for various functionalities, including user authentication, data retrieval, and more. Below you'll find information on how to set up and use the API effectively.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Carbon Cell Backend API is built with Node.js and Express.js, providing a robust backend solution for various applications. It offers user authentication using JWT (JSON Web Tokens), API endpoints for data retrieval, Swagger documentation integration, and secure access for authenticated users.

## Features

- **User Authentication:** Authenticate users using JWT tokens with secure login and registration endpoints.
- **Data Retrieval:** Fetch data from public APIs with filtering options based on categories and result limits.
- **Swagger Documentation:** Document API endpoints comprehensively using Swagger for better understanding and usability.
- **Secure Access:** Restrict access to certain endpoints to authenticated users only, ensuring data security.

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Set up environment variables as needed (e.g., database credentials, JWT secret).
5. Start the server using `npm start`.

## Usage

Once the server is up and running, you can interact with the API using HTTP requests. Ensure you have proper authentication tokens for accessing protected endpoints.

## Endpoints

- **Authentication Endpoints:**
  - `/auth/register`: Register a new user.
  - `/auth/login`: Authenticate user login.
  - `/auth/logout`: Log out the authenticated user.
  - `/auth/token/refresh`: Refresh authentication token.
  
- **Data Retrieval Endpoints:**
  - `/data`: Fetch data from public APIs with filtering options.

- **Message Endpoint:**
  - `/message`: Retrieve a personalized message for authenticated users.

## Documentation

API documentation is available using Swagger UI. Access the documentation by navigating to `/docs` endpoint on your server. Additionally, you can retrieve the OpenAPI JSON file by accessing `/docs.json`.

## Contributing

Contributions to the Carbon Cell Backend API project are welcome! Feel free to submit bug reports, feature requests, or pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

