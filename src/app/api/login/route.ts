import { NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: 'Email and password are required' },
                { status: 400 }
            );
        }

        dbConnect
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        if (!user.password) {
            return NextResponse.json(
                { message: 'Account not set up with password authentication' },
                { status: 401 }
            );
        }

        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            return NextResponse.json(
                { message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Create session
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { message: 'Failed to create session' },
                { status: 500 }
            );
        }

        const result = {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
        }

        return NextResponse.json({ success: true, result });

    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, error: error.message, message: 'Internal server error' }
        );
    }
}