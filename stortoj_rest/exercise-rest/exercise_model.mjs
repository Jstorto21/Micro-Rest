import mongoose from 'mongoose';

// Connect to MongoDB
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

// Connect to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema for appointments
 */
const appointmentSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    doctorName: { type: String, required: true },
    date: { type: String, required: true, match: /\d{2}-\d{2}-\d{2}/ },  // MM-DD-YY format
    time: { type: String, required: true, match: /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/ }  // HH:MM format
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Appointment = mongoose.model("appointments", appointmentSchema);

/**
 * Create a new appointment
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} doctorName
 * @param {string} date
 * @param {string} time
 */
const createAppointment = async (firstName, lastName, doctorName, date, time) => {
    const appointment = new Appointment({ firstName, lastName, doctorName, date, time });
    return appointment.save();
}

/**
 * Find appointments based on filter, projection, and limit
 * @param {Object} filter - Criteria for searching appointments
 * @param {string} projection - Fields to include or exclude
 * @param {number} limit - Maximum number of results to return
 */
const findAppointments = async (filter, projection, limit) => {
    const query = Appointment.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
}

/**
 * Find an appointment by its ID
 * @param {string} _id - The appointment's ID
 */
const findAppointmentByID = async (_id) => {
    const query = Appointment.findById(_id);
    return query.exec();
}

/**
 * Replace an appointment by its ID
 * @param {string} _id - The appointment's ID
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} doctorName
 * @param {string} date
 * @param {string} time
 */
const replaceAppointment = async (_id, firstName, lastName, doctorName, date, time) => {
    const result = await Appointment.replaceOne(
        { _id: _id },
        { firstName, lastName, doctorName, date, time }
    );
    return result.modifiedCount;
}

/**
 * Delete an appointment by its ID
 * @param {string} id - The appointment's ID
 */
const deletedByID = async (id) => {
    const result = await Appointment.deleteOne({ _id: id });
    return result.deletedCount;
}

export { findAppointments, findAppointmentByID, createAppointment, replaceAppointment, deletedByID };