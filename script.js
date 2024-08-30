document.addEventListener('DOMContentLoaded', function () {
    var toggleButton = document.querySelector('#toggle-button');
    var navbarLinks = document.querySelector('#navbar-links');

    toggleButton.addEventListener('click', function () {
        if (navbarLinks.classList.contains('active')) {
            navbarLinks.classList.remove('active');
            toggleButton.innerHTML = '&#9776;'; // Change to hamburger menu
        } else {
            navbarLinks.classList.add('active');
            toggleButton.innerHTML = '&times;'; // Change to 'X'
        }
    });
});
