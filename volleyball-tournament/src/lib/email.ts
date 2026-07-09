import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// For free Resend: only works with verified emails
// For production: verify your domain or upgrade Resend plan

export async function sendOTPEmail(email: string, otp: string) {
  try {
    console.log(`📧 Sending OTP to: ${email}`)
    console.log(`🔑 OTP Code: ${otp}`)

    const { data, error } = await resend.emails.send({
      from: 'नयाँ बस्ती भलिबल <onboarding@resend.dev>',
      to: [email], // Dynamic: sends to whatever email admin uses
      subject: `🔑 Admin OTP: ${otp}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; background: #111827;">
          <div style="text-align: center; padding: 30px; background: linear-gradient(135deg, #F97316, #EF4444); border-radius: 16px; margin-bottom: 24px;">
            <h1 style="color: white; margin: 0;">नयाँ बस्ती खुल्ला</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 4px 0 0;">भलिबल प्रतियोगिता-२०८३</p>
          </div>
          
          <div style="background: #1F2937; padding: 24px; border-radius: 12px; text-align: center;">
            <p style="color: #9CA3AF; font-size: 14px; margin: 0;">Your Admin OTP Code</p>
            <div style="background: #374151; padding: 20px; border-radius: 8px; margin: 16px 0;">
              <span style="font-size: 36px; font-weight: bold; color: #F97316; letter-spacing: 12px;">${otp}</span>
            </div>
            <p style="color: #6B7280; font-size: 12px;">Expires in 10 minutes</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('❌ Resend error:', error.message)
      // Still log OTP for development
      console.log(`🔑 OTP for ${email}: ${otp}`)
      return false
    }

    console.log('✅ Email sent successfully')
    return true
  } catch (error) {
    console.error('❌ Failed to send email:', error)
    console.log(`🔑 OTP for ${email}: ${otp} (fallback)`)
    return false
  }
}

export async function sendRegistrationEmail(email: string, teamName: string, registrationId: string) {
  try {
    console.log(`📧 Sending registration email to: ${email}`)

    const { data, error } = await resend.emails.send({
      from: 'नयाँ बस्ती भलिबल <onboarding@resend.dev>',
      to: [email],
      subject: `✅ Registration Received - ${teamName} | ${registrationId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; background: #111827;">
          <div style="text-align: center; padding: 30px; background: linear-gradient(135deg, #22C55E, #16A34A); border-radius: 16px; margin-bottom: 24px;">
            <h1 style="color: white; margin: 0;">✅ Registration Received!</h1>
          </div>
          <div style="background: #1F2937; padding: 20px; border-radius: 12px;">
            <p style="color: #D1D5DB;">Dear <strong style="color: #F97316;">${teamName}</strong>,</p>
            <p style="color: #D1D5DB;">Your registration has been received!</p>
            <div style="background: #374151; padding: 12px; border-radius: 8px; margin: 12px 0;">
              <p style="color: #F97316; font-size: 20px; font-weight: bold; margin: 0;">${registrationId}</p>
            </div>
            <p style="color: #9CA3AF; font-size: 14px;">📞 9803977546 | 📧 www.bishaltolami049@gmail.com</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('❌ Email error:', error.message)
      return false
    }

    console.log('✅ Registration email sent')
    return true
  } catch (error) {
    console.error('❌ Failed:', error)
    return false
  }
}