# 🎯 Meeting Roulette

Meeting Roulette is a beautifully designed, interactive web application that solves the common problem of overlapping meetings and scheduling conflicts. Built with modern React and featuring a stunning gradient-based spinning wheel, it helps teams randomly and fairly select which meeting to attend when conflicts arise.

## ✨ Features

### 🎨 **Modern Design**
- **Gradient-based spinning wheel** with 12 beautiful color combinations
- **Glass-morphism UI** with backdrop blur effects and professional shadows
- **Responsive design** that works perfectly on all screen sizes
- **Smooth animations** with realistic physics and visual feedback

### 🎲 **Interactive Wheel**
- **Professional donut-style wheel** with gradient segments
- **Realistic spinning animation** with variable speed and easing
- **Visual glow effects** during spinning for enhanced user experience
- **Smart text positioning** with automatic rotation for readability

### 📝 **Meeting Management**
- **Dynamic meeting list** with color-coded indicators matching wheel segments
- **Easy add/remove functionality** with keyboard support (Enter to add)
- **Visual feedback** with hover effects and smooth transitions
- **Empty state handling** with helpful guidance

### 🎯 **Problem-Solution Flow**
- **Compelling introduction** explaining the meeting conflict problem
- **Visual calendar example** showing overlapping meetings
- **Clear value proposition** demonstrating how the tool helps
- **Smooth user journey** from problem recognition to solution

## 🛠️ Technologies Used

### **Frontend Framework**
- **React 18.3.1** - Modern React with hooks and functional components
- **Vite 6.3.6** - Lightning-fast build tool and development server

### **Styling & UI**
- **Tailwind CSS 3.4.10** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible component library
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful, customizable icons
- **Class Variance Authority** - Component variant management

### **Development Tools**
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - Automatic vendor prefixing
- **GitHub Pages** - Static site hosting and deployment

## 🚀 Recent Improvements

### **UI/UX Overhaul**
- Complete redesign with modern gradient-based color scheme
- Professional glass-morphism design with backdrop blur effects
- Enhanced spinning wheel with donut-style segments and glow effects
- Improved typography and visual hierarchy throughout the application

### **Enhanced User Experience**
- Added compelling problem-solution introduction section
- Integrated calendar image to illustrate meeting conflicts
- Improved meeting management with color-coded indicators
- Added keyboard support (Enter key to add meetings)
- Enhanced animations with realistic physics and visual feedback

### **Technical Improvements**
- Optimized SVG rendering with gradient definitions
- Improved animation timing and easing curves
- Better responsive design for all screen sizes
- Enhanced accessibility and user interaction patterns

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14 or later)
- npm (usually comes with Node.js)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/tomblanchard312/meeting-roulette.git
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
     "homepage": "https://tomblanchard312.github.io/meeting-roulette",
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