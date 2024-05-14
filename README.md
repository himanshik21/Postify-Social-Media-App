# Postify

Postify is a cutting-edge social media platform designed to provide users with a seamless and engaging experience. It features secure file management, optimized API performance, and a stunning UI with a native mobile feel. The platform incorporates an infinite scroll feature, special text stack, and delivers amazing performance.

![Screenshot (355)](https://github.com/himanshik21/Postify-Social-Media-App/assets/90541238/36a45830-13a0-448c-9d2b-345ae1b186dc)

## Features

- **User Authentication**: Secure account creation, sign-in, and sign-out functionalities.
- **Post Management**: Create, edit, and delete posts with text and images.
- **Like and Save Posts**: Interact with posts by liking and saving them to your profile.
- **Search Functionality**: Discover posts by searching for keywords.
- **Recent Posts**: Stay updated with the latest posts on the platform.
- **Infinite Scroll**: Smooth infinite scrolling for an uninterrupted user experience.
- **Optimized Performance**: Enhanced API performance and efficient data handling.
- **Stunning UI**: A robust and visually appealing UI with a native mobile feel.

## Technologies Used

- **Frontend**: 
  - [React.js](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Shadcnui](https://shadcnui.com/)
  - [React Context API](https://reactjs.org/docs/context.html)
  - [React Router](https://reactrouter.com/) with outlets and conditional rendering
- **Backend**: 
  - [Appwrite](https://appwrite.io/) (Backend as a Service)
- **Data Fetching**: 
  - [React Query (TanStack Query)](https://tanstack.com/query/v5) (v5.0) for auto caching, refetching, parallel queries, first-class mutations, and loading state management.

## Getting Started

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/postify.git
    ```

2. **Install dependencies**:

    ```bash
    cd postify
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory and add the following variables:

    ```plaintext
    REACT_APP_API_BASE_URL=http://localhost:5000/api  # Replace with your backend API URL
    REACT_APP_APPWRITE_PROJECT_ID=your-appwrite-project-id  # Replace with your Appwrite Project ID
    REACT_APP_APPWRITE_ENDPOINT=your-appwrite-endpoint  # Replace with your Appwrite Endpoint
    ```

4. **Run the application**:

    ```bash
    npm start
    ```

5. **Visit the application**:

    Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Folder Structure

- **src**
  - **components**: Reusable UI components
  - **contexts**: React Context for state management
  - **hooks**: Custom hooks for data fetching and other utilities
  - **pages**: Different page components for the application
  - **services**: API service functions
  - **styles**: Global and component-specific styles
  - **utils**: Utility functions and constants
 
## Acknowledgements

- [Appwrite](https://appwrite.io/)
- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcnui](https://shadcnui.com/)
- [React Query](https://tanstack.com/query/v5)
- [React Router](https://reactrouter.com/)


Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
