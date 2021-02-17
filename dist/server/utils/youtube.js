"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatVideoData = exports.isValidURL = void 0;
var isValidURL = function (str) {
    var pattern = new RegExp("^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$", "i");
    return !!pattern.test(str);
};
exports.isValidURL = isValidURL;
var formatVideoData = function (data) {
    var _a;
    var videoDetails = data.videoDetails, formats = data.formats;
    var resonseFormatted = {
        title: videoDetails.title,
        description: videoDetails.description,
        length: videoDetails.lengthSeconds,
        url: videoDetails.video_url,
        author: {
            name: videoDetails.author.name,
            url: videoDetails.ownerProfileUrl || videoDetails.author.user_url,
            thumbnails: (_a = videoDetails.author.thumbnails) === null || _a === void 0 ? void 0 : _a.map(function (thumb) { return thumb.url; }),
        },
        viewers: videoDetails.viewCount,
        likes: videoDetails.likes,
        dislikes: videoDetails.dislikes,
        thumbnails: videoDetails.thumbnails.map(function (thumb) { return thumb.url; }),
        formats: formats.map(function (format) {
            var type = format.mimeType
                ? format.mimeType.startsWith("video")
                    ? "video"
                    : format.mimeType.startsWith("audio")
                        ? "audio"
                        : undefined
                : undefined;
            return __assign(__assign({}, format), { type: type, itag: format.itag, hasVidoe: format.hasVideo, hasAudio: format.hasAudio, mimeType: format.mimeType, quality: format.qualityLabel, audioQuality: format.audioQuality, url: format.url });
        }),
    };
    return resonseFormatted;
};
exports.formatVideoData = formatVideoData;
