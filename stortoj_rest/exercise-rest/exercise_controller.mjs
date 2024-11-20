

import 'dotenv/config';
import * as exercise from './exercise_model.mjs';
import asyncHandler from 'express-async-handler';
import express from 'express';
import { body, validationResult } from "express-validator";
import cors from 'cors';  // Import CORS

const PORT = process.env.PORT;

const app = express();

// Enable CORS for all domains (or configure more specifically)
app.use(cors());
app.use(express.json());

// POST route to create an appointment
app.post("/appointments", 
    body("firstName").notEmpty(),
    body("lastName").notEmpty(),
    body("doctorName").notEmpty(),
    body("date").matches(/^(((0)\d)|((1)[0-2]))(-)([0-2]\d|(3)[0-1])(-)\d{2}$/),
    body("time").matches(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/), 

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error(errors.array()); // Log errors
            return res.status(400).json({ errors: errors.array() }); // Send back the error details to the frontend
        }

        // Create an appointment
        exercise.createAppointment(
            req.body.firstName,
            req.body.lastName,
            req.body.doctorName,
            req.body.date,
            req.body.time
        )
        .then(appointment => {
            res.status(201).json(appointment);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: "Failed to create appointment" });
        });
    });

// Retrieve all appointments
app.get('/appointments', asyncHandler (async (req, res) => {
    try{
        const appointmentList = await exercise.findAppointments({}, '', 0); // Fetch all appointments
        res.status(200).json(appointmentList); // Return the appointments list as JSON
    } catch (error) {
        console.error(error);
        res.status(400).json({ Error: 'Request Failed' });
    }
}));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});