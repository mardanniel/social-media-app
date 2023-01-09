import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const buildPath = (file?: string) => path.resolve(dirname, '../../../client', 'dist', file ?? '');

const serveStatic = express();

serveStatic.use(express.static(buildPath()));
serveStatic.get('*', (req, res) => {
  res.sendFile(buildPath('index.html'));
});

export default serveStatic;
