//* Se llama network y no routes porque cada uno tendra su js de ruta, nombre routes esta deprecated
import { Router } from "express";
import * as controller from "./controller";
/* import {
  deleteUser,
  getIndex,
  getUserId,
  postLogin,
  postPassword,
  postSignUp,
  putUser,
} from "./controller.js"; */

const router = Router();

//rutas
router.route("/").get(controller.index);
router.route("/store").post(controller.store);
router.route("/update/:id").put(controller.upsert);
router.route("/delete/:id").delete(controller.destroy);

export default router;
