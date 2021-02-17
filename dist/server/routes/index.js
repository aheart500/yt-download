"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var errorHandler_1 = require("../middlewares/errorHandler");
var youtube_1 = __importDefault(require("./youtube"));
var route = express_1.Router();
route.use("/youtube", youtube_1.default);
route.use(errorHandler_1.errorHandler);
exports.default = route;
