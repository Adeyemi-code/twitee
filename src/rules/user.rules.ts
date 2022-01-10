import { check } from "express-validator";
// import Helper from "../Helpers/Helper";

export const userRules = {
  forLogin: [
    check("email").isEmail().withMessage("Invalid email format"),
    check("password").not().isEmpty().withMessage("password field is required"),
  ],
};
