"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.isNextJs = exports.readdirRecursive = exports.zip = exports.exists = exports.getJson = exports.formParse = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var formParse = function (form, req) {
    return new Promise(function (resolve, reject) {
        form.parse(req, function (err, _, files) {
            if (err)
                return reject(err);
            resolve(files);
        });
    });
};
exports.formParse = formParse;
var getJson = function (req) {
    return new Promise(function (resolve) {
        if (!req.body) {
            var buffer_1 = '';
            req.on('data', function (chunk) {
                buffer_1 += chunk;
            });
            req.on('end', function () {
                var str = Buffer.from(buffer_1).toString();
                if (str && str.indexOf('{') > -1)
                    resolve(JSON.parse(str));
            });
        }
    });
};
exports.getJson = getJson;
var zip = function (rows) {
    return rows[0].map(function (_, c) { return rows.map(function (row) { return row[c]; }); });
};
exports.zip = zip;
var exists = function (s) {
    return fs_1["default"].promises
        .access(s)
        .then(function () { return true; })["catch"](function () { return false; });
};
exports.exists = exists;
var readdirRecursive = function (folder, files) {
    if (files === void 0) { files = []; }
    fs_1["default"].readdirSync(folder).forEach(function (file) {
        var pathAbsolute = path_1["default"].join(folder, file);
        if (fs_1["default"].statSync(pathAbsolute).isDirectory()) {
            readdirRecursive(pathAbsolute, files);
        }
        else {
            files.push(pathAbsolute);
        }
    });
    return files;
};
exports.readdirRecursive = readdirRecursive;
var isNextJs = path_1["default"].parse(process.argv[1]).base === 'next';
exports.isNextJs = isNextJs;
