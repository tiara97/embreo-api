const { userController } = require("../controllers");
const { verify } = require("../helpers/jwt-helper");

const router = require("express").Router();

router.get("/get/:id", userController.getUserById);
router.post("/login", userController.login);
router.post("/keepLogin", verify, userController.keepLogin);

module.exports = router;
