const express = require('express');
const path = require('path');
const usermodel = require("./modules/user");
const postmodel = require("./modules/post");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const upload = require('./config/multerconfig');

const app = express();
const JWT_SECRET = "secretkey";

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


// Root route
app.get('/', (req, res) => {
    res.render('index');
});

// Register
app.post('/register', async (req, res) => {
    let { username, name, email, age, password } = req.body;
    try {
        let user = await usermodel.findOne({ email });
        if (user) return res.status(400).send("User already registered");

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        let newUser = await usermodel.create({
            name, age, username, email, password: hash
        });

        let token = jwt.sign({ email, userid: newUser._id }, JWT_SECRET);
        res.cookie("token", token, { httpOnly: true });
        res.status(201).send("!! User registered !!!");
    } catch (err) {
        console.error(err);
        res.status(500).send("Registration failed");
    }
});

// Login form
app.get('/login', (req, res) => {
    res.render('login');
});

// Login logic
app.post('/login', async (req, res) => {
    let { email, password } = req.body;
    try {
        let user = await usermodel.findOne({ email });
        if (!user) return res.status(400).send("User not found");

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) return res.status(500).send("Error during login");
            if (result) {
                let token = jwt.sign({ email, userid: user._id }, JWT_SECRET);
                res.cookie("token", token, { httpOnly: true });
                res.redirect('/profile');
            } else {
                res.status(401).send("Incorrect password");
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Login failed");
    }
});

// Profile page
app.get('/profile', isLoggedIn, async (req, res) => {
    try {
        let user = await usermodel.findOne({ email: req.user.email }).populate({
            path: 'posts',
            options: { sort: { date: -1 } }
        });
        if (!user) return res.status(404).send("User not found");
        res.render('profile', { user });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading profile");
    }
});


// profile pic route 
app.get('/profile/upload', (req, res) => {
    res.render('profilePic');
});

app.post('/upload',isLoggedIn, upload.single("image"),async(req, res) => {
    // console.log(req.file)
    let user=await usermodel.findOne({email:req.user.email})

    user.profilepic=req.file.filename;
    await user.save();
    res.redirect('profile');
});



// Create post
app.post('/create', isLoggedIn, async (req, res) => {
    try {
        let user = await usermodel.findOne({ email: req.user.email });
        let { content } = req.body;
        if (!content || content.trim() === "") {
            return res.status(400).send("Post content cannot be empty");
        }

        let post = await postmodel.create({
            user: user._id,
            content
        });
        user.posts.push(post._id);
        await user.save();

        res.redirect('/profile');
    } catch (err) {
        console.error(err);
        res.status(500).send("Could not create post");
    }
});


//like route
app.get('/like/:id', isLoggedIn,async (req, res) => {
    let post=await postmodel.findOne({_id:req.params.id}).populate('user');
    
    if(post.likes.indexOf(req.user.userid)=== -1)
    {
        post.likes.push(req.user.userid);
    }
    else
    {
        // remove the like of user id one time 
        post.likes.splice(post.likes.indexOf(req.user.userid),1);
    }

    
    await post.save();
    res.redirect('/profile');
});

//edit route
app.get('/edit/:id', isLoggedIn,async (req, res) => {
    let post=await postmodel.findOne({_id:req.params.id}).populate('user');
    
    res.render('edit',{post});
    
});

app.post('/edit/:id', isLoggedIn,async (req, res) => {
    let post=await postmodel.findOneAndUpdate({_id:req.params.id},{content:req.body.content})
    
  res.redirect('/profile');
    
});


// Logout
app.get('/logout', (req, res) => {
    res.cookie("token", "", { httpOnly: true });
    res.redirect('/login');
});

// Middleware: Check token
function isLoggedIn(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token || token.trim() === "") return res.redirect('/login');
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data;
        next();
    } catch (err) {
        return res.status(401).send("Invalid token. Please log in again.");
    }
}

// Start server
app.listen(3000, () => {
    console.log("✅ System is running smoothly on http://localhost:3000");
});
