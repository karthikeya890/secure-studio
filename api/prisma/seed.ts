import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();


const emailTemplates: Prisma.EmailTemplateUncheckedCreateInput[] = [
  {
    id: "1",
    name: "header",
    defaultSubject: "",
    customizedSubject: "",
    defaultContent: `<mj-section background-color="#ffffff" background-repeat="repeat" padding-bottom="0px" padding-top="10px" padding="10px 0" text-align="center"><mj-column><mj-image align="center" padding="10px 15px" src="https://22neuro.continuous.engineering/22neuro-sidebar-logo.png" target="_blank" width="100px"></mj-image><mj-divider border-width="1px" border-style="dashed" border-color="lightgrey" /></mj-column></mj-section>`,
    customizedContent: `<mj-section background-color="#ffffff" background-repeat="repeat" padding-bottom="0px" padding-top="10px" padding="10px 0" text-align="center"><mj-column><mj-image align="center" padding="10px 15px" src="https://22neuro.continuous.engineering/22neuro-sidebar-logo.png" target="_blank" width="100px"></mj-image><mj-divider border-width="1px" border-style="dashed" border-color="lightgrey" /></mj-column></mj-section>`,
  },
  {
    id: "2",
    name: "footer",
    defaultSubject: "",
    customizedSubject: "",
    defaultContent: `<mj-section> <mj-column width="100%"> <mj-text mj-class="body-text"> Best regards,<br/> The {{AppName}} Team </mj-text> </mj-column> </mj-section> <mj-section padding="40px 0 0 0" background-color="#ffffff"> <mj-column> <mj-divider border-width="1px" border-style="dashed" border-color="lightgrey" /> <mj-text align="center"> <a href="https://www.facebook.com/people/22Neuro/61555257793750/" target="_blank"> <img width="32px" src="https://cdn.racchabanda.app/images/_/email/facebook2x.png" /> </a> <a href="https://www.instagram.com/22_neuro/" target="_blank"> <img width="32px" src="https://cdn.racchabanda.app/images/_/email/instagram2x.png" /> </a> <a href="https://www.linkedin.com/company/22neuro/" target="_blank"> <img width="32px" src="https://cdn.racchabanda.app/images/_/email/linkedin2x.png" /> </a> </mj-text> </mj-column> </mj-section> <mj-section padding="0px" background-color="#ffffff"> <mj-column> <mj-text mj-class="footer-text" align="center" padding="0 10px"> <p style="Margin:0; padding-bottom:10px; font-size:10px; line-height:15px; Margin-bottom:10px; color:#111111; font-family: 'Open Sans', 'Raleway', Arial, Helvetica, sans-serif;"> <span style="color:#111111 !important; text-decoration:none;"> <strong>+91 84119-11234</strong> <br /> 305 B, Regent Plaza, Baner-Pashan Link Road, Baner, Pune, Maharashtra- 411045 </span> <br /> <a href="mailto:support@22neuro.com" name="footer_privacy" style="color:#111111; text-decoration:underline;"> <strong>support@22neuro.com</strong> </a>&nbsp;&nbsp;|&nbsp;&nbsp; <a href="https://www.22neuro.com/" target="_blank" style="text-decoration:underline; color:#111111;"> <strong>www.22neuro.com</strong> </a> </p> </mj-text> </mj-column> </mj-section>`,
    customizedContent: `<mj-section> <mj-column width="100%"> <mj-text mj-class="body-text"> Best regards,<br/> The {{AppName}} Team </mj-text> </mj-column> </mj-section> <mj-section padding="40px 0 0 0" background-color="#ffffff"> <mj-column> <mj-divider border-width="1px" border-style="dashed" border-color="lightgrey" /> <mj-text align="center"> <a href="https://www.facebook.com/people/22Neuro/61555257793750/" target="_blank"> <img width="32px" src="https://cdn.racchabanda.app/images/_/email/facebook2x.png" /> </a> <a href="https://www.instagram.com/22_neuro/" target="_blank"> <img width="32px" src="https://cdn.racchabanda.app/images/_/email/instagram2x.png" /> </a> <a href="https://www.linkedin.com/company/22neuro/" target="_blank"> <img width="32px" src="https://cdn.racchabanda.app/images/_/email/linkedin2x.png" /> </a> </mj-text> </mj-column> </mj-section> <mj-section padding="0px" background-color="#ffffff"> <mj-column> <mj-text mj-class="footer-text" align="center" padding="0 10px"> <p style="Margin:0; padding-bottom:10px; font-size:10px; line-height:15px; Margin-bottom:10px; color:#111111; font-family: 'Open Sans', 'Raleway', Arial, Helvetica, sans-serif;"> <span style="color:#111111 !important; text-decoration:none;"> <strong>+91 84119-11234</strong> <br /> 305 B, Regent Plaza, Baner-Pashan Link Road, Baner, Pune, Maharashtra- 411045 </span> <br /> <a href="mailto:support@22neuro.com" name="footer_privacy" style="color:#111111; text-decoration:underline;"> <strong>support@22neuro.com</strong> </a>&nbsp;&nbsp;|&nbsp;&nbsp; <a href="https://www.22neuro.com/" target="_blank" style="text-decoration:underline; color:#111111;"> <strong>www.22neuro.com</strong> </a> </p> </mj-text> </mj-column> </mj-section>`,
  },
  {
    id: "3",
    name: "otpRequest",
    defaultSubject: "Your One-Time Password (OTP)",
    customizedSubject: "Your One-Time Password (OTP)",
    defaultContent: `<mjml><mj-head><mj-title>Your One-Time Password (OTP) for {{AppName}}</mj-title><mj-attributes><mj-image alt="" padding="0px"></mj-image><mj-section padding="0px"></mj-section><mj-class name="button" font-family="Arial, sans-serif" background-color="#111111" color="#ffffff" height="30px" text-transform="uppercase" font-size="16px" text-decoration="none"></mj-class><mj-class name="footer-text" font-family="Arial, sans-serif" color="#111111" font-size="12px" line-height="18px"></mj-class><mj-class name="body-text" font-family="Arial, sans-serif" color="#111111" font-size="16px" line-height="24px" align="left"></mj-class><mj-class name="headline-text" font-family="Arial, sans-serif" color="#111111" font-size="22px" font-weight="bold" line-height="32px" align="center"></mj-class><mj-class name="social-element" margin="0 1rem"></mj-class></mj-attributes><mj-font name="Arial" href="https://fonts.googleapis.com/css?family=Arial"></mj-font><mj-style inline="inline">.link-nostyle { color: inherit; text-decoration: none }; .apple-link-black a { color:#111111 !important; text-decoration:none; } .apple-link-gray a { color:#999999 !important; text-decoration:none; } .apple-link-white a { color:#ffffff !important; text-decoration:none; } .apple-link-tan a { color: #aa6034 !important; text-decoration: none; } .apple-link-light-grey a { color: #c7c8ca; text-decoration: none; } .preheader {display:none !important; visibility:hidden; mso-hide:all; max-height:0px; max-width:0px; opacity:0; overflow:hidden; width:100%;} img[class="img-max"] { max-width: 100% !important; width: 100% !important; height: auto !important; }</mj-style><mj-style>@media all and (max-width: 600px) { img[title*="img30"] { width:30% !important; } }</mj-style></mj-head><mj-body background-color="#ffffff">{{{header}}}<mj-include path="./shared/header.mjml" /><mj-section><mj-column width="100%"><mj-text mj-class="body-text">Dear {{name}},<br/><br/>Thank you for choosing {{AppName}}. Please use the following One-Time Password (OTP) to {{action}} to your account. This OTP is valid for the next 5 minutes:</mj-text></mj-column></mj-section><mj-section><mj-column><mj-text  font-size="20px" font-family="Arial, sans-serif" color="#111111">OTP :{{otp}}</mj-text></mj-column></mj-section><mj-section><mj-column width="100%"><mj-text mj-class="body-text">If you did not request this action, please ignore this email.</mj-text></mj-column></mj-section>{{contactUs}}<mj-include path="./shared/footer.mjml" />{{{footer}}}</mj-body></mjml>`,
    customizedContent: `<mjml><mj-head><mj-title>Your One-Time Password (OTP) for {{AppName}}</mj-title><mj-attributes><mj-image alt="" padding="0px"></mj-image><mj-section padding="0px"></mj-section><mj-class name="button" font-family="Arial, sans-serif" background-color="#111111" color="#ffffff" height="30px" text-transform="uppercase" font-size="16px" text-decoration="none"></mj-class><mj-class name="footer-text" font-family="Arial, sans-serif" color="#111111" font-size="12px" line-height="18px"></mj-class><mj-class name="body-text" font-family="Arial, sans-serif" color="#111111" font-size="16px" line-height="24px" align="left"></mj-class><mj-class name="headline-text" font-family="Arial, sans-serif" color="#111111" font-size="22px" font-weight="bold" line-height="32px" align="center"></mj-class><mj-class name="social-element" margin="0 1rem"></mj-class></mj-attributes><mj-font name="Arial" href="https://fonts.googleapis.com/css?family=Arial"></mj-font><mj-style inline="inline">.link-nostyle { color: inherit; text-decoration: none }; .apple-link-black a { color:#111111 !important; text-decoration:none; } .apple-link-gray a { color:#999999 !important; text-decoration:none; } .apple-link-white a { color:#ffffff !important; text-decoration:none; } .apple-link-tan a { color: #aa6034 !important; text-decoration: none; } .apple-link-light-grey a { color: #c7c8ca; text-decoration: none; } .preheader {display:none !important; visibility:hidden; mso-hide:all; max-height:0px; max-width:0px; opacity:0; overflow:hidden; width:100%;} img[class="img-max"] { max-width: 100% !important; width: 100% !important; height: auto !important; }</mj-style><mj-style>@media all and (max-width: 600px) { img[title*="img30"] { width:30% !important; } }</mj-style></mj-head><mj-body background-color="#ffffff">{{{header}}}<mj-include path="./shared/header.mjml" /><mj-section><mj-column width="100%"><mj-text mj-class="body-text">Dear {{name}},<br/><br/>Thank you for choosing {{AppName}}. Please use the following One-Time Password (OTP) to {{action}} to your account. This OTP is valid for the next 5 minutes:</mj-text></mj-column></mj-section><mj-section><mj-column><mj-text  font-size="20px" font-family="Arial, sans-serif" color="#111111">OTP :{{otp}}</mj-text></mj-column></mj-section><mj-section><mj-column width="100%"><mj-text mj-class="body-text">If you did not request this action, please ignore this email.</mj-text></mj-column></mj-section>{{contactUs}}<mj-include path="./shared/footer.mjml" />{{{footer}}}</mj-body></mjml>`,
  }
]

async function createUsers() {
  const users: Prisma.UserUncheckedCreateInput[] = [
    { id: "1", name: "demo", email: "demo@racchabanda.com" }
  ];

  for (const user of users) {
    try {
      await prisma.user.upsert({
        where: { id: user.id },
        update: {},
        create: user,
      });
      // console.log(`User ${user.name} upserted successfully.`);
    } catch (error) {
      console.error(`Error seeding user ${user.name}:`, error);
    }
  }
}

async function createEmailTemplates() {
  const templates: Prisma.EmailTemplateUncheckedCreateInput[] = emailTemplates;

  for (const template of templates) {
    try {
      await prisma.emailTemplate.upsert({
        where: { id: template.id },
        update: {},
        create: template,
      });
    } catch (error) {
      console.error(`Error seeding email templates ${template.name}:`, error);
    }
  }
}

async function services() {

  // Create Service Categories
  const deskCategory = await prisma.serviceCategory.create({
    data: {
      name: "Desk Booking",
      description: "Co-Working Desks for flexible working spaces.",
    },
  });

  const virtualCategory = await prisma.serviceCategory.create({
    data: {
      name: "Virtual Address",
      description: "For Business & Mail Handling.",
    },
  });

  const officeCategory = await prisma.serviceCategory.create({
    data: {
      name: "Private Office",
      description: "Dedicated spaces for teams of various sizes.",
    },
  });

  // Create Services under Desk Booking
  const hotDesk = await prisma.service.create({
    data: {
      name: "Hot Desk",
      categoryId: deskCategory.id,
      availability: 10,
    },
  });

  const dedicatedDesk = await prisma.service.create({
    data: {
      name: "Dedicated Desk",
      categoryId: deskCategory.id,
      availability: 5,
    },
  });

  const meetingRoom = await prisma.service.create({
    data: {
      name: "Meeting Rooms",
      categoryId: deskCategory.id,
      availability: 3,
    },
  });

  // Create Services under Virtual Address
  const businessAddress = await prisma.service.create({
    data: {
      name: "Business Address Subscription",
      categoryId: virtualCategory.id,
      availability: 100,
    },
  });

  const mailHandling = await prisma.service.create({
    data: {
      name: "Mail Handling Services",
      categoryId: virtualCategory.id,
      availability: 100,
    },
  });

  const callHandling = await prisma.service.create({
    data: {
      name: "Call Handling Services",
      categoryId: virtualCategory.id,
      availability: 100,
    },
  });

  // Create Services under Private Office
  const smallOffice = await prisma.service.create({
    data: {
      name: "Small Office (1-2 People)",
      categoryId: officeCategory.id,
      availability: 2,
    },
  });

  const teamOffice = await prisma.service.create({
    data: {
      name: "Team Office (3-5 People)",
      categoryId: officeCategory.id,
      availability: 3,
    },
  });

  const enterpriseOffice = await prisma.service.create({
    data: {
      name: "Enterprise Office (6+ People)",
      categoryId: officeCategory.id,
      availability: 1,
    },
  });

  // Create Subscriptions
  await prisma.subscription.createMany({
    data: [
      {
        serviceId: hotDesk.id,
        name: "Hot Desk Hourly",
        features: ["Check availability", "Select time & duration", "Confirm booking"],
        price: 10.0,
        gstType: "PERCENTAGE",
        gstValue: 18.0,
        duration: "HOUR",
      },
      {
        serviceId: hotDesk.id,
        name: "Hot Desk Daily",
        features: ["Check availability", "Select time & duration", "Confirm booking"],
        price: 50.0,
        gstType: "PERCENTAGE",
        gstValue: 18.0,
        duration: "DAY",
      },
      {
        serviceId: dedicatedDesk.id,
        name: "Dedicated Desk Monthly",
        features: ["Check availability", "Select time & duration", "Confirm booking"],
        price: 300.0,
        gstType: "PERCENTAGE",
        gstValue: 18.0,
        duration: "MONTH",
      },
      {
        serviceId: businessAddress.id,
        name: "Business Address Monthly",
        features: ["Virtual Address assigned", "Admin management", "Email notifications"],
        price: 100.0,
        gstType: "PERCENTAGE",
        gstValue: 18.0,
        duration: "MONTH",
      },
      {
        serviceId: businessAddress.id,
        name: "Business Address Yearly",
        features: ["Virtual Address assigned", "Admin management", "Email notifications"],
        price: 1000.0,
        gstType: "PERCENTAGE",
        gstValue: 18.0,
        duration: "YEAR",
      },
      {
        serviceId: smallOffice.id,
        name: "Small Office Daily",
        features: ["Check availability", "Book for fixed period"],
        price: 500.0,
        gstType: "PERCENTAGE",
        gstValue: 18.0,
        duration: "DAY",
      },
      {
        serviceId: teamOffice.id,
        name: "Team Office Monthly",
        features: ["Check availability", "Book for fixed period"],
        price: 2000.0,
        gstType: "PERCENTAGE",
        gstValue: 18.0,
        duration: "MONTH",
      },
    ],
  });

  console.log("✅ Seeding services completed!");
}

async function main() {
  try {
    // Call seeding functions
    await createUsers();
    await createEmailTemplates();
    await services();
    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect(); // Ensures the connection is closed
  }
}

main();