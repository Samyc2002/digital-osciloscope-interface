import { Router } from "express";
import { HeartDataController } from "../controllers/HeartDataController";

// The file is responsible to process the api requests and call the required middleware, validator and controller in a centralized place

//@Route: /heartData
//@AUTH not required
//@FUNCTIONS all auth related work

class HeartDataRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }
  getRoutes(): void {
    // add all get routes here
    this.router.get(
      "/", // path of api request
      HeartDataController.getData // Main business logic of the server that returns the required response.
    );
  }
  postRoutes(): void {
    // add all post routes here
    this.router.post(
      "/", // path of api request
      HeartDataController.updateData // Main business logic of the server that returns the required response.
    );
  }
  putRoutes(): void {
    // add all get routes here
    // this.router.put()
  }
  deleteRoutes(): void {
    // add all get routes here
    // this.router.delete()
  }
}
export default new HeartDataRouter().router;
