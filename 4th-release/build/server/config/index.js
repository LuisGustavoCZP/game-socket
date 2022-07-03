"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ports = exports.certs = void 0;
const certs_1 = __importDefault(require("./certs"));
exports.certs = certs_1.default;
const ports = {
    http: 3000,
    https: 3001
};
exports.ports = ports;
