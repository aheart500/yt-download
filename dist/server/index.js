"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var next_1 = __importDefault(require("next"));
var routes_1 = __importDefault(require("./routes"));
// Server Initialization
var dev = process.env.NODE_ENV !== "production";
var nextApp = next_1.default({ dev: dev });
var handle = nextApp.getRequestHandler();
var app = express_1.default();
nextApp
    .prepare()
    .then(function () {
    app.use(express_1.default.json());
    app.use("/api/downloads", express_1.default.static("dist/server/downloads"));
    app.use("/api", routes_1.default);
    console.log(__dirname);
    app.all("*", function (req, res) {
        return handle(req, res);
    });
    app.listen(3000, function () {
        console.log("App ready on port 3000");
    });
})
    .catch(function (exception) {
    console.error(exception.stack);
    process.exit(1);
});
