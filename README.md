# ChargerBNB - EV Charging Station Marketplace

A full-stack marketplace platform where Indian hosts can list their electric vehicle chargers and users can rent them by the hour or session.

## Tech Stack

### Backend
- **Java 21** with **Spring Boot 3.2**
- **PostgreSQL** database
- **JWT** authentication
- **Razorpay** payment integration (UPI, Cards, Wallets)
- **Docker** containerization

### Frontend
- **Angular 17** with standalone components
- **Angular Material** UI components
- **Google Maps** integration
- **i18n** support (English, Hindi, Tamil, Telugu)
- **Responsive** mobile-first design

## Features

### Core Features
- ✅ User & Host authentication (separate dashboards)
- ✅ Charger listings with specifications and maps
- ✅ Booking calendar and time slot management
- ✅ UPI-based payments via Razorpay
- ✅ Reviews and ratings system
- ✅ Host verification workflow (Aadhaar OTP/document upload)
- ✅ Admin dashboard for managing users/hosts/listings
- ✅ Multi-language support (English, Hindi, Tamil, Telugu)

### Enhanced Features
- ✅ **Refresh Token Mechanism** - Secure token refresh for extended sessions
- ✅ **Email/SMS Notifications** - Booking confirmations, OTP, verification alerts
- ✅ **File Upload Service** - Secure document and image uploads
- ✅ **Analytics API** - Dashboard statistics for admins
- ✅ **OpenAPI/Swagger Documentation** - Interactive API documentation
- ✅ **Lazy Loading** - Optimized Angular module loading
- ✅ **Geolocation Integration** - Auto-detect user location for nearby chargers
- ✅ **Image Upload Components** - Drag-and-drop image uploads
- ✅ **Notification Service** - Toast notifications for user feedback
- ✅ **PWA Support** - Progressive Web App capabilities
- ✅ **Docker Health Checks** - Container health monitoring
- ✅ **Production Profiles** - Separate staging/production configurations
- ✅ **Unit Tests** - Backend service tests with JUnit & Mockito

## Prerequisites

- Java 21 JDK
- Node.js 20+ and npm
- Docker and Docker Compose
- PostgreSQL (if running without Docker)

## Quick Start with Docker

1. **Clone and navigate to the project:**
   ```bash
   cd charger
   ```

2. **Start all services:**
   ```bash
   docker-compose up -d
   ```

3. **Access the application:**
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:8080
   - PostgreSQL: localhost:5432

## Manual Setup

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Configure database in `application.yml`:**
   ```yaml
   spring:
     datasource:
       url: jdbc:postgresql://localhost:5432/chargerbnb
       username: postgres
       password: postgres
   ```

3. **Set environment variables:**
   ```bash
   export JWT_SECRET=your-256-bit-secret-key-change-this-in-production
   export RAZORPAY_KEY_ID=your-razorpay-key-id
   export RAZORPAY_KEY_SECRET=your-razorpay-key-secret
   ```

4. **Build and run:**
   ```bash
   mvn clean package
   java -jar target/chargerbnb-backend-1.0.0.jar
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

3. **Update API URL in services** (if backend is not on localhost:8080):
   - Edit `src/app/core/services/*.service.ts` files
   - Change `apiUrl` to your backend URL

4. **Run development server:**
   ```bash
   npm start
   ```

5. **Access the app:**
   - Open http://localhost:4200

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User/Host registration
- `POST /api/auth/login` - Login

### Chargers
- `GET /api/chargers/public` - Get all approved chargers
- `GET /api/chargers/public/nearby` - Get nearby chargers
- `GET /api/chargers/public/{id}` - Get charger details
- `POST /api/chargers` - Create charger (Host only)
- `GET /api/chargers/my-chargers` - Get host's chargers
- `PUT /api/chargers/{id}` - Update charger

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/my-bookings` - Get user bookings
- `GET /api/bookings/charger/{chargerId}` - Get charger bookings

### Payments
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/charger/{chargerId}` - Get charger reviews

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/hosts` - Get all hosts
- `PUT /api/admin/hosts/{id}/verify` - Verify host
- `PUT /api/admin/chargers/{id}/approve` - Approve charger
- `GET /api/admin/chargers/pending` - Get pending chargers
- `GET /api/admin/analytics/dashboard` - Get dashboard statistics
- `GET /api/admin/analytics/bookings` - Get booking statistics

### File Upload
- `POST /api/upload/image` - Upload image file
- `POST /api/upload/document` - Upload document file

### Authentication
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout and revoke tokens

## Configuration

### Razorpay Setup

1. Sign up at https://razorpay.com
2. Get your Key ID and Key Secret from dashboard
3. Update environment variables:
   ```bash
   RAZORPAY_KEY_ID=your-key-id
   RAZORPAY_KEY_SECRET=your-key-secret
   ```

### Google Maps Setup

1. Get API key from Google Cloud Console
2. Add to `frontend/src/index.html`:
   ```html
   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
   ```

### Email Configuration

1. Configure SMTP settings in `application.yml`:
   ```yaml
   spring:
     mail:
       host: smtp.gmail.com
       port: 587
       username: your-email@gmail.com
       password: your-app-password
   ```

### Swagger/OpenAPI

Access API documentation at:
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8080/v3/api-docs

## Project Structure

```
charger/
├── backend/
│   ├── src/main/java/com/chargerbnb/
│   │   ├── model/          # JPA entities
│   │   ├── repository/      # Data repositories
│   │   ├── service/         # Business logic
│   │   ├── controller/      # REST controllers
│   │   ├── dto/            # Data transfer objects
│   │   └── security/       # JWT & security config
│   └── Dockerfile
├── frontend/
│   ├── src/app/
│   │   ├── core/           # Services, guards, interceptors
│   │   └── pages/         # Components
│   └── Dockerfile
└── docker-compose.yml
```

## Development

### Running Tests

**Backend:**
```bash
cd backend
mvn test
```

**Frontend:**
```bash
cd frontend
npm test
```

### API Testing

Import the Postman collection from `ChargerBNB.postman_collection.json`:
1. Open Postman
2. Import the collection file
3. Set `baseUrl` variable to `http://localhost:8080/api`
4. Login to get `accessToken` and `refreshToken` automatically set

### Health Checks

Check service health:
- **Backend**: http://localhost:8080/actuator/health
- **Frontend**: http://localhost:4200 (check HTTP status)

### Production Deployment

1. Set Spring profile to `prod`:
   ```bash
   export SPRING_PROFILES_ACTIVE=prod
   ```

2. Update production configuration in `application-prod.yml`

3. Use Docker Compose for production:
   ```bash
   docker-compose -f docker-compose.yml up -d
   ```

### Building for Production

**Backend:**
```bash
cd backend
mvn clean package -DskipTests
```

**Frontend:**
```bash
cd frontend
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License

## Documentation

- **API Documentation**: See Swagger UI at http://localhost:8080/swagger-ui.html
- **Security Considerations**: See [SECURITY.md](SECURITY.md)
- **Postman Collection**: Import `ChargerBNB.postman_collection.json` for API testing

## Testing

### Backend Unit Tests
- Service layer tests with Mockito
- Example: `AuthServiceTest.java`
- Run with: `mvn test`

### Frontend Tests
- Component tests with Jasmine/Karma
- E2E tests (to be implemented with Cypress)

## Security

See [SECURITY.md](SECURITY.md) for:
- Authentication & authorization details
- Host verification process
- File upload security
- Payment security
- Production security checklist

## Support

For issues and questions, please open an issue on GitHub.

## License

MIT License

