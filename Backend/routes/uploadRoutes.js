const router = require("express").Router();

const upload = require("../middleware/uploadMiddleware");

const auth = require("../middleware/authMiddleware");

const {
  uploadDataset,
  getAllDatasets
} = require("../controllers/uploadController");

router.post(
  "/dataset",
  auth,
  upload.single("file"),
  uploadDataset
);

router.get("/", auth, getAllDatasets);

module.exports = router;