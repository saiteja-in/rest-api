const express = require("express");
const router = express.Router();
const {
  handleGetAllUsers,
  handlegetUserById,
  handleUpdateUserById,
  handleDelelteUserById,
  handleCreateNewUser,
} = require("../controllers/user");

// router.get("/users", async (req, res) => {
//   const allDbUsers = await User.find({});
//   const html = `
//       <ul>
//           ${allDbUsers.map((user) => `<li>${user.email}</li>`).join("")}
//       </ul>
//       `;
//   res.send(html);
// });

router.get("/", handleGetAllUsers);
router
  .route("/:id")
  .get(handlegetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDelelteUserById);

router.post("/", handleCreateNewUser);

module.exports = router
