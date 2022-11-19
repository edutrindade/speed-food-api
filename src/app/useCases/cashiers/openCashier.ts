import { Request, Response } from "express";
import { Cashier } from "../../models/Cashier";

export async function openCashier(req: Request, res: Response) {
    try {
        const { openValue, user } = req.body;

        if (!openValue) {
            return res.status(400).json({
                status: "error",
                error: "Open value is required",
            });
        }

        if (!user) {
            return res.status(400).json({
                status: "error",
                error: "User is required",
            });
        }

        const cashier = await Cashier.create({
            openValue,
            user,
        });

        return res.status(201).json(cashier);
    } catch (error) {
        return res.sendStatus(500);
    }
}