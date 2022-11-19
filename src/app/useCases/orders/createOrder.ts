import { Request, Response } from "express";
import { Order } from "../../models/Order";

export async function createOrder(req: Request, res: Response) {
    try {
        console.log("Create order");
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

        let total: Number = products.reduce((total: Number, product: any) => {
            return Number(total) + Number(product.quantity) * Number(product.price);
        }, 0);

        console.log('total', total);

        const order = await Order.create({ table, products, total });

        return res.status(201).json(order);
    } catch (error) {
        return res.status(500).json(error);
    }
}