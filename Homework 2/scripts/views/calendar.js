(app => {

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday'];

    // Add the following method to app.calendarView....
    app.calendarView = {
        load (tutorId) { // ** load(tutorId)
            let tutor = app.scheduler.getTutor(tutorId); // - load tutor from app.scheduler using tutorId

            let calendar = document.getElementById("calendarView");
            let header = calendar.querySelector('h2'); // - select h2 tag and set its text to 'Schedule for [[Tutor Name]]'

            header.innerText = "Schedule for " + tutor.name;

            let returnButton = calendar.querySelector('button'); //Return button
            returnButton.onclick = function () {
                app.homeView.load();
            }

            days.forEach(function (day) { //- iterate through days collection (above) //for each day:
                let appointment = app.scheduler.getAppointment(tutorId, day); //- get appointment (if there is one) from app.scheduler using tutor.id and day

                let td = document.getElementById(day);     //- select td from DOM by its ID (should have been made the day name in your HTML)
                td.innerText = ""; //- clear the contents of the td (needed later when navigating back to this screen)

                if (appointment != null) { //- if appt exists, set the td's innerHTML to include the name and notes
                    td.innerHTML = '<span id="appointmentName">' + appointment.name + '</span>'
                    + '<span id="appointmentNotes">' + appointment.notes + '</span>';
                } else { //- else set the innerHTML of the td to include a 'Book Appointment' button
                    let button = document.createElement("button"); //- make sure your button has a type of "button" to prevent the page from reloading
                    button.innerText = "Book Appointment";
                    td.appendChild(button);

                    button.onclick = function () { //- button should call app.appointmentView.load() when clicked and pass the tutorId and day
                        app.appointmentView.load(tutorId, day);
                    }
                }
            });

            app._changeView("calendarView"); //- invoke app._changeView to show calendarView
        }

    };

})(app || (app = {}));