const router = require("express").Router();
const Controller = require("../Controllers/authController");

router.get("/", (req, res) => res.send("This is the SejutaCitaBE API by Muhammad Ihsan Erdiansyah"));
router.post("/login", Controller.loginUser);

module.exports = router;
