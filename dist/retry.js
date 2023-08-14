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
exports.retry = void 0;
const retry = function (fn, times, errorFn, failedMessage) {
    return __awaiter(this, void 0, void 0, function* () {
        let reason = {
            message: failedMessage !== null && failedMessage !== void 0 ? failedMessage : '多次尝试后失败',
            errors: [],
        };
        for (let i = 0; i < times; i++) {
            try {
                return yield fn();
            }
            catch (error) {
                if (errorFn) {
                    errorFn(i, error);
                }
                reason.errors.push(error);
            }
        }
        throw reason;
    });
};
exports.retry = retry;
//# sourceMappingURL=retry.js.map