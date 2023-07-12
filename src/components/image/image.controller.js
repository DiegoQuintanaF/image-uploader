import response from './../../network/response.js';
import model from './image.model.js';
import fs from 'fs/promises';

const imageUpload = async (req, res) => {
  if (!req.files) {
    response.error(req, res, 'No image was sent.', 400);
  }

  const image = req.files['img-file'];

  const fileName = image.name;
  const aux = fileName.split('.');
  const fileExt = aux[aux.length - 1];
  const newName = `file-${Math.random().toString(32).substring(7)}.${fileExt}`;
  const imgPath = `./uploads/${newName}`;

  image.mv(imgPath, function (err) {
    if (err) {
      response.error(req, res, 'No image was sent.', 400);
    }
  });

  try {
    const imageId = await model.save(fileName, imgPath);
    await fs.unlink(imgPath);

    const body = {
      message: 'Image uploaded successfully.',
      imageId,
    };

    response.success(req, res, body, 201);
  } catch {
    response.error(req, res);
  }
};

const getImage = async (req, res) => {
  const { id } = req.params;

  const url = await model.get(id);

  if (!url) {
    response.success(req, res, 'Bad request.', 400);
  }

  res.redirect(url);
};

export default {
  imageUpload,
  getImage,
};
