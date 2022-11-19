import { Request, Response } from "express";
import { Cashier } from "../../models/Cashier";

export async function closeCashier(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { closeDate, closeValue } = req.body;

        if (!closeDate) {
            return res.status(400).json({
                status: "error",
                error: "Close date is required",
            });
        }

        if (!closeValue) {
            return res.status(400).json({
                status: "error",
                error: "Close value is required",
            });
        }

        const cashier = await Cashier.findById(id);

        if (!cashier) {
            return res.status(404).json({
                status: "error",
                error: "Cashier not found",
            });
        }

        if (cashier.status === "CLOSED") {
            return res.status(400).json({
                status: "error",
                error: "Cashier already closed",
            });
        }

        cashier.closeDate = closeDate;
        cashier.closeValue = closeValue;
        cashier.status = "CLOSED";

        await cashier.save();

        return res.status(200).json({
            status: 'success',
            message: 'Cashier closed successfully',
            data: cashier
        });
    } catch (error) {
        return res.sendStatus(500);
    }
}