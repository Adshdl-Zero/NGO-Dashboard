import { Router } from "express";
import {
  createRegistration,
  getMyRegistration,
} from "../controllers/registrationController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createRegistration);
router.get("/me", authMiddleware, getMyRegistration);

export default router;
