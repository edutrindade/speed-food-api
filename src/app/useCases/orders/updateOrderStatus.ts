import { Request, Response } from "express";
import { Order } from "../../models/Order";

export async function updateOrderStatus(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status))
            return res.status(400).json({ error: 'Status should be one of these: WAITING, IN_PRODUCTION, DONE' });

        const order = await Order.findByIdAndUpdate(id, { status });

        if (!order) {
            return res.sendStatus(404);
        }

        return res.status(200).json({
            status: 'success',
            message: 'Status updated successfully',
            data: status
        });
    } catch (error) {
        return res.sendStatus(500);
    }
}