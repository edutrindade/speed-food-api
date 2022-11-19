import { Request, Response } from "express";
import { User } from "../../models/User";
import bcrypt from "bcrypt";

export async function createUser(req: Request, res: Response) {
    try {
        const { firstName, lastName, email, password, role } = req.body;

        if (!firstName) {
            return res.sendStatus(400).json({
                status: "error",
                error: "First name is required",
            });
        }

        if (!lastName) {
            return res.sendStatus(400).json({
                status: "error",
                error: "Last name is required",
            });
        }

        if (!email) {
            return res.sendStatus(400).json({
                status: "error",
                error: "E-mail is required",
            });
        }

        if (!['ADMIN', 'USER'].includes(role))
            return res.status(400).json({ error: 'Role should be one of these: ADMIN, USER' });

        if (!password) {
            return res.sendStatus(400).json({
                status: "error",
                error: "Password is required",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
        });

        return res.status(201).json(user);
    } catch (error) {
        return res.sendStatus(500);
    }
}