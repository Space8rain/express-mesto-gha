const router = require('express').Router();
const { avatarUpdateValidator, userUpdateValidator, userIdValidator } = require('../middlewares/userValidator');

const {
  getAllUsers,
  getUser,
  getUserMe,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/me', getUserMe);

router.get('/:userId', userIdValidator, getUser);
router.patch('/me', userUpdateValidator, updateUser);
router.patch('/me/avatar', avatarUpdateValidator, updateAvatar);

module.exports = router;
