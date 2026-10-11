import re,base64
s=open('v26.html').read()
def rep(old,new,count=1):
    global s
    n=s.count(old)
    assert n>=1,('missing',old[:80])
    s=s.replace(old,new,count)
# CSS
s=s.replace('</style>\n</head>',open('np/new.css').read()+'</style>\n</head>',1)
# bar / ghost / likes / motto
rep('ILLUSTRATION · DESIGN · DREAM','ILLUSTRATION · DESIGN')
rep('<div class="ghost" aria-hidden="true">DREAM</div>','<div class="ghost" aria-hidden="true">YU HSIN</div>')
s=re.sub(r'\s*<div class="likes">.*?</div>\n','\n',s,count=1,flags=re.S)
s=re.sub(r'\s*<div class="motto">.*?</div>\n','\n',s,count=1,flags=re.S)
assert 'class="likes"' not in s.split('<body')[1] and 'class="motto"' not in s.split('<body')[1]
# sky: static background layer + moving light
rep('<div class="sky" aria-hidden="true"><div class="spot" id="spot"></div>','<div class="sky" aria-hidden="true"><div class="bgl"></div><div class="spot" id="spot"></div>')
# poses
b64=lambda p:'data:image/webp;base64,'+base64.b64encode(open(p,'rb').read()).decode()
ST=['left:-68.059%;top:-2.645%;width:234.527%;height:105.736%','left:-72.394%;top:-3.180%;width:234.527%;height:105.736%',
    'left:-70.639%;top:-4.020%;width:234.527%;height:105.736%','left:-81.891%;top:-4.708%;width:234.527%;height:105.736%']
imgs=''.join(f'<img class="pose" data-p="{k}" alt="" decoding="async" style="{ST[k]}" src="{b64(f"np/p{k+1}.webp")}">' for k in range(4))
s,n=re.subn(r'<img class="pose" id="poseImg"[^>]*>',lambda m:imgs,s,count=1);assert n==1
# modal -> page shell (reuse the sitting figure)
sit=re.search(r'<img class="sit" src="([^"]+)"',s).group(1)
shell=f'''<div class="pg" id="pg" role="dialog" aria-modal="true" aria-labelledby="pgT" aria-hidden="true">
  <div class="pg-top"><button class="pg-back" id="pgBack">← 回到選單</button><span class="pg-k" id="pgK"></span><h2 id="pgT"></h2><span class="pg-crumb" id="pgCr"></span><img class="pg-sit" alt="" src="{sit}"><button class="pg-x" id="pgX" aria-label="關閉">✕</button></div>
  <div class="pg-body" id="pgB"></div>
</div>'''
s,n=re.subn(r'<div class="modal" id="modal".*?\n</div>\n',lambda m:shell+'\n',s,count=1,flags=re.S);assert n==1
# bokeh script
s,n=re.subn(r"<script>\n\(function\(\)\{\nconst cv=document.getElementById\('bokeh'\).*?</script>",lambda m:open('np/bokeh.js').read(),s,count=1,flags=re.S);assert n==1
# tickets data
newT='''const T=[
  {n:'01',t:'關於我',e:'ABOUT ME',s:'慢熟・真誠・天然呆',x:'0',y:'0',r:'-4deg'},
  {n:'02',t:'我的專題',e:'PROJECT',s:'智慧太陽能新策略',x:'0',y:'0',r:'3deg'},
  {n:'03',t:'作品集',e:'WORKS',s:'插畫・貼圖・動畫',x:'0',y:'0',r:'-3deg'},
  {n:'04',t:'獎項 & 經歷',e:'HONORS & EXP.',s:'競賽・活動・工作坊',x:'0',y:'0',r:'4deg'}
];'''
s,n=re.subn(r'const T=\[\n.*?\n\];',lambda m:newT,s,count=1,flags=re.S);assert n==1
rep("const POINT=[0,1];   // tickets in the upper-left: she points at them\nconst REACT=[['e1','這是我最用心的專題！'],['e4','我的作品都在這裡～'],['e2','我參加過的活動喔！'],['e3','欸？被你發現了！']];",
    "const poseEls=[...document.querySelectorAll('.seq .pose')];\nconst REACT=[['e3','先來認識我吧！'],['e1','這是我最用心的專題！'],['e4','我的作品都在這裡～'],['e2','這些都是我的小勳章！']];")
rep("seqEl.classList.remove('pointing');}","seqEl.classList.remove('pointing');poseEls.forEach(p=>p.classList.remove('on'));}")
rep("const point=hero.classList.contains('has-seq')&&done&&POINT.includes(i);\n  seqEl.classList.toggle('pointing',point);",
    "const point=hero.classList.contains('has-seq')&&done&&!!poseEls[i];\n  poseEls.forEach((p,j)=>p.classList.toggle('on',point&&j===i));\n  seqEl.classList.toggle('pointing',point);")
# modal logic -> pages
s,n=re.subn(r"/\* modal \*/\nconst modal=.*?addEventListener\('keydown',e=>\{if\(e.key==='Escape'\)closeT\(\);\}\);",
  lambda m:"/* inner pages */\nconst modal={classList:{contains:()=>!!window.__pgOpen}};\nfunction openT(i){setActive(null);pauseShow(12000);window.__openPage(i);}",s,count=1,flags=re.S);assert n==1
rep("&&!e.target.closest('.modal'))setActive(null);","&&!e.target.closest('.pg'))setActive(null);")

# v30: new standing figure on the menu (2x canvas, full head, no top fade)
import re as _re
_b=base64.b64encode(open('np/stand2x.webp','rb').read()).decode()
s,_n=_re.subn(r'("frames": \[")[^"]+("\])',lambda m:m.group(1)+_b+m.group(2),s,count=1);assert _n==1
rep("cv.width=CW;cv.height=CH;","cv.width=CW*2;cv.height=CH*2;")
rep("cx.clearRect(0,0,CW,CH);cx.drawImage(frames[i],0,0);","cx.clearRect(0,0,cv.width,cv.height);cx.drawImage(frames[i],0,0,cv.width,cv.height);")
s=s.replace('</style>\n</head>','.seq canvas{-webkit-mask-image:none!important;mask-image:none!important}\n</style>\n</head>',1)
# pages script before </body>
s=s.replace('</body>\n</html>',open('np/pages.js').read()+'\n</body>\n</html>')
open('/mnt/user-data/outputs/portfolio2.html','w').write(s)
print(len(s))
