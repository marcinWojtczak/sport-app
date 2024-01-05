import { z } from "zod"

export const signUpSchema = z.object({
    username: z
        .string()
        .min(2, { message: 'User name must be 2 or more characters long'}),
    email: z
        .string()
        .email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(8, { message: 'Password must be 8 or more characters long'}),
    confirmPassword: z
        .string()
        
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
});

export type TSignUpSchema = z.infer<typeof signUpSchema>


export const signInSchema = z.object({
    email: z
        .string()
        .email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(8, { message: 'Password must be 8 or more characters long' })
})

export type TSignInSchema = z.infer<typeof signInSchema>