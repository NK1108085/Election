const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = Date.now() + 600000; // 10 minutes
  return { otp, expiry };
};

// For development only - log OTP to console
const sendOTP = async (mobile, otp) => {
  console.log(`OTP for ${mobile}: ${otp}`);
  return true;
};

module.exports = { generateOTP, sendOTP };