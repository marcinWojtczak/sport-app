import { db } from "@/app/lib/db";
import { signUpSchema } from "@/app/lib/types";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST (request: Request ) {
    try {
        const formData: unknown = await request.json()
       
        const result = signUpSchema.safeParse(formData)

        if (!result.success) {
            return NextResponse.json({ user: null, message: "Validation error" }, { status: 400 });
        }

        const { email, password, username } = result.data
        
        //check if email already exists
        const existsUserByEmail =  await db.user.findUnique({
            where: {
                email: email
            }
        });

        if(existsUserByEmail) {
            return NextResponse.json({ user: null, message: "User with this email already exists" }, { status: 409 })
        }

        //check if username already exists
        const existsUserByUserName =  await db.user.findUnique({
            where: {
                name: username
            }
        });

        if(existsUserByUserName) {
            return NextResponse.json({ user: null, message: "User with this username already exists" }, { status: 409 })
        }

        const hashPassword = await hash(password, 10)
        const newUser = await db.user.create({
            data: {
                name: username,
                password: hashPassword,
                email: email,
            }
        })

        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json({ user: rest, message: "User cretaed success"}, { status: 201 })
    } catch(error) {
         return NextResponse.json({ message: "Somethig went wrong"}, { status: 500 })
    }
}