import { Request, Response } from "express";
import { Order } from "../../models/Order";

export async function updateOrder(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const { table, products, status } = req.body;

        if (status === "DONE")
            return res.status(400).json({ error: "You can't update a DONE order" });

        let total: Number = products.reduce((total: Number, product: any) => {
            return Number(total) + Number(product.quantity) * Number(product.price);
        }, 0);

        const order = await Order.findByIdAndUpdate(id, { table, products, total });

        if (!order) {
            return res.sendStatus(404);
        }

        return res.status(200).json({
            status: 'success',
            message: 'Order updated successfully',
            data: order
        });
    } catch (error) {
        return res.sendStatus(500);
    }
}