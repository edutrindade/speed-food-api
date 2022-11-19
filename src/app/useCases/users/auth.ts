import { Request, Response } from "express";
import { User } from "../../models/User";
import bcrypt from "bcrypt";

export async function auth(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        if (!email || email.length === 0) {
            return res.sendStatus(400).json({
                status: "error",
                error: "E-mail is required",
            });
        }

        if (!password || password.length === 0) {
            return res.status(400).json({
                status: "error",
                error: "Password is required",
            });
        }

        const user = await User.findOne({ email });

        console.log('user found', user);

        if (!user) {
            return res.status(404).json({
                status: "error",
                error: "User not found",
            });
        }

        if (await bcrypt.compare(password, user.password)) {
            return res.status(200).json({
                status: "success",
                message: "User authenticated",
                data: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                    active: user.active,
                },
            });
        } else {
            return res.status(401).json({
                status: "error",
                error: "Invalid e-mail or password",
            });
        }
    } catch (error) {
        return res.status(500);
    }
}