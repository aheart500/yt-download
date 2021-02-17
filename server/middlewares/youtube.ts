import { RequestHandler } from "express";
import { isValidURL } from "../utils/youtube";
export const verifyURL: RequestHandler = (req, res, next) => {
  const yt_link = req.query.videolink as string;

  if (!yt_link) {
    return res.status(401).send("No URL provided");
  }
  if (!isValidURL(yt_link)) {
    return res.status(401).send("Provided URL is not valid");
  }
  next();
};
