const $ = (id) => document.getElementById(id);
const canvas = $('posterCanvas');
const ctx = canvas.getContext('2d');
const W = 1080, H = 1080;
const templates = [
 {id:'maharashtra',name:'महाराष्ट्र',category:'traditional',bg:'#173b2b',fg:'#fff2d7',accent:'#e6ad45',kind:'maharashtra'},
 {id:'warkari',name:'वारकरी',category:'traditional',bg:'#f4e8c9',fg:'#4c3924',accent:'#bd6d27',kind:'warkari'},
 {id:'paithani',name:'पैठणी',category:'traditional',bg:'#541f35',fg:'#fff0d0',accent:'#e5b44f',kind:'paithani'},
 {id:'saffron',name:'भगवा',category:'traditional',bg:'#f1a33d',fg:'#482d1b',accent:'#fff0c8',kind:'saffron'},
 {id:'village',name:'गावरान',category:'traditional',bg:'#e5e7c6',fg:'#254b35',accent:'#a35b2c',kind:'village'},
 {id:'royal-marathi',name:'राजेशाही',category:'traditional',bg:'#172a48',fg:'#fff0d0',accent:'#d6b66b',kind:'royal'},
 {id:'minimal',name:'मिनिमल',category:'modern',bg:'#f5f1e8',fg:'#263b30',accent:'#bd7b3c',kind:'minimal'},
 {id:'editorial',name:'एडिटोरियल',category:'modern',bg:'#e9e6dd',fg:'#222b25',accent:'#b45b3f',kind:'editorial'},
 {id:'luxury',name:'लक्झरी गोल्ड',category:'modern',bg:'#171714',fg:'#fff0d3',accent:'#d9b56c',kind:'luxury'},
 {id:'pastel',name:'पेस्टल',category:'modern',bg:'#f4dfe1',fg:'#633f51',accent:'#b77991',kind:'pastel'},
 {id:'blue',name:'ब्लू प्रीमियम',category:'modern',bg:'#dce9ed',fg:'#1e3c4a',accent:'#4f8292',kind:'blue'},
 {id:'celebrate',name:'सेलिब्रेशन',category:'modern',bg:'#fff0d8',fg:'#343044',accent:'#e66b52',kind:'celebrate'}
];
let active = templates[0], photo = null, toastTimer;
function val(id){return $(id).value}
function fontFamily(){return `"${val('posterFont')||'Mukta'}", "Noto Sans Devanagari", sans-serif`}
function renderTemplatePicker(){
 const cat=document.querySelector('.category-btn.active')?.dataset.category||'all';
 const list=templates.filter(t=>cat==='all'||t.category===cat);
 $('templateGrid').innerHTML=list.map(t=>`<button class="template-card ${t.id===active.id?'active':''}" data-id="${t.id}" aria-label="${t.name}"><div class="swatch" style="background:${t.bg};color:${t.fg}"><span style="color:${t.accent}">✦</span></div>${t.name}</button>`).join('');
 $('templateGrid').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{active=templates.find(t=>t.id===b.dataset.id);renderTemplatePicker();draw()}));
}
function text(str,x,y,size,color,opts={}){
 ctx.save();ctx.fillStyle=color;ctx.textAlign=opts.align||'center';ctx.textBaseline='middle';ctx.font=`${opts.weight||600} ${size}px ${opts.family||fontFamily()}`;
 if(opts.shadow){ctx.shadowColor=opts.shadow;ctx.shadowBlur=18}
 if(opts.spacing!==undefined&&'letterSpacing'in ctx)ctx.letterSpacing=`${opts.spacing}px`;
 ctx.fillText(str,x,y,opts.maxWidth||900);ctx.restore();
}
function line(x1,y1,x2,y2,color,width=3){ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke()}
function circle(x,y,r,color,stroke){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);if(color){ctx.fillStyle=color;ctx.fill()}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=5;ctx.stroke()}}
function star(x,y,r,color){ctx.save();ctx.translate(x,y);ctx.fillStyle=color;ctx.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.42:r;ctx.lineTo(Math.cos(a)*rr,Math.sin(a)*rr)}ctx.closePath();ctx.fill();ctx.restore()}
function decorations(t){
 if(!$('posterDecor').checked)return;
 for(let i=0;i<32;i++){const x=(i*197+83)%W,y=(i*313+41)%H;if(t.kind==='celebrate'||t.kind==='saffron'){ctx.save();ctx.translate(x,y);ctx.rotate(i*.7);ctx.fillStyle=t.accent;ctx.globalAlpha=.5;ctx.fillRect(0,0,8,22);ctx.restore()}else if(i%3===0)star(x,y,6+(i%4)*2,t.accent);else circle(x,y,3+(i%3)*2,t.accent)}
}
function drawPhoto(x,y,r,rect=false){
 if(!photo)return;
 ctx.save();ctx.beginPath();if(rect)ctx.roundRect(x-r,y-r,r*2,r*2,25);else ctx.arc(x,y,r,0,Math.PI*2);ctx.clip();
 const scale=Math.max(r*2/photo.width,r*2/photo.height),sw=photo.width*scale,sh=photo.height*scale;ctx.drawImage(photo,x-sw/2,y-sh/2,sw,sh);ctx.restore();
 ctx.beginPath();if(rect)ctx.roundRect(x-r,y-r,r*2,r*2,25);else ctx.arc(x,y,r,0,Math.PI*2);ctx.strokeStyle=val('posterAccent');ctx.lineWidth=9;ctx.stroke();
}
function wrapText(str,maxWidth,size){
 const words=(str||'').trim().split(/\s+/).filter(Boolean),lines=[];let lineText='';
 ctx.font=`600 ${size}px ${fontFamily()}`;
 words.forEach(word=>{const test=lineText?lineText+' '+word:word;if(ctx.measureText(test).width>maxWidth&&lineText){lines.push(lineText);lineText=word}else lineText=test});
 if(lineText)lines.push(lineText);return lines.slice(0,3);
}
function draw(){
 const t={...active,accent:val('posterAccent')||active.accent},name=val('posterName').trim()||'आपले नाव',title=val('posterEvent').trim()||'वाढदिवसाच्या हार्दिक शुभेच्छा',amount=val('posterAmount').trim()||'१००',message=val('posterMessage').trim(),date=val('posterDate');
 ctx.clearRect(0,0,W,H);ctx.fillStyle=t.bg;ctx.fillRect(0,0,W,H);decorations(t);
 const fg=t.fg,a=t.accent,k=t.kind;
 const dateText=date?new Date(date+'T00:00:00').toLocaleDateString('mr-IN',{day:'numeric',month:'long',year:'numeric'}):'';
 const common=(photoY=390,nameY=650,msgY=805)=>{
   drawPhoto(540,photoY,125);
   text(title,540,photoY+165,34,a,{weight:800,maxWidth:900});
   text(name,540,nameY,64,fg,{weight:800,maxWidth:900});
   if(dateText)text(dateText,540,nameY+58,23,a,{weight:600});
   wrapText(message,850,25).forEach((s,i)=>text(s,540,msgY+i*39,25,fg,{weight:500,maxWidth:900}));
   circle(540,965,48,null,a);text('₹',540,943,22,a,{weight:700});text(amount,540,978,34,a,{weight:800});
 };
 if(k==='maharashtra'){
   ctx.strokeStyle=a;ctx.lineWidth=5;ctx.strokeRect(42,42,996,996);ctx.strokeRect(61,61,958,958);
   text('॥ श्री गणेशाय नमः ॥',540,115,25,a);star(540,185,34,a);
   text('माझा गाव, माझा अभिमान',540,255,48,fg,{weight:800});text('वाढदिवस विशेष',540,315,28,a);
   common(455,700,825);text('गावाच्या विकासासाठी स्वेच्छेचे योगदान',540,1030,20,a);
 }else if(k==='warkari'){
   circle(540,300,220,'#ead9ad');text('विठ्ठल विठ्ठल',540,160,40,a,{weight:800});text('माझ्या आनंदाचा दिवस',540,235,30,fg);
   common(425,680,815);text('एक पाऊल गावाच्या प्रगतीसाठी',540,1030,21,a);
 }else if(k==='paithani'){
   ctx.strokeStyle=a;ctx.lineWidth=12;ctx.strokeRect(28,28,1024,1024);ctx.strokeRect(55,55,970,970);
   for(let i=0;i<16;i++){star(95+(i%4)*295,95+Math.floor(i/4)*295,12,a)}
   text('मंगलमय शुभेच्छा',540,145,33,a);text('वाढदिवस',540,230,77,fg,{weight:800});
   common(420,685,815);text('माझा गाव • माझा अभिमान',540,1030,22,a);
 }else if(k==='saffron'){
   circle(540,420,350,'#f7c16e');for(let y=300;y<610;y+=32)line(210,y,870,y,'#d9782d',7);
   text('जय महाराष्ट्र!',540,135,42,fg,{weight:800});text('वाढदिवसाच्या शुभेच्छा',540,220,39,fg,{weight:800});
   common(455,710,835);text('गावासाठी माझा छोटासा हातभार',540,1030,20,fg);
 }else if(k==='village'){
   ctx.fillStyle='#d3dfb5';ctx.fillRect(0,700,1080,380);circle(860,185,85,'#e9b65d');
   text('आपलं गाव • आपली माणसं',540,135,32,a,{weight:800});text('वाढदिवसाचा आनंद',540,215,47,fg,{weight:800});
   common(410,680,825);text('दर्डेवाडी',540,1030,25,a,{weight:800});
 }else if(k==='royal'){
   ctx.strokeStyle=a;ctx.lineWidth=4;ctx.strokeRect(48,48,984,984);ctx.strokeRect(70,70,940,940);
   text('✦ शुभेच्छा ✦',540,150,32,a);text('वाढदिवस',540,245,80,fg,{weight:800});common(440,700,825);
 }else if(k==='minimal'){
   line(95,110,985,110,fg,2);text('एक खास दिवस',110,165,25,a,{align:'left'});text('वाढदिवसाच्या',110,280,66,fg,{align:'left',weight:800});text('मनःपूर्वक शुभेच्छा!',110,355,54,fg,{align:'left',weight:800});
   drawPhoto(790,540,130,true);text(name,110,600,55,fg,{align:'left',weight:800,maxWidth:650});if(dateText)text(dateText,110,655,22,a,{align:'left'});
   wrapText(message,800,25).forEach((s,i)=>text(s,110,760+i*38,25,fg,{align:'left',maxWidth:800}));text('₹ '+amount+' • गावाच्या विकासासाठी',110,950,30,a,{align:'left',weight:800});line(95,1000,985,1000,fg,2);
 }else if(k==='editorial'){
   text('माझा गाव',110,125,29,a,{align:'left',weight:800});text('माझा',110,260,100,fg,{align:'left',weight:800});text('अभिमान.',110,370,100,fg,{align:'left',weight:800});line(110,430,970,430,fg,3);
   drawPhoto(790,625,150,true);text('वाढदिवस विशेष',110,540,37,a,{align:'left'});text(name,110,625,48,fg,{align:'left',weight:800,maxWidth:600});wrapText(message,600,24).forEach((s,i)=>text(s,110,720+i*38,24,fg,{align:'left',maxWidth:600}));text('₹ '+amount,110,940,36,a,{align:'left',weight:800});text('दर्डेवाडी',110,1000,22,fg,{align:'left'});
 }else if(k==='luxury'){
   ctx.strokeStyle=a;ctx.lineWidth=3;ctx.strokeRect(45,45,990,990);ctx.strokeRect(64,64,952,952);star(540,150,32,a);
   text('A CELEBRATION OF LIFE',540,225,23,a);text('वाढदिवस',540,310,70,fg,{weight:800});common(480,725,845);text('माझा गाव, माझा अभिमान',540,1030,21,a);
 }else if(k==='pastel'){
   circle(540,440,340,'#f8e9e9');circle(540,440,290,'#edcdd5');text('आजचा दिवस खास',540,155,34,fg);common(430,700,830);text('तुमच्या आयुष्यात आनंद फुलत राहो!',540,1030,20,a);
 }else if(k==='blue'){
   ctx.fillStyle='#c6dce2';ctx.fillRect(0,0,300,1080);text('BIRTHDAY',80,150,25,a,{align:'left'});text('विशेष',80,195,25,a,{align:'left'});
   text('वाढदिवसाच्या',540,245,57,fg,{weight:800});text('हार्दिक शुभेच्छा',540,315,53,fg,{weight:800});common(490,730,850);
 }else{
   text('चला साजरा करूया!',540,150,40,a,{weight:800});text('वाढदिवसाचा आनंद',540,235,56,fg,{weight:800});common(440,710,830);
   for(let i=0;i<24;i++){const x=(i*173+53)%1080,y=(i*257+33)%1080;circle(x,y,5+(i%3)*2,a)}
 }
 ctx.save();ctx.strokeStyle='#ffffff55';ctx.lineWidth=2;ctx.strokeRect(12,12,1056,1056);ctx.restore();
}
function showToast(message){const el=$('toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2500)}
function safeFilename(){return (val('posterName').trim()||'birthday').replace(/[^\p{L}\p{N}-]+/gu,'-').replace(/^-|-$/g,'')||'birthday'}
function exportBlob(){return new Promise(resolve=>{draw();canvas.toBlob(resolve,'image/png')})}
async function downloadPoster(){const blob=await exportBlob();if(!blob){showToast('पोस्टर डाउनलोड करता आले नाही. पुन्हा प्रयत्न करा.');return}const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`${safeFilename()}-maza-gav-poster.png`;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);showToast('पोस्टर डाउनलोड झाले!')}
async function sharePoster(){
 const blob=await exportBlob();if(!blob){showToast('पोस्टर तयार करता आले नाही.');return}
 const file=new File([blob],`${safeFilename()}-poster.png`,{type:'image/png'});
 const shareData={files:[file],title:'माझा गाव, माझा अभिमान',text:`${val('posterName')} यांचा वाढदिवस! गावाच्या विकासासाठी ₹${val('posterAmount')||100} चे स्वेच्छेचे योगदान.`};
 if(navigator.canShare&&navigator.canShare({files:[file]})&&navigator.share){try{await navigator.share(shareData)}catch(e){if(e.name!=='AbortError')showToast('शेअर करता आले नाही. पोस्टर डाउनलोड करून शेअर करा.')}}else{const msg=encodeURIComponent(shareData.text+' माझा गाव, माझा अभिमान — दर्डेवाडी');window.open(`https://wa.me/?text=${msg}`,'_blank','noopener');showToast('WhatsApp संदेश उघडला. पोस्टर डाउनलोड करून जोडा.')}
}
function refresh(){draw()}
['posterName','posterDate','posterAmount','posterEvent','posterMessage','posterFont','posterAccent','posterDecor'].forEach(id=>{ $(id).addEventListener('input',refresh);$(id).addEventListener('change',refresh) });
document.querySelectorAll('.category-btn').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.category-btn').forEach(x=>x.classList.toggle('active',x===b));renderTemplatePicker()}));
$('posterPhoto').addEventListener('change',e=>{const file=e.target.files?.[0];if(!file)return;if(!file.type.startsWith('image/')){showToast('कृपया योग्य फोटो निवडा.');return}const reader=new FileReader();reader.onload=()=>{const img=new Image();img.onload=()=>{photo=img;draw();showToast('फोटो जोडला आहे.')};img.onerror=()=>showToast('फोटो उघडता आला नाही.');img.src=reader.result};reader.readAsDataURL(file)});
$('downloadPoster').addEventListener('click',downloadPoster);$('sharePoster').addEventListener('click',sharePoster);
$('resetPoster').addEventListener('click',()=>{$('posterName').value='आपले नाव';$('posterDate').value='';$('posterAmount').value='100';$('posterEvent').value='वाढदिवसाच्या हार्दिक शुभेच्छा';$('posterMessage').value='माझ्या आनंदाच्या दिवशी आपल्या गावाच्या विकासासाठी माझा छोटासा हातभार.';$('posterFont').value='Mukta';$('posterAccent').value='#d79b35';$('posterDecor').checked=true;$('posterPhoto').value='';photo=null;active=templates[0];document.querySelectorAll('.category-btn').forEach((b,i)=>b.classList.toggle('active',i===0));renderTemplatePicker();draw();showToast('पोस्टर रीसेट केले.')});
$('copyUpi').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('mazagav@upi');showToast('UPI ID कॉपी झाला!')}catch(e){showToast('UPI ID: mazagav@upi')}});
$('menuToggle').addEventListener('click',()=>{const nav=$('mainNav'),open=nav.classList.toggle('open');$('menuToggle').setAttribute('aria-expanded',String(open));$('menuToggle').textContent=open?'×':'☰'});
document.querySelectorAll('#mainNav a').forEach(a=>a.addEventListener('click',()=>{$('mainNav').classList.remove('open');$('menuToggle').setAttribute('aria-expanded','false');$('menuToggle').textContent='☰'}));
$('year').textContent=new Date().getFullYear();
renderTemplatePicker();draw();
