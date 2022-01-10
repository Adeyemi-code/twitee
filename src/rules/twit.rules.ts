import { check } from "express-validator";

export const twitRules = {
  forTwits: [
    check("twit")
      .not()
      .isEmpty()
      .withMessage("twit field is required")
      .isLength({ min: 1, max: 128 }),
  ],
  forComment: [
    check("comment")
      .not()
      .isEmpty()
      .withMessage("comment field is required")
      .isLength({ min: 1, max: 128 }),
  ],
};
