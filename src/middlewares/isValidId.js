import { isValidObjectId } from "mongoose";

import notFoundHandler from "./notFoundHandler.js";

export const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(notFoundHandler(404, "Not found"));
  }

  next();
};
