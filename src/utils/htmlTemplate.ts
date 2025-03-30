
// import { MailPayload } from '../types/interviewTypes'

const bookingmail = (data: { name: string; otp: string }) => {
    return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation</title>
  </head>
  
  <body style="background-color: #f7fafc; font-family: Arial, sans-serif; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #d1d5db; padding: 24px;">
      <!-- Header -->
      <div style="background: #000000; text-align: center; padding: 25px 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px;">Hotel Booking Confirmation</h1>
      </div>
  
      <!-- Body Content -->
      <div style="padding: 32px 24px; text-align: center;">
        <p style="font-size: 18px; font-weight: 800; color: #000000;">Dear ${data.name},</p>
        <p style="font-size: 16px; color: #000000;">Thank you for choosing us! Your booking has been successfully confirmed.</p>
        
        <div style="background-color: #f8f9fa; border-radius: 8px; padding: 16px; margin: 24px 0; text-align: left;">
          <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">Booking Details</h3>
          <p style="font-size: 14px; margin: 8px 0;"><strong>Booking ID:</strong> [BOOKING_ID]</p>
          <p style="font-size: 14px; margin: 8px 0;"><strong>Check-in:</strong> [CHECKIN_DATE]</p>
          <p style="font-size: 14px; margin: 8px 0;"><strong>Check-out:</strong> [CHECKOUT_DATE]</p>
          <p style="font-size: 14px; margin: 8px 0;"><strong>Room Type:</strong> [ROOM_TYPE]</p>
          <p style="font-size: 14px; margin: 8px 0;"><strong>Total Amount:</strong> [TOTAL_AMOUNT]</p>
        </div>
  
        <div style="background-color: #e6f7ff; border-left: 4px solid #1890ff; padding: 12px; margin: 20px 0;">
          <p style="font-size: 14px; color: #000000; margin-bottom: 8px;">Your verification OTP for check-in:</p>
          <h2 style="font-size: 24px; font-weight: 700; color: #1890ff; margin: 8px 0;">${data.otp}</h2>
          <p style="font-size: 12px; color: #666;">Valid for 24 hours from now</p>
        </div>
  
        <p style="font-size: 14px; color: #000000;">We look forward to welcoming you! For any changes to your booking, please contact our reservations team.</p>
        
        <div style="margin-top: 32px;">
          <a href="${process.env.WEBSITE_URL_END_POINT}" 
             style="background-color: #000000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 600; display: inline-block;">
            View Booking Details
          </a>
        </div>
  
        <div style="margin-top: 24px; text-align: left;">
          <p style="font-size: 14px; font-weight: 400; color: #000000;">Best Regards,</p>
          <p style="font-size: 14px; font-weight: 700; color: #000000;">The Hotel Team</p>
        </div>
      </div>
  
      <!-- Footer -->
      <div style="border-top: 1px solid #e8e8e8; padding-top: 16px;">
        <p style="font-size: 12px; color: #666666; margin-top: 8px;">© ${new Date().getFullYear()} [Hotel Name]. All rights reserved.</p>
        <p style="font-size: 12px; color: #666666; margin-top: 8px;">
          <a href="${process.env.WEBSITE_URL_END_POINT}/privacy-policy" target="_blank" style="color: #666666; text-decoration: underline;">Privacy Policy</a> |
          <a href="${process.env.WEBSITE_URL_END_POINT}/terms" target="_blank" style="color: #666666; text-decoration: underline;">Terms of Service</a> |
          <a href="${process.env.WEBSITE_URL_END_POINT}/contact" target="_blank" style="color: #666666; text-decoration: underline;">Contact Us</a>
        </p>
      </div>
    </div>
  </body>
  
  </html>
    `;
  }

export default{
    bookingmail,
}