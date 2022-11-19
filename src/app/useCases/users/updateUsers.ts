import { Request, Response } from "express";
import { User } from "../../models/User";

export async function updateUsers(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const { firstName, lastName, email, password, } = req.body;

        const user = await User.findByIdAndUpdate(id, { firstName, lastName, email, password });

        if (!user) {
            return res.status(404).json({
                status: "error",
                error: "User not found",
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'User updated successfully',
            data: req.body
        });
    } catch (error) {
        return res.sendStatus(500);
    }
}