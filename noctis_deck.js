(()=>{const l=document.getElementById('fogL');for(let i=0;i<8;i++){const p=document.createElement('div');p.className='fog-p';const s=180+Math.random()*380;p.style.cssText=`width:${s}px;height:${s}px;top:${Math.random()*100}%;left:-${s}px;animation-duration:${22+Math.random()*26}s;animation-delay:${Math.random()*16}s`;l.appendChild(p)}})();

const DEFAULT_IMGS = {
  char_cazador:   'resources/personajes/cazadora.jpg',
  char_hechicera: 'resources/personajes/maga.jpg',
  char_espectro:  'resources/personajes/espectro.png',
  enemy0:         'resources/enemigos/enemigo1.png',
  enemy1:         'resources/enemigos/enemigo2.png',
  enemy2:         'resources/enemigos/enemigo3.png',
  card_strike:    'resources/cartas/golpesombrio.jpg',
  card_slash:     'resources/cartas/tajocruento.jpg',
  card_lance:     'resources/cartas/lanzaniebla.png',
  card_double:    'resources/cartas/Golpe doble.png',
  card_shield:    'resources/cartas/escudoarcano.jpg',
  card_mantle:    'resources/cartas/manto de sombras.jpg',
  card_ritual:    'resources/cartas/ritual of blood.jpg',
  card_cloud:     'resources/cartas/nube venenosa.jpg',
  card_smite:     'resources/cartas/golpe sagrado.jpg',
  card_retaliate: 'resources/cartas/cartarepresalia.jpg',
  card_mend:      'resources/cartas/susurro vital.jpg',   // ← pon aquí tu ruta de imagen para "Susurro Vital"
};

let CUSTOM={};
function getImg(k){return CUSTOM[k]||DEFAULT_IMGS[k]||null}

const CHARS=[
  {id:'cazador',name:'El Cazador',title:'Maestro del Filo',imgKey:'char_cazador',hp:75,mana:3,
   passive:'Sangre por Sangre: al aplicar Sangrado, +1 daño extra.',pid:'bleed_bonus',
   deck:['strike','strike','strike','strike','shield','shield'],
   stats:{Vida:'75',Maná:'3/turno',Estilo:'Ataque directo'},color:'#c9984a',
   svg:`<svg viewBox="0 0 100 130" fill="none"><ellipse cx="50" cy="126" rx="30" ry="4" fill="#00000044"/><circle cx="50" cy="28" r="14" fill="#1a1228" stroke="#c9984a88" stroke-width="1.5"/><circle cx="50" cy="28" r="10" fill="#2a1838"/><rect x="32" y="43" width="36" height="44" rx="5" fill="#1a1228" stroke="#c9984a66"/><rect x="24" y="45" width="12" height="34" rx="4" fill="#13101e" stroke="#c9984a44"/><rect x="64" y="45" width="12" height="34" rx="4" fill="#13101e" stroke="#c9984a44"/><path d="M32 52 Q16 68 20 88 Q30 78 32 84" fill="#0f0c18" stroke="#c9984a33"/><path d="M68 52 Q84 68 80 88 Q70 78 68 84" fill="#0f0c18" stroke="#c9984a33"/><line x1="82" y1="22" x2="76" y2="82" stroke="#c9984a" stroke-width="2.5"/><circle cx="82" cy="22" r="5" fill="#1a1228" stroke="#c9984a" stroke-width="1.5"/><circle cx="82" cy="22" r="2.5" fill="#c9984a88"/></svg>`},
  {id:'hechicera',name:'La Hechicera',title:'Tejedora de Miasmas',imgKey:'char_hechicera',hp:60,mana:4,
   passive:'Miasma: el veneno que aplicas hace +1 daño extra por turno.',pid:'poison_bonus',
   deck:['lance','lance','shield','cloud','strike','strike'],
   stats:{Vida:'60',Maná:'4/turno',Estilo:'Veneno y control'},color:'#7a3acc',
   svg:`<svg viewBox="0 0 100 130" fill="none"><ellipse cx="50" cy="126" rx="28" ry="4" fill="#00000044"/><circle cx="50" cy="26" r="13" fill="#1a1028" stroke="#7a3acc88" stroke-width="1.5"/><ellipse cx="50" cy="22" rx="16" ry="8" fill="#130c1e" stroke="#7a3acc66"/><rect x="33" y="40" width="34" height="48" rx="4" fill="#1a1028" stroke="#7a3acc66"/><path d="M33 50 Q14 60 16 82 Q26 72 33 78" fill="#130c1e" stroke="#7a3acc44"/><path d="M67 50 Q86 60 84 82 Q74 72 67 78" fill="#130c1e" stroke="#7a3acc44"/><circle cx="50" cy="62" r="10" fill="#3a1a5a44" stroke="#9a5aee" stroke-width="1"/><circle cx="50" cy="62" r="5" fill="#7a3acc66"/><path d="M40 90 Q50 108 60 90" fill="#1a0a28" stroke="#7a3acc66"/></svg>`},
  {id:'espectro',name:'El Espectro',title:'Sombra del Pacto',imgKey:'char_espectro',hp:65,mana:3,
   passive:'Forma Etérea: el primer golpe de cada combate es ignorado.',pid:'first_hit',
   deck:['strike','shield','shield','retaliate','strike','ritual'],
   stats:{Vida:'65',Maná:'3/turno',Estilo:'Equilibrio y esquiva'},color:'#4a8aaa',
   svg:`<svg viewBox="0 0 100 130" fill="none"><ellipse cx="50" cy="126" rx="26" ry="4" fill="#00000033"/><ellipse cx="50" cy="55" rx="28" ry="50" fill="#1a2a3a88" stroke="#4a8aaa55" stroke-width="1"/><circle cx="50" cy="28" r="14" fill="#1a2a3a" stroke="#4a8aaa88" stroke-width="1.5"/><circle cx="44" cy="26" r="5" fill="#0a1018" stroke="#4a8aaa66"/><circle cx="56" cy="26" r="5" fill="#0a1018" stroke="#4a8aaa66"/><circle cx="44" cy="26" r="2.5" fill="#4a8aaa88"/><circle cx="56" cy="26" r="2.5" fill="#4a8aaa88"/><path d="M30 45 Q14 58 18 80 Q28 70 30 76" fill="#1a2a3a66" stroke="#4a8aaa33"/><path d="M70 45 Q86 58 82 80 Q72 70 70 76" fill="#1a2a3a66" stroke="#4a8aaa33"/><path d="M36 100 Q50 118 64 100 Q58 112 50 110 Q42 112 36 100Z" fill="#1a2a3a88" stroke="#4a8aaa44"/></svg>`},
];

const CARDS=[
  {id:'strike',  name:'Golpe Sombrío',   type:'attack', cost:1,dmg:6, blk:0,bleed:0,psn:0,desc:'Golpe veloz con tu filo.'},
  {id:'slash',   name:'Tajo Cruento',    type:'attack', cost:2,dmg:10,blk:0,bleed:2,psn:0,desc:'Daño e inflige sangrado.'},
  {id:'lance',   name:'Lanza de Niebla', type:'attack', cost:1,dmg:4, blk:0,bleed:0,psn:2,desc:'Veneno que consume desde dentro.'},
  {id:'double',  name:'Golpe Doble',     type:'attack', cost:2,dmg:5, blk:0,bleed:0,psn:0,desc:'Golpea dos veces.',dbl:true},
  {id:'shield',  name:'Escudo Arcano',   type:'defense',cost:1,dmg:0, blk:7, bleed:0,psn:0,desc:'Barrera mágica.'},
  {id:'mantle',  name:'Manto de Sombras',type:'defense',cost:2,dmg:0, blk:14,bleed:0,psn:0,desc:'Protección pesada.'},
  {id:'ritual',  name:'Ritual de Sangre',type:'skill',  cost:2,dmg:0, blk:0, bleed:4,psn:0,desc:'Maldice con sangrado severo.'},
  {id:'cloud',   name:'Nube Venenosa',   type:'skill',  cost:2,dmg:0, blk:0, bleed:0,psn:4,desc:'Envenena al enemigo.'},
  {id:'smite',   name:'Golpe Sagrado',   type:'attack', cost:1,dmg:8, blk:0, bleed:0,psn:0,desc:'Luz arcana concentrada.'},
  {id:'retaliate',name:'Represalia',     type:'skill',  cost:1,dmg:3, blk:4, bleed:0,psn:0,desc:'Ataca y defiende.'},
  {id:'mend',    name:'Susurro Vital',   type:'skill',  cost:1,dmg:0, blk:0, bleed:0,psn:0,heal:8, desc:'Recupera 8 de Vitalidad.'},
];

const ENM={
  0:[{name:'Rata Espectral',hp:22,dmg:6,bleed:0,psn:0,rw:10},{name:'Mendigo Maldito',hp:20,dmg:7,bleed:0,psn:0,rw:10},{name:'Sombra Errante',hp:24,dmg:5,bleed:2,psn:0,rw:12}],
  1:[{name:'Guardia Corrompido',hp:40,dmg:11,bleed:0,psn:0,rw:20},{name:'Heraldo de Niebla',hp:36,dmg:12,bleed:0,psn:2,rw:22},{name:'Vampiro Menor',hp:44,dmg:10,bleed:3,psn:0,rw:20}],
  2:[{name:'El Conde Sombrío',hp:80,dmg:18,bleed:3,psn:0,rw:50},{name:'Madre de Niebla',hp:75,dmg:15,bleed:0,psn:4,rw:50}],
};

// ═══════════════════════════════════════════════
//  SAVE / LOAD
// ═══════════════════════════════════════════════
const SK='noctis_v3';
function saveG(){
  if(!G||!G.player)return;
  try{
    localStorage.setItem(SK,JSON.stringify({
      difficulty:G.difficulty,
      charId:G.charId,
      turn:G.turn,
      gold:G.gold,
      player:{
        hp:G.player.hp,
        maxHp:G.player.maxHp,
        mana:G.player.mana,
        maxMana:G.player.maxMana,
        block:G.player.block,
        bleed:G.player.bleed,
        poison:G.player.poison,
        deck:[...G.player.deck],
        hand:[...G.player.hand],
        discard:[...G.player.discard]
      },
      map:G.map,
      path:G.path,
      savedAt:new Date().toLocaleString('es-ES')
    }));
  }catch(e){}
}
function loadG(){try{const r=localStorage.getItem(SK);return r?JSON.parse(r):null}catch(e){return null}}
function deleteSave(){localStorage.removeItem(SK);updateTitle()}
function saveCustom(){
  try{
    const meta={};
    Object.keys(CUSTOM).forEach(k=>{try{localStorage.setItem('ni_'+k,CUSTOM[k]);meta[k]=1}catch(e){}});
    localStorage.setItem('ni_meta',JSON.stringify(meta));
  }catch(e){}
}
function loadCustom(){
  try{
    const meta=JSON.parse(localStorage.getItem('ni_meta')||'{}');
    Object.keys(meta).forEach(k=>{const v=localStorage.getItem('ni_'+k);if(v)CUSTOM[k]=v});
  }catch(e){}
}

// ═══════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════
let G={difficulty:0};
let selChar=null;

function newRun(cid){
  const ch=CHARS.find(c=>c.id===cid);
  G={
    difficulty:G.difficulty||0,
    charId:cid,
    turn:1,
    gold:0,
    player:{
      hp:ch.hp,maxHp:ch.hp,mana:ch.mana,maxMana:ch.mana,
      block:0,bleed:0,poison:0,
      deck:[...ch.deck],hand:[],discard:[]
    },
    enemy:null,
    map:genMap(),
    path:{act:0,row:0,col:null},  // col=null → pendiente de elegir
    firstHitUsed:false
  };
  saveG();
}

function restoreRun(d){
  G={
    difficulty:d.difficulty||0,
    charId:d.charId,
    turn:d.turn,
    gold:d.gold,
    player:{
      hp:d.player.hp,
      maxHp:d.player.maxHp,
      mana:d.player.mana,
      maxMana:d.player.maxMana,
      block:d.player.block||0,
      bleed:d.player.bleed||0,
      poison:d.player.poison||0,
      deck:[...(d.player.deck||[])],
      hand:[...(d.player.hand||[])],
      discard:[...(d.player.discard||[])]
    },
    enemy:null,
    map:d.map,
    path:d.path||{act:0,row:0,col:null},
    firstHitUsed:false
  };
}

// ═══════════════════════════════════════════════
//  MAP GENERATION — Slay the Spire style
//  Cada acto: 6 filas de 2 nodos + jefe final
//  El jugador elige uno de los dos nodos por fila
// ═══════════════════════════════════════════════
function pickType(row, actNum){
  const d=G.difficulty||0;
  if(row===0)return'combat';
  if(row===5)return'rest';
  const r=Math.random();
  const elite = 0.08+actNum*0.04+d*0.03;
  const rest   = elite+0.16;
  const shop   = rest+0.12;
  const chest  = shop+0.15;
  if(r<elite) return'elite';
  if(r<rest)  return'rest';
  if(r<shop)  return'shop';
  if(r<chest) return'chest';
  return'combat';
}

function genMap(){
  // Estructura: array de actos, cada acto = {rows:[[nodeL,nodeR],...6], boss:node}
  // G.path = {act, row, col}  col=null mientras no elige
  return Array.from({length:3},(_,ai)=>({
    rows: Array.from({length:6},(_,ri)=>[
      {type:pickType(ri,ai),visited:false},
      {type:pickType(ri,ai),visited:false}
    ]),
    boss:{type:'boss',visited:false}
  }));
}

function cById(id){return CARDS.find(c=>c.id===id)}
function chById(id){return CHARS.find(c=>c.id===id)}
function shuf(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b}

// ═══════════════════════════════════════════════
//  SCREENS
// ═══════════════════════════════════════════════
function show(id){
  document.querySelectorAll('.screen').forEach(s=>{s.style.display='none';s.classList.remove('active')});
  const el=document.getElementById('s-'+id);if(!el)return;
  el.style.display='flex';
  if(id==='custom')buildCustom();
  requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('active')));
}
function goTitle(){updateTitle();show('title')}
function updateTitle(){
  const sv=loadG();
  const bc=document.getElementById('btnContinue'),sb=document.getElementById('saveBadge'),bd=document.getElementById('btnDel'),db=document.getElementById('diffBadge');
  if(sv){bc.style.display='';sb.style.display='';bd.style.display='';const ch=chById(sv.charId);const p=sv.path||{act:0,row:0};sb.textContent=`${ch?ch.name:'?'}  ·  Acto ${(p.act||0)+1}  ·  ${sv.savedAt}`}
  else{bc.style.display='none';sb.style.display='none';bd.style.display='none'}
  db.textContent=(G.difficulty||0)>0?`Dificultad: ${G.difficulty}`:'';
}
function goCharSelect(){renderChars();show('chars')}

// FIX BUG 1: Al continuar, restauramos el run y mostramos el mapa sin marcar el nodo como visitado
function continueGame(){
  const d=loadG();
  if(!d)return;
  restoreRun(d);
  showMap();
}

// ═══════════════════════════════════════════════
//  CHARACTER SELECT
// ═══════════════════════════════════════════════
function renderChars(){
  selChar=null;document.getElementById('btnStart').style.opacity='.4';document.getElementById('btnStart').style.pointerEvents='none';
  const row=document.getElementById('charsRow');row.innerHTML='';
  CHARS.forEach(ch=>{
    const card=document.createElement('div');card.className='char-card';card.dataset.id=ch.id;
    const imgSrc=getImg(ch.imgKey);
    const port=imgSrc?`<img src="${imgSrc}" alt="${ch.name}">`:`<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center">${ch.svg}</div>`;
    const statsH=Object.entries(ch.stats).map(([k,v])=>`<div class="char-stat"><span>${k}</span><span class="sv">${v}</span></div>`).join('');
    card.innerHTML=`<div class="sel-mark">✦</div><div class="char-portrait">${port}</div><div class="char-name">${ch.name}</div><div class="char-title">${ch.title}</div><div class="char-stats">${statsH}</div><div class="char-passive">${ch.passive}</div>`;
    card.addEventListener('click',()=>{selChar=ch.id;document.querySelectorAll('.char-card').forEach(c=>c.classList.toggle('selected',c.dataset.id===ch.id));const b=document.getElementById('btnStart');b.style.opacity='1';b.style.pointerEvents='';});
    row.appendChild(card);
  });
}
function startRunWithChar(){if(!selChar)return;newRun(selChar);showMap()}

// ═══════════════════════════════════════════════
//  MAP
// ═══════════════════════════════════════════════
function showMap(){renderMap();show('map')}

// ═══════════════════════════════════════════════
//  MAP RENDER — bifurcaciones estilo Slay the Spire
// ═══════════════════════════════════════════════
function renderMap(){
  const c=document.getElementById('mapActs');c.innerHTML='';
  const IC={combat:'⚔',elite:'💀',rest:'🕯',shop:'🛒',boss:'👁',chest:'📦'};
  const LABEL={combat:'COMBATE',elite:'ÉLITE',rest:'DESCANSO',shop:'TIENDA',boss:'JEFE',chest:'COFRE'};
  const {act:curAct,row:curRow,col:curCol}=G.path;

  G.map.forEach((actData,ai)=>{
    const col=document.createElement('div');col.className='map-act';
    const lbl=document.createElement('div');lbl.className='act-lbl';lbl.textContent=`Acto ${ai+1}`;col.appendChild(lbl);

    actData.rows.forEach((rowPair,ri)=>{
      const rowEl=document.createElement('div');rowEl.className='map-row';

      rowPair.forEach((node,ci)=>{
        const el=document.createElement('div');el.className='mnode';
        if(node.type==='elite')el.classList.add('elite');
        if(node.type==='chest')el.classList.add('chest');

        // Nodo es "elegible ahora" si: es el acto/fila actual Y el jugador aún no eligió (col===null)
        const isChoosable = ai===curAct && ri===curRow && curCol===null;
        // Nodo es "el elegido actualmente" (jugador entró pero no terminó, ej: cargó partida mid-combat)
        const isActive    = ai===curAct && ri===curRow && curCol===ci && !node.visited;
        const isVis       = node.visited;
        // El otro nodo de la misma fila fue elegido (esta fila ya está resuelta)
        const siblingChosen = rowPair[1-ci]&&rowPair[1-ci].visited;

        if(isVis){
          el.classList.add('vis');
        } else if(isActive){
          // Nodo actual seleccionado (partida cargada mid-combat) — resaltado especial
          el.classList.add('cur','cur-active');
        } else if(isChoosable && !siblingChosen){
          // Nodo elegible — puede hacer click
          el.classList.add('cur');
        } else {
          el.classList.add('lkd');
        }

        el.innerHTML=`<div class="n-ico">${IC[node.type]||'?'}</div><div class="n-lbl">${LABEL[node.type]||node.type}</div>`;

        if((isChoosable && !siblingChosen) || isActive){
          el.addEventListener('click',()=>enterNode(ai,ri,ci));
        }
        rowEl.appendChild(el);
      });

      col.appendChild(rowEl);
      if(ri<actData.rows.length-1){
        const cn=document.createElement('div');cn.className='mconn-h';col.appendChild(cn);
      }
    });

    // Conector y jefe
    const cnBoss=document.createElement('div');cnBoss.className='mconn-h';col.appendChild(cnBoss);
    const bossEl=document.createElement('div');bossEl.className='mnode boss';
    const isBossCur    = ai===curAct && curRow===6 && curCol===null;
    const isBossActive = ai===curAct && curRow===6 && curCol===0 && !actData.boss.visited;
    const isBossVis    = actData.boss.visited;
    if(isBossVis)bossEl.classList.add('vis');
    else if(isBossActive)bossEl.classList.add('cur','cur-active');
    else if(isBossCur)bossEl.classList.add('cur');
    else bossEl.classList.add('lkd');
    bossEl.innerHTML=`<div class="n-ico">👁</div><div class="n-lbl">JEFE</div>`;
    if(isBossCur||isBossActive)bossEl.addEventListener('click',()=>enterNode(ai,6,0));
    col.appendChild(bossEl);

    c.appendChild(col);
  });
}

function enterNode(ai,ri,ci){
  G.path={act:ai,row:ri,col:ci};
  saveG();
  const node = ri===6 ? G.map[ai].boss : G.map[ai].rows[ri][ci];
  if(!node)return;
  if(['combat','elite','boss'].includes(node.type)){
    startCombat(node.type==='combat'?0:node.type==='elite'?1:2);
  } else if(node.type==='rest'){
    show('rest');
  } else if(node.type==='shop'){
    showShop();
  } else if(node.type==='chest'){
    showChest();
  }
}

function advance(){
  const {act,row,col}=G.path;
  // Marcar nodo actual como visitado
  if(row===6){G.map[act].boss.visited=true;}
  else if(col!==null){G.map[act].rows[row][col].visited=true;}

  const nextRow=row+1;
  // ¿Acaba el acto? (jefe completado = row 6)
  if(row===6){
    const nextAct=act+1;
    if(nextAct>=G.map.length){
      // Victoria — mostrar créditos
      G.difficulty++;
      localStorage.removeItem(SK);
      showCredits();
      return;
    }
    G.path={act:nextAct,row:0,col:null};
  } else {
    G.path={act,row:nextRow,col:null};
  }
  saveG();
  showMap();
}

// ═══════════════════════════════════════════════
//  COMBAT
// ═══════════════════════════════════════════════
function startCombat(tier){
  const pool=ENM[tier];const t=pool[Math.floor(Math.random()*pool.length)];
  G.enemy={...t,maxHp:t.hp,block:0,bleed:0,poison:0,tier};
  G.turn=1;G.firstHitUsed=false;
  const p=G.player;
  p.block=0;
  p.mana=p.maxMana;
  // FIX BUG 2: Al iniciar combate, si hay cartas en mano las devolvemos al mazo
  // (por si se cargó partida con cartas en mano de un turno anterior)
  if(p.hand.length>0){
    p.discard.push(...p.hand);
    p.hand=[];
  }
  draw(5);
  applyPort();
  const ch=chById(G.charId);
  document.getElementById('passiveInfo').textContent=ch?ch.passive:'';
  document.getElementById('charBadge').textContent=ch?ch.name:'';
  renderE();renderHand();renderPS();updMana();
  document.getElementById('turnLbl').textContent='Turno 1';
  document.getElementById('clog').innerHTML='';
  addLog(`¡${G.enemy.name} aparece!`,'ene');
  show('game');
}

function applyPort(){
  const ch=chById(G.charId);if(!ch)return;
  const pc=document.getElementById('portContent');
  const img=getImg(ch.imgKey);
  pc.innerHTML=img?`<img src="${img}" style="width:100%;height:100%;object-fit:cover">`:`<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center">${ch.svg}</div>`;
}

function draw(n=5){
  const p=G.player;
  for(let i=0;i<n;i++){
    if(!p.deck.length){
      if(!p.discard.length)break;
      // FIX BUG 2: Al barajar el descarte, usamos spread para crear un nuevo array independiente
      p.deck=shuf([...p.discard]);
      p.discard=[];
      addLog('Mazo repuesto.','sta');
    }
    p.hand.push(p.deck.pop());
  }
}

function renderE(){
  const e=G.enemy;
  document.getElementById('eName').textContent=e.name;
  document.getElementById('eHpBar').style.width=Math.max(0,e.hp/e.maxHp*100)+'%';
  document.getElementById('eHpTxt').textContent=`${Math.max(0,e.hp)} / ${e.maxHp}`;
  document.getElementById('eIntent').textContent=`⚔ Prepara ataque de ${e.dmg}`;
  document.getElementById('eSprite').innerHTML=getESVG(e.name,e.tier||0);
  const st=document.getElementById('eStat');st.innerHTML='';
  if(e.block)st.innerHTML+=`<span class="si si-bk">🛡 ${e.block}</span>`;
  if(e.bleed)st.innerHTML+=`<span class="si si-bl">🩸 ${e.bleed}</span>`;
  if(e.poison)st.innerHTML+=`<span class="si si-ps">☠ ${e.poison}</span>`;
}

function getESVG(name,tier){
  const img=getImg('enemy'+tier);
  if(img)return`<img src="${img}" style="width:100%;height:100%;object-fit:contain">`;
  if(tier===2)return`<svg viewBox="0 0 130 168" fill="none"><ellipse cx="65" cy="134" rx="42" ry="7" fill="#00000066"/><rect x="38" y="64" width="54" height="74" rx="7" fill="#1a0a28" stroke="#7a1f3566" stroke-width="1.5"/><path d="M38 79 Q18 69 16 95 Q26 85 38 91" fill="#130820"/><path d="M92 79 Q112 69 114 95 Q104 85 92 91" fill="#130820"/><ellipse cx="65" cy="53" rx="22" ry="24" fill="#1a0a28" stroke="#7a1f3588" stroke-width="1.5"/><circle cx="55" cy="49" r="7" fill="#0a0510" stroke="#c0304066"/><circle cx="75" cy="49" r="7" fill="#0a0510" stroke="#c0304066"/><circle cx="55" cy="49" r="4" fill="#c0304088"/><circle cx="75" cy="49" r="4" fill="#c0304088"/><path d="M52 64 Q65 72 78 64" stroke="#7a1f35" stroke-width="1.5" fill="none"/><path d="M43 30 Q65 14 87 30" stroke="#c9984a66" stroke-width="1.5" fill="none"/><line x1="52" y1="30" x2="44" y2="14" stroke="#c9984a55"/><line x1="78" y1="30" x2="86" y2="14" stroke="#c9984a55"/><line x1="65" y1="30" x2="65" y2="10" stroke="#c9984a55"/></svg>`;
  if(tier===1)return`<svg viewBox="0 0 130 168" fill="none"><ellipse cx="65" cy="137" rx="36" ry="6" fill="#00000066"/><rect x="40" y="74" width="50" height="65" rx="6" fill="#1a1028" stroke="#3a1a4a66" stroke-width="1.5"/><path d="M40 85 Q22 77 20 99 Q32 91 40 97" fill="#130c1e"/><path d="M90 85 Q108 77 110 99 Q98 91 90 97" fill="#130c1e"/><ellipse cx="65" cy="59" rx="20" ry="22" fill="#1a1028" stroke="#3a1a4a88" stroke-width="1.5"/><circle cx="56" cy="55" r="6" fill="#0a0812" stroke="#5a1a7a66"/><circle cx="74" cy="55" r="6" fill="#0a0812" stroke="#5a1a7a66"/><circle cx="56" cy="55" r="3" fill="#7a40aa88"/><circle cx="74" cy="55" r="3" fill="#7a40aa88"/><path d="M58 67 Q65 73 72 67" stroke="#5a1a7a" stroke-width="1.5" fill="none"/><line x1="62" y1="69" x2="60" y2="74" stroke="#c0304088" stroke-width="1.5"/><line x1="68" y1="69" x2="70" y2="74" stroke="#c0304088" stroke-width="1.5"/></svg>`;
  return`<svg viewBox="0 0 130 168" fill="none"><ellipse cx="65" cy="141" rx="28" ry="5" fill="#00000066"/><circle cx="65" cy="64" r="28" fill="#1a1428" stroke="#2a1a3a88" stroke-width="1.5"/><circle cx="55" cy="59" r="7" fill="#0a0810" stroke="#4a2a6a66"/><circle cx="75" cy="59" r="7" fill="#0a0810" stroke="#4a2a6a66"/><circle cx="55" cy="59" r="3.5" fill="#5a3a8888"/><circle cx="75" cy="59" r="3.5" fill="#5a3a8888"/><path d="M53 72 Q65 80 77 72" stroke="#3a1a4a" stroke-width="1.5" fill="none"/><rect x="47" y="92" width="36" height="40" rx="4" fill="#13101e" stroke="#2a1a3a66"/><path d="M47 102 Q32 94 30 112 Q38 106 47 110" fill="#0f0c1a"/><path d="M83 102 Q98 94 100 112 Q92 106 83 110" fill="#0f0c1a"/></svg>`;
}

function renderHand(){
  const zone=document.getElementById('handZone');zone.innerHTML='';
  const p=G.player,n=p.hand.length;
  p.hand.map(id=>cById(id)).forEach((card,i)=>{
    if(!card)return;
    const wrap=document.createElement('div');wrap.className='c-slot';
    const sp=Math.min(26,13*n),angle=n>1?-sp/2+(sp/(n-1))*i:0;
    wrap.style.cssText=`transform:rotate(${angle}deg) translateY(${Math.abs(angle)*.5}px);z-index:${i+1};margin-left:${i===0?0:-16}px`;
    const can=card.cost<=p.mana;
    const g=document.createElement('div');g.className=`gcard ${card.type} ${can?'playable':'unplayable'}`;
    const ds=card.dbl?card.dmg*2:card.dmg;
    let fx='';
    if(card.dmg)fx+=`<span class="fx fx-d">⚔ ${ds}</span>`;
    if(card.blk)fx+=`<span class="fx fx-b">🛡 ${card.blk}</span>`;
    if(card.bleed)fx+=`<span class="fx fx-bl">🩸 ${card.bleed}</span>`;
    if(card.psn)fx+=`<span class="fx fx-p">☠ ${card.psn}</span>`;
    if(card.heal)fx+=`<span class="fx fx-hl">❤ ${card.heal}</span>`;
    g.innerHTML=`<div class="c-bar"></div><div class="c-cost">${card.cost}</div><div class="c-art">${getCArt(card)}</div><div class="c-name">${card.name}</div><div class="c-fx">${fx}</div>`;
    wrap.appendChild(g);
    if(can)wrap.addEventListener('click',()=>playCard(i));
    zone.appendChild(wrap);
  });
}

function getCArt(card){
  const img=getImg('card_'+card.id);
  if(img)return`<img src="${img}" style="width:100%;height:100%;object-fit:cover;border-radius:2px">`;
  if(card.type==='attack'){if(card.id==='double')return`<svg viewBox="0 0 60 60" fill="none"><line x1="10" y1="50" x2="35" y2="10" stroke="#c03050" stroke-width="3" stroke-linecap="round"/><line x1="25" y1="50" x2="50" y2="10" stroke="#e05070" stroke-width="3" stroke-linecap="round"/><circle cx="34" cy="11" r="4" fill="#e05070"/><circle cx="49" cy="11" r="4" fill="#c03050"/></svg>`;return`<svg viewBox="0 0 60 60" fill="none"><line x1="12" y1="48" x2="48" y2="12" stroke="#c9984a" stroke-width="3" stroke-linecap="round"/><polygon points="48,12 42,20 38,14" fill="#c9984a"/><rect x="8" y="44" width="14" height="5" rx="2" transform="rotate(-45 8 44)" fill="#7a5a2a"/></svg>`}
  if(card.type==='defense')return`<svg viewBox="0 0 60 60" fill="none"><path d="M30 8 L50 18 L50 36 Q50 50 30 56 Q10 50 10 36 L10 18 Z" fill="#1a3a7a44" stroke="#3a6acc" stroke-width="2"/><path d="M30 16 L42 22 L42 36 Q42 46 30 50 Q18 46 18 36 L18 22 Z" fill="#3a6acc22"/></svg>`;
  if(card.id==='mend')return`<svg viewBox="0 0 60 60" fill="none"><circle cx="30" cy="30" r="20" fill="#1a3a1a44" stroke="#4acc70" stroke-width="1.5"/><rect x="26" y="16" width="8" height="28" rx="3" fill="#4acc7088"/><rect x="16" y="26" width="28" height="8" rx="3" fill="#4acc7088"/><circle cx="30" cy="30" r="8" fill="#4acc7033" stroke="#6aee90" stroke-width="1"/></svg>`;
  return`<svg viewBox="0 0 60 60" fill="none"><circle cx="30" cy="30" r="18" fill="#3a1a5a44" stroke="#7a3acc" stroke-width="1.5"/><circle cx="30" cy="30" r="8" fill="#7a3acc44" stroke="#9a5aee" stroke-width="1"/>${card.id==='ritual'?'<path d="M22 38 Q30 28 38 38 Q34 45 30 42 Q26 45 22 38Z" fill="#c0304044" stroke="#c03040"/>':''}${card.id==='cloud'?'<circle cx="20" cy="35" r="5" fill="#5a8a3044"/><circle cx="30" cy="32" r="7" fill="#5a8a3066"/><circle cx="40" cy="35" r="5" fill="#5a8a3044"/>':''}</svg>`;
}

function playCard(hi){
  const p=G.player,e=G.enemy,id=p.hand[hi],card=cById(id);
  if(!card||card.cost>p.mana)return;
  p.mana-=card.cost;
  // FIX BUG 2: Eliminamos exactamente UN elemento en la posición hi (no usamos filter que podría eliminar duplicados)
  p.hand.splice(hi,1);
  p.discard.push(id);
  let msg=`Jugaste: ${card.name}`;
  if(card.dmg){let d=card.dbl?card.dmg*2:card.dmg;if(card.bleed&&G.charId==='cazador')d++;const ab=Math.min(e.block,d);e.block=Math.max(0,e.block-d);const nd=d-ab;e.hp=Math.max(0,e.hp-nd);msg+=` · ${nd} daño`;spawnN(nd,'en')}
  if(card.blk){p.block+=card.blk;msg+=` · +${card.blk} bloqueo`;spawnN(card.blk,'bk')}
  if(card.bleed){e.bleed+=card.bleed;msg+=` · ${card.bleed} sangrado`}
  if(card.psn){let ps=card.psn;if(G.charId==='hechicera')ps++;e.poison+=ps;msg+=` · ${ps} veneno`}
  if(card.heal){const h=Math.min(p.maxHp,p.hp+card.heal)-p.hp;p.hp+=h;msg+=` · +${h} vida`;spawnN(h,'hl')}
  addLog(msg,'sta');renderHand();renderE();renderPS();updMana();
  if(e.hp<=0)setTimeout(()=>combatWin(),400);
}

function endTurn(){
  const p=G.player,e=G.enemy;
  // FIX BUG 2: Usamos spread al mover la mano al descarte para no mutar arrays por referencia
  p.discard.push(...p.hand);
  p.hand=[];
  if(e.bleed>0){const d=2;e.hp=Math.max(0,e.hp-d);e.bleed--;addLog(`${e.name} sangra (-${d})`,'ene');spawnN(d,'en')}
  if(e.poison>0){const d=e.poison;e.hp=Math.max(0,e.hp-d);e.poison=Math.max(0,e.poison-1);addLog(`${e.name} envenena (-${d})`,'ene');spawnN(d,'en')}
  if(e.hp<=0){renderE();setTimeout(()=>combatWin(),400);return}
  let actualDmg=e.dmg;
  if(G.charId==='espectro'&&!G.firstHitUsed){G.firstHitUsed=true;actualDmg=0;addLog('Forma Etérea: golpe evitado!','sta')}
  const ab=Math.min(p.block,actualDmg);p.block=Math.max(0,p.block-actualDmg);const nd=actualDmg-ab;p.hp=Math.max(0,p.hp-nd);
  if(nd>0){addLog(`${e.name} golpea por ${nd}`,'ene');spawnN(nd,'pl')}
  if(p.bleed>0){p.hp=Math.max(0,p.hp-2);p.bleed--}
  if(p.poison>0){p.hp=Math.max(0,p.hp-p.poison);p.poison=Math.max(0,p.poison-1)}
  if(p.hp<=0){renderPS();document.getElementById('s-game').classList.add('shake');setTimeout(()=>{document.getElementById('s-game').classList.remove('shake');localStorage.removeItem(SK);document.getElementById('overStats').textContent=`${chById(G.charId).name}  ·  Turno ${G.turn}  ·  Oro: ${G.gold}`;show('over')},400);return}
  G.turn++;p.block=0;p.mana=p.maxMana;draw(5);
  document.getElementById('turnLbl').textContent=`Turno ${G.turn}`;
  saveG();renderHand();renderE();renderPS();updMana();
}

function combatWin(){
  G.gold+=G.enemy.rw;
  addLog(`¡Victoria! +${G.enemy.rw} oro`,'heal');
  saveG();
  showRew();
}

function renderPS(){
  const p=G.player;
  document.getElementById('hpBar').style.width=(p.hp/p.maxHp*100)+'%';
  document.getElementById('hpNum').textContent=Math.max(0,p.hp);
  document.getElementById('mpBar').style.width=(p.mana/p.maxMana*100)+'%';
  document.getElementById('mpNum').textContent=p.mana;
  // Actualiza el máximo de maná dinámicamente según el personaje
  const mpMax=document.getElementById('mpMax');
  if(mpMax)mpMax.textContent='/'+p.maxMana;
  const st=document.getElementById('pStat');st.innerHTML='';
  if(p.block)st.innerHTML+=`<span class="si si-bk">🛡 ${p.block}</span>`;
  if(p.bleed)st.innerHTML+=`<span class="si si-bl">🩸 ${p.bleed}</span>`;
  if(p.poison)st.innerHTML+=`<span class="si si-ps">☠ ${p.poison}</span>`;
  document.getElementById('dkC').textContent=p.deck.length;
  document.getElementById('dsC').textContent=p.discard.length;
  document.getElementById('goldN').textContent=G.gold;
}

function updMana(){const p=G.player;let h='';for(let i=0;i<p.maxMana;i++)h+=`<div class="morb ${i<p.mana?'f':'e'}">${i<p.mana?'◆':'◇'}</div>`;document.getElementById('manaOrbs').innerHTML=h}
function addLog(msg,cls=''){const el=document.getElementById('clog');if(!el)return;const d=document.createElement('div');d.className='log-e '+cls;d.textContent=msg;el.appendChild(d);el.scrollTop=el.scrollHeight}
function spawnN(n,type){
  const el=document.createElement('div');el.className='dmg-num '+type;
  const refs={en:'eSprite',pl:'hpBar',bk:'mpBar',hl:'hpBar'};
  const ref=document.getElementById(refs[type]||'eSprite');
  const r=ref?ref.getBoundingClientRect():{left:200,top:200,width:100,height:50};
  el.textContent=(type==='hl'?'+':'-')+n;
  el.style.left=(r.left+r.width/2+(Math.random()*40-20))+'px';el.style.top=(r.top+r.height/2)+'px';
  document.body.appendChild(el);setTimeout(()=>el.remove(),1200);
}

// ═══════════════════════════════════════════════
//  REWARD / REST / SHOP
// ═══════════════════════════════════════════════
function showRew(){
  const opts=shuf(CARDS.filter(c=>!['strike','shield'].includes(c.id))).slice(0,3);
  const c=document.getElementById('rewCards');c.innerHTML='';
  opts.forEach(card=>{
    const w=document.createElement('div');w.className='rew-wrap';
    const ds=card.dbl?card.dmg*2:card.dmg;let fx='';
    if(card.dmg)fx+=`<span class="fx fx-d">⚔ ${ds}</span>`;if(card.blk)fx+=`<span class="fx fx-b">🛡 ${card.blk}</span>`;
    if(card.bleed)fx+=`<span class="fx fx-bl">🩸 ${card.bleed}</span>`;if(card.psn)fx+=`<span class="fx fx-p">☠ ${card.psn}</span>`;
    if(card.heal)fx+=`<span class="fx fx-hl">❤ ${card.heal}</span>`;
    w.innerHTML=`<div class="gcard ${card.type} playable" style="width:104px;height:155px;cursor:pointer"><div class="c-bar"></div><div class="c-cost">${card.cost}</div><div class="c-art" style="padding:9px 5px 3px">${getCArt(card)}</div><div class="c-name">${card.name}</div><div class="c-fx">${fx}</div><div style="font-size:8px;color:var(--dim);padding:0 4px 5px;text-align:center;line-height:1.4;font-style:italic">${card.desc}</div></div>`;
    // FIX BUG 2: Añadimos la carta al mazo correctamente y guardamos antes de avanzar
    w.addEventListener('click',()=>{
      G.player.deck.push(card.id);
      saveG();
      advance();
    });
    c.appendChild(w);
  });
  show('reward');
}

function skipRew(){advance()}
function doHeal(){const p=G.player;p.hp=Math.min(p.maxHp,p.hp+20);saveG();advance()}
function doPurge(){const i=G.player.deck.indexOf('strike');if(i>=0)G.player.deck.splice(i,1);saveG();advance()}

function showShop(){
  document.getElementById('shopG').textContent=G.gold;
  const stock=shuf(CARDS.filter(c=>!['strike','shield'].includes(c.id))).slice(0,4);G._shop=stock;
  const c=document.getElementById('shopSt');c.innerHTML='';
  stock.forEach(card=>{
    const price=(card.cost+1)*8;let fx='';
    if(card.dmg)fx+=`<span class="fx fx-d">⚔ ${card.dbl?card.dmg*2:card.dmg}</span>`;if(card.blk)fx+=`<span class="fx fx-b">🛡 ${card.blk}</span>`;
    if(card.bleed)fx+=`<span class="fx fx-bl">🩸 ${card.bleed}</span>`;if(card.psn)fx+=`<span class="fx fx-p">☠ ${card.psn}</span>`;
    const w=document.createElement('div');w.className='shop-item';
    w.innerHTML=`<div class="gcard ${card.type} playable" style="width:91px;height:140px;cursor:pointer"><div class="c-bar"></div><div class="c-cost">${card.cost}</div><div class="c-art" style="padding:7px 4px 2px">${getCArt(card)}</div><div class="c-name">${card.name}</div><div class="c-fx">${fx}</div></div><div class="shop-price">🪙 ${price}</div>`;
    w.addEventListener('click',()=>{
      if(G.gold<price)return;
      G.gold-=price;
      // FIX BUG 2: Añadimos carta al mazo con push correcto
      G.player.deck.push(card.id);
      w.style.opacity='.2';
      w.style.pointerEvents='none';
      document.getElementById('shopG').textContent=G.gold;
      saveG();
    });
    c.appendChild(w);
  });
  show('shop');
}

function leaveShop(){advance()}

// ═══════════════════════════════════════════════
//  CHEST
// ═══════════════════════════════════════════════
function showChest(){
  const roll=Math.random();
  const el=document.getElementById('chestContent');
  el.innerHTML='';

  if(roll<0.1){
    // Mímic / emboscada
    el.innerHTML=`<div class="chest-bad"><div style="font-size:44px">💀</div><div class="chest-title" style="color:var(--wine2)">¡Era una trampa!</div><div class="chest-desc">El cofre cobraba vida. Un mímic te ataca.</div><button class="btn btn-wine" onclick="chestMimic()">Combatir al Mímic</button></div>`;
  } else if(roll<0.5){
    // Monedas
    const coins=Math.floor(15+Math.random()*25);
    el.innerHTML=`<div class="chest-good"><div style="font-size:44px">🪙</div><div class="chest-title">¡Oro encontrado!</div><div class="chest-desc">Encuentras <span style="color:var(--gold);font-weight:bold">${coins} monedas</span> entre las sombras.</div><button class="btn" onclick="chestGold(${coins})">Tomar el oro</button></div>`;
  } else {
    // Carta
    el.innerHTML=`<div class="chest-good"><div style="font-size:44px">🃏</div><div class="chest-title">¡Carta encontrada!</div><div class="chest-desc">Un grimorio yace en el cofre. Elige una carta para tu mazo.</div><button class="btn" onclick="chestCard()">Abrir el grimorio</button></div>`;
  }
  show('chest');
}
function chestGold(n){G.gold+=n;saveG();advance()}
function chestCard(){showRew();}  // showRew llama advance() al elegir carta o skipRew
function chestMimic(){
  // Enemigo especial mímic — usa tier 1 pero con nombre especial
  G._mimicOverride={name:'Mímic Devorador',hp:38,maxHp:38,dmg:13,bleed:2,psn:0,block:0,bleed:0,poison:0,tier:1,rw:25};
  startCombatCustom(G._mimicOverride);
}
function startCombatCustom(enemy){
  G.enemy={...enemy};
  G.turn=1;G.firstHitUsed=false;
  const p=G.player;
  p.block=0;p.mana=p.maxMana;
  if(p.hand.length>0){p.discard.push(...p.hand);p.hand=[];}
  draw(5);
  applyPort();
  const ch=chById(G.charId);
  document.getElementById('passiveInfo').textContent=ch?ch.passive:'';
  document.getElementById('charBadge').textContent=ch?ch.name:'';
  renderE();renderHand();renderPS();updMana();
  document.getElementById('turnLbl').textContent='Turno 1';
  document.getElementById('clog').innerHTML='';
  addLog(`¡${G.enemy.name} emerge del cofre!`,'ene');
  show('game');
}

// ═══════════════════════════════════════════════
//  CUSTOMIZE
// ═══════════════════════════════════════════════
function buildCustom(){
  buildCharDz();buildCardGrid();
  ['e0','e1','e2'].forEach((_,i)=>{
    const k='enemy'+i,dz=document.getElementById('dz-e'+i);
    if(dz&&CUSTOM[k]&&!dz.querySelector('img')){const img=document.createElement('img');img.src=CUSTOM[k];dz.prepend(img);dz.classList.add('has-img')}
  });
}
function buildCharDz(){
  const row=document.getElementById('charDzRow');if(row.children.length>0)return;
  CHARS.forEach(ch=>{
    const wrap=document.createElement('div');wrap.style.cssText='display:flex;flex-direction:column;align-items:center;gap:5px';
    const dz=document.createElement('div');dz.className='dz';dz.style.cssText='width:100px;height:133px';
    if(CUSTOM[ch.imgKey]){const img=document.createElement('img');img.src=CUSTOM[ch.imgKey];dz.prepend(img);dz.classList.add('has-img')}
    dz.innerHTML+=`<div class="dz-ico">👤</div><div class="dz-lbl">${ch.name}</div><input type="file" accept="image/*"><button class="dz-clr">✕</button>`;
    dz.addEventListener('dragover',e=>{e.preventDefault();dz.classList.add('drag-over')});
    dz.addEventListener('dragleave',()=>dz.classList.remove('drag-over'));
    dz.addEventListener('drop',e=>{e.preventDefault();dz.classList.remove('drag-over');const f=e.dataTransfer.files[0];if(f&&f.type.startsWith('image/'))loadImg(f,ch.imgKey,dz)});
    dz.querySelector('input').addEventListener('change',e=>{const f=e.target.files[0];if(f)loadImg(f,ch.imgKey,dz)});
    dz.querySelector('.dz-clr').addEventListener('click',e=>{e.stopPropagation();delete CUSTOM[ch.imgKey];const i=dz.querySelector('img');if(i)i.remove();dz.classList.remove('has-img')});
    const cap=document.createElement('div');cap.className='dz-cap';cap.textContent=ch.name;
    wrap.appendChild(dz);wrap.appendChild(cap);row.appendChild(wrap);
  });
}
function buildCardGrid(){
  const grid=document.getElementById('cardDzGrid');if(grid.children.length>0)return;
  CARDS.forEach(card=>{
    const key='card_'+card.id;
    const wrap=document.createElement('div');wrap.className='cdz-wrap';
    const dz=document.createElement('div');dz.className='cdz';
    if(CUSTOM[key]){const img=document.createElement('img');img.src=CUSTOM[key];dz.prepend(img);dz.classList.add('has-img')}
    dz.innerHTML+=`<div class="cd-l">${card.name.split(' ')[0]}</div><input type="file" accept="image/*"><button class="cd-clr">✕</button>`;
    dz.addEventListener('dragover',e=>{e.preventDefault();dz.style.borderColor='var(--gold)'});
    dz.addEventListener('dragleave',()=>dz.style.borderColor='');
    dz.addEventListener('drop',e=>{e.preventDefault();dz.style.borderColor='';const f=e.dataTransfer.files[0];if(f&&f.type.startsWith('image/'))loadImg(f,key,dz)});
    dz.querySelector('input').addEventListener('change',e=>{const f=e.target.files[0];if(f)loadImg(f,key,dz)});
    dz.querySelector('.cd-clr').addEventListener('click',e=>{e.stopPropagation();delete CUSTOM[key];const i=dz.querySelector('img');if(i)i.remove();dz.classList.remove('has-img');dz.querySelector('.cd-clr').style.display='none'});
    const nm=document.createElement('div');nm.className='cdz-nm';nm.textContent=card.name;
    wrap.appendChild(dz);wrap.appendChild(nm);grid.appendChild(wrap);
  });
}
function loadImg(file,key,el){
  const r=new FileReader();
  r.onload=ev=>{
    CUSTOM[key]=ev.target.result;
    let img=el.querySelector('img');if(!img){img=document.createElement('img');el.prepend(img)}
    img.src=ev.target.result;el.classList.add('has-img');
    const clr=el.querySelector('.dz-clr,.cd-clr');if(clr)clr.style.display='flex';
  };
  r.readAsDataURL(file);
}
function dzDrag(e,el){e.preventDefault();el.classList.add('drag-over')}
function dzLeave(el){el.classList.remove('drag-over')}
function dzDrop(e,key,el){e.preventDefault();el.classList.remove('drag-over');const f=e.dataTransfer.files[0];if(f&&f.type.startsWith('image/'))loadImg(f,key,el)}
function dzFile(e,key,el){const f=e.target.files[0];if(f)loadImg(f,key,el)}
function dzClr(key,el,e){e.stopPropagation();delete CUSTOM[key];const i=el.querySelector('img');if(i)i.remove();el.classList.remove('has-img')}
function saveCustomAndReturn(){saveCustom();goTitle()}

// ═══════════════════════════════════════════════
//  CRÉDITOS
// ═══════════════════════════════════════════════
function showCredits(){
  const charName = chById(G.charId)?chById(G.charId).name:'Cazador';
  document.getElementById('creditsChar').textContent=charName;
  document.getElementById('creditsDiff').textContent=`Dificultad ${G.difficulty}`;
  const el=document.getElementById('s-credits');
  // Reiniciar animación
  el.querySelectorAll('.cr-line').forEach((l,i)=>{l.style.animationDelay=`${0.4+i*0.35}s`});
  show('credits');
}

// ═══════════════════════════════════════════════
//  DEV MODE — herramientas de desarrollador
//  Uso desde la consola del navegador (F12):
//    DEV.invincible()   → activa/desactiva invencibilidad
//    DEV.winCombat()    → gana el combate actual al instante
//    DEV.addGold(n)     → añade n monedas (defecto: 999)
//    DEV.skipNode()     → salta el nodo actual y avanza en el mapa
//    DEV.status()       → muestra el estado actual del juego
// ═══════════════════════════════════════════════
const DEV = {
  _invincible: false,
  invincible(){
    this._invincible = !this._invincible;
    console.log(`%c[DEV] Invencibilidad: ${this._invincible?'✅ ON':'❌ OFF'}`, 'color:#c9984a;font-size:14px;font-weight:bold');
  },
  winCombat(){
    if(!G.enemy){console.warn('[DEV] No hay combate activo.');return;}
    console.log('%c[DEV] Combate ganado al instante.','color:#6aee90;font-weight:bold');
    G.enemy.hp=0;
    combatWin();
  },
  addGold(n=999){
    G.gold+=(n|0);
    if(document.getElementById('goldN'))document.getElementById('goldN').textContent=G.gold;
    saveG();
    console.log(`%c[DEV] +${n} oro → Total: ${G.gold}`,'color:#e8b460;font-weight:bold');
  },
  skipNode(){
    if(!G.path){console.warn('[DEV] No hay run activo.');return;}
    console.log('%c[DEV] Nodo saltado.','color:#8abaee;font-weight:bold');
    advance();
  },
  status(){
    console.log('%c[DEV] Estado actual:','color:#c9984a;font-weight:bold');
    console.table({
      Personaje: G.charId,
      HP: `${G.player?.hp}/${G.player?.maxHp}`,
      Maná: `${G.player?.mana}/${G.player?.maxMana}`,
      Oro: G.gold,
      Acto: G.path?.act+1,
      Fila: G.path?.row,
      Columna: G.path?.col,
      Invencible: DEV._invincible
    });
  }
};
// Intercepta el daño al jugador si invencibilidad está activa
const _origEndTurn = endTurn;
window.endTurn = function(){
  if(DEV._invincible && G.player){
    const origHp=G.player.hp;
    _origEndTurn();
    if(G.player && G.player.hp<origHp && G.player.hp>0){
      G.player.hp=origHp;
      renderPS&&renderPS();
    } else if(G.player && G.player.hp<=0){
      G.player.hp=G.player.maxHp;
      renderPS&&renderPS();
    }
  } else {
    _origEndTurn();
  }
};
console.log('%c[NOCTIS DECK] Herramientas de desarrollador disponibles → escribe DEV en la consola para ver los comandos.','color:#c9984a;font-style:italic');

// ═══════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════
loadCustom();
updateTitle();
