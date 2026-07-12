import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Send notification to admin email
    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: ['www.bishaltolami049@gmail.com'], // Your email - gets all contact messages
      subject: `📩 New Contact Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; padding: 20px;">
          <h2 style="color: #F97316;">New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px;">
            ${message}
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            From: नयाँ बस्ती खुल्ला भलिबल प्रतियोगिता-२०८३
          </p>
        </div>
      `,
    })

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully! We will get back to you soon.',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}