import { Router } from "express";
import {
  initiateDonation,
  updateDonationStatus,
  getMyDonations,
  paymentReturn,
  paymentCancel,
  paymentNotify,
} from "../controllers/donationController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/initiate", authMiddleware, initiateDonation);
router.post("/callback", updateDonationStatus);
router.post("/notify", paymentNotify);
router.get("/return", paymentReturn);
router.get("/cancel", paymentCancel);
router.get("/me", authMiddleware, getMyDonations);

export default router;
