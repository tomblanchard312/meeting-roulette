# Meeting Roulette

Meeting Roulette is a fun and interactive web application built with React that helps teams randomly select meetings or topics. It features a colorful spinning wheel and allows users to add, remove, and select meetings with a click of a button.

## Features

- Interactive spinning wheel
- Add and remove meetings dynamically
- Randomly select a meeting
- Responsive design for various screen sizes

## Technologies Used

- React
- Vite
- Tailwind CSS
- shadcn/ui components

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14 or later)
- npm (usually comes with Node.js)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/meeting-roulette.git
   cd meeting-roulette
   ```

2. Install the dependencies:
   ```
   npm install
   ```

## Running the Application Locally

To run the application in development mode:

```
npm run dev
```

This will start the development server. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## Building for Production

To create a production build:

```
npm run build
```

This will generate a `dist` folder with the production-ready files.

## Deploying to GitHub Pages

1. Install the `gh-pages` package if you haven't already:
   ```
   npm install gh-pages --save-dev
   ```

2. Update your `package.json`:
   - Add the homepage property:
     ```json
     "homepage": "https://<your-github-username>.github.io/meeting-roulette",
     ```
   - Add deployment scripts:
     ```json
     "scripts": {
       ...
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
     ```

3. Update your `vite.config.js`:
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/meeting-roulette/',
   })
   ```

4. Deploy the application:
   ```
   npm run deploy
   ```

5. Configure GitHub Pages in your repository settings to use the `gh-pages` branch.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).