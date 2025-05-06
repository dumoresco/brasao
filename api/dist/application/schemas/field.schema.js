"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.campoSchema = void 0;
const zod_1 = require("zod");
exports.campoSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    datatype: zod_1.z.enum(["STRING", "NUMBER", "BOOLEAN", "DATE"]),
});
