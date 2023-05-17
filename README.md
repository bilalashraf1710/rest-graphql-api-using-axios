# Rest GraphQL API using Axios

This project demonstrates how to make RESTful and GraphQL API calls using Axios in a React application.

## Getting Started

### Prerequisites

- Node.js (version 12 or above)
- npm (version 6 or above)

### Installation

1. Clone the repository:

   git clone <repository-url>
   Navigate to the project directory:

cd rest-graphql-api-using-axios
Install the dependencies:

npm install

### Usage

Start the development server:

npm start
Open your browser and visit http://localhost:3000 to view the application.

### Project Structure

The project consists of the following files and directories:

src/network-manager.ts: Contains the NetworkManager class, which provides methods for making RESTful and GraphQL API calls using Axios.
src/axios/constants.ts: Contains constants used for configuring API endpoints.
src/axios/axios-instance.ts: Creates and configures an instance of Axios for API calls.
src/axios/interceptors.ts: Contains request and response interceptors for handling authentication tokens and error responses.
src/mocks/graphqlMockHandlers.ts: Mock handlers for GraphQL API calls using MSW library.
src/mocks/restMockHandlers.ts: Mock handlers for RESTful API calls using MSW library.
src/mocks/setupServer.ts: Configures the MSW worker and starts the mock server.
src/pages/home.tsx: Home page component that demonstrates fetching and manipulating data from both RESTful and GraphQL APIs.
public/index.html: HTML template file for the application.

### Technologies Used

React
Axios
MSW (Mock Service Worker)
GraphQL

### Contributing

Contributions to this project are welcome. Please follow the contribution guidelines for more information.

### License

This project is licensed under the MIT License.
