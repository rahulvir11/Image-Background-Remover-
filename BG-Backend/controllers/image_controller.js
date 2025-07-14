import sharp from 'sharp'; // ✅ new
import fs from 'fs';
import FormData from 'form-data';
import axios from 'axios';
import User from '../models/user_model.js';

const removeBgImage = async (req, res) => {
  try {
    const { _id } = req;
    console.log(_id);
    const user = await User.findById(_id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const imagePath = req.file.path;

    // ✅ Step: Get image metadata
    const metadata = await sharp(imagePath).metadata();
    const resolution = metadata.width * metadata.height;

    if (resolution > 25_000_000) {
      return res.status(400).json({
        success: false,
        message: 'Image resolution exceeds 25 megapixels. Please upload a smaller image.',
      });
    }

    const imageFile = fs.createReadStream(imagePath);
    const formDate = new FormData();
    formDate.append('image_file', imageFile);

    const { data } = await axios.post(
      'https://clipdrop-api.co/remove-background/v1',
      formDate,
      {
        headers: {
          ...formDate.getHeaders(),
          'x-api-key': process.env.CLIPDROP_API,
        },
        responseType: 'arraybuffer', // ✅ important for binary image
      }
    );

    const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

    res.json({ success: true, resultImage, message: 'Image background removed successfully' });

  } catch (error) {
    console.error(error?.response?.data || error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { removeBgImage };
