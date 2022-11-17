import { Request, Response } from "express";
import { Order } from "../../models/Order";

export async function listOrders(req: Request, res: Response) {
    try {
        const orders = await Order.find()
            .sort({ createdAt: -1 }) // -1 = descending order or 1 = ascending order
            .populate('products.product');

        return res.status(200).json(orders);
    } catch (error) {
        return res.sendStatus(500);
    }
}