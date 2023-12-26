const SendResponse = require("../helper/helper");
const CourseModel = require("../model/coursemodel");

const CourseControler = {
  get: async (req, res) => {
    try {
      let { pageNo, PageSize } = req.query;
      // console.log(pageNo, PageSize);
      // let skipcount = (pageNO - 1) * PageSize;
      let result = await CourseModel.find();
      // .limit(PageSize).skip(skipcount);
      res.status(200).send(SendResponse(true, "data get succesfully", result));
    } catch (err) {
      res.status(500).send(SendResponse(false, "internal server error", err));
    }
  },

  getbyid: async (req, res) => {
    try {
      let id = req.params.id;
      let result = await CourseModel.findById(id);

      if (result) {
        res
          .status(200)
          .send(SendResponse(true, "data successfully getbyid", result));
      } else {
        res.status(400).send(SendResponse(true, "no data found", null));
      }
    } catch (err) {
      res.status(500).send(SendResponse(false, "internal server error", err));
    }
  },

  // edit: (req, res) => {
  //   try {
  //     let id = req.params.id;
  //     let result = CourseModel.findByIdAndUpdate(id);

  //     if (result) {
  //       res.status(200).send(SendResponse(true,"data updated",result))

  //     } else {
  //       res.status(400).send(SendResponse(false,"not update",null))
  //     }
  //   } catch(err) {
  //     res.status(500).send(SendResponse(false, "internal server error", err));
  //   }
  // },

  add: async (req, res) => {
    try {
      let { name, passward, fee, price } = req.body;
      let obj = { name, passward, fee, price };
      let errorArray = [];

      if (!obj.name) {
        errorArray.push("required name");
      }

      if (!obj.passward) {
        errorArray.push("required passward");
      }

      if (errorArray.length > 0) {
        res
          .status(400)
          .send(SendResponse(false, "validation erroe", errorArray));
      } else {
        let Course = new CourseModel(obj);
        let result = await Course.save();

        res
          .status(200)
          .send(SendResponse(true, "data add successfully", result));
      }
    } catch (err) {
      res.status(500).send(SendResponse(false, "internal server error", err));
    }
  },

  del: async (req, res) => {
    try {
      let id = req.params.id;
      let result = await CourseModel.findByIdAndDelete(id);

      if (result) {
        res
          .status(200)
          .send(SendResponse(true, "Course deleted successfully", result));
      } else {
        res.status(400).send(SendResponse(true, "no data found", null));
      }
    } catch (err) {
      res.status(500).send(SendResponse(false, "internal server error", err));
    }
  },
};

module.exports = CourseControler;
