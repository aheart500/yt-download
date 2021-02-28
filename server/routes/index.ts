import { Router } from "express";
import { errorHandler } from "../middlewares/errorHandler";
import YoutubeController from "./youtube";
import FacebookController from "./facebook";
const route = Router();

route.use("/youtube", YoutubeController);
route.use("/facebook", FacebookController);

route.use(errorHandler as any);
export default route;
