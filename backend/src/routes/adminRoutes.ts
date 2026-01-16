import { Router } from "express";
import {
  getDashboardStats,
  getAllRegistrations,
  getAllDonations,
} from "../controllers/adminController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const router = Router();

router.get("/dashboard", authMiddleware, adminMiddleware, getDashboardStats);
router.get(
  "/registrations",
  authMiddleware,
  adminMiddleware,
  getAllRegistrations,
);
router.get("/donations", authMiddleware, adminMiddleware, getAllDonations);

export default router;
