const otpStore = new Map();

function generateOTP() {
    return String(Math.floor(100000 + Math.random() * 900000));
}

function saveOTP(email, otp) {
    otpStore.set(email, {
        otp,
        status: "pending",
        createdAt: new Date().toISOString(),
        verifiedAt: null,
    });
}

function verifyOTP(email, otp) {
    const session = otpStore.get(email);

    if (session && session.otp === String(otp)) {
        session.status = "verified";
        session.verifiedAt = new Date().toISOString();
        session.otp = null; // consumed — nothing left to leak once verified

        return true;
    }

    return false;
}

function getAllSessions() {
    return Array.from(otpStore.entries())
        .map(([email, session]) => ({ email, ...session }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

module.exports = {
    generateOTP,
    saveOTP,
    verifyOTP,
    getAllSessions,
};
