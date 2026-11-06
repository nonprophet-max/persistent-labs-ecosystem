(()=>{
 'use strict';
 const chapters=[...document.querySelectorAll('article.chapter')];
 const ids=chapters.map(chapter=>chapter.id);
 const labels=['Overview','Funding','Economics','Team & ownership','Mandates','Delivery & KPIs','Ecosystem'];
 const shortLabels=['Overview','Funding','Economics','Team','Mandates','Delivery','Ecosystem'];
 const back=document.getElementById('back-button');
 const next=document.getElementById('next-button');
 const select=document.getElementById('chapter-select');
 let active=0;
 function currentIndex(){try{return ids.indexOf(decodeURIComponent(location.hash.slice(1)));}catch{return -1;}}
 function render(focus=false){
  active=currentIndex();
  if(active<0){active=0;history.replaceState(null,'','#overview');}
  chapters.forEach((chapter,index)=>{chapter.hidden=index!==active;chapter.classList.toggle('active',index===active);});
  document.querySelectorAll('.chapter-nav a').forEach(link=>{
   if(link.hash==='#'+ids[active])link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');
  });
  select.value=ids[active];back.disabled=active===0;next.disabled=active===ids.length-1;
  const progressName=document.createElement('span');progressName.className='progress-name';progressName.textContent=shortLabels[active];
  const progressCount=document.createElement('span');progressCount.className='progress-count';progressCount.textContent=(active+1)+' of '+ids.length;
  document.getElementById('progress-label').replaceChildren(progressName,document.createTextNode(' '),progressCount);
  document.title=labels[active]+' — Alatau Onsite';
  window.scrollTo({top:0,behavior:'instant'});
  if(focus)chapters[active].querySelector('h1').focus({preventScroll:true});
 }
 function move(delta){const current=currentIndex();const index=(current<0?active:current)+delta;if(index>=0&&index<ids.length)location.hash=ids[index];}
 back.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
 select.addEventListener('change',()=>{location.hash=select.value;});
 document.querySelector('.skip-link').addEventListener('click',event=>{event.preventDefault();document.getElementById('main').focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});});
 window.addEventListener('hashchange',()=>render(true));
 document.addEventListener('keydown',event=>{
  if(event.altKey||event.ctrlKey||event.metaKey||event.target.closest('input,textarea,select,details,[contenteditable="true"]'))return;
  if(event.key==='ArrowRight'){event.preventDefault();move(1);}
  if(event.key==='ArrowLeft'){event.preventDefault();move(-1);}
 });
 document.documentElement.classList.add('enhanced');render();
})();
