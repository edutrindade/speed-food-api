import { Request, Response } from "express";
import { User } from "../../models/User";

export async function listUsers(req: Request, res: Response) {
    try {
        const users = await User.find();

        // Return users without password

        let result = users.map(user => {
            return {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                active: user.active,
            }
        });

        return res.status(200).json(result);
    } catch (error) {
        return res.sendStatus(500);
    }
}