import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOTPEmail(email: string, otp: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Volleyball Tournament <onboarding@resend.dev>',
      to: email,
      subject: `🔑 Admin Login OTP: ${otp}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #F97316; margin: 0;">🏐 Volleyball Tournament</h1>
            <p style="color: #6B7280;">Admin Panel Access</p>
          </div>
          
          <div style="background: #1F2937; padding: 30px; border-radius: 12px; text-align: center;">
            <h2 style="color: #fff; margin: 0 0 10px;">Your OTP Code</h2>
            <p style="color: #9CA3AF; font-size: 14px; margin: 0 0 20px;">
              Use this code to complete your login. This code expires in 10 minutes.
            </p>
            
            <div style="background: #374151; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <span style="font-size: 36px; font-weight: bold; color: #F97316; letter-spacing: 8px;">
                ${otp}
              </span>
            </div>
            
            <p style="color: #6B7280; font-size: 12px; margin: 0;">
              If you didn't request this, please ignore this email.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px;">
            <p style="color: #6B7280; font-size: 12px;">
              📞 9803977546 | 📧 www.bishaltolami049@gmail.com
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}

export async function sendRegistrationEmail(email: string, teamName: string, registrationId: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Volleyball Tournament 2026 <onboarding@resend.dev>',
      to: email,
      subject: `🏐 Registration Received - ${teamName} | ${registrationId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #111827;">
          <div style="text-align: center; padding: 30px; background: linear-gradient(135deg, #F97316, #EF4444); border-radius: 16px; margin-bottom: 24px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🏐 Registration Received!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0;">Volleyball Tournament 2026</p>
          </div>
          
          <div style="background: #1F2937; padding: 24px; border-radius: 12px; margin-bottom: 16px;">
            <p style="color: #D1D5DB; font-size: 16px;">Dear <strong style="color: #F97316;">${teamName}</strong> Team Captain,</p>
            <p style="color: #D1D5DB;">Your registration has been received successfully!</p>
            
            <div style="background: #374151; padding: 16px; border-radius: 8px; margin: 16px 0;">
              <p style="color: #9CA3AF; margin: 0; font-size: 12px;">REGISTRATION ID</p>
              <p style="color: #F97316; font-size: 24px; font-weight: bold; margin: 4px 0; letter-spacing: 2px;">${registrationId}</p>
              <p style="color: #9CA3AF; margin: 0; font-size: 12px;">Team: ${teamName}</p>
            </div>
            
            <div style="background: rgba(251,191,36,0.1); border: 1px solid rgba(251,191,36,0.3); padding: 12px; border-radius: 8px; margin: 16px 0;">
              <p style="color: #FBBF24; margin: 0; font-size: 14px;">⏳ Status: <strong>Pending Verification</strong></p>
              <p style="color: #D1D5DB; font-size: 12px; margin: 4px 0 0;">We are verifying your payment. This may take up to 24 hours.</p>
            </div>
            
            <h3 style="color: white; margin: 16px 0 8px;">What's Next?</h3>
            <ul style="color: #D1D5DB; font-size: 14px; padding-left: 20px;">
              <li style="margin-bottom: 6px;">✅ Payment verification (within 24 hours)</li>
              <li style="margin-bottom: 6px;">📧 You'll receive a confirmation email once verified</li>
              <li style="margin-bottom: 6px;">📅 Match schedule will be published after registration closes</li>
              <li style="margin-bottom: 6px;">📱 Team captains will be added to WhatsApp group</li>
            </ul>
          </div>
          
          <div style="background: #1F2937; padding: 16px; border-radius: 12px;">
            <p style="color: #9CA3AF; font-size: 14px; margin: 0;">📞 Need help? Contact us:</p>
            <p style="color: #F97316; margin: 4px 0; font-size: 16px;">📱 9803977546</p>
            <p style="color: #60A5FA; margin: 0; font-size: 14px;">📧 www.bishaltolami049@gmail.com</p>
          </div>
          
          <p style="color: #6B7280; font-size: 12px; text-align: center; margin-top: 16px;">
            Volleyball Tournament 2026 | National Stadium, Kathmandu
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return false
    }
    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}