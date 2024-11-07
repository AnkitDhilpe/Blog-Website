
# Blog-Website

The blog website is a full-stack web application built using Node.js and Express.js. It allows users to create, edit, delete, and view blog posts. The application incorporates user authentication with secure login and registration, enabling only registered users to manage blog content. It uses MongoDB for data storage, handling both user accounts and blog posts.

The front-end is designed with EJS for dynamic content rendering and Bootstrap for a responsive, mobile-friendly layout. This project showcases a clean, modular code structure following the MVC (Model-View-Controller) design pattern. The website is deployed using Render, and database access is secured through MongoDB Atlas with IP whitelisting.


## Create .env file 
Create a .env file to store your credentials. Example below:

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@clusterName.xxxxxxx.mongodb.net/blog
JWT_SECRET=MySecretBlog
```

## Installation

Install my-project with npm

```bash
  npm install
  node index.js
```
    
## Website

link : https://blog-website-1-6x3l.onrender.com