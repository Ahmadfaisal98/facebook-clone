import express from 'express';
import {
  activateAccount,
  login,
  register,
  auth,
  sendVerification,
  findUser,
  sendResetPasswordCode,
  validateResetCode,
  changePassword,
  profile,
  updateProfilePicture,
} from '../controllers/user';
import { authUser } from '../middlewares/auth';

const router = express.Router();

router.post('/register', register);
router.post('/activate', activateAccount);
router.post('/login', login);
router.post('/send-verification', authUser, sendVerification);
router.post('/auth', authUser, auth);
router.post('/find-user', findUser);
router.post('/send-reset-code-verification', sendResetPasswordCode);
router.post('/validate-reset-code', validateResetCode);
router.post('/change-password', changePassword);
router.get('/profile/:username', profile);
router.put('/profile-picture', authUser, updateProfilePicture);

export default router;
