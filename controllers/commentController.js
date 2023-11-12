const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

exports.createComment = async (req, res) => {
  try {
    //fetch data from req body
    const { post, user, body } = req.body;

    //create new comment object using comment model
    const comment = new Comment({
      post,
      user,
      body,
    });

    //save comment in database
    const savedComment = await comment.save();

    //find the post by ID , and push the new comment in comments array
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      {
        $push: { comments: savedComment._id },
      },
      { new: true }
    )
      .populate("comments")
      .exec();

    res.json({
      post: updatedPost,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error while creating comment",
    });
  }
};
