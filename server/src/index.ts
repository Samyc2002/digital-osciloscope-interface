import * as https from 'https';
import * as path from 'path';
import * as fs from 'fs';

import { Server } from './server';
import * as functions from 'firebase-functions';

const server = new Server().app;
const options = {
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
};
const server2 = https.createServer(options, server);

const port = process.env.PORT || 443;
server2.listen(port, () => {
  console.log(`server is running ${port}`);
});

export const app = functions.https.onRequest(server);
