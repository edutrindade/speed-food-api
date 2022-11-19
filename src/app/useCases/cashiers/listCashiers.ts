import { Request, Response } from "express";
import { Cashier } from "../../models/Cashier";

export async function listCashiers(req: Request, res: Response) {
    try {
        const cashiers = await Cashier.find();

        return res.status(200).json(cashiers);
    } catch (error) {
        return res.sendStatus(500);
    }
}