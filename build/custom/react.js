"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var handle_1 = require("./api/handle");
var config_1 = require("./config");
var app = express_1["default"]();
app.use(cors_1["default"]({ credentials: true, origin: true }));
app.get('/ping', function (_, res) {
    res.send('pong!');
});
app.all('/api/builder/handle', cors_1["default"](), function (req, res) {
    return handle_1.handleData(req, res);
});
app.listen(config_1.standaloneServerPort, function () {
    console.log("Server started at http://localhost:" + config_1.standaloneServerPort);
});
