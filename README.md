# Support Admin Dashboard
A modern, responsive support admin dashboard template designed to streamline administrative tasks and provide an intuitive interface for managing web applications, services, or data workflows. This project offers a clean and customizable solution for developers to build feature-rich dashboards with ease.

### Table of Contents

- Introduction
- Features
- Technologies
- Installation
- Folder Structure
- API Endpoints
- Usage
- Contributing


### Introduction
The Support Admin Dashboard is a free and open-source template built to provide a user-friendly interface for managing backend systems. It includes a variety of components and layouts suitable for web applications, e-commerce platforms, or data management systems. With a focus on responsiveness and customization, this dashboard is ideal for developers looking to create professional admin panels quickly.


### Features
- Responsive Design: Fully responsive layout that adapts to all screen sizes, from mobile to desktop.
- Modular Components: Reusable UI components like charts, tables, forms, and cards.
- Customizable Themes: CSS variables for easy theming and styling adjustments.
- User Management: Interface for managing users, roles, and permissions (if applicable).
- Data Visualization: Integration with charting libraries for displaying data insights.
- Cross-Browser Compatibility: Works seamlessly across modern browsers.


### Technologies
Frontend:
Reactjs
JavaScript (ES6+)
Tailwind CSS


Backend (if applicable):
Node.js (with Express.js for API, if included)
RESTful API


Build Tools:
npm (for dependency management)


Libraries (optional, based on common dashboard setups):
Chart.js or ApexCharts for data visualization
jQuery (if used for DOM manipulation)


Version Control:
Git



### Installation
Follow these steps to set up the project locally:

Clone the Repository:
```bash
git clone s://github.com/Pratiksha-Bhise23/admin_dashboard.git
cd admin_dashboard
```

Install Dependencies:
```bash
npm install
```

Start the Development Server:
```bash
npm start
```

The application will be available at ://localhost:3000 (port may vary).

Build for Production:
```bash
npm run build
```

The optimized build will be available in the dist/ directory.



## API Reference

### Authentication APIs (`/api/auth`)

#### Login
```
  POST /api/auth/login
```
| Parameter  | Type     | Description                          |
| :--------- | :------- | :----------------------------------- |
| `email`    | `string` | **Required**. Support admin's email  |
| `password` | `string` | **Required**. Support admin's password |

**Description**: Authenticates a support admin by email and password, returning a JWT token upon successful login.

**Response**:
- Success: `{ message: "Login successful", token: "..." }`
- Error: `{ message: "Support Admin not found" }`, `{ message: "Invalid credentials" }`, or `{ message: "Server error", error: "..." }`

---

#### Logout
```
  POST /api/auth/logout
```
| Parameter      | Type     | Description                          |
| :------------- | :------- | :----------------------------------- |
| `Authorization`| `string` | **Required**. Bearer JWT token       |

**Description**: Logs out the support admin by clearing the token cookie.

**Response**:
- Success: `{ message: "Logout successful" }`
- Error: `{ message: "Server error", error: "..." }`

---

### Booking APIs (`/api/bookings`)

#### Get Booking History
```
  GET /api/bookings/history
```
| Parameter | Type | Description |
| :-------- | :------- | :----------------------------------- |
| None      | -        | No parameters required              |

**Description**: Retrieves the booking history for all bookings, including booking ID, user ID, flight ID, status, total price, and booking date.

**Response**:
- Success: `[ { booking_id, user_id, flight_id, status, total_price, booking_date }, ... ]`
- Error: `{ error: "Internal Server Error" }`

---

### Support APIs (`/api/support`)

#### Create Support Issue
```
  POST /api/support/
```
| Parameter     | Type     | Description                          |
| :------------ | :------- | :----------------------------------- |
| `booking_id`  | `string` | **Required**. ID of the related booking |
| `issue_type`  | `string` | **Required**. Type of support issue  |
| `description` | `string` | **Required**. Issue description      |

**Description**: Creates a new support issue for a booking and sends a confirmation email to the user associated with the booking.

**Response**:
- Success: `{ id, booking_id, issue_type, description, status, created_at, ... }`
- Error: `{ error: "..." }`

---

#### Get All Support Issues
```
  GET /api/support/
```
| Parameter | Type | Description |
| :-------- | :------- | :----------------------------------- |
| None      | -        | No parameters required              |

**Description**: Retrieves all support issues, including user names and booking total prices.

**Response**:
- Success: `[ { id, booking_id, issue_type, description, status, created_at, user_name, total_price }, ... ]`
- Error: `{ error: "..." }`

---

#### Get Support Issue By ID
```
  GET /api/support/:id
```
| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `id`      | `string` | **Required**. Support issue ID (path)|

**Description**: Retrieves detailed information about a specific support issue, including associated booking and user details.

**Response**:
- Success: `{ issue_id, issue_type, description, issue_status, support_reply, issue_created_at, booking_id, pnr, total_price, booking_status, booking_created_at, user_name, user_email }`
- Error: `{ error: "Issue not found" }` or `{ error: "..." }`

---

#### Update Support Issue
```
  PUT /api/support/:id
```
| Parameter       | Type     | Description                          |
| :-------------- | :------- | :----------------------------------- |
| `id`            | `string` | **Required**. Support issue ID (path)|
| `support_reply` | `string` | **Required**. Support team's reply   |
| `status`        | `string` | **Required**. Updated issue status   |

**Description**: Updates a support issue with a reply and status, sending an update email to the user associated with the booking.

**Response**:
- Success: `{ id, booking_id, issue_type, description, status, support_reply, created_at, updated_at, ... }`
- Error: `{ error: "..." }`

---

### Notes
- **Authentication**: The `/api/auth/logout` route requires a valid JWT token in the `Authorization` header (Bearer format). Other routes do not explicitly require authentication based on the provided code.
- **Environment Variables**: Ensure `process.env.JWT_SECRET` is set in `.env`.
- **Database**: Assumes a PostgreSQL database with `admins`, `bookings`, `users`, and `support_issues` tables.
- **Email Service**: The `createSupportIssue` and `updateSupportIssue` endpoints use a `sendSupportIssueEmail` service to send emails to users.
- **Error Handling**: All endpoints include error handling with appropriate status codes and messages.
- **CORS**: Configured to allow requests from `://127.0.0.1:3000` and `://localhost:3000` with credentials.



## API Reference

### Authentication APIs (`/api/auth`)

#### Login
```
  POST /api/auth/login
```
| Parameter  | Type     | Description                          |
| :--------- | :------- | :----------------------------------- |
| `email`    | `string` | **Required**. Support admin's email  |
| `password` | `string` | **Required**. Support admin's password |

**Description**: Authenticates a support admin by email and password, returning a JWT token upon successful login.

**Response**:
- Success: `{ message: "Login successful", token: "..." }`
- Error: `{ message: "Support Admin not found" }`, `{ message: "Invalid credentials" }`, or `{ message: "Server error", error: "..." }`

---

#### Logout
```
  POST /api/auth/logout
```
| Parameter      | Type     | Description                          |
| :------------- | :------- | :----------------------------------- |
| `Authorization`| `string` | **Required**. Bearer JWT token       |

**Description**: Logs out the support admin by clearing the token cookie.

**Response**:
- Success: `{ message: "Logout successful" }`
- Error: `{ message: "Server error", error: "..." }`

---

### Booking APIs (`/api/bookings`)

#### Get Booking History
```
  GET /api/bookings/history
```
| Parameter | Type | Description |
| :-------- | :------- | :----------------------------------- |
| None      | -        | No parameters required              |

**Description**: Retrieves the booking history for all bookings, including booking ID, user ID, flight ID, status, total price, and booking date.

**Response**:
- Success: `[ { booking_id, user_id, flight_id, status, total_price, booking_date }, ... ]`
- Error: `{ error: "Internal Server Error" }`

---

### Support APIs (`/api/support`)

#### Create Support Issue
```
  POST /api/support/
```
| Parameter     | Type     | Description                          |
| :------------ | :------- | :----------------------------------- |
| `booking_id`  | `string` | **Required**. ID of the related booking |
| `issue_type`  | `string` | **Required**. Type of support issue  |
| `description` | `string` | **Required**. Issue description      |

**Description**: Creates a new support issue for a booking and sends a confirmation email to the user associated with the booking.

**Response**:
- Success: `{ id, booking_id, issue_type, description, status, created_at, ... }`
- Error: `{ error: "..." }`

---

#### Get All Support Issues
```
  GET /api/support/
```
| Parameter | Type | Description |
| :-------- | :------- | :----------------------------------- |
| None      | -        | No parameters required              |

**Description**: Retrieves all support issues, including user names and booking total prices.

**Response**:
- Success: `[ { id, booking_id, issue_type, description, status, created_at, user_name, total_price }, ... ]`
- Error: `{ error: "..." }`

---

#### Get Support Issue By ID
```
  GET /api/support/:id
```
| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `id`      | `string` | **Required**. Support issue ID (path)|

**Description**: Retrieves detailed information about a specific support issue, including associated booking and user details.

**Response**:
- Success: `{ issue_id, issue_type, description, issue_status, support_reply, issue_created_at, booking_id, pnr, total_price, booking_status, booking_created_at, user_name, user_email }`
- Error: `{ error: "Issue not found" }` or `{ error: "..." }`

---

#### Update Support Issue
```
  PUT /api/support/:id
```
| Parameter       | Type     | Description                          |
| :-------------- | :------- | :----------------------------------- |
| `id`            | `string` | **Required**. Support issue ID (path)|
| `support_reply` | `string` | **Required**. Support team's reply   |
| `status`        | `string` | **Required**. Updated issue status   |

**Description**: Updates a support issue with a reply and status, sending an update email to the user associated with the booking.

**Response**:
- Success: `{ id, booking_id, issue_type, description, status, support_reply, created_at, updated_at, ... }`
- Error: `{ error: "..." }`

---

### Notes
- **Authentication**: The `/api/auth/logout` route requires a valid JWT token in the `Authorization` header (Bearer format). Other routes do not explicitly require authentication based on the provided code.
- **Environment Variables**: Ensure `process.env.JWT_SECRET` is set in `.env`.
- **Database**: Assumes a PostgreSQL database with `admins`, `bookings`, `users`, and `support_issues` tables.
- **Email Service**: The `createSupportIssue` and `updateSupportIssue` endpoints use a `sendSupportIssueEmail` service to send emails to users.
- **Error Handling**: All endpoints include error handling with appropriate status codes and messages.
- **CORS**: Configured to allow requests from `://127.0.0.1:3000` and `://localhost:3000` with credentials.


Open the dashboard in your browser at http://localhost:5000 after running npm start.


### Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes and commit (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a pull request to the main branch.

Please ensure your code follows the project's coding standards and includes relevant tests (if applicable). Check the CONTRIBUTING.md file for detailed guidelines (if available).

