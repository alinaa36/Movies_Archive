import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  return file.mimetype === 'text/plain' ? cb(null, true) : cb(new Error('Acceptable file format is .txt'));
};

export const memoryUpload = multer({ storage, fileFilter });
