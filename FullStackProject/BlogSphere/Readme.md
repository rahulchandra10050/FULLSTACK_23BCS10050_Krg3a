BlogSphere – Where Ideas Connect

BlogSphere is a full-stack blogging platform where users can express ideas, share stories, and engage through comments and likes. It offers role-based access — users can manage their own posts, while admins have full control. The project consists of a Spring Boot backend and a React (Vite + Tailwind) frontend.

UI Preview (Screenshots)
Login / Signup	Blog Feed	Blog Editor / Profile
Login Page	Feed Page	Profile Page
Features
Create, edit, and delete your own blog posts
Comment and like posts from other users
User profiles with blog stats
Admin dashboard with full access to manage all blogs
Secure authentication using JWT
Forgot password feature with email-based reset link
Responsive and elegant UI built with Tailwind CSS
Clean separation of /Backend and /Frontend codebases
Project Structure
BLOGSPHERE_PROJECT/
│── Backend/        # Spring Boot REST API
│── Frontend/       # React (Vite + Tailwind) frontend
│── README.md
│── package.json
│── vite.config.js
│── tailwind.config.js
└── .gitignore
Tech Stack
Layer	Technology
Frontend	React (Vite), JavaScript, Tailwind CSS
Backend	Spring Boot, Hibernate, MySQL
Authentication	JWT (JSON Web Tokens)
Email Service	JavaMailSender (for password reset)
Build Tools	Maven, npm
Database	MySQL / PostgreSQL (configurable)
How to Run the Project
Clone the Repository
git clone https://github.com/your-username/blogsphere.git
Run the Backend (Spring Boot)
cd Backend
Run the main Spring Boot file:

src/main/java/.../BlogApplication.java
Or run using Maven:

mvn spring-boot:run
Backend will start at: 👉 http://localhost:8080

Run the Frontend (React + Vite)
cd ../Frontend
npm install
npm run dev
Frontend will start at: 👉 http://localhost:5173

Backend Configuration (application.properties)
Create this file inside: Backend/src/main/resources/application.properties

spring.datasource.url=jdbc:mysql://localhost:3306/blogsphere
spring.datasource.username=your_username
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

app.jwt.secret=your_secret_key
app.jwt.expiration=86400000

spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_email@gmail.com
spring.mail.password=your_app_password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
🧩 API Highlights
Feature	Endpoint	Method
Register User	/api/auth/signup	POST
Login User	/api/auth/login	POST
Forgot Password	/api/auth/forgot-password	POST
Reset Password	/api/auth/reset-password	POST
Get All Blogs	/api/blogs	GET
Create Blog	/api/blogs	POST
Edit Blog	/api/blogs/{id}	PUT
Delete Blog	/api/blogs/{id}	DELETE
Like Blog	/api/blogs/{id}/like	POST
Comment on Blog	/api/blogs/{id}/comment	POST
Future Enhancements
Rich text editor with image uploads
Blog analytics (views, engagement)
Email or in-app notifications
AI-assisted blog writing suggestions
Multi-language support
Contributing
Contributions are welcome! If you'd like to improve the UI, optimize APIs, or fix bugs — feel free to fork and submit a pull request.

⭐ Support the Project
If you like BlogSphere, consider starring ⭐ the repository — it keeps the project growing!

📜 License
This project is licensed under the MIT License.
