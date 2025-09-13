import nodemailer from 'nodemailer'


let currentDate = new Date();
const ai = new GoogleGenAI({
    apikey: process.env.AI_API_KEY
});


async function main() {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "You are giving a lecturer/professor analytics from there lecture I will provide you with the relevant info. Create a summary from it.",
    });
    console.log(response.text);
}

main();

async function sendMail_analytics(userName, userEmail, Responses) {


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
            text: `Hey ${'tamed' || userName} here are your analytics for your lecture class today ${currentDate}`,

        })
        console.log("Sent", info.messageId)

    }
    catch (err) {
        console.error(err)
    }







}

export { sendMail_analytics }


