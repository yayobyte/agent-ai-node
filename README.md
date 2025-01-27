# Contents of /weather-chat-monorepo/README.md

# Weather Chat Monorepo

This monorepo contains multiple packages for a weather chat application, including client, server, mobile, and a common package for shared code.

## Packages

- **client**: The frontend application for users to interact with the weather chat.
- **server**: The backend service that handles requests and manages data.
- **mobile**: The mobile application for accessing the weather chat on mobile devices.
- **common**: A shared package that contains reusable code, types, and utilities used across the other packages.

## Getting Started

To get started with the monorepo, you can install the dependencies and run the development servers for each package.

### Installation

```bash
yarn install
```

### Running the Development Servers

To run the development servers for each package, use the following commands:

- For the client: `yarn workspace client dev`
- For the server: `yarn workspace server dev`
- For the mobile app: `yarn workspace mobile start`

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any improvements or bug fixes.