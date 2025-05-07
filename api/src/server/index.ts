import express from "express";

import { routeAdapter } from "./adapters/routeAdapter";

import { makeCreateFieldController } from "../factories/makeCreateFieldController";
import { makeListFieldsController } from "../factories/makeListFieldsController";

import cors from "cors";
import { makeCreateFillerController } from "../factories/makeCreateFillerController";
import { makeListFillersController } from "../factories/makeListFillerController";

const app = express();

app.use(express.json());
app.use(cors());

const router = express.Router();

router.post("/campos", routeAdapter(makeCreateFieldController()));
router.get("/campos", routeAdapter(makeListFieldsController()));

router.post("/preenchimentos", routeAdapter(makeCreateFillerController()));
router.get("/preenchimentos", routeAdapter(makeListFillersController()));

router.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(router);

app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});
