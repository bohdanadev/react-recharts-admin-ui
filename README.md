# React-Recharts-Admin-UI

**React-Recharts-Admin-UI** is a responsive **Admin Dashboard** application built with **Vite**, **React**, **SASS**, **Recharts**, **TanStack React Query**, and **Firebase Firestore** for data management. It provides a clean and intuitive interface for managing users and products, displaying data with charts, and performing CRUD operations. The app is designed to be fully responsive and adapts seamlessly to different screen sizes and devices.

## Features

- **Home Page** with an admin dashboard showcasing data visualized with Recharts.
- **Users List Page** displaying a list of users from Firestore.
- **Products List Page** displaying a list of products from Firestore.
- **Single User/Product Details Page** for detailed views of individual users and products.
- **Add New User/Product** functionality.
- **Delete User/Product** functionality.
- **TanStack React Query** for data fetching, caching, and synchronization.
- **Responsive Design** for optimal viewing across desktops, tablets, and mobile devices.
- **SASS** for efficient styling and responsiveness.

## Tech Stack

- **Frontend**: Vite + React
- **Styling**: SASS (SCSS)
- **Data Visualization**: Recharts
- **State & Data Management**: TanStack React Query
- **Backend**: Firebase Firestore

## Responsive Design

The **React-Recharts-Admin-UI** app is built with responsiveness in mind, ensuring that the layout adjusts seamlessly to various screen sizes. Key design principles include:

- **Fluid Grids**: Layout elements are built using flexible grid systems that adapt to different screen sizes.
- **Media Queries**: SASS media queries are used to ensure the UI remains consistent and functional on all devices.
- **Mobile-Friendly**: The app’s design provides an intuitive user experience on mobile devices, with charts and tables optimized for smaller screens.
- **Adaptive Charts**: **Recharts** is configured to ensure that charts resize smoothly based on the viewport.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/bohdanadev/react-recharts-admin-ui.git
   cd react-recharts-admin-ui
   ```

2. **Install dependencies**:

   ```bash
   npm ci
   ```

3. **Set up Firebase Firestore**:

Create a Firebase project and enable Firestore.

Add your Firebase configuration by setting the environment variables in `.env` file.

4. **Start the development server**:

   ```bash
   npm run dev
   ```

   [Demo](https://react-recharts-admin-ui.vercel.app/)
