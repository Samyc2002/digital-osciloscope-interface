import { Server } from "./server";
import * as functions from "firebase-functions";

const server = new Server().app;
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`server is running ${port}`);
});

export const app = functions.https.onRequest(server);
