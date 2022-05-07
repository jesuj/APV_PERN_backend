import nodemailer from 'nodemailer';


const emailOlvidePassword = async ({email,nombre,token}) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.envEMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const info = await transport.sendMail({
        from: "APV - Administrador de Paciente de Veterinaria",
        to: email,
        subject: 'Reestablece tu Password',
        text: 'Reestablece tu Password',
        html: `<p>Hola ${nombre}, has solicitado reestablecer tu password.</p>
            <p>Sigue el siguiente enlace para generar un nuevo password
            <a href="${process.env.FONTEND_URL}/olvide-password/${token}">Reestablece Password</a> </p>
            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    })

    console.log('Mensaje enviado: %s',info.messageId)

}

export default emailOlvidePassword