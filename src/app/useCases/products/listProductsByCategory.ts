import { Request, Response } from "express";
import { Product } from "../../models/Product";

export async function listProductsByCategory(req: Request, res: Response) {
    try {
        const products = await Product.find({ category: req.params.categoryId });

        return res.status(200).json(products);
    } catch (error) {
        return res.sendStatus(500);
    }
}