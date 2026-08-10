const { generateOTP, saveOTP, verifyOTP } = require("../services/otpService");

exports.sendOTP = (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            error: "Email is required",
        });
    }

    const otp = generateOTP();

    saveOTP(email, otp);

    console.log(`OTP for ${email}: ${otp}`);

    res.json({
        success: true,
        message: "OTP sent successfully",
    });
};

exports.verifyOTP = (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({
            success: false,
            error: "Email and OTP are required",
        });
    }

    const valid = verifyOTP(email, otp);

    if (!valid) {
        return res.status(400).json({
            success: false,
            error: "Invalid OTP",
        });
    }

    res.json({
        success: true,
        message: "OTP verified successfully",
    });
};
