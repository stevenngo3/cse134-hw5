document.addEventListener("DOMContentLoaded", (event) => {
    const themebutton = document.getElementById("themebutton");
    const body = document.body;

    const savedtheme = localStorage.getItem('theme');
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
    }
});