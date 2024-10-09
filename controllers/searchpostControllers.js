import express from "express";
import Post from "../models/createPost.js";

async function handlesearchPosts(req, res) {
  
  try {
    const searchTerm = req.body.searchterm;
    if (!searchTerm) {
      return res.status(401).json("Please enter a search term.");
    }
    const removespecialchar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
    const search = await Post.find({
      $or: [
        { title: { $regex: new RegExp(removespecialchar, "i") } },
        { body: { $regex: new RegExp(removespecialchar, "i") } },
      ],
    });
    res.render("search.ejs", { search });
  } catch (error) {
    console.log(error);
  }

}
export { handlesearchPosts };
