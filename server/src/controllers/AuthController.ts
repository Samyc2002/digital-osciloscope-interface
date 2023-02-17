/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response, NextFunction } from "express";
import { getEnvironmentVariables } from "../environments/env";
import UserDetail from "../models/User/UserAuthDetails";
import { sign, verify } from "jsonwebtoken";
export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.body.query;
      const user = await UserDetail.findOne(query);
      if (!user) {
        // if user doesnot exists, create new user
        const user = new UserDetail({
          ...req.body.user
        });
        await user.save();
        const token = sign(user.toJSON(), getEnvironmentVariables().jwt_secret);
        const userAuthData = {
          id: user._id,
          name: user.name,
          phone: user.phone
        };
        return res.status(200).json({
          data: {
            user: userAuthData,
            token
          },
          sucess: true
        });
      }
      if (user) {
        // if user exists, get user data
        const token = sign(user.toJSON(), getEnvironmentVariables().jwt_secret);
        const userAuthData = {
          id: user._id,
          name: user.name,
          phone: user.phone
        };
        return res.status(200).json({
          data: {
            user: userAuthData,
            token
          },
          success: true
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async getUser(req: Request, res: Response, next: NextFunction) {
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
              const user = {
                id: authdata._id,
                name: authdata.name,
                phone: authdata.phone
              };
              res.status(200).json({
                data: { user },
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
