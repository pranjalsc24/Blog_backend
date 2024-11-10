const express = require("express")
const router = express.Router()
const blogController = require("../controllers/blogController")
const authenticate = require("../middleware/authenticate")

router.post("/create", authenticate.authenticate, blogController.createBlog)
router.get("/blogs", blogController.getAllBlogs)
router.get("/my-blogs", authenticate.authenticate,blogController.getMyBlogs)
router.get("/blogs/:id", blogController.getBlogsById)
router.delete("/delete/:id", authenticate.authenticate, blogController.deleteBlog)
router.patch("/update/:id", authenticate.authenticate, blogController.updateBLog)

module.exports = router