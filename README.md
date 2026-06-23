#  Kartly - E-Commerce Website

Kartly is a modern, fully responsive e-commerce web application built with React. It allows users to browse products, filter by categories and price, manage a shopping cart, and complete a simulated checkout process. The app integrates Clerk for secure user authentication and uses Context API for efficient state management.

##  Features

- **Product Listing**: Browse products fetched from a mock API
- **Advanced Filtering**: Filter by search query, category, and price range
- **Shopping Cart**:
  - Add/remove items
  - Increase/decrease quantities
  - Persistent cart using **localStorage**
- **User Authentication**: Secure login and signup powered by **Clerk**
- **Protected Routes**: Only authenticated users can access the Cart page
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Dummy Payment**: Simulated checkout flow with a fake payment modal


##  Tech Stack

- **Frontend**: React (Vite)
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Authentication**: Clerk
- **Styling**: Tailwind CSS **Icons**: React Icons (Lucide, Font Awesome, etc.)
- **Carousel**: React Slick
- **Notifications**: React Toastify
