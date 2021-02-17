"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var errorHandler = function (error, req, res, next) {
    var _a;
    console.error(error.message);
    console.error((_a = error.response) === null || _a === void 0 ? void 0 : _a.body);
    next(error);
};
exports.errorHandler = errorHandler;
