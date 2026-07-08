import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { jwtVerify } from 'jose'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.cookies.get('admin_token')?.value
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'fallback-secret-key')
    await jwtVerify(token, secret)

    const { id } = await params

    const team = await prisma.team.findUnique({
      where: { id },
      include: {
        payment: true,
        players: { orderBy: { createdAt: 'asc' } },
      },
    })

    if (!team) {
      return NextResponse.json({ success: false, error: 'Team not found' }, { status: 404 })
    }

    // Build HTML with base64 images embedded directly
    const playersHtml = team.players.map((p, i) => `
      <tr>
        <td style="text-align:center">${i + 1}</td>
        <td style="text-align:center">
          ${p.passportPhoto 
            ? `<img src="${p.passportPhoto}" width="40" height="40" style="border-radius:50%;object-fit:cover" />` 
            : `<div style="width:40px;height:40px;border-radius:50%;background:#ddd;display:inline-block;text-align:center;line-height:40px">-</div>`}
        </td>
        <td>${p.fullName}</td>
        <td>${p.position?.replace(/_/g, ' ')}</td>
        <td>${p.phoneNumber}</td>
        <td style="text-align:center">${p.age || '-'}</td>
        <td style="text-align:center">${p.jerseyNumber || '-'}</td>
        <td>${p.jerseyName || '-'}</td>
        <td style="text-align:center">${p.jerseySize || '-'}</td>
        <td style="text-align:center">${p.passportPhoto ? '✅' : '❌'}</td>
      </tr>
    `).join('')

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @page { size: A4; margin: 15mm; }
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a1a; font-size: 12px; }
    .header { text-align: center; border-bottom: 3px solid #F97316; padding-bottom: 15px; margin-bottom: 20px; }
    .header h1 { color: #F97316; font-size: 24px; margin: 0; }
    .header p { color: #666; margin: 5px 0; }
    .section { margin: 15px 0; padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; page-break-inside: avoid; }
    .section h2 { color: #F97316; font-size: 16px; margin: 0 0 10px 0; border-bottom: 1px solid #eee; padding-bottom: 5px; }
    .grid { display: flex; flex-wrap: wrap; gap: 10px; }
    .grid-item { flex: 1 1 45%; min-width: 200px; }
    .label { color: #666; font-size: 10px; }
    .value { color: #1a1a1a; font-weight: 500; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 10px; }
    th { background: #FFF7ED; color: #F97316; padding: 8px 6px; text-align: left; border-bottom: 2px solid #F97316; font-size: 10px; }
    td { padding: 6px; border-bottom: 1px solid #eee; vertical-align: middle; }
    tr:nth-child(even) { background: #fafafa; }
    .badge { display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 10px; font-weight: bold; }
    .badge-approved { background: #DCFCE7; color: #166534; }
    .badge-pending { background: #FEF9C3; color: #854D0E; }
    .badge-rejected { background: #FEE2E2; color: #991B1B; }
    .logo { max-width: 80px; max-height: 80px; border-radius: 8px; }
    .footer { text-align: center; color: #999; font-size: 9px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px; }
    img { max-width: 100%; }
    @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
  </style>
</head>
<body>
  <div class="header">
    ${team.teamLogo ? `<img src="${team.teamLogo}" class="logo" style="margin-bottom:10px" /><br/>` : ''}
    <h1>${team.teamName}</h1>
    <p>Registration ID: <strong>${team.registrationId}</strong> | Status: <span class="badge badge-${team.status}">${team.status.toUpperCase()}</span></p>
    <p>Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
  </div>

  <div class="section">
    <h2>👤 Captain Details</h2>
    <div class="grid">
      <div class="grid-item"><span class="label">Name</span><br/><span class="value">${team.captainName}</span></div>
      <div class="grid-item"><span class="label">Phone</span><br/><span class="value">${team.captainPhone}</span></div>
      <div class="grid-item"><span class="label">Email</span><br/><span class="value">${team.captainEmail}</span></div>
      <div class="grid-item"><span class="label">District</span><br/><span class="value">${team.district}</span></div>
      <div class="grid-item"><span class="label">Municipality</span><br/><span class="value">${team.municipality}</span></div>
      <div class="grid-item"><span class="label">Address</span><br/><span class="value">${team.address}</span></div>
    </div>
  </div>

  ${team.payment ? `
  <div class="section">
    <h2>💳 Payment Details</h2>
    <div class="grid">
      <div class="grid-item"><span class="label">Transaction ID</span><br/><span class="value">${team.payment.transactionId}</span></div>
      <div class="grid-item"><span class="label">Method</span><br/><span class="value">${team.payment.paymentMethod}</span></div>
      <div class="grid-item"><span class="label">Amount</span><br/><span class="value">NPR ${team.payment.amount?.toLocaleString()}</span></div>
      <div class="grid-item"><span class="label">Status</span><br/><span class="badge badge-${team.payment.status}">${team.payment.status.toUpperCase()}</span></div>
    </div>
    ${team.payment.screenshot ? `<br/><span class="label">Screenshot:</span><br/><img src="${team.payment.screenshot}" style="max-width:300px;border-radius:8px;margin-top:5px" />` : ''}
  </div>
  ` : ''}

  <div class="section">
    <h2>👥 Players (${team.players.length})</h2>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Photo</th>
          <th>Name</th>
          <th>Position</th>
          <th>Phone</th>
          <th>Age</th>
          <th>Jersey #</th>
          <th>Jersey Name</th>
          <th>Size</th>
          <th>Doc</th>
        </tr>
      </thead>
      <tbody>
        ${playersHtml}
      </tbody>
    </table>
  </div>

  <div class="footer">
    Volleyball Tournament 2026 | National Stadium, Kathmandu | Contact: 9803977546 | www.bishaltolami049@gmail.com
  </div>
</body>
</html>`

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `attachment; filename="${team.registrationId}-${team.teamName.replace(/[^a-zA-Z0-9]/g, '-')}.html"`,
      },
    })
  } catch (error) {
    console.error('PDF error:', error)
    return NextResponse.json({ success: false, error: 'Failed to generate' }, { status: 500 })
  }
}