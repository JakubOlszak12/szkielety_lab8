const router = require("express").Router()
const { User } = require("../models/user")
router.get("/", async (req, res) => {
 //pobranie wszystkich użytkowników z bd:
 User.find().exec()
 .then(async () => {
 const users = await User.find();
 //konfiguracja odpowiedzi res z przekazaniem listy użytkowników:
 res.status(200).send({ data: users, message: "Lista użytkowników" });
 })
 .catch(error => {
 res.status(500).send({ message: error.message });
 });
})
module.exports = router