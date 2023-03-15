/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response, NextFunction } from "express";
import { getEnvironmentVariables } from "../environments/env";
import UserDetail from "../models/User/UserAuthDetails";
import { sign, verify } from "jsonwebtoken";
export class HeartDataController {
  static async getData(req: Request, res: Response, next: NextFunction) {
    try {
      const bearerHeader = req.headers.authorization;
      console.log(bearerHeader);

      if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        verify(
          bearerToken,
          getEnvironmentVariables().jwt_secret, // token secret
          (err: any, authdata: any) => {
            console.log(authdata);
            if (err) {
              res.status(403).json({
                status: "error",
                data: {},
                error: "user not logged in",
                success: "user logged in"
              });
            } else {
              const data = authdata.heartData;
              res.status(200).json({
                data,
                success: true
              });
            }
          }
        );
      } else {
        res.status(403).json({
          status: "error",
          data: {},
          error: "user not logged in",
          success: "user logged in"
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async updateData(req: Request, res: Response, next: NextFunction) {
    try {
      const bearerHeader = req.headers.authorization;
      console.log(bearerHeader);

      if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        verify(
          bearerToken,
          getEnvironmentVariables().jwt_secret, // token secret
          async (err: any, authdata: any) => {
            console.log(authdata);
            if (err) {
              res.status(403).json({
                status: "error",
                data: {},
                error: "user not logged in",
                success: "user logged in"
              });
            } else {
              const userAuthData = {
                id: authdata._id,
                name: authdata.name,
                phone: authdata.phone
              };
              var userData: any = await UserDetail.findOne(userAuthData);
              var data = userData?.heartData;
              data = [...data, req.body.value];
              userData.heartData = data;
              await UserDetail.findOneAndUpdate(userAuthData, userData);
              res.status(200).json({
                data,
                success: true
              });
            }
          }
        );
      } else {
        res.status(403).json({
          status: "error",
          data: {},
          error: "user not logged in",
          success: "user logged in"
        });
      }
    } catch (err) {
      next(err);
    }
  }
}
