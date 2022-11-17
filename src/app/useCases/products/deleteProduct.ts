import { Request, Response } from "express";
import { Product } from "../../models/Product";

export async function deleteProduct(req: Request, res: Response) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Missing product id' });
        }

        await Product.findByIdAndDelete(id);

        return res.status(200).json({ status: 'success', message: 'Product deleted' });

    } catch (error) {
        return res.sendStatus(500);
    }
}