import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

export const sendEmail = (user, subject, body) => {
    const unsubscribeLink = `http://localhost:${process.env.PORT}/api/unsubscribe/${user._id}`;
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: user.email,
        subject,
        text: body.replace(/\[name\]/g, user.name).replace(/\[email\]/g, user.email).replace(/\[unsubscribe\]/g, unsubscribeLink)
    };

    return transporter.sendMail(mailOptions);
};

export default sendEmail;