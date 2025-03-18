require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const outfitSchema = new mongoose.Schema({
  imageUrl: String,
  likes: { type: Number, default: 0 },
});

const Outfit = mongoose.model("Outfit", outfitSchema);

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), async (req, res) => {
  const outfit = new Outfit({ imageUrl: req.file.path });
  await outfit.save();
  res.json(outfit);
});

app.listen(5000, () => console.log("Server running on port 5000"));
