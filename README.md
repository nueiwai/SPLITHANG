# splitHang

**splitHang** is a personal summer project intended to serve as both a **chatting app** and an **expense-splitting tool** for groups of friends. Although the current version primarily focuses on **real-time messaging** functionality, there are still a few known bugs and missing features.

## Features

### Completed:
- **Real-time Messaging**: Chat with friends in real time using Socket.IO. The chat interface is functional, but with some known issues (listed below).
- **User-Authentication**: Basic user register and login system
- **Vite Frontend**: The frontend is built using Vite for fast development.
- **Express.js Backend**: The server side is powered by Express.js.
- **MongoDB**: MongoDB is used as the database for storing user data and chat messages.
- **Socket.IO**: Real-time communication between users is enabled through Socket.IO.
- **State Management**: Zustands are used for efficient state management in React components.
- **Flowbite**: Flowbite components are used for designing the user interface.
- **React Components and Hooks**: Used React with functional components and hooks such as `useState` for managing state.

### In Progress:
- **Expense Splitting**: The expense-splitting feature is planned for future commits.
  
## Installation

### Prerequisites
- Node.js
- MongoDB
- Vite

### Steps

1. Clone the repository:

```bash
git clone https://github.com/nueiwai/SPLITHANG.git
cd splitHang
```

2. Install dependencies for both the frontend and backend:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd frontend
npm install
```

3. Run the application:

```bash
# Start the backend server (Express.js)
cd backend
npm start

# Start the frontend (Vite)
cd frontend
npm run dev
```

4. Ensure MongoDB is running locally or connect it to your MongoDB Atlas cluster.

## Technologies Used

- **Frontend**:
  - Vite
  - React (with `useState` hooks)
  - Zustand (for state management)
  - Flowbite (for UI components)
  
- **Backend**:
  - Express.js
  - Socket.IO (for real-time messaging)
  - MongoDB (database)

## Known Issues

- **Message Box Refresh**: When a user sends a message, the text message box refreshes when the other participant in the conversation sends a message. This disrupts typing and can be frustrating.
- **Profile Avatar**: Sometimes, the avatar for the profile picture does not show up. This occurs because the external API used for fetching avatars occasionally fails.

## Future Plans

- **Expense Splitting**: Add an expense-splitting functionality where friends can track shared expenses and split costs within group chats.
- **Bug Fixes**: Resolve the current bugs related to the chat functionality and avatar loading.
- **Improved User Interface**: Enhance the UI for a better user experience.

## Contributing
Since this is a personal learning project, contributions are currently not being accepted. However, feel free to fork the repository and experiment on your own!
