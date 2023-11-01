import { z } from "zod";

export const UserValidator = z.object({
    username: z.string().min(3).max(16).optional(),
    password: z.string().min(8).max(32),
    email: z.string().email(),
});