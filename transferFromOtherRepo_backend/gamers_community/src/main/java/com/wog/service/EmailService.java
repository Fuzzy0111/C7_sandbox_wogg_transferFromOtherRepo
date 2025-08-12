
package com.wog.service;

//import io.micronaut.email.Email;
//import io.micronaut.email.EmailSender;
//import jakarta.inject.Inject;
import jakarta.inject.Singleton;

@Singleton
public class EmailService {

    public EmailService() {
        // Default constructor
    }

//    private final EmailSender emailSender;
//
//    @Inject
//    public EmailService(EmailSender emailSender) {
//        this.emailSender = emailSender;
//    }

    public void sendAccountCreationEmail(String email, String temporaryPassword) {
        String subject = "Welcome to WOGG - Complete Your Registration";
        String body = buildAccountCreationEmailBody(email, temporaryPassword);

        sendEmail(email, subject, body);
    }

    public void sendPasswordResetEmail(String email, String temporaryPassword) {
        String subject = "WOGG - Password Reset";
        String body = buildPasswordResetEmailBody(email, temporaryPassword);

        sendEmail(email, subject, body);
    }

    public void sendReservationExpiryEmail(String email, String productDesc) {
        String subject = "WOGG - Reservation Expired";
        String body = buildReservationExpiryEmailBody(email, productDesc);

        sendEmail(email, subject, body);
    }

//    private void sendEmail(String to, String subject, String body) {
//        try {
//            Email email = Email.builder()
//                    .to(to)
//                    .subject(subject)
//                    .body(body);
//
//            emailSender.send(email);
//        } catch (Exception e) {
//            // Log error but don't throw - email failures shouldn't break the application
//            System.err.println("Failed to send email to " + to + ": " + e.getMessage());
//        }
//    }

 
    private void sendEmail(String to, String subject, String body) {
        try {
            // For now, just log the email instead of sending it
            // This will allow your application to compile and run
            System.out.println("=== EMAIL SENT ===");
            System.out.println("To: " + to);
            System.out.println("Subject: " + subject);
            System.out.println("Body: " + body);
            System.out.println("==================");
            
            // TODO: Implement actual email sending later
        } catch (Exception e) {
            System.err.println("Failed to send email to " + to + ": " + e.getMessage());
        }
    }

    private String buildAccountCreationEmailBody(String email, String temporaryPassword) {
        return """
                <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: #667eea;">Welcome to WOGG!</h2>
                        <p>Hello,</p>
                        <p>Your account has been created successfully. To complete your registration, please log in with the temporary password below and change it to a personal one.</p>
                        <div style="background: #f8fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
                            <p><strong>Email:</strong> %s</p>
                            <p><strong>Temporary Password:</strong> <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 3px;">%s</code></p>
                        </div>
                        <p>Please log in and change your password as soon as possible for security reasons.</p>
                        <p>Best regards,<br>The WOGG Team</p>
                    </div>
                </body>
                </html>
                """.formatted(email, temporaryPassword);
    }

    private String buildPasswordResetEmailBody(String email, String temporaryPassword) {
        return """
                <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: #667eea;">Password Reset Request</h2>
                        <p>Hello,</p>
                        <p>You requested a password reset for your WOGG account. Your password has been reset to a temporary one.</p>
                        <div style="background: #f8fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
                            <p><strong>Email:</strong> %s</p>
                            <p><strong>Temporary Password:</strong> <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 3px;">%s</code></p>
                        </div>
                        <p>Please log in with this temporary password and change it to a new personal password immediately.</p>
                        <p>If you didn't request this password reset, please contact support.</p>
                        <p>Best regards,<br>The WOGG Team</p>
                    </div>
                </body>
                </html>
                """.formatted(email, temporaryPassword);
    }

    private String buildReservationExpiryEmailBody(String email, String productDesc) {
        return """
                <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: #f6ad55;">Reservation Expired</h2>
                        <p>Hello,</p>
                        <p>Your reservation for the following Item has expired:</p>
                        <div style="background: #fef5e7; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #f6ad55;">
                            <p style="font-style: italic; margin: 0;">"%s"</p>
                        </div>
                        <p>The 10-day reservation period has ended and the item is no longer reserved for you.</p>
                        <p>You can make a new reservation anytime by visiting our store.</p>
                        <p>Best regards,<br>The WOGG Team</p>
                    </div>
                </body>
                </html>
                """.formatted(productDesc);
    }
}


