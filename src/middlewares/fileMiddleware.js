import fileUpload from 'express-fileupload';

const uploadConfig = {
  useTempFiles: true,
  tempFileDir: './uploads/',
  preserveExtension: 5,
};

const fileMiddleware = () => fileUpload(uploadConfig);

export default fileMiddleware();
