# Product Management Frontend

This project is a frontend application built with React, TypeScript, and Vite. It uses Ant Design for UI components and Axios for HTTP requests.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Vite**: A build tool that aims to provide a faster and leaner development experience for modern web projects.
- **Ant Design**: A React UI library that contains a set of high-quality components and demos for building rich, interactive user interfaces.
- **Axios**: A promise-based HTTP client for the browser and Node.js.
- **Day.js**: A minimalist JavaScript library that parses, validates, manipulates, and displays dates and times.

## Setup Instructions

### Prerequisites

- Node.js (>= 22.x)
- npm (>= 10.x) or yarn (>= 1.x)
- Docker (>= 20.x)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/product_management-fe.git
   cd product_management-fe
   ```

2. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

### Docker Setup

1. Build and start the Docker container:

   ```sh
   docker-compose up --build
   ```

2. Open your browser and navigate to `http://localhost:5173`.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
