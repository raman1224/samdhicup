import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import nodemailer from 'nodemailer'
import { jwtVerify } from 'jose'

export async function POST(req: NextRequest) {
  try {
    // Check auth
    const token = req.cookies.get('admin_token')?.value
    if (!token) {
      const authHeader = req.headers.get('Authorization')
      if (!authHeader) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }

    const { subject, message, teamIds } = await req.json()

    if (!subject || !message) {
      return NextResponse.json({ error: 'Subject and message are required' }, { status: 400 })
    }

    // Get teams from database
    const teams = await prisma.team.findMany({
      where: {
        ...(teamIds?.length ? { id: { in: teamIds } } : {}),
        captainEmail: { not: '' },
      },
      select: {
        id: true,
        teamName: true,
        captainEmail: true,
      },
    })

    if (teams.length === 0) {
      return NextResponse.json({ error: 'No teams found' }, { status: 400 })
    }

    // Get unique emails
    const recipientEmails = [...new Set(teams.map((t) => t.captainEmail).filter(Boolean))]

    if (recipientEmails.length === 0) {
      return NextResponse.json({ error: 'No recipient emails found' }, { status: 400 })
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // Send email
    await transporter.sendMail({
      from: `"नयाँ बस्ती भलिबल प्रतियोगिता-२०८३" <${process.env.GMAIL_EMAIL}>`,
      to: process.env.GMAIL_EMAIL, // Send to yourself
      bcc: recipientEmails, // Real recipients in BCC (privacy)
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #F97316, #EF4444); padding: 20px; border-radius: 12px; text-align: center;">
            <h2 style="color: white; margin: 0;">नयाँ बस्ती खुल्ला भलिबल प्रतियोगिता-२०८३</h2>
          </div>
          <div style="background: #f9fafb; padding: 20px; border-radius: 12px; margin-top: 16px;">
            <div style="white-space: pre-wrap; color: #333; line-height: 1.6;">${message}</div>
          </div>
          <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
            <p>📞 9803977546 | 📧 www.bishaltolami049@gmail.com</p>
            <p>Sent to ${recipientEmails.length} team(s)</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ 
      success: true, 
      sentTo: recipientEmails.length,
      teams: teams.map(t => t.teamName),
    })
  } catch (err) {
    console.error('Email send error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}