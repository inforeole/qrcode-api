// api/qr.js
import QRCode from 'qrcode';

export default async function handler(request, response) {
  const { text } = request.query;

  if (!text || typeof text !== 'string') {
    return response.status(400).send('Error: Missing text parameter');
  }

  try {
    const qrBuffer = await QRCode.toBuffer(text, {
      errorCorrectionLevel: 'H',
      width: 512,
      margin: 1
    });

    response.setHeader('Content-Type', 'image/png');
    response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    
    return response.send(qrBuffer);
  } catch (error) {
    return response.status(500).send('Error generating QR code');
  }
}
