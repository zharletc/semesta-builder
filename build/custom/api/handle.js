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
exports.__esModule = true;
exports.config = exports.handleData = exports.updateData = exports.loadData = exports.uploadFiles = void 0;
var utils_1 = require("../utils");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var formidable_1 = require("formidable");
var development = process.env.NODE_ENV !== 'production';
var rootPath = process.cwd();
var folderPath = 'data';
var uploadPath = 'uploaded';
var uploadFiles = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var form, uploadFolder, uploadFolderExists, files, urls;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                form = new formidable_1.IncomingForm({ uploadDir: uploadPath, keepExtensions: true });
                uploadFolder = path_1["default"].join('public', uploadPath);
                return [4 /*yield*/, utils_1.exists(uploadFolder)];
            case 1:
                uploadFolderExists = _a.sent();
                if (!!uploadFolderExists) return [3 /*break*/, 3];
                return [4 /*yield*/, fs_1["default"].promises.mkdir(uploadFolder)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                form.on('fileBegin', function (_, file) { return (file.path = path_1["default"].join('public', uploadPath, file.name)); });
                return [4 /*yield*/, utils_1.formParse(form, req)];
            case 4:
                files = _a.sent();
                urls = Object.values(files).map(function (f) { var _a; return path_1["default"].join(path_1["default"].sep, uploadPath, (_a = f.name) !== null && _a !== void 0 ? _a : ''); });
                return [2 /*return*/, urls];
        }
    });
}); };
exports.uploadFiles = uploadFiles;
var loadData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var basePath, folderExists, files, filesData, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                basePath = path_1["default"].join(rootPath, folderPath);
                return [4 /*yield*/, utils_1.exists(basePath)];
            case 1:
                folderExists = _a.sent();
                if (!folderExists)
                    return [2 /*return*/, []];
                files = utils_1.readdirRecursive(basePath);
                return [4 /*yield*/, Promise.all(files.map(function (f) { return fs_1["default"].promises.readFile(f); }))];
            case 2:
                filesData = _a.sent();
                data = utils_1.zip([files, filesData]).map(function (_a) {
                    var filename = _a[0], content = _a[1];
                    return ({
                        filename: filename.replace(basePath, ''),
                        content: content.toString()
                    });
                });
                return [2 /*return*/, data];
        }
    });
}); };
exports.loadData = loadData;
var updateData = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var basePath, fileExists, folderPathExists, folderExists;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                basePath = path_1["default"].join(rootPath, folderPath);
                return [4 /*yield*/, utils_1.exists(path_1["default"].join(basePath, body.path))];
            case 1:
                fileExists = _a.sent();
                if (!!fileExists) return [3 /*break*/, 6];
                folderPathExists = body.path.split(path_1["default"].sep).slice(0, -1).join(path_1["default"].sep);
                return [4 /*yield*/, utils_1.exists(path_1["default"].join(basePath, folderPathExists))];
            case 2:
                folderExists = _a.sent();
                if (!!folderExists) return [3 /*break*/, 4];
                return [4 /*yield*/, fs_1["default"].promises.mkdir(path_1["default"].join(basePath, folderPathExists), { recursive: true })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [4 /*yield*/, fs_1["default"].promises.writeFile(path_1["default"].join(basePath, body.path), '{}')];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [4 /*yield*/, fs_1["default"].promises.writeFile(path_1["default"].join(basePath, body.path), JSON.stringify(body.data))];
            case 7:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.updateData = updateData;
var handleData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contentType, isMultiPart, body, urls;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!development)
                    return [2 /*return*/, res.status(401).json({ error: 'Not allowed' })];
                if (!(req.method === 'GET')) return [3 /*break*/, 2];
                return [4 /*yield*/, loadData()];
            case 1:
                data = _a.sent();
                return [2 /*return*/, res.status(200).json(data)];
            case 2:
                if (!(req.method === 'POST')) return [3 /*break*/, 8];
                contentType = req.headers['content-type'];
                isMultiPart = contentType.startsWith('multipart/form-data');
                if (!!isMultiPart) return [3 /*break*/, 5];
                return [4 /*yield*/, utils_1.getJson(req)];
            case 3:
                body = _a.sent();
                return [4 /*yield*/, updateData(body)];
            case 4:
                _a.sent();
                return [2 /*return*/, res.status(200).json({})];
            case 5: return [4 /*yield*/, uploadFiles(req)];
            case 6:
                urls = _a.sent();
                return [2 /*return*/, res.status(200).json(urls)];
            case 7: return [3 /*break*/, 9];
            case 8: return [2 /*return*/, res.status(401).json({ error: 'Not allowed' })];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.handleData = handleData;
var config = { api: { bodyParser: false } };
exports.config = config;
