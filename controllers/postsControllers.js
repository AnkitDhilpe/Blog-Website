import express from "express";
import Post from "../models/createPost.js";


// async function handelGetAllPosts(req, res){
//     try {
//         const allblogPost = await Post.find();
//         res.render("post.ejs", {allblogPost});
//     } catch (error) {
//         console.log(error);
//     }
// }
async function handelGetPostsById(req, res){
    try {
        // const postId = req.params.id;
        const data = await Post.findById({_id : req.params.id});
        // console.log(postId);
        res.render("adminPages/post", {data});
    } catch (error) {
        console.log(error);
    }
}


export {handelGetPostsById, };
// handelGetAllPosts