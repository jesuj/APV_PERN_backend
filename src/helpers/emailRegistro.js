import nodemailer from 'nodemailer';


const emailRegistro = async ({email,nombre,token}) => {
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
        subject: 'Comprueba tu cuenta con APV',
        text: 'Comprueba tu cuenta con APV',
        html: `<p>Hola ${nombre}, comprueba tu cuenta en APV.</p>
            <p>Tu cuenta ya esta lista, solo debes comprobarla en siguienta enlace
            <a href="${process.env.FONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a></p>
            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    })

    console.log('Mensaje enviado: %s',info.messageId)

}

export default emailRegistro