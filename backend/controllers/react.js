import mongoose from 'mongoose';
import React from '../models/React';

export const reactPost = async (req, res) => {
  try {
    const { postId, react } = req.body;
    const check = await React.findOne({
      postRef: postId,
      reactBy: mongoose.Types.ObjectId(req.user.id),
    });
    if (check == null) {
      const newReact = new React({
        react: react,
        postRef: postId,
        reactBy: req.user.id,
      });
      await newReact.save();
      res.status(200).json(newReact);
    } else {
      if (check.react == react) {
        await React.findByIdAndRemove(check._id);
        res.status(200).json(react);
      } else {
        await React.findByIdAndUpdate(check._id, {
          react: react,
        });
        res.status(200).json(react);
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getReacts = async (req, res) => {
  try {
    const reactsArray = await React.find({ postRef: req.params.id });
    /*
    const check1 = reacts.find(
      (x) => x.reactBy.toString() == req.user.id
    )?.react;
    */
    const newReacts = reactsArray.reduce((group, react) => {
      let key = react['react'];
      group[key] = group[key] || [];
      group[key].push(react);
      return group;
    }, {});

    const reacts = [
      {
        react: 'like',
        count: newReacts.like?.length || 0,
      },
      {
        react: 'love',
        count: newReacts.love?.length || 0,
      },
      {
        react: 'haha',
        count: newReacts.haha?.length || 0,
      },
      {
        react: 'sad',
        count: newReacts.sad?.length || 0,
      },
      {
        react: 'wow',
        count: newReacts.wow?.length || 0,
      },
      {
        react: 'angry',
        count: newReacts.angry?.length || 0,
      },
    ];
    reacts.sort((a, b) => b.count - a.count);

    const check = await React.findOne({
      postRef: req.params.id,
      reactBy: req.user.id,
    });

    return res.status(200).json({
      reacts,
      check: check?.react,
      total: reactsArray.length,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
