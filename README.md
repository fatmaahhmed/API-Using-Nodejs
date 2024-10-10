E-Commerce Store API

This project is a fully functional e-commerce store API built using Node.js, Express, and Mongoose. It demonstrates my hands-on experience in developing professional-level RESTful APIs, including features for product management, user authentication, shopping cart functionality, payment integration, and more. Below is an overview of the features and technical details of the project.

Features

1. CRUD Operations

	•	Designed and implemented API endpoints for categories, products, subcategories, and brands.
	•	Enabled Create, Read, Update, and Delete (CRUD) operations, ensuring smooth management of e-commerce data.

2. Error Handling & Validation

	•	Incorporated advanced error handling mechanisms and validation to ensure robust and reliable API functionality.
	•	Provided custom error responses for better API user experience.

3. Authentication & Authorization

	•	Developed secure token-based authentication using JWT.
	•	Implemented role-based access control for admin, manager, and regular users.
	•	Managed user sessions and protected routes to control access to certain API resources based on user roles.

4. Image Uploads

	•	Added functionality for uploading single and multiple images, including processing and validation to handle invalid file types.
	•	Integrated image storage solutions to support product and user-related images.

5. User Features

	•	Built features for users to manage their reviews, wishlists, and addresses.
	•	Designed and implemented shopping cart functionality, allowing users to add products, manage quantities, and checkout.
	•	Integrated discount coupons, allowing users to apply discounts at checkout.

6. Payment Integration

	•	Integrated online payment gateways to support both cash and online payments.
	•	Ensured secure payment and order processing.

7. Deployment & Security

	•	Deployed the API to Heroku with environment-based configurations.
	•	Applied essential security measures like data encryption, input sanitization, and protection against common vulnerabilities (e.g., XSS, CSRF).

8. Continuous Enhancements

	•	Continuously improved the API by adding new features, addressing issues, and improving performance based on user feedback.

Tech Stack

	•	Node.js
	•	Express
	•	Sqllite,prisma ORM
	•	JWT for authentication
	•	Multer for image uploads
	•	Stripe/PayPal for payment integration
	•	Heroku for deployment

How to Run

	1.	Clone the repository:

git clone https://github.com/your-username/e-commerce-api.git
cd e-commerce-api


	2.	Install dependencies:

npm install


	3.	Set up environment variables:
	•	Create a .env file in the root directory and define the following variables:
	•	DB_URL: MongoDB connection string
	•	JWT_SECRET: Secret key for JWT
	•	STRIPE_SECRET: Stripe secret key for payment processing
	•	PAYPAL_CLIENT_ID: PayPal client ID
	•	PAYPAL_SECRET: PayPal secret key
	4.	Run the development server:

npm run dev


	5.	Access the API at http://localhost:4000.

Conclusion

This project highlights my expertise in developing Node.js APIs and handling real-world challenges such as authentication, authorization, payment processing, and deployment. It’s an excellent demonstration of my backend development skills, especially in the e-commerce domain.

