<script>
(function(){
const cv=document.getElementById('bokeh'),spot=document.getElementById('spot');if(!cv)return;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,ctx=cv.getContext('2d');
let W=0,H=0,P=[],mx=0,my=0,tx=0,ty=0,lastSX=1e9,lastSY=1e9;
// pre-rendered glow sprites: one gradient each, reused by every particle
function sprite(c,big){const s=document.createElement('canvas');s.width=s.height=64;const g=s.getContext('2d');
  const gr=g.createRadialGradient(32,32,0,32,32,32);
  gr.addColorStop(0,`rgba(${c},1)`);gr.addColorStop(big?.7:.35,`rgba(${c},${big?.8:.35})`);gr.addColorStop(1,`rgba(${c},0)`);
  g.fillStyle=gr;g.fillRect(0,0,64,64);return s;}
const SP=[[sprite('255,120,110',0),sprite('255,120,110',1)],[sprite('255,214,170',0),sprite('255,214,170',1)]];
function size(){W=cv.clientWidth;H=cv.clientHeight;cv.width=W;cv.height=H;
  const n=Math.round(Math.min(64,W*H/20000));P=[];
  for(let i=0;i<n;i++){const z=Math.random();P.push({x:Math.random()*W,y:Math.random()*H,z,r:(z<.75?1+z*3:6+Math.random()*16),
    vx:(Math.random()-.5)*6,vy:-(3+Math.random()*10),ph:Math.random()*6.28,warm:Math.random()<.8?1:0});}}
size();let rs=0;addEventListener('resize',()=>{clearTimeout(rs);rs=setTimeout(size,150);});
addEventListener('pointermove',e=>{tx=e.clientX/innerWidth-.5;ty=e.clientY/innerHeight-.5;},{passive:true});
let last=performance.now(),lastDraw=0;
function frame(now){requestAnimationFrame(frame);
  if(window.__pgOpen||now-lastDraw<32)return;          // ~30fps is plenty for slow drifting light; paused behind inner pages
  const dt=Math.min(.06,(now-last)/1000);last=now;lastDraw=now;
  mx+=(tx-mx)*.08;my+=(ty-my)*.08;
  const sx=Math.round(mx*1400)/100,sy=Math.round(my*1000)/100;
  if(sx!==lastSX||sy!==lastSY){spot.style.transform=`translate3d(${sx}vw,${sy}vh,0)`;lastSX=sx;lastSY=sy;}
  ctx.clearRect(0,0,W,H);ctx.globalCompositeOperation='lighter';
  for(const p of P){if(!reduce){p.x+=p.vx*dt*(.4+p.z);p.y+=p.vy*dt*(.4+p.z);p.ph+=dt*.8;}
    if(p.y<-30){p.y=H+30;p.x=Math.random()*W;}if(p.x<-30)p.x=W+30;if(p.x>W+30)p.x=-30;
    const X=p.x-mx*40*(p.z+.2),Y=p.y-my*30*(p.z+.2),fl=.55+.45*Math.sin(p.ph);
    const big=p.r>5,R=p.r*(big?1:2.4);
    ctx.globalAlpha=Math.max(0,(big?.15:.7)*fl*(1-Math.abs(Y/H-.45)*.6));
    ctx.drawImage(SP[p.warm][big?1:0],X-R,Y-R,R*2,R*2);}
  ctx.globalAlpha=1;}
requestAnimationFrame(frame);
})();
</script>