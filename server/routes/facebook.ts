import { Router } from "express";
import axios from "axios";
import { parse } from "node-html-parser";

const route = Router();

route.get("/meta", async (req, res, next) => {
  const fb_link = req.query.videolink as string;

  axios
    .post("https://fbdown.net/download.php", "URLz=" + fb_link)
    .then((resp) => {
      const page = parse(resp.data);
      const sdLink = page.querySelector("#sdlink").attributes.href;
      const hdLink = page.querySelector("#hdlink").attributes.href;
      const pic = page.querySelector(".lib-img-show");
      const picLink = pic.attributes.src;
      const duration = pic.parentNode.innerText;

      res.send({
        sdLink,
        hdLink,
        picLink,
        duration,
      });
    })
    .catch((e) => {
      console.log(e);
    });
});

export default route;
