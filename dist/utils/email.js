// In a real application, you would use a service like SendGrid, AWS SES, or Nodemailer
// to send actual emails. For this flow, we will simulate sending an email by logging to the console.
export const sendPasswordResetEmail = async (email, token) => {
    console.log(`\n\n==========================================`);
    console.log(`✉️  SIMULATED EMAIL SENT TO: ${email}`);
    console.log(`Subject: Reset Your Password`);
    console.log(`Body: Use this token to reset your password: ${token}`);
    console.log(`==========================================\n\n`);
    return true;
};
