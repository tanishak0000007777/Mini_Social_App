Mini Social App
A simple full-stack social networking app built using Node.js, Express, MongoDB, EJS, and Tailwind CSS.

Features
Allows users to register and log in.

Upload and display profile pictures using Multer.

Users can create personal posts.

Like and unlike posts.

Secure session-based authentication.

Technologies Used
Node.js

Express.js

MongoDB

Mongoose

EJS

Tailwind CSS

Multer

How to Use
Clone the repository and install dependencies:

bash
Copy
Edit
git clone https://github.com/tanishak0000007777/mini-social-app.git
cd mini-social-app
npm install
Make sure MongoDB is running locally (mongodb://127.0.0.1:27017/miniproject).

Start the server:

bash
Copy
Edit
node app.js
Open your browser and visit: http://localhost:3000

Project Structure
pgsql
Copy
Edit

mini-social-app/
│── views/               # EJS templates (index, login, profile, upload)
│── models/
│   ├── user.js          # User schema and MongoDB connection
│   └── post.js          # Post schema
│── public/
│   └── images/uploads/  # Uploaded profile pictures
│── multer.js            # Multer file upload configuration
│── app.js               # Main Express server
License
This project is open-source and free to use. Feel free to modify and enhance it!

Author
Tanishak Bansal
GitHub: https://github.com/tanishak0000007777
