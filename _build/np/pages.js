<script>
/* ================= inner pages: each ticket opens a page you can keep clicking into ================= */
(function(){
const PG=document.getElementById('pg'),B=document.getElementById('pgB'),K=document.getElementById('pgK'),TT=document.getElementById('pgT'),CR=document.getElementById('pgCr'),BK=document.getElementById('pgBack');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const art=(o,label)=>`<span class="ph-art" style="--c1:${o.c1||'#2a2a30'};--c2:${o.c2||'#141417'}">${o.img?`<img src="${o.img}" alt="${esc(o.t||'')}" loading="lazy">`:esc(label||'建造中 🚧')}</span>`;

/* ---------- content (（ ）= 之後替換成真實內容) ---------- */
const ABOUT={
  hello:'身邊的人常說我是個慢熟、真誠，偶爾有點天然呆的女孩。我喜歡把不同的想法融進創作裡，接觸工業設計後，發現自己不只愛畫畫，也對科技、產品與生活充滿好奇，於是開始嘗試跨領域創作，探索更多可能性。',
  words:[['慢熟','SLOW TO WARM','小故事努力撰寫中 ✍️<br>敬請期待！'],
         ['真誠','SINCERE','這個故事還在醞釀中 ☁️<br>很快就會說給你聽'],
         ['天然呆','A LITTLE DREAMY','天然呆事件整理中…<br>（太多了選不完 🤭）']],
  route:[['畫畫','起點','從小就喜歡畫畫，用圖把心裡的畫面留下來。'],
         ['自主學習','讓畫動起來','自主學習 Live2D，從繪製、拆分、布點到動畫，讓自己畫的角色真的動起來。'],
         ['科技專題','動手實作','高二專題用 Arduino / ESP32 做智慧太陽能系統，第一次把想法變成會動的裝置。'],
         ['工程實作','動手做出來','從線路設計、電路圖到接線測試，把想法實際做出來，再用設計思考延伸成三星 Solve for Tomorrow 的提案。']],
  quotes:[['（老師對我的一句評價）','— （老師）'],['（同學眼中的我）','— （同學）'],['（家人眼中的我）','— （家人）']],
  next:'作者正在逐夢中 ✨<br>接下來的方向，正一筆一筆畫出來，敬請期待！'
};
const PROJECT={
  title:'從發電到儲電：<br>智慧太陽能新策略',badge:'高二專題・工程與設計',
  one:'用低成本材料做出小型太陽能儲能系統：ESP32 依時間、天氣與電量，自動決定電要存起來還是拿來用，解決「發電時間」與「用電時間」對不上的問題。',
  role:'我負責線路設計、電路圖繪製與簡報製作，把團隊的想法整理成可以接線、可以測試的方案。',
  team:'團隊｜蘇于榛、石于昕、尤姚虹　指導老師｜謝孟翔',
  chips:[['ESP32'],['Arduino IDE'],['INA219'],['Blynk'],['氣象 API'],['高雄市科展 入選複賽','r'],['《啟程》決選 優選','r'],['三星 Solve for Tomorrow 複賽入圍','r'],['旺宏科學獎','r']]
};
const FILES=[
  {id:'slides',t:'專題簡報',k:'簡報',n:19,o:'land',d:'從研究動機、研究設備、系統接線、程式設計，到六種用電模式的研究結果與結論。'},
  {id:'report',t:'研究成果報告書',k:'報告書',n:31,o:'port',d:'第六屆專題成果展《啟程》雙語發表類・工程與設計科的完整書面報告，含文獻回顧、實驗數據與討論。'},
  {id:'poster',t:'專題海報',k:'海報',n:1,o:'port',d:'一張看懂整個專題：研究動機、模式判斷、實驗流程與研究結果。'},
  {id:'ems',t:'智慧太陽能微電網 EMS',k:'三星 Solve for Tomorrow 提案',n:21,o:'land',d:'用設計思考把專題延伸成給租屋族的產品：人物誌、親和圖、3D 模擬網站，以及真實受測者的使用者測試。'}
];
const WORKS=[
  {t:'請勿觸碰我的天空',y:'2026',c:'繪畫',img:'works/skyt.webp',big:'works/sky.webp',tl:'水彩／馬克筆／色鉛筆／丙烯馬克筆',c1:'#3b5a7a',c2:'#141d29',
   d:'現代人被手機與無盡資訊包圍，看似與世界保持連結，卻逐漸與真實生活及自然疏離。畫面中的女孩被泡泡包覆，象徵她渴望逃離資訊洪流與外界喧囂，尋找片刻的寧靜。然而，泡泡外的自然也正受到污染，原本應該成為避難所的地方，也逐漸失去純粹。',
   x:'因此，泡泡既是保護，也是一種脆弱的囚籠。我想透過作品探討：當我們想逃離數位世界、重新回到自然時，是否還有一片真正未被污染的天空，能讓我們安心停留？'},
  {t:'鏡現戰惡夜之煥',y:'2023',c:'繪畫',img:'works/mirrort.webp',big:'works/mirror.webp',tl:'水彩／馬克筆／色鉛筆',c1:'#7a3a1c',c2:'#1d0e08',
   d:'鏡子裡不是幻想而是現實，戰爭下，夜晚不再是夜晚，而是光亮景色，那是戰火。窮困潦倒的人民，日夜的四處奔波、躲避兇猛戰火，早已失去糧食，失去家鄉且失去了得以依靠的家人。',
   x:'鏡子裡絕對是最寫實的，寧靜的地方來了吵鬧的槍聲、反覆交雜的戰機聲、大樓倒塌的巨響，人民生活在填滿恐懼的心情裡……但願世界走向持久和平，人們處在得以安然的環境，不再恐懼、不再心驚膽顫得生活，鏡子將映出人們所期待和平的現實。'},
  {t:'失焦',y:'2025',c:'電繪',tl:'Procreate',c1:'#3a3a3d',c2:'#111113',
   d:'失去靈感的時候，我畫了這張。當我繪畫失去靈感時，我的創作陷入了迷茫。畫面中的黑白人群，象徵著當時不斷嘗試的畫作；而置身其中的主角，就像我在茫然中徘徊，努力尋找創作的方向。'},
  {t:'沐光',y:'2025',c:'電繪',tl:'Procreate',c1:'#3d6ea8',c2:'#14243b',
   d:'以陽光少年為主題，嘗試透過暖光與色彩的搭配，營造明亮、清透的畫面氛圍，並練習光線落在臉部時的明暗變化。'},
  {t:'雨夜',y:'2025',c:'電繪',tl:'Procreate／iPad・原創',c1:'#1d2433',c2:'#0b0d14',
   d:'原創插畫。創作理念努力整理中 ✍️',
   x:'圖層拆解：背景、角色分開繪製再合成。背景用色塊與光斑表現雨中城市；角色先定剪影與姿勢；最後合成時加上雨絲與整體色調。'},
  {t:'從草稿到完稿：我怎麼畫一張圖',y:'2026',c:'電繪',tl:'Procreate／iPad・Fan Art',c1:'#2a4a6a',c2:'#0d1722',
   d:'這次的創作，我特別採用水彩般的渲染手法來呈現整體的清透感。在細節刻畫上，著重於頭髮的光影變化與反光技巧練習，藉由通透的光線交錯，凸顯出這幅插畫的空靈感。',
   x:'01 草稿：先決定整體構圖與人物的姿勢。02 底色：為了營造水彩般的清透感，選用冷色調的藍色系作為主視覺。03 光影：光源在畫面右上方，強調臉部與髮絲的受光與反光面；頭髮光影細化使用「濾色／發光」圖層模式搭配水彩筆刷；眼神細化用對比色的暖橘調與高光讓眼睛有特點。'},
  {t:'鸚花寶・阿寶在你心',y:'2023',c:'貼圖',tl:'LINE 原創貼圖',c1:'#2f4a35',c2:'#0f1a12',
   d:'以我的寵物阿寶（黑頭凱克鸚鵡）為創作原型。阿寶曾是我的玩伴，牠離世後，我透過貼圖記錄牠可愛的舉動與豐富的情緒，將對牠的思念化為創作，留住我們共同的回憶。'},
  {t:'迷之鸚',y:'',c:'貼圖',tl:'LINE 原創貼圖',c1:'#4a4630',c2:'#16150d',
   d:'因為從小到大都有鸚鵡陪伴，我對鸚鵡有著深厚的喜愛，因此以鸚鵡為主題創作了一系列貼圖，透過不同的表情與動作，展現鸚鵡可愛又有趣的一面。'},
  {t:'PLAVE Fan Art',y:'2025–2026',c:'二創',tl:'Procreate／iPad',c1:'#2e2d4a',c2:'#0e0e18',
   d:'以網路角色為主題進行電繪練習，以自己的繪畫風格進行對角色的詮釋。',
   x:'觀察：先找角色的官方造型與表情特徵，抓出神韻與核心特徵（髮色、髮型、眼神、代表配件）。詮釋：保留角色辨識度，再用自己習慣的臉型比例與風格筆觸（柔和光影、透明感上色）重新畫。收穫：這個系列讓我練到最多的是男性臉部結構的刻畫與不同角色氣質的拿捏。'},
  {t:'從靜態插畫到動態角色：Live2D',y:'114 學年度',c:'動畫',img:'works/live2d_plant.webp',big:'works/live2d_plan.webp',tl:'Procreate・Live2D Cubism',c1:'#4a2226',c2:'#170b0c',
   d:'幾年前我在社群網站上看到 MiuA 的 Live2D 作品，第一次知道插畫可以動起來。經過長期練習、畫風逐漸穩定後，我想讓自己畫的角色不再停在畫面裡，所以用這次自主學習挑戰它：親手走一遍從繪製到動畫化的完整流程。',
   x:'製作流程：構圖 → 電繪 → 拆分 → 角色布點 → 物件動態 → Animation → 成果發表。把一張圖拆成頭髮、眼白、睫毛、嘴唇等數十個圖層，被遮住的地方都要補畫；再為每個圖層加上網格點、用變形器與參數做出歪頭與頭髮飄動，最後在時間軸上逐一設定關鍵影格。十週進度：主題發想與資料蒐集 → 確立主題、撰寫計畫 → 繪製與拆分人物 → 匯入 Live2D Cubism 初始化、認識軟體英文介面 → 布點、紋理、眼睛眉毛口型與肢體 → XYZ 角度動畫與早期測試 → Live2D 動畫模式 → 補充時間 → 學習成果報告。困難：部分物件無法自動布點，又選錯處理選項，資料量過大讓電腦當機——關掉重做，並查找手動布點的教學。'},
  {t:'學測生 Vlog｜5 小時台南遊',y:'',c:'影像',tl:'拍攝與剪輯',c1:'#4a3a28',c2:'#15110c',d:'影片整理中 🎬 敬請期待！'},
  {t:'三星設計思考工作坊 Vlog',y:'',c:'影像',tl:'拍攝與剪輯',c1:'#24413a',c2:'#0c1513',d:'記錄參加三星 Solve for Tomorrow 設計思考工作坊的過程。'}
];
const HONORS=[
  {k:'經歷',y:'2026.10',t:'靖娟兒童安全文教基金會 志工',o:'財團法人靖娟兒童安全文教基金會',r:'志工服務 3 小時',img:'hon/h_vol',d:'擔任基金會志工，協助辦理社區外展活動：擔任關主、協助場佈及場收。'},
  {k:'經歷',y:'2026.07',t:'臺灣能永續能源創意實作競賽',o:'國立科學工藝博物館・教育部淨零永續能源跨域應用人才培育計畫｜中學組（高中職）',r:'完成創意企畫書',img:'hon/h_nstm',d:'與蘇于榛、尤姚虹組隊參賽，完成永續能源創意企畫書。'},
  {k:'獎項',y:'2026.07',t:'三星 Solve for Tomorrow',o:'Smart Solar DoReMi｜從發電到儲電：智慧太陽能新策略',r:'複賽入圍',img:'hon/h_samsung',d:'把專題延伸成給租屋族的產品提案：從人物誌、利害關係人地圖、親和圖，到 3D 模擬網站與三位受測者的使用者測試。我負責線路設計、電路圖繪製與簡報製作。'},
  {k:'經歷',y:'2026.07',t:'旺宏科學獎（第二十五屆）',o:'旺宏教育基金會｜從發電到儲電：智慧太陽能新策略',r:'完成參賽',img:'hon/h_mxic',d:'以專題作品參加第二十五屆旺宏科學獎並完成繳交作品。'},
  {k:'獎項',y:'2026.06',t:'第六屆專題研究發表會《啟程》決選',o:'三民高中 114 學年度｜雙語類 工程與設計組',r:'優選',img:'hon/h_qicheng',d:'作品「從發電到儲電：智慧太陽能新策略」在校內專題研究發表會決選獲得優選。'},
  {k:'獎項',y:'2026.04',t:'高雄市第 66 屆中小學科學展覽會',o:'高雄市政府教育局',r:'作品優良・入選複賽',img:'hon/h_sci66',d:'與團隊以智慧太陽能專題參加高雄市科展，作品優良入選複賽。'},
  {k:'獎項',y:'2026.01',t:'學生專題研究初啼及創意製作－雙語類',o:'三民高中 114 學年度｜作品「太陽能板極大化效益」',r:'最佳表達獎',img:'hon/h_chuti',d:'在專題初啼的雙語發表中獲得最佳表達獎。'},
  {k:'獎項',y:'2026.01',t:'自主學習成果海報展',o:'三民高中 114 學年度｜從靜態插畫到動態角色：Live2D 動畫學習',r:'入選獎',img:'hon/h_live2d',d:'10 週自學 Live2D，從繪製、拆分、布點到動畫輸出，成果海報入選。'},
  {k:'經歷',y:'2025.08',t:'半導體產業培力營隊',o:'高雄市教育局 × 日月光半導體 × 張姚宏影基金會',r:'研習 7 小時',img:'hon/h_ase',d:'參加「高級中等學校師資增能及學生培力計畫」營隊，全程參與學習及實作，增進對半導體產業的認識。'},
  {k:'經歷',y:'2025.07',t:'TimeCraft 雙語木製時鐘工作坊',o:'樹德科技大學・空中英語教室',r:'全程參與',img:'hon/h_clock',d:'用英文完成木製時鐘實作，證書肯定我的積極參與、好奇心與團隊合作。'},
  {k:'經歷',y:'2025.04',t:'Bake & Talk 雙語烘焙體驗營',o:'空中英語教室高雄分社・三民高中',r:'表現優異',img:'hon/h_bake',d:'全程參與雙語烘焙體驗營，積極參與、表現優異。'},
  {k:'獎項',y:'2024.11',t:'113 學年度高雄市學生美術比賽',o:'高雄市政府教育局｜普通班北區高中（職）組 漫畫類',r:'佳作',img:'hon/h_art113',d:'得獎故事整理中 ✍️ 敬請期待！'},
  {k:'經歷',y:'2026',t:'三星 Solve for Tomorrow 設計思考工作坊',o:'三星 Solve for Tomorrow',r:'參加',d:'心得整理中 ✍️ 敬請期待！'},
  {k:'獎項',y:'國中',t:'高雄市美術能力競賽',o:'高雄市',r:'佳作',d:'得獎故事整理中 ✍️ 敬請期待！'},
  {k:'獎項',y:'國中',t:'高雄市創意運動會 藝術組',o:'高雄市',r:'第二名',d:'得獎故事整理中 ✍️ 敬請期待！'}
];

/* ---------- page shell: a small stack of levels ---------- */
let stack=[],cur=0,lastFocus=null;
const view={};   // current view's handlers (prev/next)
function render(dir){const top=stack[stack.length-1];
  B.className='pg-body'+(top.snap?' snap':'');B.innerHTML='';view.prev=view.next=null;
  const v=document.createElement('div');v.className='pv'+(dir<0?' back':'')+(top.snap?' pv-full':'');B.appendChild(v);
  top.fn(v);CR.textContent=stack.length>1?'／ '+top.name:'';
  BK.textContent=stack.length>1?'← 上一層':'← 回到選單';B.scrollTop=0;}
function push(name,fn,opt){stack.push(Object.assign({name,fn},opt||{}));render(1);}
function back(){if(stack.length>1){stack.pop();render(-1);}else close();}
function open(i){lastFocus=document.activeElement;cur=i;const d=PAGES[i];
  K.textContent=d.k;TT.textContent=d.t;stack=[];push(d.t,d.fn,d.opt);
  window.__pgOpen=true;document.body.classList.add('pg-open');PG.classList.add('open');PG.setAttribute('aria-hidden','false');setTimeout(()=>BK.focus({preventScroll:true}),60);}
function close(){PG.classList.remove('open');PG.setAttribute('aria-hidden','true');document.body.classList.remove('pg-open');window.__pgOpen=false;
  if(lastFocus&&lastFocus.focus)lastFocus.focus({preventScroll:true});}
BK.onclick=back;document.getElementById('pgX').onclick=close;
addEventListener('keydown',e=>{if(!window.__pgOpen)return;
  if(e.key==='Escape'){e.preventDefault();if(ZV.classList.contains('on'))ZV.classList.remove('on');else back();}
  else if(e.key==='ArrowLeft'&&view.prev){view.prev();}
  else if(e.key==='ArrowRight'&&view.next){view.next();}});
function swipe(el,l,r){let x0=null,y0=0;
  el.addEventListener('pointerdown',e=>{x0=e.clientX;y0=e.clientY;},{passive:true});
  el.addEventListener('pointerup',e=>{if(x0==null)return;const dx=e.clientX-x0,dy=e.clientY-y0;x0=null;
    if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.3){el.__swiped=Date.now();(dx<0?l:r)();}},{passive:true});}
function toggles(root){root.querySelectorAll('[data-more]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();
  const r=root.querySelector('#'+b.dataset.more),on=!r.classList.contains('on');r.classList.toggle('on',on);b.setAttribute('aria-expanded',on);
  if(b.dataset.lab)b.textContent=on?'收起 −':b.dataset.lab;}));}

/* full-screen image viewer (certificates) */
const ZV=document.createElement('div');ZV.className='zv';ZV.innerHTML='<img alt=""><button class="pg-x" aria-label="關閉">✕</button>';document.body.appendChild(ZV);
function zoomImg(src){ZV.querySelector('img').src=src;ZV.classList.add('on');}
ZV.onclick=()=>ZV.classList.remove('on');
/* message card: sends to a Google Form when MSG_FORM is filled in */
const MSG_FORM={action:'',name:'',text:''};
function setupMsg(v){const f=v.querySelector('.msg');if(!f)return;
  const ta=f.querySelector('.msg-text'),nm=f.querySelector('.msg-name'),n=f.querySelector('.msg-n'),st=f.querySelector('.msg-s'),go=f.querySelector('.msg-go');
  ta.addEventListener('input',()=>{n.textContent=ta.value.length+' / 300';});
  f.addEventListener('submit',e=>{e.preventDefault();const t=ta.value.trim();
    if(!t){st.textContent='先寫一點想說的話吧 ✏️';ta.focus();return;}
    if(!MSG_FORM.action){st.textContent='留言信箱施工中 🚧 很快就能寄出囉，謝謝你！';return;}
    go.disabled=true;go.textContent='寄送中…';
    const fd=new FormData();fd.append(MSG_FORM.text,t);if(MSG_FORM.name)fd.append(MSG_FORM.name,nm.value.trim()||'匿名');
    fetch(MSG_FORM.action,{method:'POST',mode:'no-cors',body:fd}).then(()=>{f.classList.add('sent');ta.value='';nm.value='';n.textContent='0 / 300';st.textContent='收到了！謝謝你的話 💛';})
      .catch(()=>{st.textContent='好像沒有寄出去，等一下再試試看 🙏';}).finally(()=>{go.disabled=false;go.textContent='寄出 💌';setTimeout(()=>f.classList.remove('sent'),1200);});});}
/* ---------- 01 about me: scroll up & down ---------- */
function pAbout(v){
  const S=[
    `<div class="ab-k">01 — HELLO</div><h3>嗨，我是于昕。</h3><p class="lead">${ABOUT.hello}</p><span class="ab-down">往下滑 ↓</span>`,
    `<div class="ab-k">02 — 三個關鍵字</div><h3>身邊的人說我…</h3><p class="hint" style="margin:0 0 14px">點一下卡片，看背後的小故事</p>
     <div class="flips">${ABOUT.words.map(w=>`<button class="flip" aria-label="${w[0]}"><span class="in"><span class="f"><b>${w[0]}</b><span>${w[1]}</span><i>點我翻面 ↻</i></span><span class="b">${w[2]}</span></span></button>`).join('')}</div>`,
    `<div class="ab-k">03 — 我的跨領域路線</div><h3>從畫畫出發，一路走到<em>動畫</em>與<em>實作</em></h3>
     <div class="route">${ABOUT.route.map((r,j)=>`<button class="stop" data-more="rt${j}"><small>${r[1]}</small><b>${r[0]}</b><span class="reveal" id="rt${j}"><div><p>${r[2]}</p></div></span></button>`).join('')}</div>`,
    `<div class="ab-k">04 — 給我的話</div><h3>留下想跟我說的話吧 💌</h3>
     <form class="msg" novalidate><div class="msg-card"><input class="msg-name" maxlength="20" placeholder="你的名字（可以不填）" aria-label="名字">
       <textarea class="msg-text" maxlength="300" rows="4" placeholder="想對于昕說的話…" aria-label="留言"></textarea>
       <div class="msg-f"><span class="msg-n">0 / 300</span><button type="submit" class="msg-go">寄出 💌</button></div></div>
       <p class="msg-s" aria-live="polite"></p></form>`,
    `<div class="ab-k">05 — NEXT</div><h3>接下來，我想…</h3><p class="lead">${ABOUT.next}</p>
     <div style="margin-top:26px;display:flex;gap:10px;flex-wrap:wrap"><button class="more" data-go="1">看我的專題 →</button><button class="more" data-go="2">看我的作品 →</button></div>`];
  v.style.padding='0';v.style.maxWidth='none';v.style.height='100%';
  v.innerHTML=S.map((s,j)=>`<section class="ab-sec" id="ab${j}">${s}</section>`).join('')+
    `<nav class="ab-dots" aria-label="段落">${S.map((_,j)=>`<button aria-label="第 ${j+1} 段" data-j="${j}"></button>`).join('')}</nav>`;
  const dots=[...v.querySelectorAll('.ab-dots button')];
  dots.forEach(d=>d.onclick=()=>v.querySelector('#ab'+d.dataset.j).scrollIntoView({behavior:'smooth'}));
  const nav=v.querySelector('.ab-dots');PG.appendChild(nav);nav.classList.add('pg-dots');   // keep dots fixed while the page scrolls
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const j=+e.target.id.slice(2);dots.forEach((d,k)=>d.classList.toggle('on',k===j));}}),{root:B,threshold:.55});
  v.querySelectorAll('.ab-sec').forEach(s=>io.observe(s));
  v.querySelectorAll('.flip').forEach(f=>f.onclick=()=>f.classList.toggle('on'));
  v.querySelectorAll('.stop').forEach(s=>s.addEventListener('click',()=>s.classList.toggle('on')));
  setupMsg(v);
  toggles(v);
  v.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{cleanup();open(+b.dataset.go);});
}
function cleanup(){PG.querySelectorAll('.pg-dots').forEach(n=>n.remove());}
const _render=render;render=function(d){cleanup();_render(d);};

/* ---------- 02 project: chapters → each slide ---------- */
function pProject(v){const P=PROJECT;
  v.innerHTML=`<div class="pj-cover"><div class="pj-cv"><img src="proj/ems/01.webp" alt="專題海報" loading="lazy"></div>
    <div><span class="pj-badge">${P.badge}</span><h3>${P.title}</h3><p>${P.one}</p><p class="pj-role">${P.role}</p><p class="hint" style="margin-top:10px">${P.team}</p>
    <ul class="chips">${P.chips.map(c=>`<li class="${c[1]||''}">${c[0]}</li>`).join('')}</ul></div></div>
    <div class="sec-h"><b>專題檔案</b><span class="hint">點一份檔案，打開完整內容</span></div>
    <div class="files">${FILES.map((f,j)=>`<button class="fl" data-j="${j}"><span class="fl-cv ${f.o}"><img src="proj/${f.id}/t01.webp" alt="" loading="lazy"><em>${f.n} 頁</em></span>
      <span class="fl-tx"><span class="fl-k">${f.k}</span><b>${f.t}</b><small>${f.d}</small><span class="fl-go">打開檔案 →</span></span></button>`).join('')}</div>`;
  v.querySelectorAll('.fl').forEach(b=>b.onclick=()=>openFile(+b.dataset.j));
}
function openFile(fi){const F=FILES[fi],n=F.n;let j=0,zoom=false;
  const src=k=>`proj/${F.id}/${String(k+1).padStart(2,'0')}.webp`;
  push(F.t,v=>{
    v.innerHTML=`<div class="dv"><div class="dv-bar"><span class="sv-c">${F.k}</span><b class="dv-t">${F.t}</b><span class="dv-c"></span>
      <button class="more dv-z" aria-pressed="false">放大 ⤢</button></div>
      <div class="dv-stage ${F.o}"><div class="dv-sc"><img class="dv-img" alt=""></div>
      ${n>1?'<button class="nav2 p" aria-label="上一頁">‹</button><button class="nav2 n" aria-label="下一頁">›</button>':''}</div>
      ${n>1?`<div class="strip dv-strip">${Array.from({length:n},(_,k)=>`<button data-k="${k}" aria-label="第 ${k+1} 頁" class="${F.o}"><img src="proj/${F.id}/t${String(k+1).padStart(2,'0')}.webp" alt="" loading="lazy"></button>`).join('')}</div>`:''}</div>`;
    const img=v.querySelector('.dv-img'),cnt=v.querySelector('.dv-c'),st=v.querySelector('.dv-stage'),sc=v.querySelector('.dv-sc'),zb=v.querySelector('.dv-z');
    const bp=v.querySelector('.nav2.p'),bn=v.querySelector('.nav2.n'),thumbs=[...v.querySelectorAll('.dv-strip button')];
    function show(k){j=Math.max(0,Math.min(n-1,k));img.classList.add('ld');
      const im=new Image();im.onload=()=>{img.src=im.src;img.classList.remove('ld');};im.src=src(j);
      if(j+1<n){const p=new Image();p.src=src(j+1);}
      cnt.textContent=`${String(j+1).padStart(2,'0')} / ${String(n).padStart(2,'0')}`;
      if(bp){bp.disabled=j===0;bn.disabled=j===n-1;}
      thumbs.forEach((t,i)=>t.classList.toggle('on',i===j));
      if(thumbs[j])thumbs[j].scrollIntoView({block:'nearest',inline:'center',behavior:'smooth'});
      sc.scrollTop=0;sc.scrollLeft=0;}
    view.prev=()=>j>0&&show(j-1);view.next=()=>j<n-1&&show(j+1);
    if(bp){bp.onclick=view.prev;bn.onclick=view.next;}
    thumbs.forEach(t=>t.onclick=()=>show(+t.dataset.k));
    zb.onclick=()=>{zoom=!zoom;st.classList.toggle('zoom',zoom);zb.textContent=zoom?'縮小 ⤡':'放大 ⤢';zb.setAttribute('aria-pressed',zoom);};
    img.addEventListener('dblclick',()=>zb.click());
    swipe(sc,()=>{if(!zoom)view.next();},()=>{if(!zoom)view.prev();});
    show(0);
  });
}

/* ---------- 03 works: thumbnails → one piece ---------- */
let wFilter='全部';
function pWorks(v){const cats=['全部',...new Set(WORKS.map(w=>w.c))];
  const list=WORKS.map((w,j)=>({w,j})).filter(o=>wFilter==='全部'||o.w.c===wFilter);
  v.innerHTML=`<div class="filters">${cats.map(c=>`<button class="${c===wFilter?'on':''}" data-c="${c}">${c}</button>`).join('')}</div>
    <div class="grid">${list.map(o=>`<button class="wk" data-j="${o.j}"><span class="th">${art(o.w,'作品搬運中 🚧')}</span><b>${o.w.t}</b><small>${o.w.c}${o.w.y?'・'+o.w.y:''}</small></button>`).join('')}</div>`;
  v.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{wFilter=b.dataset.c;pWorks(v);});
  v.querySelectorAll('.wk').forEach(b=>b.onclick=()=>workAt(+b.dataset.j));
}
function workAt(j){
  const ids=()=>WORKS.map((w,k)=>k).filter(k=>wFilter==='全部'||WORKS[k].c===wFilter);
  const fn=v=>{const w=WORKS[j],L=ids(),p=L.indexOf(j);
    v.innerHTML=`<div class="lb"><div class="lb-img"><div class="fr${w.big?' has':''}">${w.big?`<img src="${w.big}" alt="${w.t}">`:art(w,'建造中・敬請期待 🛠️')}</div>
      <button class="nav2 p" aria-label="上一件" ${p<=0?'disabled':''}>‹</button><button class="nav2 n" aria-label="下一件" ${p>=L.length-1?'disabled':''}>›</button></div>
      <div class="lb-meta"><span class="sv-c">${String(p+1).padStart(2,'0')} / ${String(L.length).padStart(2,'0')}　${w.c}</span><h3>${w.t}</h3><span class="yr">${w.y}</span><p class="tl">${w.tl||''}</p><p>${w.d}</p>
      ${w.x?`<button class="more" data-more="wkm" data-lab="看更多 +">看更多 +</button><div class="reveal" id="wkm"><div><p>${w.x}</p></div></div>`:''}</div></div>`;
    const go=k=>{stack.pop();j=k;stack.push({name:WORKS[k].t,fn});render(1);};
    view.prev=()=>p>0&&go(L[p-1]);view.next=()=>p<L.length-1&&go(L[p+1]);
    v.querySelector('.nav2.p').onclick=view.prev;v.querySelector('.nav2.n').onclick=view.next;
    swipe(v.querySelector('.fr'),view.next,view.prev);toggles(v);};
  push(WORKS[j].t,fn);
}

/* ---------- 04 honors & experience: one card at a time ---------- */
let hFilter='全部',hk=0;
function pHonors(v){
  const L=HONORS.filter(h=>hFilter==='全部'||h.k===hFilter);if(hk>=L.length)hk=0;
  v.innerHTML=`<div class="tabs filters" style="justify-content:center">${['全部','獎項','經歷'].map(c=>`<button class="${c===hFilter?'on':''}" data-c="${c}">${c}</button>`).join('')}</div>
    <p class="hint" style="text-align:center;margin:4px 0 0">點卡片翻面看故事・左右滑換下一張</p>
    <div class="deck">${L.map((h,j)=>`<button class="hc" data-j="${j}" aria-label="${h.t}">
      <span class="in"><span class="f"><span class="wm">${String(j+1).padStart(2,'0')}</span><span class="tag ${h.k==='經歷'?'dk':''}">${h.k}</span><span class="yr">${h.y}</span><h4>${h.t}</h4><span class="org">${h.o}</span>
        <span class="rank"><b>${h.r}</b><i>點我翻面 ↻</i></span></span>
      <span class="b"><h4>${h.t}</h4><p>${h.d}</p>${h.img?`<span class="cert" data-big="${h.img}.webp" role="button" aria-label="放大證書"><img src="${h.img}t.webp" alt="" loading="lazy"><i>點圖放大 ⤢</i></span>`:art(h,'獎狀搬運中 📦')}</span></span></button>`).join('')}</div>
    <div class="deck-nav"><button class="nav2 p" aria-label="上一張">‹</button><span class="deck-c"></span><button class="nav2 n" aria-label="下一張">›</button></div>`;
  const cards=[...v.querySelectorAll('.hc')],cnt=v.querySelector('.deck-c'),bp=v.querySelector('.nav2.p'),bn=v.querySelector('.nav2.n');
  function lay(){const N=cards.length;cards.forEach((c,j)=>{let d=(j-hk+N)%N;if(N>2&&d===N-1)d=-1;c.classList.remove('on');
      c.style.zIndex=100-Math.abs(d);c.tabIndex=d===0?0:-1;c.setAttribute('aria-hidden',d!==0);
      if(d<0){c.style.transform='translateX(-130%) rotate(-14deg)';c.style.opacity=0;c.style.pointerEvents='none';}
      else if(d>3){c.style.transform='translateY(36px) scale(.86)';c.style.opacity=0;c.style.pointerEvents='none';}
      else{c.style.transform=d?`translateY(${d*14}px) scale(${1-d*.05}) rotate(${d%2?2:-2}deg)`:'none';c.style.opacity=d?1-d*.22:1;c.style.pointerEvents=d?'none':'auto';}});
    cnt.textContent=`${String(hk+1).padStart(2,'0')} / ${String(cards.length).padStart(2,'0')}`;bp.disabled=bn.disabled=cards.length<2;}
  view.prev=()=>{hk=(hk-1+cards.length)%cards.length;lay();};view.next=()=>{hk=(hk+1)%cards.length;lay();};
  bp.onclick=view.prev;bn.onclick=view.next;
  const deck=v.querySelector('.deck');swipe(deck,view.next,view.prev);
  cards.forEach(c=>c.onclick=()=>{if(Date.now()-(deck.__swiped||0)<400)return;c.classList.toggle('on');});
  v.querySelectorAll('.cert').forEach(c=>c.addEventListener('click',e=>{e.stopPropagation();zoomImg(c.dataset.big);}));
  v.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{hFilter=b.dataset.c;hk=0;pHonors(v);});
  lay();
}

const PAGES=[
  {k:'01 / ABOUT ME',t:'關於我',fn:pAbout,opt:{snap:1}},
  {k:'02 / PROJECT',t:'我的專題',fn:pProject},
  {k:'03 / WORKS',t:'作品集',fn:pWorks},
  {k:'04 / HONORS & EXPERIENCE',t:'獎項 & 經歷',fn:pHonors}];
window.__openPage=open;
})();
</script>