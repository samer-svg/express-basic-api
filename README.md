# 🚀 Express.js User Management API

A modern, well-structured Express.js REST API with comprehensive user CRUD operations, built with ES modules and featuring robust error handling, logging, and a **beautiful, responsive frontend interface** with modern design principles.

## ✨ Features

- **🔧 Modern ES Modules** - Built with ES6+ import/export syntax
- **🛡️ Robust Error Handling** - Custom error middleware with proper HTTP status codes
- **📝 Request Logging** - Colored console logging for all HTTP methods
- **🎯 RESTful API Design** - Clean, intuitive endpoints following REST principles
- **🎨 Beautiful Frontend** - Modern, responsive interface with glass morphism design
- **📱 Mobile Responsive** - Optimized for all devices and screen sizes
- **✨ Interactive UX** - Smooth animations, hover effects, and real-time feedback
- **⚡ Hot Reload** - Development server with nodemon for instant updates

## 🏗️ Project Structure

```
expressjs/
├── express.js              # Main server file
├── routers/
│   └── routers.js          # User routes definition
├── controllers/
│   └── controllers.js      # Business logic for user operations
├── middleWare/
│   ├── errorHandler.js     # Global error handling middleware
│   ├── logger.js           # Request logging middleware
│   └── notFound.js         # 404 error handling
├── public/
│   ├── index.html          # Modern home page with split layout design
│   ├── users.html          # Beautiful users directory with grid layout
│   └── main.js             # Enhanced frontend JavaScript with UX features
└── package.json
```

## 🛠️ Installation & Setup

1. **Clone and navigate to the project:**
   ```bash
   cd expressjs
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   
   Or run with Node.js watch mode:
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - Backend API: http://localhost:3000
   - **Home Page**: http://localhost:3000/index.html (Create & manage users)
   - **Users Directory**: http://localhost:3000/users.html (View all users in grid layout)

## 📡 API Endpoints

### Base URL: `http://localhost:3000/api/users`

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/` | Get all users | - | `200` - Array of users |
| `GET` | `/?limit=N` | Get limited users | - | `200` - Limited users array |
| `GET` | `/:id` | Get user by ID | - | `200` - User object |
| `POST` | `/` | Create new user | `{id, name}` | `201` - Success message |
| `PUT` | `/:id` | Update user by ID | `{name}` | `200` - Success message |
| `DELETE` | `/:id` | Delete user by ID | - | `204` - No content |

### Request/Response Examples

#### Create a User
```bash
POST /api/users
Content-Type: application/json

{
  "id": "user123",
  "name": "John Doe"
}
```

#### Get All Users
```bash
GET /api/users
```

#### Get Limited Users
```bash
GET /api/users?limit=5
```

#### Update User
```bash
PUT /api/users/user123
Content-Type: application/json

{
  "name": "Jane Doe"
}
```

## 🎨 Frontend Interface

The project features a **beautiful, modern interface** with two main pages:

### 🏠 **Home Page** (`/index.html`)
- **Split Layout Design** - Form section on left, user list on right
- **Modern Form** - Clean inputs with proper validation and feedback
- **Real-time Updates** - Users appear instantly after creation
- **Interactive Cards** - Each user displayed in an attractive card format
- **Action Buttons** - Edit and delete functionality for each user

### 👥 **Users Directory** (`/users.html`)
- **Grid Layout** - Responsive grid showing all users
- **User Avatars** - Initials-based avatars with gradient backgrounds
- **Navigation Bar** - Easy switching between pages
- **Statistics Display** - Real-time user count
- **Enhanced Actions** - Inline edit and delete with confirmation

### ✨ **Design Features**
- **Glass Morphism** - Semi-transparent containers with backdrop blur
- **Gradient Backgrounds** - Beautiful purple gradient theme
- **Smooth Animations** - Hover effects and transitions
- **Mobile Responsive** - Optimized for all screen sizes
- **Modern Typography** - Inter font family for clean, professional look
- **Loading States** - Proper loading indicators and empty states
- **Success/Error Messages** - Toast-style notifications

## 🔧 Middleware Stack

1. **JSON Parser** - Handles JSON request bodies
2. **Custom Logger** - Logs all requests with colored output
3. **URL Encoder** - Parses URL-encoded data
4. **Static Files** - Serves frontend files from `/public`
5. **User Routes** - Handles all `/api/users` requests
6. **404 Handler** - Catches undefined routes
7. **Error Handler** - Processes all errors with proper responses

## 🎯 Error Handling

The API includes comprehensive error handling:

- **400 Bad Request** - Invalid input data
- **404 Not Found** - User or route not found
- **500 Internal Server Error** - Unexpected server errors

All errors return consistent JSON responses:
```json
{
  "msg": "Error description"
}
```

## 🚀 Development

### Available Scripts

- `npm start` - Run with nodemon (auto-restart on changes)
- `npm run dev` - Run with Node.js watch mode

### Dependencies

- **express** - Web framework
- **nodemon** - Development server with auto-restart
- **colors** - Console color formatting
- **chalk** - Terminal styling utilities

### Frontend Technologies

- **HTML5** - Semantic markup with modern structure
- **CSS3** - Advanced styling with Grid, Flexbox, and animations
- **JavaScript (ES6+)** - Modern async/await patterns and DOM manipulation
- **Font Awesome** - Beautiful icons for enhanced UX
- **Google Fonts** - Inter font family for modern typography

## 📝 Notes

- **In-Memory Storage**: Users are stored in memory and reset on server restart
- **ES Modules**: Uses modern ES6+ import/export syntax
- **No Database**: This is a demonstration project with in-memory data storage
- **Production Ready**: Includes proper error handling and logging for production use
- **Modern Frontend**: Features contemporary design patterns and UX best practices
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Happy Coding! 🎉**

```bash
npm install
node index.js
