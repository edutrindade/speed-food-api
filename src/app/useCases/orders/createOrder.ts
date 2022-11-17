import { Request, Response } from "express";
import { Order } from "../../models/Order";

export async function createOrder(req: Request, res: Response) {
    try {
        const { table, products } = req.body;

        if (!table) {
            return res.sendStatus(400).json({
                status: "error",
                error: "Table is required",
            });
        }

        if (!products) {
            return res.sendStatus(400).json({
                status: "error",
                error: "Products are required",
            });
        }

        const order = await Order.create({ table, products });

        return res.status(201).json(order);
    } catch (error) {
        return res.sendStatus(500);
    }
}