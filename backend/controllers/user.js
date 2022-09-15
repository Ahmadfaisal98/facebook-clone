import jwt from 'jsonwebtoken';

import User from '../models/User';
import bcrypt from 'bcrypt';
import { validateLength, validateUsername } from '../helpers/validation';
import { generateToken } from '../helpers/tokens';
import { sendVerificationEmail } from '../helpers/mailer';

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
    const user = jwt.verify(token, process.env.JWT_TOKEN);

    const check = await User.findById(user.id);
    if (check.verified == true) {
      return res
        .status(400)
        .json({ message: 'This email is already activated' });
    }

    await User.findByIdAndUpdate(user.id, { verified: true });
    return res
      .status(200)
      .json({ message: 'Account has been activated successfully' });
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
