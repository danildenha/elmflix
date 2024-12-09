# ElmFlix Streaming Platform

## Author
Gabriel Trejo

## Overview
ElmFlix is a modern streaming platform built with a TypeScript/React frontend and Java Spring Boot backend. It provides a Netflix-like experience with features like content browsing, watchlists, and viewing history.

## Tech Stack

### Frontend
- **Framework**: React with TypeScript
- **State Management**: Local Storage + Custom Hooks
- **Styling**: Modern CSS
- **Package Manager**: npm/yarn
- **Key Libraries**:
  - TypeScript
  - React Router
  - Media Session API
  - Web Storage API

### Backend
- **Framework**: Spring Boot
- **Language**: Java 17
- **Build Tool**: Maven
- **Key Dependencies**:
  - Spring Web
  - Spring Data JPA
  - Jakarta Persistence
  - Lombok
  - Validation API

## Features
- User authentication and authorization
- Content browsing and search
- Genre-based filtering
- Watch history tracking
- Watchlist management
- Responsive design
- Media playback controls
- Rating system

## Project Structure

```
elmflix/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── app/           # Application routes
│   │   ├── components/    # Reusable components
│   │   ├── lib/          # Utilities and helpers
│   │   └── types/        # TypeScript type definitions
│   └── package.json
│
└── javaBackend/           # Backend Spring Boot application
    ├── src/
    │   └── main/
    │       └── java/
    │           └── com/
    │               └── springapi/
    │                   ├── controller/  # REST endpoints
    │                   ├── model/       # Data entities
    │                   └── service/     # Business logic
    └── pom.xml
```

## Getting Started

### Prerequisites
- Node.js (v14+)
- Java JDK 17
- Maven
- Your favorite IDE (VS Code, IntelliJ IDEA recommended)

### Frontend Setup
1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Backend Setup
1. Navigate to the javaBackend directory:
```bash
cd javaBackend
```

2. Build the project:
```bash
mvn clean install
```

3. Run the application:
```bash
mvn spring-boot:run
```

## API Endpoints

### Content
- `GET /api/content` - Get all content
- `GET /api/content/genre/{genre}` - Get content by genre

### User
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - User login

## Development

### Code Style
- Frontend follows TypeScript best practices
- Backend follows Java Spring conventions
- All code should be properly documented
- Unit tests required for new features

### Git Workflow
1. Create feature branch
2. Implement changes
3. Write/update tests
4. Submit pull request
5. Code review
6. Merge to main

## Security Considerations
- JWT-based authentication
- Input validation
- XSS prevention
- CSRF protection
- Secure password storage

## Future Enhancements
- [ ] Implement real database connection
- [ ] Add user profiles
- [ ] Enhanced content recommendations
- [ ] Social features
- [ ] Advanced search capabilities

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Netflix UI/UX inspiration
- Spring Boot documentation
- React documentation
- TypeScript handbook

---
© 2024 Gabriel Trejo. All rights reserved.
