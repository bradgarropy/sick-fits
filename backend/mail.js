const nodemailer = require("nodemailer")

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "07598ae6e39d14",
        pass: "865adc052055bd",
    },
})

const createEmail = text => `
    <div
        className="email"
        style="
            border: 1px solid black;
            padding: 20px;
            font-family: sans-serif;
            line-height: 2;
            font-size: 20px;"
    >
        <h2>Hello There!</h2>
        <p>${text}</p>
        <p>😘 Sick Fits</p>
    </div>
`

module.exports = {transport, createEmail}
