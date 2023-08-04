import QRCode from 'qrcode';

export interface ContactData {
  name: string;
  phone: string;
  email: string;
  title?: string;
  location?: string;
}

export const convertBase64ToBlob = (base64String: string) => {
  const byteString = atob(base64String.split(',')[1]);
  const mimeString = base64String.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

const generateContactQRCode = async (contactData: ContactData): Promise<string> => {
  try {
    let qrCodeData = `BEGIN:VCARD\nVERSION:3.0\nFN:${contactData.name}\nTEL:${contactData.phone}\nEMAIL:${contactData.email}`;

    if (contactData.title) {
      qrCodeData += `\nTITLE:${contactData.title}`;
    }

    if (contactData.location) {
      qrCodeData += `\nADR:${contactData.location}`;
    }

    qrCodeData += '\nEND:VCARD';
    
    const base64 = await QRCode.toDataURL(qrCodeData);
    return base64;
  } catch (error) {
    console.error('Ошибка при создании QR-кода:', error);
    throw error;
  }
};

export default generateContactQRCode;
