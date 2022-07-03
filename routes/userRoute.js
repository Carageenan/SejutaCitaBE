const router = require("express").Router();
const Controller = require("../Controllers/userController");
const { isAdmin } = require("../middleware/auth");

router.get("/myData", Controller.getMyData);
router.use(isAdmin);
router.get("/", Controller.getAllUsers);
router.get("/:id", Controller.getUserById);
router.post("/", Controller.registerUser);
router.put("/:id", Controller.updateUser);
router.delete("/:id", Controller.deleteUser);

module.exports = router;
