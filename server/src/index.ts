import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import session from 'express-session';
import connectMongoDBSession from 'connect-mongodb-session';
import api from './controller';
import serveStatic from './controller/static-controller';
import mongoose from 'mongoose';

config();

const HOST = process.env.HOST!;
const PORT = parseInt(process.env.PORT!);
const DATA_STORAGE_URL = process.env.DATA_STORAGE_URL;
const SESSION_STORAGE_URL = process.env.SESSION_STORAGE_URL!;
const SESSION_STORAGE_COLLECTION = process.env.SESSION_STORAGE_COLLECTION!;
const SESSION_SECRET = process.env.SESSION_SECRET!;

const MongoDBSessionStore = connectMongoDBSession(session);

const store = new MongoDBSessionStore({
  uri: SESSION_STORAGE_URL,
  collection: SESSION_STORAGE_COLLECTION,
  expires: 1000 * 60 * 60 * 24, // 1 day
});
const app = express();
const origin =
  process.env.ENVIRONMENT !== 'prod'
    ? 'http://127.0.0.1:3001'
    : `https://${HOST}:${PORT}`;

app.use(
  cors({
    origin: origin,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true,
  })
);
app.use(
  session({
    name: 'socialex-session',
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 4, // 4 hours
    },
    store: store,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(bodyParser.json());
app.use('/api', api);
app.use(serveStatic);

try {
  if (DATA_STORAGE_URL) {
    mongoose.connect(DATA_STORAGE_URL, {
      keepAlive: true,
      keepAliveInitialDelay: 30000,
    });

    mongoose.connection.on('connected', () => {
      console.log('Database successfully connected.');
    });
    mongoose.connection.on('disconnected', () => {
      console.log('Database successfully disconnected.');
    });
    mongoose.connection.on('error', (error) => {
      console.log({
        msg: 'An unexpected error occured on database connection.',
        error: error,
      });
    });
  }
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(
        { status: false, msg: 'App terminated, closing mongo connections' },
        'service'
      );
      process.exit(0);
    });
  });
  app.listen(PORT, HOST, () => {
    console.log(`Socialex: ${HOST}:${PORT}`);
  });
} catch (error) {
  console.log({
    msg: 'An unexpected error occured on database service.',
    error: error,
  });
  process.exit(1);
}
