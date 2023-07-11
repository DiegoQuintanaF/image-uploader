import model from './image.model.js';

const imageUpload = async (req, res) => {
  if (!req.files) {
    res.json({ error: 'no hay imagenes', response: '' });
  }

  const image = req.files['img-file'];

  const fileName = image.name;

  const fileExt = image.name.split('.').at(-1);
  const newName = `file-${Math.random().toString(32).substring(7)}.${fileExt}`;
  const imgPath = `./uploads/${newName}`;

  image.mv(imgPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }
  });

  const imageId = await model.save(fileName, imgPath);
  res.json({ error: '', response: 'ok', imageId });
};

const getImage = async (req, res) => {
  const { id } = req.params;

  const url = await model.get(id);

  if (!url) {
    res.send('Bad request');
  }

  res.redirect(url);
};

const controller = {
  imageUpload,
  getImage,
};

export default controller;
