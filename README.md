# Clinic App
CMS clinic management app for admins and users dashboard.

### Screenshots
- Admin Dashboard
![admin dashboard](https://github.com/amgadfikry/admin_clinic_app/blob/main/admin.PNG)
- User Dashboard
![user dashboard](https://github.com/amgadfikry/admin_clinic_app/blob/main/user.PNG)
- Landing Page
![landing page](https://github.com/amgadfikry/admin_clinic_app/blob/main/land.PNG)

### Introduction
Clinic Management System is a comprehensive solution designed to streamline the management of medical clinics, offering features for both administrators and users. The project consists of a backend built with Flask and SQLAlchemy for database management, providing a secure API with authentication using hashed passwords and tokens. The front end is developed using React and Tailwind CSS, offering an admin panel for clinic management and a patient-user dashboard.

### Admin Panel Features:
- Manage specialties, doctors, offers
- Control appointments and testimonials/reviews
- Create dates for doctor appointments

### User Dashboard Features:
- Search for doctors by name or specialty
- Make, modify, and view appointments
- Update profile settings
- Add testimonials and reviews

### The Story
The inspiration behind the project came from the challenges faced by me as a physiotherapist in managing both the clinic and its online presence. The clinic app aims to simplify the digital presence of medical service providers, making clinic and record management efficient.

### Project Links:
- [Admin Dashboard](https://admin.amgadfikry.tech/)
- [User Landing Page and Dashboard](https://www.amgadfikry.tech/)

### Author:
[Amgad Fikry Mohamed](https://github.com/amgadfikry)

### Installation
- Clone the repository.
- Navigate to the project directory: cd clinic_app
- Install backend dependencies: pip install -r requirements.txt
- Install frontend dependencies: cd frontend && npm install
- config database by using init_database.sql and create_admin.py
- Run the backend server: flash --app api.app run
- Run the frontend application: cd frontend && npm run dev

### Usage
- Access the admin dashboard at https://admin.amgadfikry.tech/ with the provided credentials email: admin, password: admin, please not change password or email.
- Explore and manage clinic-related features.
- Access the user landing page and dashboard at https://www.amgadfikry.tech/.
- Sign up, explore features, and make appointments.

### Contributing
If you would like to contribute to the project, please follow these steps:
- Fork the repository.
- Create a new branch for your feature: git checkout -b feature-name
- Commit your changes: git commit -m 'Add a new feature'
- Push to the branch: git push origin feature-name
- Submit a pull request.

### Related Projects
[user and landing page](https://github.com/amgadfikry/user_clinic_app)

### Licensing
This project is licensed under the MIT License.
