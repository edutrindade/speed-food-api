import { Request, Response } from "express";
import { Category } from "../../models/Category";

export async function createCategory(req: Request, res: Response) {
    try {
        const { name, icon } = req.body;

        if (!name) {
            return res.sendStatus(400).json({
                status: "error",
                error: "Name is required",
            });
        }

        if (!icon) {
            return res.sendStatus(400).json({
                status: "error",
                error: "Icon is required",
            });
        }

        const category = await Category.create({ name, icon });

        return res.status(201).json(category);
    } catch (error) {
        return res.sendStatus(500);
    }
}