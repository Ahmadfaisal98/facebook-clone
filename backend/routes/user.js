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
  updateCover,
  updateDetails,
  addFriend,
  cancelRequest,
  follow,
  unfollow,
  acceptRequest,
  unfriend,
  deleteRequest,
  savePost,
  search,
  addToSearchHistory,
  getSearchHistory,
  removeFromSearch,
  getFriendsPageInfos,
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
router.get('/profile/:username', authUser, profile);
router.put('/profile-picture', authUser, updateProfilePicture);
router.put('/cover', authUser, updateCover);
router.put('/details', authUser, updateDetails);
router.put('/add-friend/:id', authUser, addFriend);
router.put('/cancel-request/:id', authUser, cancelRequest);
router.put('/follow/:id', authUser, follow);
router.put('/unfollow/:id', authUser, unfollow);
router.put('/accept-request/:id', authUser, acceptRequest);
router.put('/unfriend/:id', authUser, unfriend);
router.put('/delete-request/:id', authUser, deleteRequest);
router.put('/save/:id', authUser, savePost);
router.post('/search/:searchTerm', authUser, search);
router.put('/search-history', authUser, addToSearchHistory);
router.get('/search-history', authUser, getSearchHistory);
router.delete('/search-history', authUser, removeFromSearch);
router.get('/friends', authUser, getFriendsPageInfos);

export default router;
