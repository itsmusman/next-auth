import { connect } from '@/dbConfig/dbCOnfig'
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer';


connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const { username, email, password } = reqBody;

        console.log(reqBody);

        // check if user already exist

        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // hash the password

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // create user into db

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        // Send verification email

        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })

        // now return response to user 

        return NextResponse.json({
            message: "User Created Successfully!",
            success: true,
            savedUser,
        });


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}