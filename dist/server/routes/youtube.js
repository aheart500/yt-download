"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ytdl_core_1 = __importDefault(require("ytdl-core"));
var youtube_1 = require("../middlewares/youtube");
var youtube_2 = require("../utils/youtube");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var route = express_1.Router();
var filesPath = path_1.default.join(__dirname, "..", "downloads");
fs_1.default.exists(filesPath, function (exists) {
    !exists && fs_1.default.mkdir(filesPath, function (er) { return console.log(er); });
});
route.get("/meta", youtube_1.verifyURL, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var yt_link, linkMetaData, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                yt_link = req.query.videolink;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, ytdl_core_1.default.getBasicInfo(yt_link)];
            case 2:
                linkMetaData = _a.sent();
                res.send({ formattedResponse: youtube_2.formatVideoData(linkMetaData) });
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                next(e_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
route.get("/info", youtube_1.verifyURL, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var yt_link, linkMetaData, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                yt_link = req.query.videolink;
                console.log("Getting Data");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, ytdl_core_1.default.getInfo(yt_link)];
            case 2:
                linkMetaData = _a.sent();
                res.send({ formattedResponse: youtube_2.formatVideoData(linkMetaData), ytdlResponse: linkMetaData });
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                next(e_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
route.get("/download", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, itag, yt_link, vidInfo, chosenFormat, filename, filePath;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, itag = _a.itag, yt_link = _a.yt_link;
                return [4 /*yield*/, ytdl_core_1.default.getInfo(yt_link)];
            case 1:
                vidInfo = _b.sent();
                chosenFormat = vidInfo.formats.find(function (format) { return format.itag === parseInt(itag); });
                filename = vidInfo.videoDetails.title + "." + chosenFormat.container;
                filePath = path_1.default.join(filesPath, filename);
                if (vidInfo && chosenFormat) {
                    res.setHeader("Content-Length", chosenFormat.contentLength);
                    ytdl_core_1.default
                        .downloadFromInfo(vidInfo, { filter: function (format) { return format.itag === parseInt(itag); } })
                        .on("data", function (chunck) {
                        res.write(chunck);
                    })
                        .on("end", function () {
                        res.end();
                    });
                }
                return [2 /*return*/];
        }
    });
}); });
exports.default = route;
