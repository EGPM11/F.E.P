const express = require('express');
const path = require('path');
const app = express();
const db = require('./root/js/db')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Serve static files from "assets", "view", and "js" folders
app.use(express.static(__dirname)); 
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'view')));
app.use(express.static(path.join(__dirname, 'root/js')));

// Route for index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

// Route for Appointments.html file
app.get('/view/Appointments.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'Appointments.html'));
});


// Route for Doctors.html file
app.get('/doctors', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'Doctors.html'));
});

// Route for Person.html file
app.get('/person', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'person.html'));
});

/////////////////////////////////////////////////
// Rutas para la tabla "doctors"
/////////////////////////////////////////////////

//obtener todos los doctores
app.get("/doctors/batch",(req,res) => {
    const query = "SELECT * FROM doctors";

    db.query(query,(error,results) => {
        if(error){
            req.statusCode(500).send("Error en la consulta a la base de datos");
            throw error;
        } else{
            console.log('results', results)
            res.json(results)
        }
    });
});

//obtener un doctor por ID

app.get("/doctors/:id",(req,res)=>{
    const query = "SELECT * FROM doctors WHERE id = ?";
    const id = req.params.id;

    db.query(query,[id], (error,results)=>{
        if(error){
            res.status(500).send("Error en la consulta a la base de datos");
            throw error;
        }else{
            if(results.length > 0){
                res.json(results[0]);
            }else{
                res.status(404).send("Doctor no encontrado")
            }
        }
    });
});

//crear un nuevo doctor
 
app.post("/doctors", (req, res) => {
    try {
        const newDoctor = req.body;
        const query = "INSERT INTO doctors (name, specialty, phone) VALUES (?, ?, ?)";

        console.log('newDoctor', newDoctor);

        db.query(query, [
            newDoctor?.name, 
            newDoctor?.specialty, 
            newDoctor?.phone
        ], (error, results) => {
            if (error) {
                res.status(500).send("Error en la inserción en la base de datos");
                throw error;
            } else {
                res.status(201).send("Doctor creado exitosamente");
            }
        });
    } catch (error) {
        console.log('error', error);
        res.status(500).send("Error en el servidor");
    }
});


// Actualizar un doctor

app.put("/doctors/:id", (req, res) => {
    const id = req.params.id;
    const updateDoctor = req.body;
    const query = "UPDATE doctors SET name = ?, specialty = ?, phone = ? WHERE id = ?";

    db.query(query, [updateDoctor.name, updateDoctor.specialty, updateDoctor.phone, id], (error, results) => {
        if (error) {
            res.status(500).send("Error en la actualización de la base de datos");
            throw error;
        } else {
            res.send("Doctor actualizado exitosamente");
        }
    });
});


//eliminar un doctor

app.delete("/doctors/:id",(req,res) =>{
    const id = req.params.id;
    const query = "DELETE FROM doctors WHERE id=?";

    db.query(query,[id],(error,results) =>{
        if(error){
            res.status(500).send("Error en la eliminacion de la base de datos")
        }else{
            res.send("Doctor eliminado exitosamnete");
        }
    });
});

/////////////////////////////////////////////////
// Rutas para la tabla "patients"
/////////////////////////////////////////////////

// Obtener los pacientes
app.get("/patients/batch", (req, res) => {
    const query = "SELECT * FROM patients";

    db.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ message: "Error en la consulta a la base de datos", error: error });
        } else {
            res.json(results);
        }
    });
});
// Obtener paciente por ID
app.get("/patients/:id", (req, res) => {
    const query = "SELECT * FROM patients WHERE id = ?";
    const id = req.params.id;

    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).send("Error en la consulta a la base de datos");
            throw error;
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).send("Paciente no encontrado");
            }
        }
    });
});

// Crear un nuevo paciente
app.post("/patients", (req, res) => {
    try {
        const newPatient = req.body;
        const query = "INSERT INTO patients (name, address, phone) VALUES (?, ?, ?)";

        db.query(query, [
            newPatient?.name, 
            newPatient?.address, 
            newPatient?.phone
        ], (error, results) => {
            if (error) {
                res.status(500).send({ message: "Error en la inserción en la base de datos" });
                throw error;
            } else {
                // Cambia el formato de respuesta a JSON
                res.status(201).json({ message: "Paciente creado exitosamente", patient: newPatient });
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
});



// Actualizar paciente
app.put("/patients/:id", (req, res) => {
    const id = req.params.id;
    const updatePatient = req.body;
    const query = "UPDATE patients SET name = ?, address = ?, phone = ? WHERE id = ?";  

    db.query(query, [updatePatient.name, updatePatient.address, updatePatient.phone, id], (error, results) => {
        if (error) {
            res.status(500).send("Error en la actualización de la base de datos");
            throw error;
        } else {
            res.send("Paciente actualizado exitosamente");
        }
    });
});


// Eliminar un paciente
app.delete("/patients/:id", (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM patients WHERE id = ?";

    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).send("Error en la eliminación de la base de datos");
            throw error;
        } else {
            res.send("Paciente eliminado exitosamente");
        }
    });
})

/////////////////////////////////////////////////
// Rutas para la tabla "appointments"
/////////////////////////////////////////////////

// Obtener todas las citas
app.get("/appointments", (req, res) => {
    const query = "SELECT * FROM appointments";
    
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error: "Error en la consulta a la base de datos" });
        } else {
            res.json(results); // Enviar los resultados como JSON
        }
    });
});

// Obtener una cita por ID
app.get("/appointments/:id", (req, res) => {
    const query = "SELECT * FROM appointments WHERE id = ?";
    const id = req.params.id;

    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).send("Error en la consulta a la base de datos");
            throw error;
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).send("Cita no encontrada");
            }
        }
    });
});

// Crear una nueva cita
app.post("/appointments", (req, res) => {
    const newAppointment = req.body;
    const query = "INSERT INTO appointments (patient_name, doctor_name, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?, ?)";

    db.query(query, [newAppointment.patientName, newAppointment.doctorName, newAppointment.appointmentDate, newAppointment.appointmentTime, newAppointment.status], (error, results) => {
        if (error) {
            res.status(500).send("Error en la inserción en la base de datos");
            throw error;
        } else {
            res.status(201).send("Cita creada exitosamente");
        }
    });
});


// Actualizar una cita
app.put("/appointments/:id", (req, res) => {
    const id = req.params.id;
    const updatedAppointment = req.body;
    const query = "UPDATE appointments SET patient_id = ?, doctor_id = ?, date = ? WHERE id = ?";

    db.query(query, [updatedAppointment.patient_id, updatedAppointment.doctor_id, updatedAppointment.date, id], (error, results) => {
        if (error) {
            res.status(500).send("Error en la actualización de la base de datos");
            throw error;
        } else {
            res.send("Cita actualizada exitosamente");
        }
    });
});

// Eliminar una cita
app.delete("/appointments/:id", (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM appointments WHERE id = ?";

    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).send("Error en la eliminación de la base de datos");
            throw error;
        } else {
            res.send("Cita eliminada exitosamente");
        }
    });
});



// Add additional routes for other HTML files if necessary

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});