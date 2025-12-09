import type { ActionFunctionArgs } from "react-router";
import { Resend } from "resend";

// Rate limiting simple (en memoria - se reinicia con cada cold start)
const submissions = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hora
  const maxRequests = 3;

  const userSubmissions = submissions.get(ip) || [];
  const recentSubmissions = userSubmissions.filter(time => now - time < windowMs);
  
  if (recentSubmissions.length >= maxRequests) {
    return true;
  }

  recentSubmissions.push(now);
  submissions.set(ip, recentSubmissions);
  return false;
}

function sanitizeInput(input: string): string {
  if (!input) return "";
  return input.trim().replace(/[<>]/g, '');
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const formData = await request.formData();
    
    // Extraer y sanitizar datos
    const data = {
      brideFullName: sanitizeInput(formData.get("brideFullName") as string || ""),
      groomFullName: sanitizeInput(formData.get("groomFullName") as string || ""),
      email: sanitizeInput(formData.get("email") as string || ""),
      instagram: sanitizeInput(formData.get("instagram") as string || ""),
      weddingDate: sanitizeInput(formData.get("weddingDate") as string || ""),
      weddingCity: sanitizeInput(formData.get("weddingCity") as string || ""),
      weddingVenue: sanitizeInput(formData.get("weddingVenue") as string || ""),
      guestCount: sanitizeInput(formData.get("guestCount") as string || ""),
      weddingPlanner: sanitizeInput(formData.get("weddingPlanner") as string || ""),
      budget: sanitizeInput(formData.get("budget") as string || ""),
      weddingDetails: sanitizeInput(formData.get("weddingDetails") as string || ""),
      loveStory: sanitizeInput(formData.get("loveStory") as string || ""),
    };

    // Validaciones básicas
    if (!data.brideFullName || !data.groomFullName || !data.email || !data.weddingDate || !data.weddingCity) {
      return Response.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    if (!validateEmail(data.email)) {
      return Response.json({ error: "Email inválido" }, { status: 400 });
    }

    // Rate limiting
    const clientIP = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || 
                    request.headers.get("x-real-ip") || 
                    "unknown";
    
    if (isRateLimited(clientIP)) {
      return Response.json({ error: "Demasiados intentos. Por favor intenta más tarde." }, { status: 429 });
    }

    // Verificar que las variables de entorno existen
    if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL || !process.env.RESEND_TO_EMAIL) {
      console.error("Missing required environment variables");
      return Response.json({ error: "Configuración del servidor incompleta" }, { status: 500 });
    }

    // Enviar email con Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const emailContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            h2 { color: #BE9B5F; border-bottom: 2px solid #BE9B5F; padding-bottom: 10px; }
            h3 { color: #2C2A29; margin-top: 25px; }
            .field { margin: 15px 0; }
            .label { font-weight: bold; color: #4B5563; }
            .value { color: #2C2A29; margin-left: 10px; }
            .story { background: #F0EBE1; padding: 15px; border-radius: 8px; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Nuevo contacto - byfernandatovar.com</h2>
            
            <h3>Datos de la pareja:</h3>
            <div class="field">
              <span class="label">Novia:</span>
              <span class="value">${data.brideFullName}</span>
            </div>
            <div class="field">
              <span class="label">Novio:</span>
              <span class="value">${data.groomFullName}</span>
            </div>
            <div class="field">
              <span class="label">Email:</span>
              <span class="value">${data.email}</span>
            </div>
            <div class="field">
              <span class="label">Instagram:</span>
              <span class="value">${data.instagram || 'No especificado'}</span>
            </div>
            
            <h3>Detalles de la boda:</h3>
            <div class="field">
              <span class="label">Fecha:</span>
              <span class="value">${data.weddingDate}</span>
            </div>
            <div class="field">
              <span class="label">Ciudad:</span>
              <span class="value">${data.weddingCity}</span>
            </div>
            <div class="field">
              <span class="label">Venue:</span>
              <span class="value">${data.weddingVenue || 'No especificado'}</span>
            </div>
            <div class="field">
              <span class="label">Número de invitados:</span>
              <span class="value">${data.guestCount || 'No especificado'}</span>
            </div>
            <div class="field">
              <span class="label">Wedding Planner:</span>
              <span class="value">${data.weddingPlanner || 'No especificado'}</span>
            </div>
            <div class="field">
              <span class="label">Presupuesto estimado:</span>
              <span class="value">${data.budget || 'No especificado'}</span>
            </div>
            
            <h3>Historia:</h3>
            ${data.weddingDetails ? `
            <div class="story">
              <div class="label">Detalles de la boda:</div>
              <p>${data.weddingDetails}</p>
            </div>
            ` : ''}
            
            ${data.loveStory ? `
            <div class="story">
              <div class="label">Historia de amor:</div>
              <p>${data.loveStory}</p>
            </div>
            ` : ''}
          </div>
        </body>
      </html>
    `;

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: [process.env.RESEND_TO_EMAIL],
      subject: `Nuevo contacto: ${data.brideFullName} & ${data.groomFullName}`,
      html: emailContent,
    });

    return Response.json({ success: true, message: "Mensaje enviado correctamente" });

  } catch (error) {
    console.error("Error processing contact form:", error);
    return Response.json({ 
      error: "Error al procesar el formulario. Por favor intenta nuevamente." 
    }, { status: 500 });
  }
}
