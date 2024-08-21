function toggleMenu() {
  var navbarLinks = document.getElementById("navbar-links");
  var toggleButton = document.getElementById("toggle-button");

  if (navbarLinks.classList.contains("active")) {
      navbarLinks.classList.remove("active");
      toggleButton.innerHTML = "&#9776;"; // Change to hamburger menu
  } else {
      navbarLinks.classList.add("active");
      toggleButton.innerHTML = "&times;"; // Change to 'X'
  }
}
