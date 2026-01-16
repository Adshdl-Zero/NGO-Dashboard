import { Router } from "express";
import {
  initiateDonation,
  updateDonationStatus,
  getMyDonations,
} from "../controllers/donationController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/initiate", authMiddleware, initiateDonation);
router.post("/callback", updateDonationStatus); // mock gateway callback
router.get("/me", authMiddleware, getMyDonations);

export default router;
