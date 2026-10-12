const toggle=document.querySelector('.mobile-toggle');
const nav=document.querySelector('.navlinks');
if(toggle&&nav){toggle.addEventListener('click',()=>nav.classList.toggle('open'));nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')))}
document.getElementById('year').textContent=new Date().getFullYear();
