import { getEnvironmentVariables } from "../../../environments/env";
import UserDetail from "../../../models/User/UserAuthDetails";

export default async function login(req, res) {
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
    console.log(err);
  }
}
