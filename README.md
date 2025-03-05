# Sankalp Vidya Dashboard

## Overview
This is a React-based Admin Dashboard built using Material-UI (MUI) with multiple themes, including a dark mode. The application includes authentication, protected routes, and various dashboard features such as charts, forms, and a calendar.

## Features
- **Authentication:** Login system with protected routes.
- **Theme Support:** Light and dark mode with modern color themes.
- **Navigation:** Sidebar and Topbar for easy navigation.
- **Dashboard Pages:** Includes Team, Contacts, Invoices, Forms, Charts (Bar, Pie, Line), FAQ, Calendar, and Geography.
- **State Management:** Uses Redux for authentication state.

## Installation
### Prerequisites
Ensure you have Node.js and npm installed.

### Steps
1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd project-folder
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm start
   ```


## Usage
- **Login:** Navigate to `/login` to access the login page.
- **Dashboard:** Once logged in, users are redirected to `/` (Dashboard).
- **Theme Toggle:** Use the top bar to switch between dark and light mode.
- **Navigation:** Use the sidebar to navigate between different sections.

## Technologies Used
- React.js
- React Router
- Material-UI (MUI)
- Redux (for state management)


## Deployment
To build the project for production:
```sh
npm run build
```
Then deploy the `build/` folder to your hosting provider.

## License
This project is licensed under the MIT License.

## Author
Developed by Syed Sohail Ahmed.

