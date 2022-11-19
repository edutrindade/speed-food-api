import { Request, Response } from "express";
import { User } from "../../models/User";

export async function deleteUser(req: Request, res: Response) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Missing category id' });
        }

        await User.findByIdAndDelete(id);

        return res.status(200).json({ status: 'success', message: 'User deleted' });

    } catch (error) {
        return res.sendStatus(500);
    }
}