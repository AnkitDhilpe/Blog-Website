import express from "express";
import Post from "../models/createPost.js";
const adminLayout = "../views/layouts/admin"

async function handleGetComposeReq(req, res) {
  res.render("adminPages/compose",{layout : adminLayout});
}

async function handlePostComposeReq(req, res) {

  try {
    const postTitle = req.body.posttitle
    const postBody = req.body.postbody
    const data = await Post.create({
      title : postTitle,
      body : postBody
    })
    res.render("adminPages/post",{data,layout: adminLayout})
  } catch (error) {
    console.log(error)
  }


}

// To get The edit-post page //Get request
async function handleGetEditPage(req, res) {

  try {
    const locals = {
      title: "Edit Post",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }
    const data = await Post.findOne({_id : req.params.id});
    res.render("adminPages/edit-post", {locals, data, layout: adminLayout})
  } catch (error) {
    console.log(error)
  }


}


// To Upadate the post //PUT request 
async function handleEditReq(req, res) {
  try {
    const { posttitle: postTitle, postbody: postBody } = req.body;

    // Validate input (this can be enhanced depending on your validation strategy)
    if (!postTitle || !postBody) {
      return res.status(400).json({ message: "Post title and body are required" });
    }

    // Update the post
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
      title: postTitle,
      body: postBody,
      updatedAt: Date.now()
    }, { new: true });

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    // console.log(updatedPost);
    res.redirect(`/edit-post/${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


async function handleDeletePost(req, res) {
  try {
      await Post.deleteOne({_id: req.params.id})
      res.redirect("/dashboard")
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

















export { handleGetComposeReq,handlePostComposeReq,handleEditReq,handleGetEditPage,handleDeletePost};

// async function insertpostData() {
//   Post.insertMany([
//     {
//       title: "Building A Blog",
//       body: "This website is made in nodejs, express, and mongodB",
//     },
//     {
//       title: "Understand how to work with MongoDB and Mongoose",
//       body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications.",
//     },
//     {
//       title: "build real-time, event-driven applications in Node.js",
//       body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js.",
//     },
//     {
//       title: "Discover how to use Express.js",
//       body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications.",
//     },
//     {
//       title: "Asynchronous Programming with Node.js",
//       body: "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking I/O operations.",
//     },
//     {
//       title: "Learn the basics of Node.js and its architecture",
//       body: "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers.",
//     },
//     {
//       title: "NodeJs Limiting Network Traffic",
//       body: "Learn how to limit netowrk traffic.",
//     },
//     {
//       title: "Learn Morgan - HTTP Request logger for NodeJs",
//       body: "Learn Morgan.",
//     },
//   ]);
// }
