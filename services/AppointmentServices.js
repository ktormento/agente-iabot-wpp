const Appointment = require("../models/Appoiment");

async function createAppointment(phone, type, date, hour) {
    const appointment = new Appointment({
        phone,
        type,
        date,
        hour
    });

    await appointment.save();
    return appointment;

}

module.exports = { createAppointment };