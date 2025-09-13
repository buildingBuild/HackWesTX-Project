import nodemailer from 'nodemailer'



let currentDate = new Date();
export default async function sendMail_analytics(userName, userEmail, Responses) {

    let userName = "Tamed"
    try {
        const transporter = nodemailer.createTransport(
            {

                secure: true,
                host: 'smtp.gmail.com',
                port: 465,
                auth: {
                    user: 'analytics.livelecture@gmail.com',
                    pass: 'dzrh zugu nkip hsjz'
                }

            }
        );
        await transporter.verify();

        let info = await transporter.sendMail({
            to: "solomonunwuchola@gmail.com" || userEmail,
            subject: "Lecture Feedback",
            text: `Hey ${userName} here are your analytics for your lecture class today ${currentDate}`,

        })
        console.log("Sent", info.messageId)

    }
    catch (err) {
        console.error(err)
    }






}



