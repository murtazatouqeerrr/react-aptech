const express = require("express")

const auth = require("../controllers/auth-controller")
const authMiddleware = require("../middlewares/auth-middleware")

const router = express.Router();

router.get("/", auth.home)
router.post("/register", auth.register)
router.get("/login", auth.login)
router.post("/contact", auth.contact)
router.get("/contact", auth.getContact)
router.get("/users", auth.getUsers)
router.get("/user", authMiddleware, auth.user)

module.exports = router;