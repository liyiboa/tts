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
Object.defineProperty(exports, "__esModule", { value: true });
const edge_1 = require("../service/edge");
module.exports = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    console.debug(`请求正文：${request.body}`);
    let token = process.env.TOKEN;
    if (token) {
        let authorization = request.headers['authorization'];
        if (authorization != `Bearer ${token}`) {
            console.error('无效的TOKEN');
            response.status(401).json('无效的TOKEN');
            return;
        }
    }
    try {
        let format = request.headers['format'] || 'audio-16khz-32kbitrate-mono-mp3';
        if (Array.isArray(format)) {
            throw `无效的音频格式：${format}`;
        }
        if (!edge_1.FORMAT_CONTENT_TYPE.has(format)) {
            throw `无效的音频格式：${format}`;
        }
        let ssml = request.body;
        if (ssml == null) {
            throw `转换参数无效`;
        }
        let result = yield edge_1.service.convert(ssml, format);
        response.sendDate = true;
        response
            .status(200)
            .setHeader('Content-Type', edge_1.FORMAT_CONTENT_TYPE.get(format));
        response.end(result);
    }
    catch (error) {
        console.error('发生错误', error);
        response.status(503).json(error);
    }
});
//# sourceMappingURL=ra.js.map