import { Router } from "https://deno.land/x/oak/mod.ts";
import testController from "../controllers/testController.ts";

const router = new Router();

router
  .get("/", testController.connectionPool)

  
export default router;
