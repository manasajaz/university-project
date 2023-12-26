const SendResponse = require("../helper/helper");
const UserModel = require("../model/authmodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AuthControler = {
  signup: async (req, res) => {
    try {
      let { userName, passward } = req.body;
      let obj = { userName, passward };
      let errorArray = [];

      if (!obj.userName) {
        errorArray.push("userName required");
      }

      if (!obj.passward) {
        errorArray.push("passward required");
      }

      if (errorArray.length > 0) {
        res
          .status(400)
          .send(SendResponse(false, "validation error", errorArray));
        return;
      }

      let userExist = await UserModel.findOne({
        userName: obj.userName,
      });

      if (userExist) {
        res.status(400).send(SendResponse(false, "user already exist"));
        return;
      } else {
        obj.passward = await bcrypt.hash(obj.passward, 10);

        let User = new UserModel(obj);
        let result = await User.save();

        if (result) {
          res
            .status(200)
            .send(SendResponse(true, "user create successfully", result));
        }
      }
    } catch (err) {
      res.status(500).send(SendResponse(false, "internael server error", err));
    }
  },

  login: async (req, res) => {
    try {
      let { userName, passward } = req.body;
      let obj = { userName, passward };

      let existingUser = await UserModel.findOne({
        userName: obj.userName,
      });

      if (existingUser) {
        let CorrectPasword = await bcrypt.compare(
          obj.passward,
          existingUser.passward
        );

        if (CorrectPasword) {
          let token = jwt.sign({ ...existingUser }, process.env.SECRET_KEY);

          res.send(
            SendResponse(true, "Login Successfully", {
              token: token,
              user: existingUser,
            })
          );
        } else {
          res.send(SendResponse(false, "Password Not Match"));
        }
      } else {
        res.send(SendResponse(false, "User Not Found with this User Name"));
      }
    } catch (err) {
      res.status(500).send(SendResponse(false, "internael server error", err));
    }
  },

  // del: async (req, res) => {
  //   try {
  //     let id = req.params.id;
  //     let result = await UserModel.findByIdAndDelete(id);

  //     if (result) {
  //       res
  //         .status(200)
  //         .send(SendResponse(true, "user deleted successfully", result));
  //     } else {
  //       res.status(400).send(SendResponse(true, "no data found", null));
  //     }
  //   } catch (err) {
  //     res.status(500).send(SendResponse(false, "internal server error", err));
  //   }
  // },
};

module.exports = AuthControler;
