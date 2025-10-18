const menuBtn = document.querySelector('.menu-btn');
const dropdown = document.querySelector('.dropdown-menu');
menuBtn.addEventListener('click', ()=>{ 
  dropdown.classList.toggle('active'); 
});
document.addEventListener('click',(e)=>{
  if(!menuBtn.contains(e.target) && !dropdown.contains(e.target)){
    dropdown.classList.remove('active');
  }
});