import { Request, Response } from "express";
import { Product } from "../../models/Product";

export async function updateProduct(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const { name, description, price, category, ingredients, active } = req.body;
        const imagePath = req?.file?.filename;

        const product = await Product.findByIdAndUpdate(id, {
            name,
            description,
            price,
            category,
            ingredients,
            imagePath,
            active
        });

        if (!product) {
            return res.sendStatus(404);
        }

        return res.status(200).json({
            status: 'success',
            message: 'Product updated successfully',
            data: req.body
        });
    } catch (error) {
        return res.sendStatus(500);
    }
}