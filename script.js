document.addEventListener("DOMContentLoaded", (event) => {
    const errormsg = document.getElementById("error-message");
    const infomsg = document.getElementById("info-message");
    const namefield = document.getElementById("fname");
    const commentfield = document.getElementById("comment");
    const form = document.getElementById("contactform");
    /*const themebutton = document.getElementById("themebutton");
    const body = document.body;*/
    let form_errors = [];

    namefield.addEventListener("input", (event) => {
        if (namefield.validity.valid) {
            errormsg.textContent = "";
        } else {
            showError();
        }
    });

    commentfield.addEventListener("input", (event) => {
        if (commentfield.value.length == 1) {
            infomsg.textContent = `${commentfield.value.length} character typed;  ${commentfield.maxLength - commentfield.value.length} left`;
        } else {
            if (commentfield.value.length <= 49) {
                infomsg.style.color = "black";
            } 
            if (commentfield.value.length >= 50) {
                infomsg.style.color = "orange";
            } 
            if (commentfield.value.length >= 90) {
                infomsg.style.color = "red";
            } 
            infomsg.textContent = `${commentfield.value.length} characters typed; ${commentfield.maxLength - commentfield.value.length} left`;
        }
        if (commentfield.value.length < commentfield.minLength) {
            form_errors.push({field: "comment", error: "Typed less characters than the min length of 10."});
        }


    });

    function showError() {
        if (namefield.validity.patternMismatch) {
            errormsg.textContent = "Typed an illegal character.";
            setTimeout(() => {
                errormsg.textContent = "";
            }, 3000);
            form_errors.push({field: "fname", error: "Typed an illegal character."});
        } 
    }

    form.addEventListener("submit", (event) => {
        /*form_errors = [];
        if (namefield.validity.patternMismatch == true) {
            form_errors.push({field: "fname", error: "Typed an illegal character."});
        }

        if (commentfield.value.length < commentfield.minLength) {
            form_errors.push({field: "comment", error: "Typed less characters than the min length of 10."});
        }*/

        if (form_errors.length > 0) {
            const form_errorsinput = document.createElement("input");
            form_errorsinput.type = "hidden";
            form_errorsinput.name = "form-errors";
            form_errorsinput.value = JSON.stringify(form_errors);
            form.appendChild(form_errorsinput);
        }
    });

    /*const savedtheme = localStorage.getItem('theme');
    if (savedtheme) {
        body.setAttribute('data-theme', savedtheme);
        updatebuttontext(savedtheme);
    } else {
        body.setAttribute('data-theme', 'dark');
        updatebuttontext('dark')
    }

    themebutton.addEventListener("click", (event) => {
        const currenttheme = body.getAttribute('data-theme');
        let newtheme;
        if (currenttheme == 'dark') {
            newtheme = 'light';
        } else {
            newtheme = 'dark';
        }
        body.setAttribute('data-theme', newtheme);
        updatebuttontext(newtheme);
        localStorage.setItem('theme',newtheme);
    });

    function updatebuttontext(theme) {
        if (theme == 'dark') {
            themebutton.textContent = 'Dark Mode 🌙';
        } else {
            themebutton.textContent = 'Light Mode ☀️';
        }
    }*/

});