import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';
import { bookingmail } from '@/utils/htmlTemplate';

// Configure transporter (same as your existing code)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { to, subject, bookingData } = await req.json();

    const response = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: to,
      subject: subject || 'Booking Confirmation',
      html: bookingmail(bookingData),
    });

    console.log('Email sent:', response.messageId);
    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}

// You can also add other HTTP methods if needed
// export async function GET() { ... }