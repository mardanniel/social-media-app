import mongoose from 'mongoose';
import PostModel from '../models/post';
import { faker } from '@faker-js/faker';

import { config } from 'dotenv';

config();

const DATA_STORAGE_URL = process.env.DATA_STORAGE_URL!;

try {
  await mongoose.connect(DATA_STORAGE_URL);
  for (let i = 0; i <= 20; i++) {
    await PostModel.create(
      {
        creator: new mongoose.mongo.ObjectId('63a6d368ddd577b34ac5dfef'),
        context: faker.lorem.paragraph(),
        image: faker.image.abstract(),
      },
      (error) => {
        if (error) {
          throw error;
        }
        console.log('Post Created!');
      }
    );
  }
} catch (error) {
  console.error(error);
  process.exit(1);
}