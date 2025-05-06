"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routeAdapter_1 = require("./adapters/routeAdapter");
const makeCreateFieldController_1 = require("../factories/makeCreateFieldController");
const makeListFieldsController_1 = require("../factories/makeListFieldsController");
const cors_1 = __importDefault(require("cors"));
const makeCreateFillerController_1 = require("../factories/makeCreateFillerController");
const makeListFillerController_1 = require("../factories/makeListFillerController");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const router = express_1.default.Router();
router.post("/campos", (0, routeAdapter_1.routeAdapter)((0, makeCreateFieldController_1.makeCreateFieldController)()));
router.get("/campos", (0, routeAdapter_1.routeAdapter)((0, makeListFieldsController_1.makeListFieldsController)()));
router.post("/preenchimentos", (0, routeAdapter_1.routeAdapter)((0, makeCreateFillerController_1.makeCreateFillerController)()));
router.get("/preenchimentos", (0, routeAdapter_1.routeAdapter)((0, makeListFillerController_1.makeListFillersController)()));
router.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use(router);
app.listen(8000, () => {
    console.log(`Server is running on port 8000`);
});
