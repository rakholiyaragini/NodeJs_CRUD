const express = require("express");
const router = express.Router();
const recordController = require("../controller/recordController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.get("/", recordController.getAllRecords);
router.post("/add", upload.single("image"), recordController.addRecord);
router.get("/add", (req, res) => res.render("add"));
router.get("/edit/:id", recordController.getRecordById);
router.post("/update/:id", upload.single("image"), recordController.updateRecord);
router.get("/delete/:id", recordController.deleteRecord);

module.exports = router;
