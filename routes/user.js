const express = require("express");
const router = express.Router();
const {
  handleGetAllUsers,
  handlegetUserById,
  handleUpdateUserById,
  handleDelelteUserById,
  handleCreateNewUser,
} = require("../controllers/user");

router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);
router
  .route("/:id")
  .get(handlegetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDelelteUserById);

module.exports = router;
