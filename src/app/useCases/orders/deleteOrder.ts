import { Request, Response } from "express";
import { Order } from "../../models/Order";

export async function deleteOrder(req: Request, res: Response) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Missing order id' });
        }

        await Order.findByIdAndDelete(id);

        return res.status(200).json({ status: 'success', message: 'Order deleted' });

    } catch (error) {
        return res.sendStatus(500);
    }
}