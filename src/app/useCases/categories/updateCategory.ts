import { Request, Response } from "express";
import { Category } from "../../models/Category";

export async function updateCategory(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const { name, icon } = req.body;

        const category = await Category.findByIdAndUpdate(id, { name, icon });

        if (!category) {
            return res.sendStatus(404);
        }

        return res.status(200).json({
            status: 'success',
            message: 'Category updated successfully',
            data: req.body
        });
    } catch (error) {
        return res.sendStatus(500);
    }
}