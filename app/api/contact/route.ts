import { NextRequest, NextResponse } from 'next/server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_JS_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { nombre, email, telefono, especialidad, mensaje } = await request.json();

    // Validar campos requeridos
    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Abogados del Ecuador <onboarding@resend.dev>',
      to: ['rickypcyt@gmail.com'],
      replyTo: email,
      subject: `Nueva consulta: ${nombre} - ${especialidad || 'General'}`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nueva Consulta</title>
        </head>
        <body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            
            <div style="background: #1a1f2e; padding: 30px; text-align: center;">
              <h1 style="color: #c9a227; margin: 0; font-size: 22px; font-weight: 600;">
                Abogados del Ecuador
              </h1>
              <p style="color: #888; margin: 8px 0 0 0; font-size: 13px;">
                Nueva consulta recibida
              </p>
            </div>
            
            <div style="padding: 30px;">
              
              <table style="width: 100%; margin-bottom: 25px; font-size: 14px;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 140px; color: #888; font-weight: 500;">Nombre:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${nombre}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-weight: 500;">Especialidad de interes:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${especialidad || 'No especificada'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-weight: 500;">Email:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-weight: 500;">Telefono:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${telefono || 'No proporcionado'}</td>
                </tr>
              </table>
              
              <div style="background: #f9f9f9; border-left: 3px solid #c9a227; padding: 20px; border-radius: 0 4px 4px 0;">
                <p style="margin: 0 0 10px 0; color: #888; font-size: 12px; font-weight: 500; text-transform: uppercase;">Mensaje</p>
                <p style="margin: 0; color: #333; line-height: 1.6;">
                  ${mensaje.replace(/\n/g, '<br>')}
                </p>
              </div>
              
              <div style="margin-top: 25px; text-align: center;">
                <a href="mailto:${email}?subject=Re: Consulta - ${especialidad || 'General'}" style="display: inline-block; background: #c9a227; color: #1a1f2e; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: 500; font-size: 14px;">
                  Responder a ${nombre}
                </a>
              </div>
              
            </div>
            
            <div style="padding: 20px; background: #f9f9f9; text-align: center; border-top: 1px solid #eee;">
              <p style="margin: 0; color: #999; font-size: 12px;">
                Enviado el ${new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' })} a las ${new Date().toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Error de Resend:', error);
      return NextResponse.json(
        { error: 'Error al enviar el email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('Error en API route:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
