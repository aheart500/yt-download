import { Router } from "express";
import ytdl, { chooseFormat } from "ytdl-core";
import { verifyURL } from "../middlewares/youtube";
import { formatVideoData } from "../utils/youtube";
import fs from "fs";
import path from "path";
import { CustomFormat } from "../../types";
const route = Router();
const filesPath = path.join(__dirname, "..", "downloads");
fs.exists(filesPath, (exists) => {
  !exists && fs.mkdir(filesPath, (er) => console.log(er));
});
route.get("/meta", verifyURL, async (req, res, next) => {
  const yt_link = req.query.videolink as string;

  try {
    const linkMetaData = await ytdl.getBasicInfo(yt_link);
    res.send({ formattedResponse: formatVideoData(linkMetaData) });
  } catch (e) {
    next(e);
  }
});

route.get("/info", verifyURL, async (req, res, next) => {
  const yt_link = req.query.videolink as string;
  console.log("Getting Data");
  try {
    const linkMetaData = await ytdl.getInfo(yt_link);
    res.send({ formattedResponse: formatVideoData(linkMetaData), ytdlResponse: linkMetaData });
  } catch (e) {
    next(e);
  }
});

route.get("/download", async (req, res, next) => {
  const { itag, yt_link } = req.query as any;

  const vidInfo = await ytdl.getInfo(yt_link);
  const chosenFormat = vidInfo.formats.find((format) => format.itag === parseInt(itag));
  const filename = `${vidInfo.videoDetails.title}.${chosenFormat.container}`;
  const filePath = path.join(filesPath, filename);

  if (vidInfo && chosenFormat) {
    res.setHeader("Content-Length", chosenFormat.contentLength);
    ytdl
      .downloadFromInfo(vidInfo, { filter: (format) => format.itag === parseInt(itag) })
      .on("data", (chunck) => {
        res.write(chunck);
      })
      .on("end", () => {
        res.end();
      });
  }
});
export default route;
