const Blog = require("../models/blog.js");
const Comment = require("../models/comment.js");

async function handleAddNewBlog(req, res) {
  const { title, body } = req.body;
  const blog = await Blog.create({
    title,
    body,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });

  return res.redirect(`/blog/${blog._id}`);
}

async function handleGetBlogById(req, res) {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );
  return res.render("blog", {
    blog,
    comments,
    user: req.user,
  });
}

async function handleCreateBlog(req, res) {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });

  return res.redirect(`/blog/${req.params.blogId}`);
}

module.exports = {
  handleAddNewBlog,
  handleGetBlogById,
  handleCreateBlog,
};
