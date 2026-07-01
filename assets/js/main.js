// Setter Industries Website v1.0 - shared JavaScript

document.addEventListener('DOMContentLoaded',function(){
  var page=window.location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(a){
    if(a.getAttribute('href').split('/').pop()===page)a.classList.add('active');
  });
  window.addEventListener('scroll',function(){
    document.getElementById('mainNav').classList.toggle('scrolled',window.scrollY>60);
  });
  var ham=document.getElementById('hamburger'),mob=document.getElementById('mobileMenu');
  if(ham&&mob){
    ham.addEventListener('click',function(){ham.classList.toggle('open');mob.classList.toggle('open');});
    mob.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){ham.classList.remove('open');mob.classList.remove('open');});});
  }
  var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:0.08});
  document.querySelectorAll('.fade-in').forEach(function(el){obs.observe(el);});
});

(function(){
  var c=document.getElementById('heroCanvas'); if(!c) return; var ctx=c.getContext('2d');
  var W,H,nodes=[],mouse={x:-999,y:-999};
  function resize(){W=c.width=c.offsetWidth;H=c.height=c.offsetHeight;}
  function Node(){this.x=Math.random()*W;this.y=Math.random()*H;this.vx=(Math.random()-.5)*.3;this.vy=(Math.random()-.5)*.3;this.r=Math.random()*1.6+.5;this.g=Math.random()>.65;this.p=Math.random()*Math.PI*2;}
  function init(){nodes=[];for(var i=0;i<70;i++)nodes.push(new Node());}
  function draw(){
    ctx.clearRect(0,0,W,H);
    for(var i=0;i<nodes.length;i++){
      var n=nodes[i];
      for(var j=i+1;j<nodes.length;j++){var m=nodes[j],dx=n.x-m.x,dy=n.y-m.y,d=Math.sqrt(dx*dx+dy*dy);if(d<158){var op=(1-d/158)*.14;ctx.strokeStyle=(n.g?'rgba(201,162,39,':'rgba(42,114,216,')+op+')';ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();}}
      var dx=n.x-mouse.x,dy=n.y-mouse.y,d=Math.sqrt(dx*dx+dy*dy);
      if(d<185){ctx.strokeStyle='rgba(201,162,39,'+(0.4*(1-d/185))+')';ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(mouse.x,mouse.y);ctx.stroke();}
      n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>W)n.vx*=-1;if(n.y<0||n.y>H)n.vy*=-1;
      n.p+=.02;var pr=n.r*(1+.2*Math.sin(n.p));
      ctx.beginPath();ctx.arc(n.x,n.y,pr,0,Math.PI*2);ctx.fillStyle=n.g?'rgba(201,162,39,.85)':'rgba(42,114,216,.85)';ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize',function(){resize();init();});
  document.addEventListener('mousemove',function(e){var r=document.getElementById('hero').getBoundingClientRect();mouse.x=e.clientX;mouse.y=e.clientY-r.top;});
  resize();init();draw();
})();

// Tab switching - more prominent
document.querySelectorAll('.wtab').forEach(function(tab){
  tab.addEventListener('click',function(){
    document.querySelectorAll('.wtab').forEach(function(t){t.classList.remove('active');});
    document.querySelectorAll('.wpanel').forEach(function(p){p.classList.remove('active');});
    tab.classList.add('active');
    document.getElementById('panel-'+tab.dataset.panel).classList.add('active');
  });
});

// Tile expand/collapse
// A tile only closes when the minimise button is pressed, or when another tile is selected.
document.querySelectorAll('.tile').forEach(function(tile){
  tile.addEventListener('click',function(e){
    if(e.target.closest('iframe')||e.target.closest('button')||e.target.closest('.project-carousel')||e.target.tagName==='A') return;
    if(tile.classList.contains('open')) return;
    var panel=tile.closest('.wpanel');
    panel.querySelectorAll('.tile').forEach(function(t){
      t.classList.remove('open');
      var hint=t.querySelector('.tile-click-hint');
      if(hint) hint.textContent='Click to expand';
    });
    tile.classList.add('open');
    var hint=tile.querySelector('.tile-click-hint');
    if(hint) hint.textContent='Details open';
    tile.scrollIntoView({behavior:'smooth',block:'start'});
  });
});

// Minimise button inside expanded project panels
document.querySelectorAll('.tile-collapse').forEach(function(btn){
  btn.addEventListener('click',function(e){
    e.preventDefault();
    e.stopPropagation();
    var tile=btn.closest('.tile');
    if(tile){
      tile.classList.remove('open');
      var hint=tile.querySelector('.tile-click-hint');
      if(hint) hint.textContent='Click to expand';
      tile.scrollIntoView({behavior:'smooth',block:'center'});
    }
  });
});


// External demo embeds
// Demos are stored in assets/demos for the v1.0 project structure.
(function(){
  var demoMap={
    'fr-imgrec':'assets/demos/setter_tis_demo.html',
    'fr-dcm':'assets/demos/dcm_demo.html'
  };
  Object.keys(demoMap).forEach(function(id){
    var fr=document.getElementById(id);
    if(fr && !fr.getAttribute('src')) fr.setAttribute('src',demoMap[id]);
    if(fr) fr.setAttribute('scrolling','no');
  });
})();

// Wargaming image carousel and full-screen image viewer
(function(){
  var carousels=document.querySelectorAll('.project-carousel');
  var lightbox=document.getElementById('imageLightbox');
  var activeImages=[], activeIndex=0;

  function setCarousel(carousel,index){
    var slides=Array.prototype.slice.call(carousel.querySelectorAll('.carousel-slide'));
    if(!slides.length) return;
    index=(index+slides.length)%slides.length;
    carousel.dataset.index=index;
    slides.forEach(function(s,i){s.classList.toggle('active',i===index);});
    var cap=carousel.querySelector('.carousel-caption');
    var fig=slides[index].querySelector('figcaption');
    if(cap&&fig) cap.textContent=fig.textContent;
  }

  carousels.forEach(function(carousel){
    carousel.dataset.index='0';
    var slides=Array.prototype.slice.call(carousel.querySelectorAll('.carousel-slide'));
    carousel.querySelector('.carousel-prev').addEventListener('click',function(e){e.stopPropagation();setCarousel(carousel,parseInt(carousel.dataset.index||'0',10)-1);});
    carousel.querySelector('.carousel-next').addEventListener('click',function(e){e.stopPropagation();setCarousel(carousel,parseInt(carousel.dataset.index||'0',10)+1);});
    slides.forEach(function(slide,i){
      var img=slide.querySelector('img');
      img.addEventListener('click',function(e){
        e.stopPropagation();
        activeImages=slides.map(function(s){var im=s.querySelector('img'),fc=s.querySelector('figcaption');return {src:im.src,alt:im.alt,cap:fc?fc.textContent:''};});
        activeIndex=i;
        openLightbox();
      });
    });
    setInterval(function(){
      if(document.hidden) return;
      var tile=carousel.closest('.tile');
      if(tile && !tile.classList.contains('open')) return;
      setCarousel(carousel,parseInt(carousel.dataset.index||'0',10)+1);
    },4500);
  });

  function openLightbox(){
    if(!lightbox||!activeImages.length) return;
    var item=activeImages[activeIndex];
    var img=lightbox.querySelector('img');
    img.src=item.src; img.alt=item.alt||'';
    lightbox.querySelector('.lightbox-caption').textContent=item.cap||'';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
  }
  function closeLightbox(){
    if(!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden','true');
  }
  function stepLightbox(delta){
    if(!activeImages.length) return;
    activeIndex=(activeIndex+delta+activeImages.length)%activeImages.length;
    openLightbox();
  }
  if(lightbox){
    lightbox.querySelector('.lightbox-close').addEventListener('click',closeLightbox);
    lightbox.querySelector('.lightbox-prev').addEventListener('click',function(e){e.stopPropagation();stepLightbox(-1);});
    lightbox.querySelector('.lightbox-next').addEventListener('click',function(e){e.stopPropagation();stepLightbox(1);});
    lightbox.addEventListener('click',function(e){if(e.target===lightbox) closeLightbox();});
    document.addEventListener('keydown',function(e){
      if(!lightbox.classList.contains('open')) return;
      if(e.key==='Escape') closeLightbox();
      if(e.key==='ArrowLeft') stepLightbox(-1);
      if(e.key==='ArrowRight') stepLightbox(1);
    });
  }
})();
