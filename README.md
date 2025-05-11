Mini Social App
A minimalist full-stack social app where users can register, log in, upload a profile picture, create posts, and like/unlike posts.

🚀 Features
🔐 User Registration and Login

🖼️ Profile Picture Upload using Multer

📝 Create and View Personal Posts

❤️ Like / Unlike Posts

🔒 Session-based Authentication

🎨 TailwindCSS Styling

🛠 Tech Stack
Frontend: EJS + Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB + Mongoose

File Upload: Multer

📂 Folder Structure
bash
Copy
Edit
├── public/
│   └── images/uploads/         # Uploaded profile pictures
├── routes/
│   └── main.js                 # Main application routes
├── models/
│   ├── user.js                 # User schema
│   └── post.js                 # Post schema
├── views/
│   ├── index.ejs               # Registration page
│   ├── login.ejs               # Login page
│   ├── profile.ejs             # Profile/dashboard
│   └── upload.ejs              # Profile pic upload page
├── multer.js                   # Multer storage config
├── app.js                      # Main server file
🔧 Setup Instructions
Clone the repo:

bash
Copy
Edit
git clone https://github.com/yourusername/mini-social-app.git
cd mini-social-app
Install dependencies:

bash
Copy
Edit
npm install
Run MongoDB: (Ensure MongoDB is running on your local machine)

Start the app:

bash
Copy
Edit
node app.js
Visit http://localhost:3000



📌 Notes
Default profile image is set to boy.png. Uploads are stored in public/images/uploads.

Post creation is user-specific and only visible in the user’s profile.

Author
Tanishak Bansal
GitHub:https://github.com/tanishak0000007777
