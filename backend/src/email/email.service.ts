import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger('EmailService');

  constructor() {
    // In production, use real SMTP settings
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
      port: parseInt(process.env.SMTP_PORT || '2525'),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail(to: string, subject: string, templateName: string, context: any) {
    try {
      // Basic placeholder for template loading
      const html = this.getTemplate(templateName, context);
      
      await this.transporter.sendMail({
        from: '"MVEMS" <noreply@mvems.com>',
        to,
        subject,
        html,
      });
      
      this.logger.log(`Email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}`, error);
    }
  }

  private getTemplate(name: string, context: any): string {
    // Simple Handlebars template for now
    const templates = {
      welcome: '<h1>Welcome, {{name}}!</h1><p>Thanks for joining MVEMS.</p>',
      order_confirmation: '<h1>Order Confirmed!</h1><p>Your order ID is {{orderId}}.</p>',
    };
    
    const source = (templates as any)[name] || '<p>Default Template</p>';
    const template = handlebars.compile(source);
    return template(context);
  }
}
