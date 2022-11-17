import { Request, Response } from "express";
import { Category } from "../../models/Category";

export async function deleteCategory(req: Request, res: Response) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Missing category id' });
        }

        await Category.findByIdAndDelete(id);

        return res.status(200).json({ status: 'success', message: 'Category deleted' });

    } catch (error) {
        return res.sendStatus(500);
    }
}