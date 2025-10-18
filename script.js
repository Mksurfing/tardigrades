var menuBtn = document.querySelector('.menu-btn');
var dropdown = document.querySelector('.dropdown-menu');

menuBtn.addEventListener('click', function(e) {
  e.stopPropagation();
  dropdown.classList.toggle('active'); // toggle sliding menu
});

// Close dropdown if clicking outside
document.addEventListener('click', function() {
  dropdown.classList.remove('activehf');
});

// Prevent closing when clicking inside menu
dropdown.addEventListener('click', function(e) {
  e.stopPropagation();
});