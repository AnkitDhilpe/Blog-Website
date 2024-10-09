import express from "express";
import * as dotenv from "dotenv";
import Post from "./models/createPost.js";
import methodOverride from "method-override";
import expressLayout from "express-ejs-layouts"
import connectDB from "./config/database.js";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import session from "express-session";
//routes
import aboutRoutes from "./routes/aboutRoute.js";
import composeRoute from "./routes/composeRoute.js";
import postroutes from "./routes/postRoutes.js";
import searchposts from "./routes/searchposts.js";
import adminRoutes from "./routes/adminregisterRoutes.js";
// import { insertpostData } from "./controllers/composeControllers.js";
dotenv.config();
const app = express();
const port = 3000;
const homeStartingContent ="Am a MERN stack Developer and this is my Blog website";
const posts = [];
app.use(methodOverride('_method'))
app.use(expressLayout)
connectDB();

// Middlewares
app.use(cookieParser());

app.use(session({
  secret :'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl : process.env.MONGODB_URI}),

}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes

// Homepage
// GET req
// app.get("/", async (req, res) => {
//   try {
//     const locals = {
//       title: "NodeJs Blog",
//       description: "Am a MERN stack Developer and this is my Blog website",
//     };
//     const data = await Post.find();
//     res.status(200).render("index.ejs", {locals, data});
//   } catch (error) {
//     console.log(error);
//   }
  
// });
app.get('', async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

    // Count is deprecated - please use countDocuments
    // const count = await Post.count();
    const count = await Post.countDocuments({});
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('index', { 
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: '/'
    });

  } catch (error) {
    console.log(error);
  }

});

app.get("/home", (req, res) => {
  res.redirect("/");
});
// ----------
// about page
// Get req
app.use("/about", aboutRoutes);

// Compose page
// Get req
app.use("", composeRoute);
// insertpostData();


// posts page
app.use("/post", postroutes);

// search functionality
app.use("/search", searchposts);

app.use("", adminRoutes);





//Templating engine
app.set('layout', './layouts/home');
app.set("view engine", "ejs");
app.listen(port, () => {
  console.log("Server Started at http://localhost:3000");
});

export default posts;
