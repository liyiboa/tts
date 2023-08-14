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
const js_base64_1 = require("js-base64");
const edge_1 = require("../service/edge");
module.exports = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    let ttsdata = request.query['data'].toString();
    let ttsdatastr = (_a = (0, js_base64_1.decode)(decodeURIComponent(ttsdata))) !== null && _a !== void 0 ? _a : '';
    let ttsarr = (_b = JSON.parse(ttsdatastr)) !== null && _b !== void 0 ? _b : {};
    let api = (_c = decodeURIComponent(ttsarr['url'])) !== null && _c !== void 0 ? _c : '';
    let apitype = (_d = ttsarr['type']) !== null && _d !== void 0 ? _d : 'ra';
    let token = (_e = ttsarr['token']) !== null && _e !== void 0 ? _e : '';
    const alldata = [];
    ttsarr['ttsdata'].forEach(item => {
        var _a, _b, _c, _d, _e;
        let name = (_a = decodeURIComponent(item['name'])) !== null && _a !== void 0 ? _a : '大声朗读';
        let voiceName = (_b = item['voiceName']) !== null && _b !== void 0 ? _b : 'zh-CN-XiaoxiaoNeural';
        let voiceFormat = (_c = item['voiceFormat']) !== null && _c !== void 0 ? _c : 'audio-16khz-32kbitrate-mono-mp3';
        let styleName = item['styleName'];
        let styleDegree = (_d = item['styleDegree']) !== null && _d !== void 0 ? _d : 1.00;
        let speakSpeed = (_e = item['speakSpeed']) !== null && _e !== void 0 ? _e : 25;
        let langstrstar = '';
        let langstrend = '';
        if (Array.isArray(item['SecondaryLocaleList'])) {
            item['SecondaryLocaleList'].forEach(localitem => {
                if (localitem == "zh-CN" || localitem == "zh-HK" || localitem == "zh-TW") {
                    langstrstar = '<lang xml:lang="zh-CN">';
                    langstrend = '</lang>';
                    return;
                }
            });
        }
        if (Array.isArray(voiceFormat)) {
            throw `Invalid format ${voiceFormat}`;
        }
        if (!edge_1.FORMAT_CONTENT_TYPE.has(voiceFormat)) {
            throw `Invalid format ${voiceFormat}`;
        }
        const data = {};
        data['name'] = name == '' ? 'TTS' : name;
        data['concurrentRate'] = '1';
        data['contentType'] = edge_1.FORMAT_CONTENT_TYPE.get(voiceFormat);
        data['id'] = Date.now();
        data['loginCheckJs'] = '';
        data['loginUi'] = '';
        data['loginUrl'] = '';
        let header = {
            'Content-Type': 'text/plain',
            Authorization: 'Bearer ' + token,
            Format: voiceFormat,
        };
        data['header'] = JSON.stringify(header);
        let ssml = '<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-US">' +
            `<voice name="${voiceName}">` +
            (styleName
                ? `<mstts:express-as style="${styleName}" styledegree="${styleDegree}">`
                : ``) +
            '<prosody rate="{{speakSpeed + ' + speakSpeed + '}}%" pitch="+0Hz" volume="+100%">' + langstrstar +
            "{{String(speakText).replace(/&/g, '&amp;').replace(/\"/g, '&quot;').replace(/'/g, '&apos;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}}" + langstrend +
            '</prosody>' +
            (styleName ? ` </mstts:express-as>` : ``) +
            '</voice>' +
            '</speak>';
        let body = {
            method: 'POST',
            body: ssml,
        };
        data['url'] = api + '/api/' + apitype + ',' + JSON.stringify(body);
        alldata.push(data);
    });
    response.status(200).json(alldata);
});
//# sourceMappingURL=legado.js.map