import { Resend } from 'resend';
import ContactEmail from '@/components/emails/ContactEmail';
import { NextResponse } from 'next/server';

// Initialize Resend with API Key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
        nombres, 
        apellido, 
        email, 
        celular, 
        documentType, 
        documentNumber, 
        contactPreference, 
        horario,
        project,
        mensaje
    } = body;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Santa Fe 190 <no-reply@kayen.work>', // Updated sender address
      to: ['ventas@santafe190.com'], // Replace with actual recipient
      subject: `Nueva Solicitud: ${nombres} ${apellido}`,
      react: ContactEmail({
        nombres,
        apellido,
        email,
        celular,
        documentType,
        documentNumber,
        contactPreference,
        horario,
        project: project || 'Santa Fe 190',
        mensaje
      }),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
