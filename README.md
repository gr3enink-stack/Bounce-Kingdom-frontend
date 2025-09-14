# Bounce Kingdom Ghana - Frontend

This directory contains all the frontend code for the Bounce Kingdom Ghana application.

## Project Structure

```
frontend/
├── index.html         # Main HTML file
├── vite.config.js     # Vite configuration
├── package.json       # Frontend dependencies
├── public/            # Static assets
└── src/
    ├── App.jsx        # Main App component
    ├── main.jsx       # Entry point
    ├── components/    # React components
    ├── services/      # API service functions
    ├── assets/        # Images and other assets
    └── utils/         # Utility functions
```

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Create a `.env` file with the following variables:
   ```
   VITE_API_URL=http://localhost:5002
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

## Development

The frontend uses Vite as the build tool and React for the UI. The development server will proxy API requests to the backend server.

## Deployment

The frontend can be deployed to services like Netlify:

1. Set environment variables on your deployment platform
2. Deploy the `frontend/` directory
3. Ensure the `VITE_API_URL` points to your deployed backend