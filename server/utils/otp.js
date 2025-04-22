const twilio = require('twilio');

const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = Date.now() + parseInt(process.env.OTP_EXPIRY) || 600000;
  return { otp, expiry };
};

const sendOTP = async (mobile, otp) => {
  try {
    // Validate mobile number format
    const formattedMobile = mobile.startsWith('+') ? mobile : `+91${mobile}`;
    
    const client = twilio(
      process.env.TWILIO_SID,
      process.env.TWILIO_AUTH_TOKEN
      
    );

    const message = await client.messages.create({
      body: `Your Election Portal OTP is: ${otp}. Valid for 10 minutes.`,
      from: process.env.TWILIO_PHONE,
      to: formattedMobile
    });

    console.log(`OTP sent to ${formattedMobile}: ${message.sid}`);
    return true;
  } catch (error) {
    console.error('Twilio error:', error.message);
    // Fallback to console log in development
    if (process.env.NODE_ENV !== 'production') {
      console.log(`DEV OTP for ${mobile}: ${otp}`);
      return true;
    }
    throw new Error('Failed to send OTP');
  }
};

module.exports = { generateOTP, sendOTP };
