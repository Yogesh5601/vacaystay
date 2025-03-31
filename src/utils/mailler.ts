// import nodemailer from 'nodemailer';
// import { bookingmail } from './htmlTemplate';

// // Create a transporter object using SMTP
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST, // e.g., 'smtp.gmail.com'
//   port: process.env.SMTP_PORT || 587,
//   secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASSWORD,
//   },
// });

// /**
//  * Send an email using SMTP
//  * @param {Object} options - Email options
//  * @param {string} options.to - Recipient email address
//  * @param {string} options.subject - Email subject
//  * @param {string} options.text - Plain text body
//  * @param {string} [options.html] - HTML body (optional)
//  * @returns {Promise} Promise that resolves when email is sent
//  */
// export async function sendMail({ to, subject, text, html }) {
//   try {
//     const mailOptions = {
//       from: process.env.SMTP_FROM || process.env.SMTP_USER,
//       to,
//       subject,
//       text,
//       html,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log('Message sent: %s', info.messageId);
//     return info;
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw error;
//   }
// }


// export const sendBookingConfirmationEmail = async (data: any): Promise<any> => {
//   try {
//     const response = await transporter.sendMail({
//       from: "willenyogi2020@gmail.com",
//       to: data.to,
//       subject: data.subject || `Booking Confirmation`,
//       html: bookingmail(data.bookingData),
//     });

//     console.log(response, "Email sent successfully");
//     return response; // Return the response in success case
//   } catch (error) {
//     console.error("Error sending booking confirmation email:", error);
//     throw error; 
//   }
// };


// interface BookingEmailData {
//   to: string;
//   subject?: string;
//   bookingData: {
//     propertyTitle: string;
//     propertyImage: string;
//     checkInDate: string;
//     checkOutDate: string;
//     total: string;
//     bookingId: string;
//     paymentId: string;
//     travelerDetails: any;
//   };
// }

export const sendBookingConfirmationEmail = async (data: any): Promise<any> => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: data.to,
        subject: data.subject,
        bookingData: data.bookingData
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    const result = await response.json();
    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
    throw error;
  }
};