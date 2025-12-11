# Full-Stack Authentication App

A complete authentication system built with **React.js**, **Tailwind CSS**, **Node.js**, **Express.js**, and **MongoDB**. Features include login/register, dashboard, password reset, and OTP verification via email and SMS.

## Features

✅ **User Registration & Login**
✅ **Email Verification** 
✅ **Phone OTP Verification**
✅ **Password Reset via Email**
✅ **Secure JWT Authentication**
✅ **Protected Dashboard**
✅ **Profile Management**
✅ **Rate Limiting & Security**
✅ **Responsive UI with Tailwind CSS**
✅ **Account Lockout after Failed Attempts**

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Nodemailer** - Email service
- **Twilio** - SMS service
- **Express Rate Limit** - Rate limiting
- **Helmet** - Security headers

### Frontend
- **React.js** - UI library
- **Tailwind CSS** - Styling framework
- **React Router** - Navigation
- **React Hook Form** - Form management
- **Yup** - Form validation
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Heroicons** - Icons

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Gmail account (for email service)
- Twilio account (for SMS service)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the backend directory and configure:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/login_app
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_secure
   JWT_EXPIRE=30d

   # Email Configuration (Gmail)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password

   # Twilio Configuration for SMS OTP
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number

   # Frontend URL
   CLIENT_URL=http://localhost:3000
   ```

4. **Gmail Setup:**
   - Enable 2-factor authentication on your Gmail account
   - Generate an App Password:
     - Go to Google Account settings
     - Security → App passwords
     - Generate password for "Mail"
     - Use this password in `EMAIL_PASS`

5. **Twilio Setup:**
   - Create a Twilio account
   - Get your Account SID and Auth Token from dashboard
   - Purchase a phone number for SMS
   - Add these credentials to `.env` file

6. **Start the backend server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

### MongoDB Setup

**Option 1: Local MongoDB**
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/login_app`

**Option 2: MongoDB Atlas (Cloud)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a cluster
3. Get connection string and update `MONGODB_URI` in `.env`

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register new user |
| POST | `/login` | User login |
| GET | `/verify-email/:token` | Verify email address |
| POST | `/send-phone-otp` | Send OTP to phone |
| POST | `/verify-phone-otp` | Verify phone OTP |
| POST | `/forgot-password` | Request password reset |
| POST | `/reset-password/:token` | Reset password |
| POST | `/resend-verification` | Resend email verification |

### User Routes (`/api/user`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/profile` | Get user profile |
| PUT | `/profile` | Update user profile |
| PUT | `/change-password` | Change password |
| GET | `/dashboard-stats` | Get dashboard statistics |
| DELETE | `/account` | Delete user account |

## Frontend Routes

| Route | Description | Protection |
|-------|-------------|------------|
| `/login` | Login page | Public |
| `/register` | Registration page | Public |
| `/forgot-password` | Password reset request | Public |
| `/reset-password/:token` | Password reset form | Public |
| `/verify-account` | Account verification | Public |
| `/dashboard` | User dashboard | Protected + Verified |

## Project Structure

```
login/
├── backend/
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── user.js
│   ├── middleware/
│   │   └── auth.js
│   ├── utils/
│   │   └── emailSMS.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Alert.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   └── VerifyAccount.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── index.html
└── README.md
```

## Security Features

- **Password Hashing** with bcryptjs
- **JWT Token** authentication
- **Rate Limiting** on sensitive endpoints
- **Account Lockout** after failed login attempts
- **Email Verification** required
- **Phone OTP Verification** required
- **Secure Headers** with Helmet
- **Input Validation** on all endpoints
- **CORS Protection**

## Usage Flow

1. **User Registration**
   - Fill registration form
   - Receive email verification link
   - Click link to verify email

2. **Phone Verification**
   - Request OTP via SMS
   - Enter 6-digit OTP
   - Account becomes fully verified

3. **Login**
   - Enter email and password
   - Receive JWT token
   - Access protected dashboard

4. **Password Reset**
   - Click "Forgot Password"
   - Enter email address
   - Check email for reset link
   - Set new password

## Development Commands

### Backend
```bash
npm run dev    # Start development server
npm start      # Start production server
```

### Frontend
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
```

## Environment Variables

Make sure to set up all required environment variables in the backend `.env` file:

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `EMAIL_USER` - Gmail username
- `EMAIL_PASS` - Gmail app password
- `TWILIO_ACCOUNT_SID` - Twilio account SID
- `TWILIO_AUTH_TOKEN` - Twilio auth token
- `TWILIO_PHONE_NUMBER` - Twilio phone number

## Deployment

### Backend Deployment
- Deploy to platforms like Heroku, Railway, or DigitalOcean
- Set environment variables in the hosting platform
- Ensure MongoDB is accessible from the deployed server

### Frontend Deployment
- Build the React app: `npm run build`
- Deploy to Netlify, Vercel, or similar platforms
- Update API base URL if needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email your-email@example.com or create an issue in the repository.

---

Built with ❤️ by [Your Name]
