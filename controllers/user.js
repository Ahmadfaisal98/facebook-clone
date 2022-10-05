import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/User';
import Code from '../models/Code';
import Post from '../models/Post';
import { validateLength, validateUsername } from '../helpers/validation';
import { generateToken } from '../helpers/tokens';
import { sendResetCode, sendVerificationEmail } from '../helpers/mailer';
import generateCode from '../helpers/generateCode';

export const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: 'password must be at least 6 characters.',
      });
    }

    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message:
          'This email address already exists,try with a different email address',
      });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);

    const tempUsername = first_name + last_name;
    const newUsername = await validateUsername(tempUsername);

    const user = await new User({
      first_name,
      last_name,
      email,
      password: cryptedPassword,
      username: newUsername,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();

    const emailVerificationToken = await generateToken(
      { id: user._id.toString() },
      '30m'
    );

    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);

    const token = await generateToken({ id: user._id.toString() }, '7d');

    res.status(201).json({
      message: 'Register success! please activate your email to start',
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token,
      verified: user.verified,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: err.message });
  }
};

export const activateAccount = async (req, res) => {
  try {
    const { token } = req.body;
    const checkToken = jwt.verify(token, process.env.JWT_TOKEN);

    const user = await User.findById(checkToken.id);
    if (!user) {
      return res.status(400).json({ message: 'The user is not found' });
    }
    if (user.verified == true) {
      return res
        .status(400)
        .json({ message: 'This email is already activated' });
    }

    await User.findByIdAndUpdate(user.id, { verified: true });
    return res.status(200).json({
      message: 'Account has been activated successfully',
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: 'The email address is not connected to an account' });
    }

    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res
        .status(400)
        .json({ message: 'Invalid credentials. Please try again!' });
    }

    const token = await generateToken({ id: user._id.toString() }, '7d');

    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        picture: user.picture,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        bYear: user.bYear,
        bMonth: user.bMonth,
        bDay: user.bDay,
        gender: user.gender,
        token,
      },
      status: 200,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const auth = async (req, res) => {
  res.send('auth');
};

export const sendVerification = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({ message: 'The user is not found' });
    }

    if (user.verified === true) {
      return res.status(400).json({
        message: 'This account is already activated',
      });
    }

    const emailVerificationToken = await generateToken(
      { id: user._id.toString() },
      '30m'
    );

    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);

    return res.status(200).json({
      message: 'Email verification link has been sent to tour email',
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const findUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select('-password');
    if (!user) {
      return res.status(400).json({
        message: 'Account does not exists.',
      });
    }
    return res.status(200).json({
      email: user.email,
      picture: user.picture,
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendResetPasswordCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select('-password');
    await Code.findOneAndRemove({ user: user._id });
    const code = generateCode(5);
    await new Code({
      code,
      user: user._id,
    }).save();
    sendResetCode(user.email, user.first_name, code);
    return res.status(200).json({
      message: 'Email reset code has been sent to your email',
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const validateResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    const codeDb = await Code.findOne({ user: user._id });
    if (codeDb.code !== code) {
      return res.status(400).json({
        message: 'Verification code is wrong..',
      });
    }
    return res.status(200).json({ message: 'ok', status: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const changePassword = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({
      message: 'Password and confirmPassword must match',
    });
  }
  if (!validateLength(password, 6, 40)) {
    return res.status(400).json({
      message: 'password must be at least 6 characters.',
    });
  }

  const cryptedPassword = await bcrypt.hash(password, 12);
  await User.findOneAndUpdate(
    { email },
    {
      password: cryptedPassword,
    }
  );
  return res.status(200).json({ message: 'ok', status: 200 });
};

export const profile = async (req, res) => {
  try {
    const { username } = req.params;
    const profile = await User.findOne({ username }).select('-password');
    if (!profile) {
      return res.status(404).json({ message: 'User is not found' });
    }
    const posts = await Post.find({ user: profile._id })
      .populate('user')
      .sort({ createdAt: -1 });
    return res.status(200).json({ ...profile.toObject(), posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfilePicture = async (req, res) => {
  try {
    const { url } = req.body;

    await User.findByIdAndUpdate(req.user.id, {
      picture: url,
    });
    res.json(url);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCover = async (req, res) => {
  try {
    const { url } = req.body;

    await User.findByIdAndUpdate(req.user.id, {
      cover: url,
    });
    res.json(url);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDetails = async (req, res) => {
  try {
    const { infos } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      {
        details: infos,
      },
      {
        new: true,
      }
    );
    res.json(updated.details);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
