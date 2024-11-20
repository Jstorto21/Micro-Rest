Appointment Scheduling Microservice
This microservice provides an API for scheduling and managing doctor appointments. It allows clients to request appointment data and receive data through specified endpoints.

Communication Contract
The following defines the contract between your application and the appointment scheduling microservice:

The POST /appointments endpoint allows clients to create new appointments.
The GET /appointments endpoint allows clients to retrieve all existing appointments.
This contract defines how data will be sent and received between your application and the microservice. Do not change it once defined, as your teammate will rely on it.


API Endpoints
1. Programmatically REQUEST Data: GET /appointments
To request appointment data from the microservice, you can make a GET request to the /appointments endpoint.

Example Request:
bash
Copy code
GET http://<your-microservice-url>/appointments
Replace <your-microservice-url> with the actual URL of your microservice.

Example Code to Call the API:
You can use JavaScript (using fetch) to make the GET request and retrieve appointment data:


. Programmatically RECEIVE Data: POST /appointments
To receive appointment data from the microservice, you must send a POST request to the /appointments endpoint. This request will create a new appointment.

Required Data:
firstName: The patient's first name (string)
lastName: The patient's last name (string)
doctorName: The doctor's full name (string)
date: The appointment date in the format MM-DD-YY (string)
time: The appointment time in the format HH:mm (string)
Example Request Body:

Notes
CORS Support: This microservice supports CORS, allowing it to be accessed from different origins (e.g., a frontend application hosted on a different domain).
Validation: The POST /appointments route validates the input fields. If any required field is missing or in an incorrect format, the request will return a 400 status with an error message. Ensure that the date is in the MM-DD-YY format, and the time is in the HH:mm format.
MongoDB: The appointments are stored in MongoDB using Mongoose ORM. The createAppointment function saves new appointments, and the findAppointments function retrieves appointments based on search criteria.
