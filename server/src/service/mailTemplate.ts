export const mailTemplate = (
    title: string, 
    contentHTML: string, 
    buttonLink: string, 
    buttonText: string
): string => {
    // Definimos as cores e variáveis base para replicar o estilo
    const HEADER_FOOTER_BG = '#f8f9fa'; // Cor de fundo cinza claro
    const PRIMARY_COLOR = '#007bff'; // Azul para o botão (exemplo)

    return `
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <!-- Estilos essenciais para e-mail -->
    <style>
        /* Reset e Fontes */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        body { margin: 0; padding: 0 !important; background-color: #f4f4f4; }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px 0;
        }
        .header, .footer {
            background-color: ${HEADER_FOOTER_BG};
            padding: 15px 20px;
            text-align: center;
        }
        .content {
            padding: 30px 20px;
            background-color: #ffffff;
            border: 1px solid #eeeeee;
        }
        .button {
            display: inline-block;
            padding: 12px 25px;
            background-color: ${PRIMARY_COLOR};
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            font-size: 16px;
        }
        /* Responsividade (uso limitado em e-mail) */
        @media screen and (max-width: 600px) {
            .content-table { width: 100% !important; max-width: 100% !important; }
        }
    </style>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">

    <!-- Estrutura principal com largura máxima -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" style="min-width: 320px;">
        <tr>
            <td align="center" style="padding: 20px 10px;">
                <!-- Container de 600px (o email em si) -->
                <table border="0" cellpadding="0" cellspacing="0" width="600" class="content-table" style="max-width: 600px; border-collapse: separate; border-spacing: 0;">

                    <!-- CABEÇALHO -->
                    <tr>
                        <td class="header" style="background-color: ${HEADER_FOOTER_BG}; padding: 15px 20px; text-align: center; border-radius: 8px 8px 0 0;">
                            <h1 style="color: #333333; font-size: 20px; margin: 0; font-weight: normal;">
                                ${title}
                            </h1>
                        </td>
                    </tr>

                    <!-- CONTEÚDO -->
                    <tr>
                        <td class="content" style="padding: 30px 20px; background-color: #ffffff; border: 1px solid #eeeeee; border-top: none; color: #555555; font-size: 16px; line-height: 24px;">
                            <!-- HTML dinâmico passado na função -->
                            ${contentHTML}

                            <!-- Botão de Ação -->
                            <p style="text-align: center; margin: 40px 0;">
                                <a href="${buttonLink}" target="_blank" class="button"
                                   style="display: inline-block; padding: 12px 25px; background-color: ${PRIMARY_COLOR}; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;">
                                    ${buttonText}
                                </a>
                            </p>

                            <!-- Saudação Final -->
                            <p style="margin-top: 30px;">
                                Atenciosamente,<br>
                                Sua Equipe
                            </p>
                        </td>
                    </tr>

                    <!-- RODAPÉ -->
                    <tr>
                        <td class="footer" style="background-color: ${HEADER_FOOTER_BG}; padding: 10px 20px; text-align: center; border-radius: 0 0 8px 8px;">
                            <p style="color: #999999; font-size: 12px; margin: 0;">
                                Este é um e-mail automático. &copy; 2025
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>
`;
};