"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyURL = void 0;
var youtube_1 = require("../utils/youtube");
var verifyURL = function (req, res, next) {
    var yt_link = req.query.videolink;
    if (!yt_link) {
        return res.status(401).send("No URL provided");
    }
    if (!youtube_1.isValidURL(yt_link)) {
        return res.status(401).send("Provided URL is not valid");
    }
    next();
};
exports.verifyURL = verifyURL;
