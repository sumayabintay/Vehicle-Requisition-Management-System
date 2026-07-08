# Vehicle Requisition Management System

## Project Overview
The Vehicle Requisition Management System is a web-based application developed as an internship project for Confidence Infrastructure PLC.

The system simplifies the vehicle requisition process by enabling employees to submit vehicle requests, while administrators can review requests, approve or reject them, assign available vehicles, and monitor all activities through audit logs.

---

# Objectives

The main objective of this project is to automate the vehicle requisition process and provide an easy workflow for both employees and administrators.

---
# Technologies Used

## Frontend

- React.js
- Tailwind CSS
- Axios
- HTML5
- CSS3
- JavaScript (ES6)
- React Icons

## Backend

- Node.js
- Express.js

## Database

- MySQL

## Authentication

- JWT (JSON Web Token)
---

# User Roles

## Employee

Employees can:

- Login
- Submit Vehicle Requisition
- View Own Requests
- Search Requests
- Check Request Status
- Cancel Pending Requests
- View Assigned Vehicle & Driver Information

---

## Administrator

Administrators can:

- Login
- View All Requests
- Search Requests
- View Request Details
- Approve Requests
- Reject Requests
- Complete Requests
- Assign Vehicle
- Add Driver Name
- Add Driver Phone
- Add Remarks
- View Dashboard Statistics
- View Audit Logs
- Manage Vehicles

---

# Main Features

## Authentication

- JWT Login
- Role Based Access Control

---

## Vehicle Requisition

Employee submits:

- Travel Date
- Pickup Location
- Destination
- Purpose
- Passenger Count
- Estimated Duration
- Priority
- Additional Notes

After submission:

- Unique Requisition Number is generated
- Status becomes Pending

---

## Employee Dashboard

Employees can:

- View Requisition Number
- View Travel Date
- View Purpose
- View Status
- View Driver Information
- View Vehicle Information
- Cancel Pending Requests

---

## Admin Dashboard

Administrators can:

- View All Requests
- Search Requests
- Review Request Details
- Approve Requests
- Reject Requests
- Complete Requests
- Assign Vehicles
- Add Driver Information

---

## Dashboard Statistics

Admin Dashboard shows

- Total Requests
- Pending
- Approved
- Rejected
- Cancelled
- Completed

---

## Audit Logs

Every important action is stored in Audit Logs including

- Requisition Created
- Request Approved
- Request Rejected
- Request Cancelled
- Vehicle Assigned
- Request Completed

---

# Database Tables

## Users

- User ID
- Name
- Email
- Password
- Role

---

## Vehicles

- Vehicle ID
- Vehicle Number
- Model
- Capacity
- Status

---

## Requisitions

- Requisition ID
- Requisition Number
- User ID
- Travel Date
- Pickup Location
- Destination
- Purpose
- Passenger Count
- Duration
- Priority
- Status
- Created Date

---

## Assignments

- Assignment ID
- Requisition ID
- Vehicle ID
- Driver Name
- Driver Phone
- Remarks
- Assigned Date

---
## Audit Logs

- Log ID
- Requisition ID
- Action
- Timestamp

---

# Installation

## Backend

```bash
cd backend
npm install
node server.js
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```
------

# Project Workflow

```
Employee Login
        │
Create Vehicle Requisition
        │
Admin Reviews Request
        │
Approve / Reject
        │
Assign Vehicle
        │
Employee Views Updated Status
        │
Audit Log Generated
```
---

# Bonus Features Implemented

- JWT Authentication
- Dashboard Statistics
- Audit Logs
- Responsive UI using Tailwind CSS
- Mobile Friendly Layout
- Search & Filtering
- Vehicle Assignment
- Driver Information
- Logout

---

## Responsive Design

The entire application is fully responsive using Tailwind CSS.

The system works properly on:

- Desktop
- Laptop
- Tablet
- Mobile Devices

Responsive pages include:

- Login Page
- Employee Dashboard
- Vehicle Requisition Form
- My Requisitions
- Admin Dashboard
- Audit Logs
- Vehicle Management

# User Interface

The user interface is designed using Tailwind CSS with a clean and modern layout.

Features include:

- Responsive Design
- Dashboard Cards
- Search Functionality
- Status Badges
- Modern Tables
- Responsive Layout
- Professional Forms

# Screenshots

Project screenshots can be found in the submission package.

---
# Login Credentials

## Administrator

Email: admin@gmail.com
Password: 123456

## Employee

Email: employee@gmail.com
Password: 123456

# Project Preview

### Employee Module

- Login
- Logout
- Vehicle Requisition Form
- My Requisitions
- Cancel Request
- View Assigned Vehicle Information

### Admin Module

- Login
- Logout
- Dashboard Statistics
- Search Requests
- Request Details
- Approve / Reject
- Complete Request
- Vehicle Assignment
- Vehicle Management
- Audit Logs

---

## Environment Variables

Create a `.env` file inside the backend folder and configure:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=vehicle_management_db
JWT_SECRET=your_secret_key
```

# Future Improvements

The following features can be added in future:

- Email Notification
- Vehicle Availability Checking
- Driver Management
- Report Generation
- PDF Export
- Docker Deployment

---

## Author

**Sumaya Bintay Eshak**

Internship Project

Confidence Infrastructure PLC

Vehicle Requisition Management System

Developed using:

- React.js
- Tailwind CSS
- Node.js
- Express.js
- MySQL
- JWT Authentication






