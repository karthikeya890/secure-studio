import { prisma } from "../prismaClient";
import mjml2html from "mjml";
import { sendEmail } from "./emailService";
import Mustache from "mustache";

export const sendMail = async function (templateType: string, templateData: any, mailInfo: any) {
    try {
        // Fetch the required templates from the database
        const content = await prisma.emailTemplate.findMany({
            select: {
                id: true,
                name: true,
                customizedContent: true,
                customizedSubject: true,
            },
            where: {
                OR: [
                    { name: { equals: "header" } },
                    { name: { equals: "footer" } },
                    { name: { equals: "contactUs" } },
                    { name: { equals: templateType } },
                ],
            },
        });

        if (content.length < 4) {
            throw new Error(`One or more templates not found for templateType: ${templateType}`);
        }

        const newTemplateData = { ...templateData, AppName: process.env.APP_NAME };

        const headerMjmlTemplate = content.find(template => template.name === "header")?.customizedContent;
        const footerMjmlTemplate = content.find(template => template.name === "footer")?.customizedContent;
        const contactUsMjmlTemplate = content.find(template => template.name === "contactUs")?.customizedContent;

        const mainTemplate = content.find(template => template.name === templateType);

        if (!mainTemplate) {
            throw new Error(`Main template not found for templateType: ${templateType}`);
        }

        const updatedMustacheBodyOutput = mainTemplate.customizedContent
            .replace('{{header}}', headerMjmlTemplate || '')
            .replace('{{footer}}', footerMjmlTemplate || '')
            .replace('{{contactUs}}', contactUsMjmlTemplate || '');

        const mustacheTemplateBodyOutput = Mustache.render(updatedMustacheBodyOutput, newTemplateData);
        const mustacheTemplateSubjectOutput = Mustache.render(mainTemplate.customizedSubject, newTemplateData);

        const HtmlOutput = mjml2html(mustacheTemplateBodyOutput);
        // Try sending the email and catch any errors that occur during the sending process
        try {
            await sendEmail(
                mailInfo.to,
                mustacheTemplateSubjectOutput,
                "", // You can add plain text content if needed
                HtmlOutput.html
            );
            console.debug("Mail Sent Successfully!");
        } catch (emailError) {
            console.error("Error sending email:", emailError);
            // Handle specific cases like retrying or logging to an external service
        }
    } catch (error) {
        console.error("Error during email preparation or sending:", error);
        // Depending on your application, you might want to rethrow the error or handle it differently
        throw new Error("Unable to send email");
    }
};
