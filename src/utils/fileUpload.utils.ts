import { NotAcceptableException } from '@nestjs/common';
import axios from 'axios';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|mp4)$/)) {
    return callback(
      new NotAcceptableException('Only Jpg, jpeg, png, mp4 files are allowed!'),
      false,
    );
  }
  callback(null, true);
};

export const audioFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(mp3|mp4)$/)) {
    return callback(
      new NotAcceptableException('Only mp3 file are allowed!'),
      false,
    );
  }
  callback(null, true);
};

export async function uploadFileHandler(name, buffer) {
  try {
    const newBuffer = Buffer.from(buffer.toString('binary'), 'binary');
    const payload = await axios.put(
      process.env.SM_CDN_STORAGE + name,
      newBuffer,
      { headers: { AccessKey: process.env.SM_CDN_ACCESS } },
    );
    return payload.data;
  } catch (error) {
    return { HttpCode: 405 };
  }
}

export async function deleteFileHandler(name) {
  try {
    const payload = await axios.delete(process.env.SM_CDN_STORAGE + name, {
      headers: { AccessKey: process.env.SM_CDN_ACCESS },
    });
    return payload.data;
  } catch (error) {
    return { HttpCode: 405 };
  }
}
