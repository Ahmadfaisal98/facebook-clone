import { generatePage } from '../helpers/generatePage';
import Post from '../models/Post';
import User from '../models/User';

export const createPost = async (req, res) => {
  try {
    const post = await new Post(req.body).save();
    res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const { limit, skip } = generatePage(page, pageSize);

    const followingTemp = await User.findById(req.user.id).select('following');
    const following = followingTemp.following;
    const promises = following.map((user) => {
      return Post.find({ user: user })
        .populate('user', 'first_name last_name picture username cover')
        .populate('comments.commentBy', 'first_name last_name picture username')
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip);
    });
    const followingPosts = await (await Promise.all(promises)).flat();
    const userPosts = await Post.find({ user: req.user.id })
      .populate('user', 'first_name last_name picture username cover')
      .populate('comments.commentBy', 'first_name last_name picture username')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
    followingPosts.push(...[...userPosts]);
    followingPosts.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    res.json(followingPosts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const comment = async (req, res) => {
  try {
    const { comment, image, postId } = req.body;
    let newComments = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            comment: comment,
            image: image,
            commentBy: req.user.id,
            commentAt: new Date(),
          },
        },
      },
      {
        new: true,
      }
    ).populate('comments.commentBy', 'picture first_name last_name username');
    res.json(newComments.comments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
