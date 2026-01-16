import { Response } from "express";
import prisma from "../utils/prisma";
import { AuthRequest } from "../middlewares/authMiddleware";

export const createRegistration = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { phone, address, additionalInfo } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const existing = await prisma.registration.findUnique({
      where: { userId },
    });
    if (existing) {
      return res.status(400).json({ message: "You have already registered" });
    }

    const registration = await prisma.registration.create({
      data: {
        userId,
        phone,
        address,
        additionalInfo,
      },
    });

    res.status(201).json({ message: "Registration successful", registration });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyRegistration = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const registration = await prisma.registration.findUnique({
      where: { userId },
    });

    if (!registration) {
      return res.status(404).json({ message: "No registration found" });
    }

    res.json({ registration });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
