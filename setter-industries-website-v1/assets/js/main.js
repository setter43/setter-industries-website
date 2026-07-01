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
document.querySelectorAll('.tile').forEach(function(tile){
  tile.addEventListener('click',function(e){
    if(e.target.closest('iframe')||e.target.closest('button')||e.target.tagName==='A') return;
    var wasOpen=tile.classList.contains('open');
    // Collapse all tiles in this panel
    var panel=tile.closest('.wpanel');
    panel.querySelectorAll('.tile').forEach(function(t){
      t.classList.remove('open');
      var hint=t.querySelector('.tile-click-hint');
      if(hint) hint.textContent='Click to expand';
    });
    if(!wasOpen){
      tile.classList.add('open');
      var hint=tile.querySelector('.tile-click-hint');
      if(hint) hint.textContent='Click to collapse';
      tile.scrollIntoView({behavior:'smooth',block:'start'});
    }
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