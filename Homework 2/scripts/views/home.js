(app => {

    var isLoaded;

    // Add the following method to app.homeView....
    app.homeView = {
        load() { // ** load()
            if (!isLoaded) { // - if !isLoaded
                let tutors = app.scheduler.getTutors(); // - get list of tutors from app.scheduler

                let profiles = document.getElementById("profileCards"); // - select profiles container from html
                let profileTemplate = document.querySelector("template"); // - select profiles template from html

                tutors.forEach(function (tutor) {
                    let newNode = profileTemplate.content.cloneNode(true); // - create clone of profile template's content // - hint: let newNode = profileTemplate.content.cloneNode(true);

                    let name = newNode.querySelector('h2');
                    name.innerText = tutor.name; // - select and populate clone's h2 element with tutor's name

                    let skills = newNode.querySelector('p');
                    skills.innerHTML = tutor.skills.map(x => '<span>' + x + '</span>').join(' '); // - select and populate clone's p element with tutor's skills array
                    // - (individual spans allow for styling)

                    let theButton = newNode.querySelector('button');
                    theButton.innerText = "View Schedule";
                    theButton.onclick = function() { // - select clone's button element and bind click event to app.calendarView.load() (passing tutorId)
                        app.calendarView.load(tutor.id);
                    };

                    profiles.append(newNode) // - append clone to profiles container
                });
                isLoaded = true; // - set isLoaded to true so the const list does not have to be loaded again
            }
            app._changeView('homeView') // - invoke app._changeView to show homeView (regardless of isLoaded status)
        }
    }

})(app || (app = {}));