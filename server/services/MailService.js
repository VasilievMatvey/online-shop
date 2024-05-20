import nodemailer from "nodemailer";

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendOrderMailInfo(to, data) {
    try {
      const itemsListHTML = data.items
        .map(
          (item) =>
            `<li>${item.name}: количество ${item.quantity}: стоимость ${item.price} руб.</li>`
        )
        .join("");
      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Информация о заказе</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            text-align: center;
            color: #333;
        }

        h2 {
            color: #555;
        }

        p {
            margin: 10px 0;
        }

        ul {
            margin: 10px 0;
            padding: 0;
        }

        li {
            list-style: none;
        }

        .contact-details {
            margin-bottom: 20px;
        }

        .order-items {
            margin-top: 20px;
        }

        .order-item {
            margin-bottom: 10px;
        }

        .order-item-name {
            font-weight: bold;
        }

        .order-item-quantity {
            margin-left: 10px;
            color: #777;
        }

        .comment {
            font-style: italic;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Информация о заказе №${data.id}:</h1>
        <div class="contact-details">
            <h2>Контактная информация:</h2>
            <p><strong>Имя:</strong> <span id="name">${data.name}</span></p>
            <p><strong>Адресс доставки:</strong> <span id="address">${data.address}</span></p>
            <p class="comment"><strong>Коментарий:</strong> <span id="comment">${data.comment}</span></p>
        </div>
        <div class="order-items">
            <h2>Список покупок:</h2>
            <ul>
                ${itemsListHTML}
            </ul>
        </div>
    </div>
</body>
</html>
`;
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: `Информация о заказе №${data.id} `,
        html: htmlContent,
      });
      console.log("Email отправлен успешно");
    } catch (error) {
      console.error("Что-то пошло не так", error);
    }
  }
}

export default new MailService();
