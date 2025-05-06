"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preenchimentoSchema = void 0;
const zod_1 = require("zod");
exports.preenchimentoSchema = zod_1.z.object({
    value: zod_1.z.union([zod_1.z.string(), zod_1.z.number(), zod_1.z.boolean(), zod_1.z.date()]),
    fieldId: zod_1.z.string().uuid(),
});
