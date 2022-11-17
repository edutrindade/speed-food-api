import { Request, Response } from "express";
import { Order } from "../../models/Order";

export async function updateOrder(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const { table, products, status } = req.body;

        if (status === "DONE")
            return res.status(400).json({ error: "You can't update a DONE order" });

        const order = await Order.findByIdAndUpdate(id, { table, products });

        if (!order) {
            return res.sendStatus(404);
        }

        return res.status(200).json({
            status: 'success',
            message: 'Order updated successfully',
            data: req.body
        });
    } catch (error) {
        return res.sendStatus(500);
    }
}