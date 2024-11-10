const mongoose = require("mongoose")
const blogModel = require("../models/blogModel")
const userModel = require("../models/userModel")



exports.createBlog = async (req, res) => {
    try {
        const {title , content } = req.body
        
        const author = req.user.id
        const newBlog = new blogModel({title , content , author})
        const blog = await newBlog.save()

        const user = await userModel.findById(author)
        user.blogs.push(blog)
        await user.save()
    
        res.status(201).send({
            success : true,
            message : "new blog created",
            blog : newBlog
        })
        
    }
    catch(e) {
        console.log(`error while creating blog: ${e}`)
        res.status(500).send({
            success : false,
            message : "error while creating blog"
        })
    }

}

exports.getAllBlogs = async (req, res) => {
    try {
        // const blogs = await blogModel.find()
        const blogs = await blogModel.find().populate('author', 'name email'); // Specify the fields you want to retrieve from the user model
        // console.log(req.user);

        res.status(200).send({
            success : true,
            message : "All users blogs successfully",
            blogs : blogs
        })
    }
    catch(e) {
        console.log(`Error while getting all blogs: ${e}`)
        res.status(500).send({
            success : false,
            message : "Error while getting all blogs"
        })
    }
}

exports.getBlogsById = async (req, res) => {
    try {
        const id = req.params.id
        const blog = await blogModel.findById(id)
        res.status(200).send({
            success : true,
            message : "blog found",
            blog : blog
        })

    }
    catch(e) {
        console.log(`error while getting user: ${e}`)
        res.status(500).send({
            success : false,
            message : "error while getting user"
        })
    }

}

exports.deleteBlog = async (req, res) => {
    try {
        const id = req.params.id
        const findblog = await blogModel.findById(id)
        
        const author = findblog.author;
        await blogModel.deleteOne({ _id: id});

        const user = await userModel.findById(author);
     
        user.blogs.pull(id);
        await user.save();
        
        res.status(200).send({
            success : true,
            message : "sucessesfully deleted",
            // blog : findblog
        })

    }
    catch(e) {
        console.log(`error while deleting user: ${e}`)
        res.status(500).send({
            success : false,
            message : "error while deleting user"
        })
    }
}

exports.updateBLog = async (req, res) => {
    try {
        const id = req.params.id
        const updates = req.body

        const blog = await blogModel.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true } 
        );

        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "Blog not found",
            });
        }
        res.status(200).send({
            success : true,
            message : "sucessesfully updated",
            blog : blog
        })

    }
    catch(e) {
        console.log(`error while updating blog: ${e}`)
        res.status(500).send({
            success : false,
            message : "error while updating blog"
        })
    }
}

exports.getMyBlogs = async (req, res) => {
    try {
        const author = req.user.id 

        // Find the user by ID and populate the 'blogs' field
        const blogs = await blogModel.find({author:author}).populate('author', 'name email')

        // console.log(blogs);
        

        res.status(200).send({
            success: true,
            message: "Blogs for the user retrieved successfully",
            blogs: blogs,
        });
    } catch (e) {
        console.log(`Error while fetching user blogs: ${e}`);
        res.status(500).send({
            success: false,
            message: "Error while fetching user blogs",
        });
    }
};
