import { Router } from "express";
import { errorHandler } from "../middlewares/errorHandler";
import YoutubeController from "./youtube";

const route = Router();

route.use("/youtube", YoutubeController);
route.use(errorHandler as any);
export default route;
