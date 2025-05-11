const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/miniproject')
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    email: String,
    age: Number,
    password: String,
    profilepic:{
        type:String,
        default:"boy.png"
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post"
        }
    ]
});

module.exports = mongoose.model('user', userSchema);
