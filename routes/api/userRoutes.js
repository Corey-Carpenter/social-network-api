const router = require('express').Router();


const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController')

router.route('/').get(getAllUsers).post(createUser).put(updateUser);

router.route('/:userId').get(getUser).delete(deleteUser);

// router.route('/:userId/friends').post(addFriend);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);


module.exports = router;
