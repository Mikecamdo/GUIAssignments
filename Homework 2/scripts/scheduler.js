(app => {

    // The "scheduler" is in charge of managing tutor schedules.

    // set properties: id, name and skills
    class Tutor {
        constructor(id, name, skills) {
            this.id = id
            this.name = name
            this.skills = skills
        }
    }

    // set properties: tutorId, day, name and notes
    class Appointment {
        constructor(tutorId, day, name, notes) {
            this.tutorId = tutorId
            this.day = day
            this.name = name
            this.notes = notes
        }
    }

    app.Tutor = Tutor;
    app.Appointment = Appointment;

    const tutors = [
        new Tutor(1, "John", [".NET", "Angular"]),
        new Tutor(2, "Mark", ["Vue", "Node"]),
        new Tutor(3, "Karen", ["Angular", "React"]),
        new Tutor(4, "Janet", ["REST Services", "SQL"]),
        new Tutor(5, "David", [".NET"])
    ];

    let appointments = [
        new Appointment(1, 'Monday', 'Sally', 'I need lots of Angular help!')
    ];

    // Add the following methods to app.scheduler....
    app.scheduler = {
        getTutors() { // ** getTutors() - returns all tutors
            return tutors;
        },

        getTutor(tutorId) { // ** getTutor(tutorId) - return tutor with given Id
            return tutors.find(function (tutor) {
                return tutor.id === tutorId;
            });
        },

        getAppointments() { // ** getAppointments() - return all appointments
            return appointments;
        },

        getAppointment(tutorId, day) { // ** getAppointment(tutorId, day) - return all appointments for given tutor and day
            return appointments.find(function (appointment) {
                return appointment.tutorId === tutorId && appointment.day === day;
            });
        },

        saveAppointment(appt) { // ** saveAppointment(appt) - add passed appointment to local variable
            appointments.push(appt);
        }
    };

})(app || (app = {}));