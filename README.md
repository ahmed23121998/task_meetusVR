# Authentication System

A Next.js-based authentication system with login form and dashboard functionality.

## Features

- **Login Form**: Email and password validation with real-time feedback
- **Authentication**: JWT token-based authentication with HTTP-only cookies
- **Dashboard**: Protected user dashboard displaying user information
- **State Management**: Redux Toolkit for global state management
- **Route Protection**: Middleware-based route protection
- **Responsive Design**: Modern UI with Tailwind CSS

## Technology Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **State Management**: Redux Toolkit
- **Form Handling**: React Hook Form
- **Authentication**: HTTP-only cookies with JWT tokens
- **API Integration**: External Yeshtery API endpoints

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── login/          # Login API endpoint
│   │   ├── logout/         # Logout API endpoint
│   │   └── user/           # User info API endpoint
│   ├── dashboard/          # Protected dashboard page
│   ├── login/              # Login page
│   ├── lib/
│   │   └── token.js        # Token utility functions
│   └── layout.js           # Root layout
├── store/
│   ├── Providers.js        # Redux provider
│   ├── store.js            # Redux store configuration
│   └── userSlice.js        # User state management
└── middleware.js            # Authentication middleware
```

## API Endpoints

### External APIs

- **Login**: `POST https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token`
- **User Info**: `GET https://api-yeshtery.dev.meetusvr.com/v1/user/info`

### Internal APIs

- **Login**: `POST /api/login` - Handles authentication and token storage
- **Logout**: `POST /api/logout` - Clears authentication token
- **User Info**: `GET /api/user` - Retrieves user information

## Authentication Flow

1. **User Access**: User visits the application
2. **Authentication Check**: System checks for valid authentication token
3. **Login Form**: If not authenticated, login form is displayed
4. **Validation**: Real-time form validation (email format, required fields)
5. **API Call**: Login credentials sent to external API
6. **Token Storage**: Authentication token stored in HTTP-only cookie
7. **User Info**: User information retrieved and stored in Redux
8. **Dashboard Access**: User redirected to protected dashboard
9. **Logout**: User can logout, clearing token and redirecting to login

## Business Rules

- Login button is disabled if email or password is empty
- Login button is disabled if email format is invalid
- Real-time validation feedback for form fields
- Automatic redirect based on authentication status
- Protected routes require valid authentication

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd authentication-main
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Testing the API

You can test the external API using curl:

```bash
curl https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email": "dev.aert@gmail.com", "password": "helloworld", "isEmployee": true}'
```

## Environment Variables

No environment variables are required for development. The application uses:

- Production mode detection for secure cookie settings
- Default API endpoints for Yeshtery services

## Security Features

- **HTTP-only Cookies**: Authentication tokens stored securely
- **Route Protection**: Middleware prevents unauthorized access
- **Token Expiration**: 24-hour token validity
- **Secure Headers**: Proper CORS and security headers

## State Management

The application uses Redux Toolkit for state management:

- **User State**: Stores user ID, name, and authentication status
- **Loading States**: Manages API call loading states
- **Error Handling**: Centralized error state management

## Form Validation

React Hook Form provides:

- Real-time validation
- Custom validation rules
- Error message display
- Form submission handling

## Responsive Design

- Mobile-first approach
- Tailwind CSS for styling
- Responsive grid layouts
- Touch-friendly interface

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features
- CSS Grid and Flexbox support

## Deployment

The application can be deployed to:

- Vercel (recommended for Next.js)
- Netlify
- Any Node.js hosting platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
