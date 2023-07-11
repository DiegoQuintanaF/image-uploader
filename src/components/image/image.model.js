import { MongoClient, ObjectId } from 'mongodb';
import { DB_URI } from './../../config.js';
import { uploadImageCloudinary } from './../../utils/cloudinary.js';

const saveImage = async (fileName, imgPath) => {
  const client = new MongoClient(DB_URI);
  let res;
  try {
    const db = client.db('image_uploader');
    const images = db.collection('images');

    const { secure_url } = await uploadImageCloudinary(imgPath);

    const query = { fileName, secure_url };
    res = await images.insertOne(query);
  } catch (error) {
    //
  } finally {
    await client.close();
  }
  return res?.insertedId.toString();
};

const getImage = async (imageId) => {
  const client = new MongoClient(DB_URI);
  let res;
  try {
    const db = client.db('image_uploader');
    const images = db.collection('images');

    const query = {
      _id: new ObjectId(imageId),
    };

    res = await images.findOne(query);
  } catch (error) {
    //
  } finally {
    await client.close();
  }

  return res?.secure_url;
};

const model = {
  save: saveImage,
  get: getImage,
};

export default model;
