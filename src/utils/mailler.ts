

import htmlTemplate from './htmlTemplate'
import nodemailer from 'nodemailer'

const { SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD, SMTP_EMAIL } = process.env

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: false,
    auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})

export const forgetPassWordOtpLink = async (email: string, data: { name: string; otp: string }) => {
    if (!email || !data) {
        throw new Error('Email or data is missing in forgetPassWordOtpLink')
    }

    return transporter.sendMail({
        from: SMTP_EMAIL,
        to: email,
        subject: `[Fleet] Password Reset Request - ${new Date().toLocaleDateString()}`,
        html: htmlTemplate.bookingmail(data)
    })
}

