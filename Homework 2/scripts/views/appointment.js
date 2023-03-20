(app => {

    let selected;

    // Add the following methods to app.appointmentView....
    app.appointmentView = {
        load (tutorId, day) { // ** load(tutorId, day)
            selected = [ ];
            selected.push(tutorId); //- store tutorId and day on selected variable above
            selected.push(day);

            app._changeView("appointmentView") //- load appointmentView using app._changeView

            let cancelButton = document.getElementById("cancel"); //Cancel button
            cancelButton.onclick = function () {
                let name = document.getElementById("name"); //Get name text box
                let notes = document.getElementById("notes"); //Get notes text box

                name.value = ""; //Clear name text box
                notes.value = ""; //Clear notes text box

                app.homeView.load();
            }

            let bookButton = document.getElementById("book"); //Book button
            bookButton.onclick = function () {
                app.appointmentView.save();
            }
        },

        save() { // ** save()
            let name = document.getElementById("name"); //- select DOM elements for name (input) and notes (textarea)
            let notes = document.getElementById("notes");

            let tutorId = selected[0];
            let day = selected[1];

            let appointment = new app.Appointment(tutorId, day, name.value, notes.value); //- create new Appointment using values on selected variables and the form values submitted
            app.scheduler.saveAppointment(appointment); //- pass appointment to app.scheduler.saveAppointment

            name.value = ""; //- clear the two form element values
            notes.value = "";

            app.calendarView.load(tutorId); //- navigate back to calendar using app.calendarView.load with the selected tutorId
        }
    };

})(app || (app = {}));