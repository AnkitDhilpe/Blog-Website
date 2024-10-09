import express from "express";
import bcrypt from "bcryptjs"
import Post from "../models/createPost.js";
import jwt from "jsonwebtoken";
import User from "../models/createUser.js";    
import dotenv from "dotenv";  
const adminLayout = "../views/layouts/admin"   
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;


//check login middleware


const authMiddleware = (req, res, next ) => {
    const token = req.cookies.token;
  
    if(!token) {
      return res.status(401).json( { message: 'Unauthorized'} );
    }
  
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.userId = decoded.userId;
      next();
    } catch(error) {
      res.status(401).json( { message: 'Unauthorized'} );
    }
  }
  


//render signup page
async function signUphandler(req, res){
    try {
        const locals = {
            title: "Admin",
            description: "Simple Blog created with NodeJs, Express & MongoDb."
          }
        res.render("adminPages/signup", {locals})
    } catch (error) {
        console.log(error);
    }
}



// rendering the login layout (get)
async function loginhandler(req, res){
    try {
        const locals = {
            title: "Admin",
            description: "Simple Blog created with NodeJs, Express & MongoDb."
          }
        res.render("adminPages/login", {locals})
    } catch (error) {
        console.log(error);
    }
}

// user created
async function createUserhandler(req, res){
    try {
        const {userEmail, password} = req.body;
        // console.log(userEmail, password)
        const hashedpassword = await bcrypt.hash(password,10);
    try {
        const user = await User.create({
            userEmail,
            password: hashedpassword
        })
        res.status(201).json({msg :"user created", user});
    } catch (error) {
        if (error.code === 11000) {
            res.status(409).json({msg : "user already exists"});
        }
        res.status(500).json({msg :'Internal Server Error', error});
    }
    
    } catch (error) {
        console.log(error)
    }
}


// checkin login (post )    // Define layout as necessary

// User login handler
async function loginUserhandler(req, res) {
    try {
        const { userEmail, password } = req.body;

        // Check if user exists
        const user = await User.findOne({userEmail});
        if (!user) {
            // Return response immediately after rendering
            return res.status(401).render("adminPages/login", { error: 'Invalid credentials', layout: adminLayout });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // Return response immediately after rendering
            return res.status(401).render("adminPages/login", { error: 'Invalid credentials', layout: adminLayout });
        }

        // Generate JWT token with expiration
        const token = jwt.sign({userId: user._id }, jwtSecret);

        // Set cookie and redirect to dashboard
        res.cookie('token', token, {httpOnly: true});
        
        
        // Return after redirecting to avoid further code execution
        return res.redirect("/dashboard");

    } catch (error) {
        console.error('Login Error:', error);
        // Send response with error handling
        return res.status(500).render("adminPages/login", { error: 'Something went wrong. Please try again later.', layout: adminLayout });
    }
}

// async function loginUserhandler(req, res){
//     try {
//         const {userEmail, password} = req.body;
//         const user = await User.findOne({userEmail});
//         if (!user) return res.status(401).render("adminPages/login", {error: 'Invalid credentials', layout: adminLayout});
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(401).render("adminPages/login", {error: 'Invalid credentials', layout: adminLayout});
//         const token = jwt.sign({userId : user._id}, jwtSecret)
//         res.cookie('token', token,{httpOnly: true})
//         res.redirect("/dashboard");
//     } catch (error) {
//         console.log(error);
//     }
// }

//dashboard
// Dashboard handler without direct middleware call
async function getDashboardhandler(req, res) {
    try {
        const data = await Post.find({});
        // Fetch the necessary data
        return res.render("adminPages/dashboard",{data ,layout: adminLayout});
    } catch (error) {
        console.error('Dashboard Error:', error);
        return res.status(500).render("adminPages/dashboard", {error: 'Failed to load dashboard data.', layout: adminLayout});
    }
}


async function handleLogoutReq(req, res) {
    res.clearCookie('token');
    res.redirect('/home');
}















export {loginhandler, loginUserhandler,signUphandler, createUserhandler,getDashboardhandler,handleLogoutReq, authMiddleware};