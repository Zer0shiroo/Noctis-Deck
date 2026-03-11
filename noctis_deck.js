// ═══════════════════════════════════════════════
//  FOG PARTICLES
// ═══════════════════════════════════════════════
(()=>{const l=document.getElementById('fogL');for(let i=0;i<8;i++){const p=document.createElement('div');p.className='fog-p';const s=180+Math.random()*380;p.style.cssText=`width:${s}px;height:${s}px;top:${Math.random()*100}%;left:-${s}px;animation-duration:${22+Math.random()*26}s;animation-delay:${Math.random()*16}s`;l.appendChild(p)}})();

// ═══════════════════════════════════════════════
//  VICTORIAN GOTHIC NAMES
// ═══════════════════════════════════════════════
const GOTHIC_NAMES = [
  'Alistair Voss','Seraphina Mourne','Dorian Ashwick','Isolde Blackthorn',
  'Edmund Graye','Vivienne Croft','Ambrose Sinclair','Morwenna Drake',
  'Cornelius Fenn','Lady Maria','Barnabas Crow','Lucinda Hex',
  'Thaddeus Wren','Rosalind Grimm','Aldous Night','Cecelia Dusk',
  'Flavian Morte','Arabella Tomb','Gideon Pale','Constance Webb'
];
const DEFAULT_HERO_NAME = 'Alistair Voss';

// ═══════════════════════════════════════════════
//  IMAGES
// ═══════════════════════════════════════════════
const DEFAULT_IMGS = {
  char_cazador:    'resources/personajes/cazadora.jpg',
  char_hechicera:  'resources/personajes/maga.jpg',
  char_espectro:   'resources/personajes/espectro.png',
  char_pistolero:  'resources/personajes/pistolero.png',
  enemy0:          'resources/enemigos/enemigo1.png',
  enemy1:          'resources/enemigos/enemigo2.png',
  enemy2:          'resources/enemigos/enemigo3.png',
  enemy_healer:    'resources/enemigos/healer.png',
  card_strike:     'resources/cartas/golpesombrio.jpg',
  card_slash:      'resources/cartas/tajocruento.jpg',
  card_lance:      'resources/cartas/lanzaniebla.png',
  card_double:     'resources/cartas/Golpe doble.png',
  card_shield:     'resources/cartas/escudoarcano.jpg',
  card_mantle:     'resources/cartas/manto de sombras.jpg',
  card_ritual:     'resources/cartas/ritualofblood.jpg',
  card_cloud:      'resources/cartas/nube venenosa.jpg',
  card_smite:      'resources/cartas/golpe sagrado.jpg',
  card_retaliate:  'resources/cartas/cartarepresalia.jpg',
  card_mend:       'resources/cartas/susurro vital.jpg',
  // PISTOLERO cards — coloca imágenes en resources/cartas/
  card_bullet:     'resources/cartas/bullet.jpg',
  card_quickdraw:  'resources/cartas/quickdraw.jpg',
  card_headshot:   'resources/cartas/headshot.jpg',
  card_fanfire:    'resources/cartas/fanfire.jpg',
  card_smokebomb:  'resources/cartas/smokebomb.jpg',
};
let CUSTOM={};
function getImg(k){return CUSTOM[k]||DEFAULT_IMGS[k]||null}

// ═══════════════════════════════════════════════
//  CHARACTERS
// ═══════════════════════════════════════════════
const CHARS=[
  // Cazador — pasiva reworked: Vampirismo (roba vida al hacer daño directo)
  {id:'cazador',name:'El Cazador',title:'Maestro del Filo',imgKey:'char_cazador',hp:70,mana:3,
   passive:'Vampirismo: cada carta de ataque que dañe directamente te cura 2 HP.',pid:'lifesteal',
   deck:['strike','strike','shield','shield'],
   stats:{Vida:'70',Maná:'3/turno',Estilo:'Ataque y robo de vida'},color:'#c9984a',
   svg:`<svg viewBox="0 0 100 130" fill="none"><ellipse cx="50" cy="126" rx="30" ry="4" fill="#00000044"/><circle cx="50" cy="28" r="14" fill="#1a1228" stroke="#c9984a88" stroke-width="1.5"/><circle cx="50" cy="28" r="10" fill="#2a1838"/><rect x="32" y="43" width="36" height="44" rx="5" fill="#1a1228" stroke="#c9984a66"/><rect x="24" y="45" width="12" height="34" rx="4" fill="#13101e" stroke="#c9984a44"/><rect x="64" y="45" width="12" height="34" rx="4" fill="#13101e" stroke="#c9984a44"/><path d="M32 52 Q16 68 20 88 Q30 78 32 84" fill="#0f0c18" stroke="#c9984a33"/><path d="M68 52 Q84 68 80 88 Q70 78 68 84" fill="#0f0c18" stroke="#c9984a33"/><line x1="82" y1="22" x2="76" y2="82" stroke="#c9984a" stroke-width="2.5"/><circle cx="82" cy="22" r="5" fill="#1a1228" stroke="#c9984a" stroke-width="1.5"/><circle cx="82" cy="22" r="2.5" fill="#c9984a88"/></svg>`},
  {id:'hechicera',name:'La Hechicera',title:'Tejedora de Miasmas',imgKey:'char_hechicera',hp:60,mana:4,
   passive:'Miasma: el veneno que aplicas hace +1 daño extra por turno.',pid:'poison_bonus',
   deck:['lance','lance','shield','shield'],
   stats:{Vida:'60',Maná:'4/turno',Estilo:'Veneno y control'},color:'#7a3acc',
   svg:`<svg viewBox="0 0 100 130" fill="none"><ellipse cx="50" cy="126" rx="28" ry="4" fill="#00000044"/><circle cx="50" cy="26" r="13" fill="#1a1028" stroke="#7a3acc88" stroke-width="1.5"/><ellipse cx="50" cy="22" rx="16" ry="8" fill="#130c1e" stroke="#7a3acc66"/><rect x="33" y="40" width="34" height="48" rx="4" fill="#1a1028" stroke="#7a3acc66"/><path d="M33 50 Q14 60 16 82 Q26 72 33 78" fill="#130c1e" stroke="#7a3acc44"/><path d="M67 50 Q86 60 84 82 Q74 72 67 78" fill="#130c1e" stroke="#7a3acc44"/><circle cx="50" cy="62" r="10" fill="#3a1a5a44" stroke="#9a5aee" stroke-width="1"/><circle cx="50" cy="62" r="5" fill="#7a3acc66"/><path d="M40 90 Q50 108 60 90" fill="#1a0a28" stroke="#7a3acc66"/></svg>`},
  {id:'espectro',name:'El Espectro',title:'Sombra del Pacto',imgKey:'char_espectro',hp:65,mana:3,
   passive:'Forma Etérea: el primer golpe de cada combate es ignorado.',pid:'first_hit',
   deck:['strike','strike','shield','shield'],
   stats:{Vida:'65',Maná:'3/turno',Estilo:'Equilibrio y esquiva'},color:'#4a8aaa',
   svg:`<svg viewBox="0 0 100 130" fill="none"><ellipse cx="50" cy="126" rx="26" ry="4" fill="#00000033"/><ellipse cx="50" cy="55" rx="28" ry="50" fill="#1a2a3a88" stroke="#4a8aaa55" stroke-width="1"/><circle cx="50" cy="28" r="14" fill="#1a2a3a" stroke="#4a8aaa88" stroke-width="1.5"/><circle cx="44" cy="26" r="5" fill="#0a1018" stroke="#4a8aaa66"/><circle cx="56" cy="26" r="5" fill="#0a1018" stroke="#4a8aaa66"/><circle cx="44" cy="26" r="2.5" fill="#4a8aaa88"/><circle cx="56" cy="26" r="2.5" fill="#4a8aaa88"/><path d="M30 45 Q14 58 18 80 Q28 70 30 76" fill="#1a2a3a66" stroke="#4a8aaa33"/><path d="M70 45 Q86 58 82 80 Q72 70 70 76" fill="#1a2a3a66" stroke="#4a8aaa33"/><path d="M36 100 Q50 118 64 100 Q58 112 50 110 Q42 112 36 100Z" fill="#1a2a3a88" stroke="#4a8aaa44"/></svg>`},
  // PISTOLERO — imagen en resources/personajes/pistolero.png (o sube la tuya en Personalización)
  {id:'pistolero',name:'El Pistolero',title:'Heraldo del Trueno',imgKey:'char_pistolero',hp:65,mana:3,
   passive:'Cargador: cada 3 cartas de ataque jugadas en un turno, la siguiente carta de ataque hace el doble de daño.',pid:'gunslinger',
   deck:['bullet','bullet','shield','shield'],
   stats:{Vida:'65',Maná:'3/turno',Estilo:'Ráfagas y precisión'},color:'#d4804a',
   svg:`<svg viewBox="0 0 100 130" fill="none"><ellipse cx="50" cy="126" rx="28" ry="4" fill="#00000044"/><circle cx="50" cy="27" r="13" fill="#1a1228" stroke="#d4804a88" stroke-width="1.5"/><rect x="33" y="41" width="34" height="46" rx="5" fill="#1a1228" stroke="#d4804a66"/><rect x="25" y="44" width="11" height="32" rx="4" fill="#13101e" stroke="#d4804a44"/><rect x="64" y="44" width="11" height="32" rx="4" fill="#13101e" stroke="#d4804a44"/><rect x="64" y="56" width="22" height="8" rx="3" fill="#1a1228" stroke="#d4804a88"/><rect x="82" y="57" width="12" height="6" rx="2" fill="#d4804a66"/><circle cx="86" cy="60" r="2" fill="#d4804aaa"/><rect x="65" y="64" width="6" height="14" rx="2" fill="#2a1818" stroke="#d4804a44"/><line x1="78" y1="60" x2="96" y2="58" stroke="#d4804a" stroke-width="1.5"/></svg>`},
];

// ═══════════════════════════════════════════════
//  CARDS  (rarity: 'common'|'uncommon'|'rare'|'legendary')
//  Pesos de rareza para recompensas normales: common 55%, uncommon 30%, rare 12%, legendary 3%
//  En recompensa élite: common 30%, uncommon 35%, rare 25%, legendary 10%
//  En recompensa boss (2 cartas): common 20%, uncommon 35%, rare 30%, legendary 15%
// ═══════════════════════════════════════════════
const CARDS=[
  // ── COMUNES ──
  {id:'strike',   name:'Golpe Sombrío',    type:'attack', rarity:'common',    cost:1,dmg:6,  blk:0, bleed:0,psn:0,desc:'Golpe veloz con tu filo.'},
  {id:'shield',   name:'Escudo Arcano',    type:'defense',rarity:'common',    cost:1,dmg:0,  blk:7, bleed:0,psn:0,desc:'Barrera mágica.'},
  {id:'lance',    name:'Lanza de Niebla',  type:'attack', rarity:'common',    cost:1,dmg:4,  blk:0, bleed:0,psn:2,desc:'Veneno que consume desde dentro.'},
  {id:'retaliate',name:'Represalia',       type:'skill',  rarity:'common',    cost:1,dmg:3,  blk:4, bleed:0,psn:0,desc:'Ataca y defiende.'},
  {id:'mend',     name:'Susurro Vital',    type:'skill',  rarity:'common',    cost:1,dmg:0,  blk:0, bleed:0,psn:0,heal:8, desc:'Recupera 8 de Vitalidad.'},
  {id:'bullet',   name:'Bala de Plomo',    type:'attack', rarity:'common',    cost:1,dmg:7,  blk:0, bleed:0,psn:0,desc:'Disparo certero y rápido.'},
  // ── INFRECUENTES ──
  {id:'slash',    name:'Tajo Cruento',     type:'attack', rarity:'uncommon',  cost:2,dmg:10, blk:0, bleed:2,psn:0,desc:'Daño e inflige sangrado.'},
  {id:'double',   name:'Golpe Doble',      type:'attack', rarity:'uncommon',  cost:2,dmg:5,  blk:0, bleed:0,psn:0,desc:'Golpea dos veces.',dbl:true},
  {id:'mantle',   name:'Manto de Sombras', type:'defense',rarity:'uncommon',  cost:2,dmg:0,  blk:14,bleed:0,psn:0,desc:'Protección pesada.'},
  {id:'cloud',    name:'Nube Venenosa',    type:'skill',  rarity:'uncommon',  cost:2,dmg:0,  blk:0, bleed:0,psn:4,desc:'Envenena al enemigo.'},
  {id:'quickdraw',name:'Tiro Rápido',      type:'attack', rarity:'uncommon',  cost:1,dmg:5,  blk:0, bleed:0,psn:0,desc:'Dos disparos instantáneos.',dbl:true},
  {id:'smokebomb',name:'Bomba de Humo',    type:'defense',rarity:'uncommon',  cost:2,dmg:0,  blk:10,bleed:0,psn:2,desc:'Escudo y envenena al enemigo.'},
  // ── RARAS ──
  {id:'smite',    name:'Golpe Sagrado',    type:'attack', rarity:'rare',      cost:1,dmg:8,  blk:0, bleed:0,psn:0,desc:'Luz arcana concentrada.'},
  {id:'ritual',   name:'Ritual de Sangre', type:'skill',  rarity:'rare',      cost:2,dmg:0,  blk:0, bleed:4,psn:0,desc:'Maldice con sangrado severo.'},
  {id:'fanfire',  name:'Fuego Cerrado',    type:'attack', rarity:'rare',      cost:2,dmg:6,  blk:0, bleed:0,psn:0,desc:'Dispara tres veces consecutivas.',triple:true},
  // ── LEGENDARIAS ──
  {id:'headshot', name:'Disparo Certero',  type:'attack', rarity:'legendary', cost:3,dmg:28, blk:0, bleed:0,psn:0,desc:'Un disparo. El fin.'},
  {id:'bloodpact',name:'Pacto de Sangre',  type:'skill',  rarity:'legendary', cost:2,dmg:0,  blk:0, bleed:6,psn:0,heal:14,desc:'Cura con la sangre del enemigo.'},
  {id:'nightmare',name:'Pesadilla Eterna', type:'attack', rarity:'legendary', cost:3,dmg:14, blk:0, bleed:3,psn:3,desc:'Inflige todos los males.'},
];

// Rareza → peso base y elite
const RARITY_WEIGHTS = {
  common:    {base:55, elite:30, boss:20},
  uncommon:  {base:30, elite:35, boss:35},
  rare:      {base:12, elite:25, boss:30},
  legendary: {base:3,  elite:10, boss:15},
};
const RARITY_COLORS = {
  common:'#a0a0b0', uncommon:'#60aaee', rare:'#cc80ff', legendary:'#ffcc44'
};
const RARITY_LABELS = {
  common:'COMÚN', uncommon:'INFREC.', rare:'RARA', legendary:'LEGENDARIA'
};

// Weighted random card pick for rewards
function pickRewardCards(count, tier) {
  // tier: 0=normal, 1=elite, 2=boss
  const tierKey = tier===2?'boss':tier===1?'elite':'base';
  const pool = CARDS.filter(c=>!['strike','shield','bullet'].includes(c.id));
  const weighted = [];
  pool.forEach(card=>{
    const w = RARITY_WEIGHTS[card.rarity]?.[tierKey] || 5;
    for(let i=0;i<w;i++) weighted.push(card);
  });
  shuf(weighted);
  const picked=[];
  const seen=new Set();
  for(const c of weighted){
    if(!seen.has(c.id)){seen.add(c.id);picked.push(c);}
    if(picked.length>=count)break;
  }
  return picked;
}

// ═══════════════════════════════════════════════
//  ENEMIES
// ═══════════════════════════════════════════════
const ENM_TEMPLATES = {
  normal: [
    {name:'Rata Espectral',   hp:18,dmg:5, bleed:0,psn:0,rw:6},
    {name:'Mendigo Maldito',  hp:16,dmg:6, bleed:0,psn:0,rw:6},
    {name:'Sombra Errante',   hp:20,dmg:4, bleed:1,psn:0,rw:7},
    {name:'Lacayo Corrupto',  hp:17,dmg:5, bleed:0,psn:1,rw:6},
    {name:'Espectro Callejero',hp:15,dmg:7,bleed:0,psn:0,rw:7},
  ],
  elite: [
    {name:'Guardia Corrompido',hp:38,dmg:11,bleed:0,psn:0,rw:18},
    {name:'Heraldo de Niebla', hp:34,dmg:12,bleed:0,psn:2,rw:20},
    {name:'Vampiro Menor',     hp:40,dmg:10,bleed:3,psn:0,rw:18},
  ],
  // HEALER — aparece en grupos normales y elite, nunca en boss
  // Imagen: resources/enemigos/healer.png
  healer: [
    {name:'Sanadora Espectral', hp:22,dmg:3, bleed:0,psn:0,rw:12, isHealer:true,
     healAmt:8, shieldAmt:6, debuffChance:0.4},
    {name:'Médium Corrupta',    hp:25,dmg:2, bleed:0,psn:0,rw:14, isHealer:true,
     healAmt:10,shieldAmt:8, debuffChance:0.5},
    {name:'Hechicera Pálida',   hp:20,dmg:4, bleed:0,psn:0,rw:13, isHealer:true,
     healAmt:7, shieldAmt:5, debuffChance:0.35},
  ],
  boss: [
    {name:'El Conde Sombrío',  hp:80,dmg:18,bleed:3,psn:0,rw:50},
    {name:'Madre de Niebla',   hp:75,dmg:15,bleed:0,psn:4,rw:50},
  ]
};

// healer action cycle: heal → shield → debuff → attack → repeat
function getHealerAction(e, turnInCombat) {
  const cycle = turnInCombat % 4;
  if(cycle === 0) return 'heal';
  if(cycle === 1) return 'shield';
  if(cycle === 2) return 'debuff';
  return 'attack';
}

function buildEnemyGroup(tier, infiniteMultiplier) {
  const mult = infiniteMultiplier || 1;
  const rnd = t => ENM_TEMPLATES[t][Math.floor(Math.random()*ENM_TEMPLATES[t].length)];
  const mkE = (tpl, ti) => ({
    ...tpl,
    hp: Math.round(tpl.hp * mult),
    maxHp: Math.round(tpl.hp * mult),
    dmg: Math.round(tpl.dmg * mult),
    block:0, bleed:0, poison:0, tier:ti, dead:false,
    healAmt: tpl.healAmt ? Math.round(tpl.healAmt * mult) : 0,
    shieldAmt: tpl.shieldAmt ? Math.round(tpl.shieldAmt * mult) : 0,
    healerTurn: 0
  });

  // 20% chance to include a healer in normal/elite groups
  const includeHealer = (tier < 2) && Math.random() < 0.20;

  if(tier === 0) {
    const count = Math.random() < 0.4 ? 3 : 2;
    let group = Array.from({length: includeHealer ? count-1 : count}, () => mkE(rnd('normal'), 0));
    if(includeHealer) group.push(mkE(rnd('healer'), 0));
    return group;
  } else if(tier === 1) {
    if(Math.random() < 0.5) {
      let group = [mkE(rnd('normal'),0), mkE(rnd('normal'),0), mkE(rnd('elite'),1)];
      if(includeHealer) { group.splice(1,1); group.push(mkE(rnd('healer'),0)); }
      return group;
    } else {
      let group = [mkE(rnd('elite'),1), mkE(rnd('elite'),1)];
      if(includeHealer) { group.splice(1,1); group.push(mkE(rnd('healer'),0)); }
      return group;
    }
  } else {
    return [mkE(rnd('boss'), 2)];
  }
}

// ═══════════════════════════════════════════════
//  STATISTICS
// ═══════════════════════════════════════════════
const STATS_KEY = 'noctis_stats_v1';
const LB_KEY    = 'noctis_lb_v1';

function loadStats() {
  try { return JSON.parse(localStorage.getItem(STATS_KEY) || 'null') || initStats(); }
  catch(e) { return initStats(); }
}
function initStats() {
  return {
    totalRuns: 0,
    totalPlaytime: 0,        // seconds
    bestRunEncounters: 0,
    bestRunTime: 0,
    highestSingleDmg: 0,
    bestRunTotalDmg: 0,      // total dmg in best-dmg run
    mostDmgTanked: 0,
    mostDmgHealed: 0,
  };
}
function saveStats(s) {
  try { localStorage.setItem(STATS_KEY, JSON.stringify(s)); } catch(e) {}
}
function loadLeaderboard() {
  try { return JSON.parse(localStorage.getItem(LB_KEY) || '[]'); } catch(e) { return []; }
}
function saveLeaderboard(lb) {
  try { localStorage.setItem(LB_KEY, JSON.stringify(lb)); } catch(e) {}
}
function addLeaderboardEntry(heroName, charId, encounters, runTimeSeconds, infiniteMode) {
  const lb = loadLeaderboard();
  lb.push({
    heroName, charId,
    charName: chById(charId)?.name || charId,
    encounters,
    runTime: runTimeSeconds,
    infiniteMode: infiniteMode || false,
    date: new Date().toLocaleDateString('es-ES')
  });
  lb.sort((a,b) => b.encounters - a.encounters);
  saveLeaderboard(lb.slice(0, 20)); // keep top 20
}

// ═══════════════════════════════════════════════
//  SAVE / LOAD
// ═══════════════════════════════════════════════
const SK='noctis_v4';
function saveG(){
  if(!G||!G.player)return;
  try{
    localStorage.setItem(SK,JSON.stringify({
      difficulty:G.difficulty,
      charId:G.charId,
      heroName:G.heroName,
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
      infiniteMode: G.infiniteMode || false,
      infiniteEncounters: G.infiniteEncounters || 0,
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
//  RUN TRACKING
// ═══════════════════════════════════════════════
let runStartTime = null;
let runEncounters = 0;
let runTotalDmg = 0;
let runDmgTanked = 0;
let runDmgHealed = 0;
let runHighDmg = 0;
let combatTurn = 0; // turn counter within current combat
let runFinalized = false; // guard: prevent double leaderboard entries

function startRunTracking() {
  runStartTime = Date.now();
  runEncounters = 0;
  runTotalDmg = 0;
  runDmgTanked = 0;
  runDmgHealed = 0;
  runHighDmg = 0;
  runFinalized = false;
}
function getRunTime() {
  if(!runStartTime) return 0;
  return Math.floor((Date.now() - runStartTime) / 1000);
}
function finalizeRunStats(survived) {
  if(runFinalized) return; // guard: only once per run
  runFinalized = true;
  const stats = loadStats();
  stats.totalRuns++;
  const rt = getRunTime();
  stats.totalPlaytime += rt;
  if(runEncounters > stats.bestRunEncounters) {
    stats.bestRunEncounters = runEncounters;
    stats.bestRunTime = rt;
    stats.bestRunTotalDmg = runTotalDmg;
  }
  if(runHighDmg > stats.highestSingleDmg) stats.highestSingleDmg = runHighDmg;
  if(runDmgTanked > stats.mostDmgTanked)  stats.mostDmgTanked = runDmgTanked;
  if(runDmgHealed > stats.mostDmgHealed)  stats.mostDmgHealed = runDmgHealed;
  saveStats(stats);
  addLeaderboardEntry(G.heroName||'Cazador', G.charId, runEncounters, rt, G.infiniteMode||false);
}

// ═══════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════
let G={difficulty:0};
let selChar=null;

const MAX_HAND = 6;

function newRun(cid, heroName){
  const ch=CHARS.find(c=>c.id===cid);
  G={
    difficulty:G.difficulty||0,
    charId:cid,
    heroName: heroName||DEFAULT_HERO_NAME,
    turn:1,
    gold:0,
    player:{
      hp:ch.hp,maxHp:ch.hp,mana:ch.mana,maxMana:ch.mana,
      block:0,bleed:0,poison:0,
      deck:[...ch.deck],hand:[],discard:[]
    },
    enemies:[],
    targetIdx:0,
    map:genMap(),
    path:{act:0,row:0,col:null},
    firstHitUsed:false,
    infiniteMode:false,
    infiniteEncounters:0
  };
  startRunTracking();
  saveG();
}

function restoreRun(d){
  G={
    difficulty:d.difficulty||0,
    charId:d.charId,
    heroName:d.heroName||DEFAULT_HERO_NAME,
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
    enemies:[],
    targetIdx:0,
    map:d.map,
    path:d.path||{act:0,row:0,col:null},
    firstHitUsed:false,
    infiniteMode: d.infiniteMode||false,
    infiniteEncounters: d.infiniteEncounters||0
  };
  startRunTracking();
}

// ═══════════════════════════════════════════════
//  MAP GENERATION
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
  const bc=document.getElementById('btnContinue'),sb=document.getElementById('saveBadge'),bd=document.getElementById('btnDel');
  if(sv){bc.style.display='';sb.style.display='';bd.style.display='';const ch=chById(sv.charId);const p=sv.path||{act:0,row:0};sb.textContent=`${sv.heroName||ch?.name||'?'}  ·  ${sv.infiniteMode?'Modo Infinito':'Acto '+(p.act||0+1)}  ·  ${sv.savedAt}`}
  else{bc.style.display='none';sb.style.display='none';bd.style.display='none'}
  const db=document.getElementById('diffBadge');
  if(db) db.textContent='';
}
function goCharSelect(){renderChars();show('chars')}

function continueGame(){
  const d=loadG();
  if(!d)return;
  restoreRun(d);
  if(G.infiniteMode) showInfiniteMap();
  else showMap();
}

// ═══════════════════════════════════════════════
//  NAME SELECTION
// ═══════════════════════════════════════════════
function showNameSelect(charId) {
  const overlay = document.getElementById('nameOverlay');
  const input   = document.getElementById('nameInput');
  input.value   = DEFAULT_HERO_NAME;
  overlay.style.display = 'flex';
  requestAnimationFrame(()=>requestAnimationFrame(()=>overlay.classList.add('active')));
  overlay.dataset.charId = charId;
}
function rollRandomName() {
  const input = document.getElementById('nameInput');
  const used  = input.value;
  let name;
  do { name = GOTHIC_NAMES[Math.floor(Math.random()*GOTHIC_NAMES.length)]; }
  while(name === used && GOTHIC_NAMES.length > 1);
  input.value = name;
}
function confirmName() {
  const overlay = document.getElementById('nameOverlay');
  const input   = document.getElementById('nameInput');
  const charId  = overlay.dataset.charId;
  const name    = input.value.trim() || DEFAULT_HERO_NAME;
  overlay.classList.remove('active');
  setTimeout(()=>{ overlay.style.display='none'; newRun(charId, name); showMap(); }, 350);
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
function startRunWithChar(){if(!selChar)return; showNameSelect(selChar);}

// ═══════════════════════════════════════════════
//  MAP
// ═══════════════════════════════════════════════
function showMap(){renderMap();show('map')}

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
        const isChoosable = ai===curAct && ri===curRow && curCol===null;
        const isActive    = ai===curAct && ri===curRow && curCol===ci && !node.visited;
        const isVis       = node.visited;
        const siblingChosen = rowPair[1-ci]&&rowPair[1-ci].visited;
        if(isVis){el.classList.add('vis');}
        else if(isActive){el.classList.add('cur','cur-active');}
        else if(isChoosable && !siblingChosen){el.classList.add('cur');}
        else{el.classList.add('lkd');}
        el.innerHTML=`<div class="n-ico">${IC[node.type]||'?'}</div><div class="n-lbl">${LABEL[node.type]||node.type}</div>`;
        if((isChoosable && !siblingChosen) || isActive){el.addEventListener('click',()=>enterNode(ai,ri,ci));}
        rowEl.appendChild(el);
      });
      col.appendChild(rowEl);
      if(ri<actData.rows.length-1){
        const cn=document.createElement('div');cn.className='mconn-h';col.appendChild(cn);
      }
    });

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
    runEncounters++;
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
  if(row===6){G.map[act].boss.visited=true;}
  else if(col!==null){G.map[act].rows[row][col].visited=true;}
  const nextRow=row+1;
  if(row===6){
    const nextAct=act+1;
    if(nextAct>=G.map.length){
      // Completed act 3 — ask about infinite mode
      localStorage.removeItem(SK);
      showPostAct3();
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
//  POST-ACT 3 — Menu or Infinite Mode
// ═══════════════════════════════════════════════
function showPostAct3() {
  // Build the prompt overlay
  let overlay = document.getElementById('postAct3Overlay');
  if(!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'postAct3Overlay';
    overlay.style.cssText = `position:fixed;inset:0;z-index:9999;background:#080610ee;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .35s`;
    overlay.innerHTML = `
      <div style="background:linear-gradient(160deg,#1a1228,#0e0b18);border:1px solid #e8b460;border-radius:12px;padding:40px 44px;max-width:460px;width:90%;box-shadow:0 0 80px #c9984a44;display:flex;flex-direction:column;align-items:center;gap:18px;text-align:center">
        <div style="font-family:'Cinzel Decorative',cursive;font-size:22px;color:#e8b460;text-shadow:0 0 40px #c9984a99;letter-spacing:3px">✦ La Noche Continúa ✦</div>
        <div style="font-size:13px;color:#b8a8c8;font-style:italic;line-height:1.8;max-width:340px">Has sobrevivido los tres actos.<br>La ciudad no duerme... <span style="color:#e8b460">¿Seguirás combatiendo?</span></div>
        <div style="font-size:11px;color:#9a2f45;font-family:'Cinzel',serif;letter-spacing:1.5px;background:#9a2f4522;border:1px solid #9a2f4566;padding:8px 16px;border-radius:4px">⚠ Modo Infinito · Los enemigos son 1.5× más fuertes<br>y se refuerzan cada 10 encuentros</div>
        <div style="display:flex;gap:12px;margin-top:6px">
          <button class="btn" onclick="startInfiniteMode()" style="font-size:11px;padding:10px 22px">🌑 &nbsp;Modo Infinito</button>
          <button class="btn btn-wine" onclick="goTitleFromAct3()" style="font-size:11px;padding:10px 22px">↩ &nbsp;Menú Principal</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  }
  overlay.style.display = 'flex';
  requestAnimationFrame(()=>requestAnimationFrame(()=>overlay.style.opacity='1'));
}

function goTitleFromAct3() {
  finalizeRunStats(true);
  const ov = document.getElementById('postAct3Overlay');
  if(ov) { ov.style.opacity='0'; setTimeout(()=>ov.style.display='none',350); }
  showCredits();
}

function startInfiniteMode() {
  const ov = document.getElementById('postAct3Overlay');
  if(ov) { ov.style.opacity='0'; setTimeout(()=>ov.style.display='none',350); }
  G.infiniteMode = true;
  G.infiniteEncounters = 0;
  saveG();
  showInfiniteMap();
}

// ═══════════════════════════════════════════════
//  INFINITE MODE MAP
// ═══════════════════════════════════════════════
function getInfiniteMultiplier() {
  if(!G.infiniteMode) return 1;
  const bonus = Math.floor((G.infiniteEncounters || 0) / 10) * 0.5;
  return 1.5 + bonus;
}

function showInfiniteMap() {
  renderInfiniteMap();
  show('map');
}

function renderInfiniteMap() {
  const c = document.getElementById('mapActs');
  c.innerHTML = '';

  const mult = getInfiniteMultiplier();
  const enc  = G.infiniteEncounters || 0;

  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:20px';

  const title = document.createElement('div');
  title.style.cssText = 'font-family:"Cinzel Decorative",cursive;font-size:16px;color:#9a2f45;letter-spacing:3px;text-shadow:0 0 30px #c0305066';
  title.textContent = '🌑 Modo Infinito — La Oscuridad Sin Fin';
  wrapper.appendChild(title);

  const info = document.createElement('div');
  info.style.cssText = 'font-family:"Cinzel",serif;font-size:10px;color:#b8a8c8;letter-spacing:2px;text-align:center';
  info.innerHTML = `Encuentros: <span style="color:#e8b460">${enc}</span> · Multiplicador: <span style="color:#cc4060">${mult.toFixed(1)}×</span>`;
  wrapper.appendChild(info);

  const btnsRow = document.createElement('div');
  btnsRow.style.cssText = 'display:flex;gap:14px;flex-wrap:wrap;justify-content:center';

  const types = [
    {type:'combat', ico:'⚔', lbl:'COMBATE'},
    {type:'elite',  ico:'💀', lbl:'ÉLITE'},
    {type:'rest',   ico:'🕯', lbl:'DESCANSO'},
    {type:'shop',   ico:'🛒', lbl:'TIENDA'},
  ];
  types.forEach(t => {
    const btn = document.createElement('div');
    btn.className = 'mnode cur' + (t.type==='elite'?' elite':'');
    btn.style.cssText = 'width:90px;height:72px;cursor:pointer';
    btn.innerHTML = `<div class="n-ico">${t.ico}</div><div class="n-lbl">${t.lbl}</div>`;
    btn.addEventListener('click', () => enterInfiniteNode(t.type));
    btnsRow.appendChild(btn);
  });
  wrapper.appendChild(btnsRow);

  const hint = document.createElement('div');
  hint.style.cssText = 'font-size:11px;color:#5a5070;font-style:italic';
  hint.textContent = 'La ciudad nunca duerme. Elige tu próximo destino.';
  wrapper.appendChild(hint);

  c.appendChild(wrapper);
}

function enterInfiniteNode(type) {
  if(['combat','elite'].includes(type)) {
    G.infiniteEncounters = (G.infiniteEncounters||0) + 1;
    runEncounters++;
    saveG();
    startCombat(type==='combat'?0:1, true);
  } else if(type==='rest') {
    show('rest');
  } else if(type==='shop') {
    showShop();
  }
}

function advanceInfinite() {
  saveG();
  const enc = G.infiniteEncounters || 0;
  // Every 10 encounters in infinite mode → deck editor
  if(enc > 0 && enc % 10 === 0 && !G._deckEditedAt || G._pendingDeckEdit){
    G._deckEditedAt = enc;
    G._pendingDeckEdit = false;
    saveG();
    showDeckEditor('infinite');
  } else {
    showInfiniteMap();
  }
}

// ═══════════════════════════════════════════════
//  DRAW
// ═══════════════════════════════════════════════
function countInHand(cardId) {
  return G.player.hand.filter(id => id === cardId).length;
}
function canAddToHand(cardId) {
  // Sin límite de duplicados — solo limita tamaño de mano
  return G.player.hand.length < MAX_HAND;
}
function drawUpTo(target) {
  const p = G.player;
  let attempts = 0;
  const maxAttempts = (p.deck.length + p.discard.length) * 2 + 10;
  while(p.hand.length < target && attempts < maxAttempts) {
    attempts++;
    if(!p.deck.length) {
      if(!p.discard.length) break;
      p.deck = shuf([...p.discard]);
      p.discard = [];
      addLog('Mazo repuesto.','sta');
    }
    const nextId = p.deck[p.deck.length - 1];
    if(canAddToHand(nextId)) {
      p.hand.push(p.deck.pop());
    } else {
      let found = false;
      for(let i = p.deck.length - 2; i >= 0; i--) {
        if(canAddToHand(p.deck[i])) {
          p.hand.push(p.deck.splice(i, 1)[0]);
          found = true;
          break;
        }
      }
      if(!found) break;
    }
  }
}
function getMaxHand() {
  const p = G.player;
  const totalCards = p.deck.length + p.discard.length + p.hand.length;
  if(totalCards <= 2) return 4;
  return MAX_HAND;
}

// ═══════════════════════════════════════════════
//  COMBAT
// ═══════════════════════════════════════════════
function startCombat(tier, isInfinite){
  const infiniteMult = (G.infiniteMode || isInfinite) ? getInfiniteMultiplier() : 1;
  G.enemies = buildEnemyGroup(tier, infiniteMult);
  G._combatTier = tier; // 0=normal, 1=elite, 2=boss
  G.targetIdx = 0;
  G.turn = 1;
  combatTurn = 0;
  G.firstHitUsed = false;
  const p = G.player;
  p.block = 0;
  p.mana = p.maxMana;
  drawUpTo(getMaxHand());
  applyPort();
  const ch = chById(G.charId);
  document.getElementById('passiveInfo').textContent = ch ? ch.passive : '';
  document.getElementById('charBadge').textContent = G.heroName || (ch ? ch.name : '');
  // Show infinite mode info if applicable
  if(G.infiniteMode) {
    const mult = getInfiniteMultiplier();
    document.getElementById('passiveInfo').textContent = (ch ? ch.passive + '\n' : '') +
      `🌑 Modo Infinito · Encuentro ${G.infiniteEncounters} · ${mult.toFixed(1)}×`;
  }
  _gunslingerAttacks = 0;
  _gunslingerReady   = false;
  renderEnemies();
  renderHand();
  renderPS();
  updMana();
  updateGunslingerHUD();
  document.getElementById('turnLbl').textContent = 'Turno 1';
  document.getElementById('clog').innerHTML = '';
  addLog(`¡Combate! ${G.enemies.map(e=>e.name).join(', ')}`, 'ene');
  show('game');
}

function applyPort(){
  const ch=chById(G.charId);if(!ch)return;
  const pc=document.getElementById('portContent');
  const img=getImg(ch.imgKey);
  pc.innerHTML=img?`<img src="${img}" style="width:100%;height:100%;object-fit:cover">`:`<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center">${ch.svg}</div>`;
}

// ═══════════════════════════════════════════════
//  RENDER ENEMIES
// ═══════════════════════════════════════════════
function renderEnemies() {
  const zone = document.getElementById('eZone');
  if(!zone) return;
  zone.innerHTML = '';
  G.enemies.forEach((e, i) => {
    if(e.dead) return;
    const wrap = document.createElement('div');
    wrap.className = 'enemy-wrap' + (i === G.targetIdx ? ' enemy-targeted' : '');
    wrap.dataset.idx = i;

    const hpPct = Math.max(0, e.hp / e.maxHp * 100);
    // Healer uses special image
    const imgKey = e.isHealer ? 'enemy_healer' : ('enemy'+(e.tier||0));
    const imgHtml = getImg(imgKey)
      ? `<img src="${getImg(imgKey)}" style="width:100%;height:100%;object-fit:contain">`
      : (e.isHealer ? getHealerSVG() : getESVG(e.name, e.tier||0));

    let statusHtml = '';
    if(e.block)  statusHtml += `<span class="si si-bk">🛡 ${e.block}</span>`;
    if(e.bleed)  statusHtml += `<span class="si si-bl">🩸 ${e.bleed}</span>`;
    if(e.poison) statusHtml += `<span class="si si-ps">☠ ${e.poison}</span>`;

    // Healer intent
    let intentText;
    if(e.isHealer) {
      const action = getHealerAction(e, combatTurn);
      if(action==='heal')   intentText = `❤ Cura aliados (${e.healAmt||8})`;
      else if(action==='shield') intentText = `🛡 Escudo aliados (${e.shieldAmt||6})`;
      else if(action==='debuff') intentText = `☠ Maldición · Veneno/Sangrado`;
      else                  intentText = `⚔ Ataque: ${e.dmg}`;
    } else {
      intentText = `⚔ Ataque: ${e.dmg}`;
    }

    const healerBadge = e.isHealer ? `<div style="font-family:'Cinzel',serif;font-size:7px;letter-spacing:1.5px;color:#60ee90;background:#1a3a1a55;border:1px solid #4acc7066;padding:2px 6px;border-radius:3px;margin-bottom:2px">✚ SANADORA</div>` : '';

    wrap.innerHTML = `
      ${healerBadge}
      <div class="e-name">${e.name}</div>
      <div class="e-sprite" id="eSprite${i}">${imgHtml}</div>
      <div class="e-hp-wrap">
        <div class="e-hp-bar" id="eHpBar${i}" style="width:${hpPct}%"></div>
        <div class="e-hp-txt">${Math.max(0,e.hp)} / ${e.maxHp}</div>
      </div>
      <div class="e-intent">${intentText}</div>
      <div class="si-wrap" style="justify-content:center;margin-top:3px">${statusHtml}</div>
      <div class="target-indicator">${i===G.targetIdx?'▼ OBJETIVO ▼':''}</div>
    `;
    wrap.addEventListener('click', () => { G.targetIdx = i; renderEnemies(); });
    zone.appendChild(wrap);
  });
}

function getHealerSVG() {
  return `<svg viewBox="0 0 130 168" fill="none">
    <ellipse cx="65" cy="137" rx="30" ry="5" fill="#00000066"/>
    <ellipse cx="65" cy="55" rx="20" ry="22" fill="#1a2a1a" stroke="#4acc7088" stroke-width="1.5"/>
    <circle cx="57" cy="51" r="6" fill="#0a120a" stroke="#4acc7066"/>
    <circle cx="73" cy="51" r="6" fill="#0a120a" stroke="#4acc7066"/>
    <circle cx="57" cy="51" r="3" fill="#4acc7088"/>
    <circle cx="73" cy="51" r="3" fill="#4acc7088"/>
    <path d="M57 64 Q65 70 73 64" stroke="#4acc70" stroke-width="1.5" fill="none"/>
    <rect x="42" y="77" width="46" height="54" rx="6" fill="#1a2a1a" stroke="#4acc7066" stroke-width="1.5"/>
    <path d="M42 88 Q24 80 22 102 Q34 94 42 100" fill="#121e12"/>
    <path d="M88 88 Q106 80 108 102 Q96 94 88 100" fill="#121e12"/>
    <rect x="59" y="82" width="12" height="28" rx="3" fill="#4acc7066"/>
    <rect x="53" y="88" width="24" height="12" rx="3" fill="#4acc7066"/>
    <circle cx="65" cy="55" r="28" fill="none" stroke="#4acc7033" stroke-width="1"/>
  </svg>`;
}

function getESVG(name,tier){
  if(tier===2)return`<svg viewBox="0 0 130 168" fill="none"><ellipse cx="65" cy="134" rx="42" ry="7" fill="#00000066"/><rect x="38" y="64" width="54" height="74" rx="7" fill="#1a0a28" stroke="#7a1f3566" stroke-width="1.5"/><path d="M38 79 Q18 69 16 95 Q26 85 38 91" fill="#130820"/><path d="M92 79 Q112 69 114 95 Q104 85 92 91" fill="#130820"/><ellipse cx="65" cy="53" rx="22" ry="24" fill="#1a0a28" stroke="#7a1f3588" stroke-width="1.5"/><circle cx="55" cy="49" r="7" fill="#0a0510" stroke="#c0304066"/><circle cx="75" cy="49" r="7" fill="#0a0510" stroke="#c0304066"/><circle cx="55" cy="49" r="4" fill="#c0304088"/><circle cx="75" cy="49" r="4" fill="#c0304088"/><path d="M52 64 Q65 72 78 64" stroke="#7a1f35" stroke-width="1.5" fill="none"/><path d="M43 30 Q65 14 87 30" stroke="#c9984a66" stroke-width="1.5" fill="none"/><line x1="52" y1="30" x2="44" y2="14" stroke="#c9984a55"/><line x1="78" y1="30" x2="86" y2="14" stroke="#c9984a55"/><line x1="65" y1="30" x2="65" y2="10" stroke="#c9984a55"/></svg>`;
  if(tier===1)return`<svg viewBox="0 0 130 168" fill="none"><ellipse cx="65" cy="137" rx="36" ry="6" fill="#00000066"/><rect x="40" y="74" width="50" height="65" rx="6" fill="#1a1028" stroke="#3a1a4a66" stroke-width="1.5"/><path d="M40 85 Q22 77 20 99 Q32 91 40 97" fill="#130c1e"/><path d="M90 85 Q108 77 110 99 Q98 91 90 97" fill="#130c1e"/><ellipse cx="65" cy="59" rx="20" ry="22" fill="#1a1028" stroke="#3a1a4a88" stroke-width="1.5"/><circle cx="56" cy="55" r="6" fill="#0a0812" stroke="#5a1a7a66"/><circle cx="74" cy="55" r="6" fill="#0a0812" stroke="#5a1a7a66"/><circle cx="56" cy="55" r="3" fill="#7a40aa88"/><circle cx="74" cy="55" r="3" fill="#7a40aa88"/><path d="M58 67 Q65 73 72 67" stroke="#5a1a7a" stroke-width="1.5" fill="none"/><line x1="62" y1="69" x2="60" y2="74" stroke="#c0304088" stroke-width="1.5"/><line x1="68" y1="69" x2="70" y2="74" stroke="#c0304088" stroke-width="1.5"/></svg>`;
  return`<svg viewBox="0 0 130 168" fill="none"><ellipse cx="65" cy="141" rx="28" ry="5" fill="#00000066"/><circle cx="65" cy="64" r="28" fill="#1a1428" stroke="#2a1a3a88" stroke-width="1.5"/><circle cx="55" cy="59" r="7" fill="#0a0810" stroke="#4a2a6a66"/><circle cx="75" cy="59" r="7" fill="#0a0810" stroke="#4a2a6a66"/><circle cx="55" cy="59" r="3.5" fill="#5a3a8888"/><circle cx="75" cy="59" r="3.5" fill="#5a3a8888"/><path d="M53 72 Q65 80 77 72" stroke="#3a1a4a" stroke-width="1.5" fill="none"/><rect x="47" y="92" width="36" height="40" rx="4" fill="#13101e" stroke="#2a1a3a66"/><path d="M47 102 Q32 94 30 112 Q38 106 47 110" fill="#0f0c1a"/><path d="M83 102 Q98 94 100 112 Q92 106 83 110" fill="#0f0c1a"/></svg>`;
}

// ═══════════════════════════════════════════════
//  RENDER HAND
// ═══════════════════════════════════════════════
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

// ═══════════════════════════════════════════════
//  PLAY CARD
// ═══════════════════════════════════════════════
// Gunslinger counter: cada 3 ataques jugados, siguiente ataque hace doble daño
let _gunslingerAttacks = 0;
let _gunslingerReady   = false;

function playCard(hi){
  const p=G.player;
  const id=p.hand[hi];
  const card=cById(id);
  const e=G.enemies[G.targetIdx];
  if(!card||card.cost>p.mana)return;
  if(!e||e.dead){
    const alive = G.enemies.findIndex(en=>!en.dead);
    if(alive>=0) G.targetIdx=alive;
    else return;
  }
  const target = G.enemies[G.targetIdx];

  p.mana-=card.cost;
  p.hand.splice(hi,1);
  p.discard.push(id);
  let msg=`Jugaste: ${card.name}`;

  if(card.dmg){
    // Gunslinger passive: every 3 attacks → next attack deals double
    let bonusMult = 1;
    if(G.charId==='pistolero' && card.type==='attack'){
      if(_gunslingerReady){
        bonusMult = 2;
        _gunslingerReady = false;
        _gunslingerAttacks = 0;
        addLog('¡Cargador activo! Daño doble 🔥','sta');
      } else {
        _gunslingerAttacks++;
        if(_gunslingerAttacks>=3){_gunslingerReady=true;_gunslingerAttacks=0;}
        updateGunslingerHUD();
      }
    }

    let hits = card.triple ? 3 : (card.dbl ? 2 : 1);
    let totalDmgDealt = 0;
    for(let h=0;h<hits;h++){
      let d = card.dmg * bonusMult;
      const ab=Math.min(target.block,d);
      target.block=Math.max(0,target.block-d);
      const nd=d-ab;
      target.hp=Math.max(0,target.hp-nd);
      totalDmgDealt+=nd;
      animateAttack(G.targetIdx, nd);
      if(target.hp<=0)break;
    }
    msg+=` · ${totalDmgDealt} daño${hits>1?' (×'+hits+')':''}`;
    runTotalDmg += totalDmgDealt;
    if(totalDmgDealt > runHighDmg) runHighDmg = totalDmgDealt;

    // Cazador lifesteal: 2 HP per attack card that deals direct damage
    if(G.charId==='cazador' && totalDmgDealt>0){
      const steal=2;
      const healed=Math.min(p.maxHp,p.hp+steal)-p.hp;
      if(healed>0){
        p.hp+=healed;
        msg+=` · ❤ +${healed}`;
        runDmgHealed+=healed;
        animateHeal(healed);
      }
    }
  }
  if(card.blk){p.block+=card.blk;msg+=` · +${card.blk} bloqueo`;spawnN(card.blk,'bk');}
  if(card.bleed){target.bleed+=card.bleed;msg+=` · ${card.bleed} sangrado`;}
  if(card.psn){let ps=card.psn;if(G.charId==='hechicera')ps++;target.poison+=ps;msg+=` · ${ps} veneno`;}
  if(card.heal){
    const h=Math.min(p.maxHp,p.hp+card.heal)-p.hp;
    p.hp+=h;
    msg+=` · +${h} vida`;
    runDmgHealed += h;
    animateHeal(h);
  }
  addLog(msg,'sta');

  if(target.hp<=0){
    target.dead=true;
    const alive=G.enemies.filter(en=>!en.dead);
    if(alive.length===0){
      renderHand();renderEnemies();renderPS();updMana();
      setTimeout(()=>combatWin(),400);
      return;
    } else {
      G.targetIdx=G.enemies.findIndex(en=>!en.dead);
    }
  }

  renderHand();renderEnemies();renderPS();updMana();
}

function updateGunslingerHUD(){
  const el=document.getElementById('gunslingerHUD');
  if(!el)return;
  if(G.charId!=='pistolero'){el.style.display='none';return;}
  el.style.display='flex';
  const needed=3-_gunslingerAttacks;
  el.innerHTML=_gunslingerReady
    ? `<span style="color:#ffcc44;font-size:10px;letter-spacing:1px;font-family:'Cinzel',serif">🔥 ¡CARGADO!</span>`
    : `<span style="font-size:9px;letter-spacing:1px;color:var(--dim)">🔫 ${_gunslingerAttacks}/3</span>`;
}

// ═══════════════════════════════════════════════
//  ANIMATIONS
// ═══════════════════════════════════════════════
function animateAttack(enemyIdx, dmg) {
  const spriteEl = document.getElementById('eSprite' + enemyIdx);
  if(spriteEl) {
    spriteEl.classList.add('hit-flash');
    setTimeout(()=>spriteEl.classList.remove('hit-flash'), 500);
  }
  const slash = document.createElement('div');
  slash.className = 'slash-fx';
  const ref = spriteEl ? spriteEl.getBoundingClientRect() : {left:200,top:200,width:100,height:100};
  slash.style.left = (ref.left + ref.width/2 - 30) + 'px';
  slash.style.top  = (ref.top  + ref.height/2 - 30) + 'px';
  slash.innerHTML = `<svg viewBox="0 0 60 60" fill="none">
    <line x1="10" y1="10" x2="50" y2="50" stroke="#ff4060" stroke-width="4" stroke-linecap="round" opacity="0.9"/>
    <line x1="18" y1="8" x2="52" y2="42" stroke="#ff8090" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
  </svg>`;
  document.body.appendChild(slash);
  setTimeout(()=>slash.remove(), 500);
  spawnN(dmg, 'en', spriteEl);
}

function animateHeal(amount) {
  const hpBar = document.getElementById('hpBar');
  if(hpBar) {
    const wrap = hpBar.parentElement.parentElement;
    const healPulse = document.createElement('div');
    healPulse.className = 'heal-pulse';
    wrap.style.position = 'relative';
    wrap.appendChild(healPulse);
    setTimeout(()=>healPulse.remove(), 800);
  }
  const portrait = document.getElementById('portrait');
  if(portrait) {
    const r = portrait.getBoundingClientRect();
    for(let i=0;i<5;i++){
      setTimeout(()=>{
        const p = document.createElement('div');
        p.className = 'heal-particle';
        p.style.left = (r.left + Math.random()*r.width) + 'px';
        p.style.top  = (r.top  + Math.random()*r.height) + 'px';
        p.textContent = '✦';
        document.body.appendChild(p);
        setTimeout(()=>p.remove(), 800);
      }, i*80);
    }
  }
  spawnN(amount, 'hl');
}

// ═══════════════════════════════════════════════
//  END TURN — healer actions included
// ═══════════════════════════════════════════════
function endTurn(){
  const p=G.player;
  const aliveEnemies = G.enemies.filter(e=>!e.dead);

  // DoTs on enemies
  aliveEnemies.forEach(e=>{
    if(e.bleed>0){const d=2;e.hp=Math.max(0,e.hp-d);e.bleed--;addLog(`${e.name} sangra (-${d})`,'ene');animateHit(e);}
    if(e.poison>0){const d=e.poison+(G.charId==='hechicera'?1:0);e.hp=Math.max(0,e.hp-d);e.poison=Math.max(0,e.poison-1);addLog(`${e.name} envenena (-${d})`,'ene');animateHit(e);}
    if(e.hp<=0)e.dead=true;
  });

  if(G.enemies.filter(e=>!e.dead).length===0){
    renderEnemies();
    setTimeout(()=>combatWin(),400);
    return;
  }

  // Each alive enemy acts
  aliveEnemies.filter(e=>!e.dead).forEach(e=>{
    if(e.isHealer) {
      doHealerAction(e);
    } else {
      // Normal attack
      let actualDmg=e.dmg;
      if(G.charId==='espectro'&&!G.firstHitUsed){
        G.firstHitUsed=true;actualDmg=0;
        addLog('Forma Etérea: golpe evitado!','sta');
      }
      const ab=Math.min(p.block,actualDmg);
      p.block=Math.max(0,p.block-actualDmg);
      const nd=actualDmg-ab;
      p.hp=Math.max(0,p.hp-nd);
      if(nd>0){
        addLog(`${e.name} golpea por ${nd}`,'ene');
        spawnN(nd,'pl');
        runDmgTanked += nd;
        animatePlayerHit();
      }
    }
  });

  combatTurn++;

  // Player DoTs
  if(p.bleed>0){p.hp=Math.max(0,p.hp-2);p.bleed--;}
  if(p.poison>0){p.hp=Math.max(0,p.hp-p.poison);p.poison=Math.max(0,p.poison-1);}

  if(p.hp<=0){
    renderPS();
    document.getElementById('s-game').classList.add('shake');
    setTimeout(()=>{
      document.getElementById('s-game').classList.remove('shake');
      localStorage.removeItem(SK);
      finalizeRunStats(false);
      document.getElementById('overStats').textContent=`${G.heroName}  ·  Turno ${G.turn}  ·  Oro: ${G.gold}${G.infiniteMode?' · Modo Infinito':''}`;
      show('over');
    },400);
    return;
  }

  G.turn++;
  p.block=0;
  p.mana=p.maxMana;
  drawUpTo(getMaxHand());

  document.getElementById('turnLbl').textContent=`Turno ${G.turn}`;
  saveG();renderHand();renderEnemies();renderPS();updMana();
}

// ─── HEALER ACTIONS ───────────────────────────
function doHealerAction(healer) {
  const action = getHealerAction(healer, combatTurn);
  const aliveAllies = G.enemies.filter(e=>!e.dead && e !== healer);
  const p = G.player;

  if(action === 'heal') {
    // Heal lowest HP ally, or self
    const targets = aliveAllies.length > 0 ? aliveAllies : [healer];
    const lowestHp = targets.reduce((a,b) => (a.hp < b.hp ? a : b));
    const healAmt = healer.healAmt || 8;
    const healed = Math.min(lowestHp.maxHp - lowestHp.hp, healAmt);
    lowestHp.hp += healed;
    addLog(`${healer.name} cura a ${lowestHp.name} (+${healed})`, 'heal');
    // Visual: green particle on enemy
    const idx = G.enemies.indexOf(lowestHp);
    const el = document.getElementById('eSprite'+idx);
    if(el) {
      const pulse = document.createElement('div');
      pulse.className = 'heal-pulse';
      pulse.style.cssText = 'position:absolute;inset:-4px;border-radius:4px;background:radial-gradient(circle,#4acc7033,transparent 70%);border:2px solid #4acc7066;animation:healPulseAnim .8s forwards;pointer-events:none;z-index:5';
      el.style.position='relative';
      el.appendChild(pulse);
      setTimeout(()=>pulse.remove(),800);
    }
  } else if(action === 'shield') {
    // Shield all allies
    const shieldAmt = healer.shieldAmt || 6;
    const shieldTargets = [...aliveAllies, healer];
    shieldTargets.forEach(ally => { ally.block += shieldAmt; });
    addLog(`${healer.name} escuda a sus aliados (+${shieldAmt} bloqueo cada uno)`, 'sta');
  } else if(action === 'debuff') {
    // Apply poison or bleed to player
    if(Math.random() < 0.5) {
      p.poison += 2;
      addLog(`${healer.name} lanza una maldición · +2 veneno`, 'ene');
    } else {
      p.bleed += 2;
      addLog(`${healer.name} lanza una maldición · +2 sangrado`, 'ene');
    }
    spawnN(2, 'pl');
  } else {
    // Weak attack
    let actualDmg = healer.dmg;
    if(G.charId==='espectro'&&!G.firstHitUsed){
      G.firstHitUsed=true; actualDmg=0;
      addLog('Forma Etérea: golpe evitado!','sta');
    }
    const ab = Math.min(p.block, actualDmg);
    p.block = Math.max(0, p.block - actualDmg);
    const nd = actualDmg - ab;
    p.hp = Math.max(0, p.hp - nd);
    if(nd>0){
      addLog(`${healer.name} ataca débilmente por ${nd}`,'ene');
      spawnN(nd,'pl');
      runDmgTanked += nd;
    }
  }
  healer.healerTurn = (healer.healerTurn||0) + 1;
}

function animateHit(e) {
  const idx = G.enemies.indexOf(e);
  const el = document.getElementById('eSprite'+idx);
  if(el){el.classList.add('hit-flash');setTimeout(()=>el.classList.remove('hit-flash'),400);}
}

function animatePlayerHit(){
  // Red vignette flash over entire combat screen
  let vfx = document.getElementById('playerHitVFX');
  if(!vfx){
    vfx = document.createElement('div');
    vfx.id = 'playerHitVFX';
    vfx.style.cssText = `
      position:fixed;inset:0;z-index:8000;pointer-events:none;
      background:radial-gradient(ellipse at center, transparent 40%, #c0304088 100%);
      opacity:0;transition:opacity .08s ease-in;
    `;
    document.body.appendChild(vfx);
  }
  // Portrait shake
  const port = document.getElementById('portrait');
  if(port){port.classList.add('hit-flash');setTimeout(()=>port.classList.remove('hit-flash'),400);}
  // Vignette flash
  vfx.style.opacity='1';
  setTimeout(()=>{ vfx.style.transition='opacity .45s ease-out'; vfx.style.opacity='0'; }, 100);
  setTimeout(()=>{ vfx.style.transition='opacity .08s ease-in'; }, 600);
  // Screen shake on left panel
  const panel = document.getElementById('s-game');
  if(panel){panel.classList.add('shake');setTimeout(()=>panel.classList.remove('shake'),300);}
}

function combatWin(){
  const totalRw = G.enemies.reduce((sum,e)=>sum+(e.rw||0),0);
  G.gold+=totalRw;
  addLog(`¡Victoria! +${totalRw} oro`,'heal');
  saveG();
  showRew(G._combatTier||0);
}

// ═══════════════════════════════════════════════
//  RENDER PLAYER STATS
// ═══════════════════════════════════════════════
function renderPS(){
  const p=G.player;
  document.getElementById('hpBar').style.width=(p.hp/p.maxHp*100)+'%';
  document.getElementById('hpNum').textContent=Math.max(0,p.hp);
  document.getElementById('mpBar').style.width=(p.mana/p.maxMana*100)+'%';
  document.getElementById('mpNum').textContent=p.mana;
  const mpMax=document.getElementById('mpMax');
  if(mpMax)mpMax.textContent='/'+p.maxMana;
  const st=document.getElementById('pStat');st.innerHTML='';
  if(p.block){
    st.innerHTML+=`<span class="si si-bk si-shield-big">🛡 ${p.block}</span>`;
  }
  if(p.bleed)st.innerHTML+=`<span class="si si-bl">🩸 ${p.bleed}</span>`;
  if(p.poison)st.innerHTML+=`<span class="si si-ps">☠ ${p.poison}</span>`;

  const shieldDisp = document.getElementById('shieldDisplay');
  if(shieldDisp){
    if(p.block > 0){
      shieldDisp.style.display='flex';
      document.getElementById('shieldVal').textContent=p.block;
      shieldDisp.classList.add('shield-active');
    } else {
      shieldDisp.style.display='none';
      shieldDisp.classList.remove('shield-active');
    }
  }

  document.getElementById('dkC').textContent=p.deck.length;
  document.getElementById('dsC').textContent=p.discard.length;
  document.getElementById('goldN').textContent=G.gold;
  document.getElementById('handC').textContent=p.hand.length+'/'+getMaxHand();
}

function updMana(){const p=G.player;let h='';for(let i=0;i<p.maxMana;i++)h+=`<div class="morb ${i<p.mana?'f':'e'}">${i<p.mana?'◆':'◇'}</div>`;document.getElementById('manaOrbs').innerHTML=h}

function addLog(msg,cls=''){
  const el=document.getElementById('clog');if(!el)return;
  const d=document.createElement('div');d.className='log-e '+cls;d.textContent=msg;
  el.appendChild(d);el.scrollTop=el.scrollHeight;
}

function spawnN(n,type,refEl){
  const el=document.createElement('div');el.className='dmg-num '+type;
  let ref;
  if(refEl){ref=refEl.getBoundingClientRect();}
  else{
    const refs={en:'eZone',pl:'hpBar',bk:'mpBar',hl:'portrait'};
    const r=document.getElementById(refs[type]||'eZone');
    ref=r?r.getBoundingClientRect():{left:200,top:200,width:100,height:50};
  }
  el.textContent=(type==='hl'?'+':'-')+n;
  el.style.left=(ref.left+ref.width/2+(Math.random()*40-20))+'px';
  el.style.top=(ref.top+ref.height/2)+'px';
  document.body.appendChild(el);
  setTimeout(()=>el.remove(),1200);
}

// ═══════════════════════════════════════════════
//  REWARD / REST / SHOP
// ═══════════════════════════════════════════════
function buildCardHTML(card, w, h, showDesc){
  const ds = card.triple?card.dmg*3:card.dbl?card.dmg*2:card.dmg;
  let fx='';
  if(card.dmg)fx+=`<span class="fx fx-d">⚔ ${ds}</span>`;
  if(card.blk)fx+=`<span class="fx fx-b">🛡 ${card.blk}</span>`;
  if(card.bleed)fx+=`<span class="fx fx-bl">🩸 ${card.bleed}</span>`;
  if(card.psn)fx+=`<span class="fx fx-p">☠ ${card.psn}</span>`;
  if(card.heal)fx+=`<span class="fx fx-hl">❤ ${card.heal}</span>`;
  const rc = RARITY_COLORS[card.rarity]||'#a0a0b0';
  const rl = RARITY_LABELS[card.rarity]||'';
  const desc = showDesc ? `<div style="font-size:8px;color:var(--dim);padding:0 4px 4px;text-align:center;line-height:1.4;font-style:italic">${card.desc}</div>` : '';
  return `<div class="gcard ${card.type} playable" style="width:${w}px;height:${h}px;cursor:pointer;position:relative;border-top:2px solid ${rc}">
    <div class="c-bar"></div>
    <div class="c-cost">${card.cost}</div>
    <div style="position:absolute;bottom:${h-16}px;left:0;right:0;text-align:center;font-size:7px;letter-spacing:1.5px;color:${rc};font-family:'Cinzel',serif;opacity:.95;text-shadow:0 0 6px ${rc}44">${rl}</div>
    <div class="c-art" style="padding:9px 5px 3px">${getCArt(card)}</div>
    <div class="c-name">${card.name}</div>
    <div class="c-fx">${fx}</div>
    ${desc}
  </div>`;
}

function showRew(tier){
  tier = tier ?? 0;
  const isBoss = (tier === 2);
  const count = isBoss ? 2 : 1; // boss: pick 2, others: pick 1 from 3
  const opts = pickRewardCards(isBoss ? 4 : 3, tier);

  const c = document.getElementById('rewCards'); c.innerHTML='';
  // Title update
  const rt = document.getElementById('rewTitle');
  if(rt){
    if(isBoss) rt.textContent = '✦ Victoria sobre el Jefe ✦';
    else if(tier===1) rt.textContent = '✦ Recompensa de Élite ✦';
    else rt.textContent = '✦ Elige una Recompensa ✦';
  }

  // Sub-hint for boss
  const subEl = document.getElementById('rewSub');
  if(subEl) subEl.textContent = isBoss ? 'Elige 2 cartas' : 'Elige 1 carta (o sáltate)';

  let bossChosen = 0;
  opts.forEach(card=>{
    const w = document.createElement('div'); w.className='rew-wrap';
    w.innerHTML = buildCardHTML(card, 126, 190, true);
    w.addEventListener('click', ()=>{
      if(isBoss){
        if(bossChosen >= 2) return;
        G.player.deck.push(card.id);
        bossChosen++;
        w.style.opacity='.3'; w.style.pointerEvents='none';
        const subEl=document.getElementById('rewSub');
        if(subEl) subEl.textContent=`${2-bossChosen} carta(s) restante(s)`;
        if(bossChosen>=2){ saveG(); setTimeout(()=>doAdvance(),600); }
      } else {
        G.player.deck.push(card.id);
        saveG();
        doAdvance();
      }
    });
    c.appendChild(w);
  });
  show('reward');
}

function doAdvance(){
  // After boss fight, offer deck editing before advancing
  const {row} = G.path;
  if(row===6 && !G.infiniteMode){
    showDeckEditor('post-boss');
  } else if(G.infiniteMode) {
    advanceInfinite();
  } else {
    advance();
  }
}

// ═══════════════════════════════════════════════
//  DECK EDITOR — al final de acto (boss) y modo infinito cada 10
// ═══════════════════════════════════════════════
function showDeckEditor(context){
  // context: 'post-boss' | 'infinite'
  let discarded = 0;
  const MAX_DISCARD = 5;
  const MIN_DECK = 4;

  // Combinar TODAS las cartas del jugador: mazo + mano + descarte
  const allCards = [
    ...G.player.deck,
    ...G.player.hand,
    ...G.player.discard
  ];
  let pending = [...allCards];

  const overlay = document.createElement('div');
  overlay.id = 'deckEditorOverlay';
  overlay.style.cssText = `position:fixed;inset:0;z-index:9000;background:#080610ee;display:flex;align-items:center;justify-content:center;animation:fadeIn .3s`;

  function buildUI(){
    const canDiscard = discarded < MAX_DISCARD && pending.length > MIN_DECK;
    overlay.innerHTML = `
      <div style="background:linear-gradient(160deg,#1a1228,#0e0b18);border:1px solid var(--gold);border-radius:14px;padding:28px 24px;max-width:860px;width:96%;max-height:90vh;overflow-y:auto;display:flex;flex-direction:column;gap:16px;box-shadow:0 0 80px #c9984a33">
        <div style="font-family:'Cinzel Decorative',cursive;font-size:18px;color:var(--gold);text-align:center;letter-spacing:2px">✦ Editar Mazo ✦</div>
        <div style="font-size:12px;color:var(--dim);text-align:center;font-style:italic">
          ${context==='infinite'?'Cada 10 encuentros puedes editar tu mazo.':'Antes de continuar puedes descartar cartas.'}
          <br><span style="color:var(--fog)">Cartas totales: <b style="color:var(--gold)">${pending.length}</b></span>
          &nbsp;·&nbsp; Descartadas: <span id="deCount" style="color:#c0304a">${discarded}</span> / ${MAX_DISCARD}
          &nbsp;·&nbsp; Mínimo: ${MIN_DECK}
        </div>
        <div id="deDeckGrid" style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;padding:8px 0"></div>
        <div style="display:flex;gap:12px;justify-content:center;margin-top:4px">
          <button class="btn" onclick="confirmDeckEdit()">Confirmar y Continuar →</button>
        </div>
      </div>`;

    const grid = overlay.querySelector('#deDeckGrid');
    pending.forEach((cardId, idx)=>{
      const card = cById(cardId);
      if(!card) return;
      const stillCanDiscard = discarded < MAX_DISCARD && pending.length > MIN_DECK;
      const item = document.createElement('div');
      item.style.cssText = `display:flex;flex-direction:column;align-items:center;gap:4px;cursor:${stillCanDiscard?'pointer':'default'};transition:all .2s;position:relative;opacity:1`;
      item.dataset.idx = idx;
      item.innerHTML = buildCardHTML(card, 92, 138, false) +
        `<div class="de-discard-btn" style="font-size:9px;letter-spacing:1px;color:${stillCanDiscard?'#c0304a':'#444'};font-family:'Cinzel',serif;opacity:${stillCanDiscard?'.8':'.3'};border:1px solid ${stillCanDiscard?'#c0304a44':'#33333344'};border-radius:3px;padding:2px 6px">DESCARTAR</div>`;
      if(stillCanDiscard){
        item.addEventListener('click',()=>{
          pending.splice(idx, 1);
          discarded++;
          buildUI();
        });
        item.addEventListener('mouseenter',()=>{ item.style.transform='translateY(-6px)'; });
        item.addEventListener('mouseleave',()=>{ item.style.transform=''; });
      }
      grid.appendChild(item);
    });
  }

  buildUI();
  document.body.appendChild(overlay);
  overlay.style.opacity='0';
  requestAnimationFrame(()=>{ overlay.style.transition='opacity .3s'; overlay.style.opacity='1'; });

  window.confirmDeckEdit = function(){
    // Rebuild player state: pending becomes new deck, clear hand and discard
    G.player.deck    = pending;
    G.player.hand    = [];
    G.player.discard = [];
    saveG();
    overlay.style.opacity='0';
    setTimeout(()=>{
      overlay.remove();
      delete window.confirmDeckEdit;
      if(context==='infinite') advanceInfinite();
      else advance();
    },300);
  };
}

function skipRew(){
  if(G._combatTier===2){
    // Boss skip still goes to deck editor
    showDeckEditor('post-boss');
  } else if(G.infiniteMode) {
    advanceInfinite();
  } else {
    advance();
  }
}
function doHeal(){const p=G.player;p.hp=Math.min(p.maxHp,p.hp+20);saveG();if(G.infiniteMode)advanceInfinite();else advance();}
function doPurge(){const i=G.player.deck.indexOf('strike');if(i>=0)G.player.deck.splice(i,1);saveG();if(G.infiniteMode)advanceInfinite();else advance();}

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
      G.player.deck.push(card.id);
      w.style.opacity='.2';w.style.pointerEvents='none';
      document.getElementById('shopG').textContent=G.gold;
      saveG();
    });
    c.appendChild(w);
  });
  show('shop');
}

function leaveShop(){
  if(G.infiniteMode) advanceInfinite();
  else advance();
}

// ═══════════════════════════════════════════════
//  CHEST
// ═══════════════════════════════════════════════
function showChest(){
  const roll=Math.random();
  const el=document.getElementById('chestContent');
  el.innerHTML='';
  if(roll<0.1){
    el.innerHTML=`<div class="chest-bad"><div style="font-size:44px">💀</div><div class="chest-title" style="color:var(--wine2)">¡Era una trampa!</div><div class="chest-desc">El cofre cobraba vida. Un mímic te ataca.</div><button class="btn btn-wine" onclick="chestMimic()">Combatir al Mímic</button></div>`;
  } else if(roll<0.5){
    const coins=Math.floor(15+Math.random()*25);
    el.innerHTML=`<div class="chest-good"><div style="font-size:44px">🪙</div><div class="chest-title">¡Oro encontrado!</div><div class="chest-desc">Encuentras <span style="color:var(--gold);font-weight:bold">${coins} monedas</span> entre las sombras.</div><button class="btn" onclick="chestGold(${coins})">Tomar el oro</button></div>`;
  } else {
    el.innerHTML=`<div class="chest-good"><div style="font-size:44px">🃏</div><div class="chest-title">¡Carta encontrada!</div><div class="chest-desc">Un grimorio yace en el cofre. Elige una carta para tu mazo.</div><button class="btn" onclick="chestCard()">Abrir el grimorio</button></div>`;
  }
  show('chest');
}
function chestGold(n){G.gold+=n;saveG();if(G.infiniteMode)advanceInfinite();else advance();}
function chestCard(){showRew();}
function chestMimic(){
  const mimic={name:'Mímic Devorador',hp:38,maxHp:38,dmg:13,bleed:2,psn:0,block:0,poison:0,tier:1,rw:25,dead:false};
  G.enemies=[mimic];
  G.targetIdx=0;
  G.turn=1;G.firstHitUsed=false;combatTurn=0;
  const p=G.player;
  p.block=0;p.mana=p.maxMana;
  drawUpTo(getMaxHand());
  applyPort();
  const ch=chById(G.charId);
  document.getElementById('passiveInfo').textContent=ch?ch.passive:'';
  document.getElementById('charBadge').textContent=G.heroName||(ch?ch.name:'');
  renderEnemies();renderHand();renderPS();updMana();
  document.getElementById('turnLbl').textContent='Turno 1';
  document.getElementById('clog').innerHTML='';
  addLog(`¡El Mímic emerge del cofre!`,'ene');
  show('game');
}

// ═══════════════════════════════════════════════
//  STATISTICS SCREEN
// ═══════════════════════════════════════════════
function showStats() {
  let ov = document.getElementById('statsOverlay');
  if(!ov) {
    ov = document.createElement('div');
    ov.id = 'statsOverlay';
    ov.style.cssText = 'position:fixed;inset:0;z-index:9998;background:#080610ee;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .35s;overflow-y:auto';
    document.body.appendChild(ov);
  }

  const s = loadStats();
  const lb = loadLeaderboard();

  function fmtTime(sec) {
    const h = Math.floor(sec/3600), m = Math.floor((sec%3600)/60), s2 = sec%60;
    if(h>0) return `${h}h ${m}m ${s2}s`;
    if(m>0) return `${m}m ${s2}s`;
    return `${s2}s`;
  }

  const statsRows = [
    {label:'Partidas jugadas',       val: s.totalRuns},
    {label:'Tiempo total de juego',  val: fmtTime(s.totalPlaytime)},
    {label:'Mejor racha (encuentros)',val: s.bestRunEncounters},
    {label:'Tiempo de mejor racha',  val: fmtTime(s.bestRunTime)},
    {label:'Mayor daño en un golpe', val: s.highestSingleDmg},
    {label:'Daño total en mejor run',val: s.bestRunTotalDmg},
    {label:'Mayor daño tanqueado',   val: s.mostDmgTanked},
    {label:'Mayor daño curado',      val: s.mostDmgHealed},
  ];

  const statsHtml = statsRows.map(r=>
    `<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid #1a1428;font-size:11px">
      <span style="color:#b8a8c8;font-family:'Cinzel',serif;letter-spacing:1px">${r.label}</span>
      <span style="color:#e8b460;font-family:'Cinzel Decorative',cursive;font-size:13px">${r.val}</span>
    </div>`
  ).join('');

  const lbHtml = lb.length === 0 ?
    `<div style="color:#5a5070;font-style:italic;text-align:center;padding:16px">Aún no hay entradas.</div>` :
    lb.slice(0,10).map((e,i)=>
      `<div style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-bottom:1px solid #1a1428;font-size:10px;${e.infiniteMode?'background:#2a0a1422;':''}">
        <span style="font-family:'Cinzel Decorative',cursive;color:${i<3?['#e8b460','#c0c0c0','#cd7f32'][i]:'#5a5070'};font-size:13px;min-width:22px">${i<3?['🥇','🥈','🥉'][i]:`#${i+1}`}</span>
        <div style="flex:1">
          <div style="color:#f0e8de;font-family:'Cinzel',serif;letter-spacing:1px">${e.heroName} <span style="color:#7a5a8a;font-size:9px">— ${e.charName}</span> ${e.infiniteMode?'<span style="color:#9a2f45;font-size:9px">🌑 ∞</span>':''}</div>
          <div style="color:#6a5a7a;font-size:9px">${e.date}</div>
        </div>
        <div style="text-align:right">
          <div style="color:#e8b460;font-family:'Cinzel',serif">${e.encounters} enc.</div>
          <div style="color:#5a5070;font-size:9px">${fmtTime(e.runTime||0)}</div>
        </div>
      </div>`
    ).join('');

  ov.innerHTML = `
    <div style="background:linear-gradient(160deg,#1a1228,#0e0b18);border:1px solid #4a3a5a;border-radius:12px;padding:32px 36px;max-width:540px;width:92%;box-shadow:0 0 60px #c9984a22;max-height:90vh;overflow-y:auto">
      <div style="font-family:'Cinzel Decorative',cursive;font-size:20px;color:#e8b460;text-shadow:0 0 30px #c9984a66;letter-spacing:3px;text-align:center;margin-bottom:6px">✦ Estadísticas ✦</div>
      <div style="font-size:11px;color:#7a6a8a;font-style:italic;text-align:center;margin-bottom:20px">Registro eterno del Cazador</div>

      <div style="margin-bottom:22px">${statsHtml}</div>

      <div style="font-family:'Cinzel',serif;font-size:9px;letter-spacing:3px;color:#a090b8;text-transform:uppercase;border-bottom:1px solid #2a1f3a;padding-bottom:5px;margin-bottom:10px">🏆 Tabla de Clasificación</div>
      <div>${lbHtml}</div>

      <div style="display:flex;justify-content:center;gap:10px;margin-top:24px">
        <button class="btn" onclick="closeStats()" style="font-size:10px;padding:9px 22px">↩ Volver</button>
        <button class="btn btn-wine" onclick="clearAllStats()" style="font-size:10px;padding:9px 22px">🗑 Borrar todo</button>
      </div>
    </div>
  `;

  ov.style.display = 'flex';
  requestAnimationFrame(()=>requestAnimationFrame(()=>ov.style.opacity='1'));
}

function closeStats() {
  const ov = document.getElementById('statsOverlay');
  if(ov) { ov.style.opacity='0'; setTimeout(()=>ov.style.display='none',350); }
}

function clearAllStats() {
  if(confirm('¿Borrar todas las estadísticas y la tabla de clasificación?')) {
    localStorage.removeItem(STATS_KEY);
    localStorage.removeItem(LB_KEY);
    showStats();
  }
}

// ═══════════════════════════════════════════════
//  CUSTOMIZE
// ═══════════════════════════════════════════════
function buildCustom(){
  buildCharDz();buildCardGrid();
  // Enemy customization now includes healer slot
  const enemySlots = [
    {key:'enemy0',  id:'dz-e0', ico:'🐀', lbl:'Normal',  cap:'Tier 1'},
    {key:'enemy1',  id:'dz-e1', ico:'⚔',  lbl:'Élite',   cap:'Tier 2'},
    {key:'enemy2',  id:'dz-e2', ico:'👁',  lbl:'Jefe',    cap:'Tier 3'},
    {key:'enemy_healer', id:'dz-eh', ico:'✚', lbl:'Sanadora', cap:'Healer'},
  ];
  enemySlots.forEach(slot => {
    const dz = document.getElementById(slot.id);
    if(dz && CUSTOM[slot.key] && !dz.querySelector('img')){
      const img=document.createElement('img');img.src=CUSTOM[slot.key];
      dz.prepend(img);dz.classList.add('has-img');
    }
  });
  // Make sure healer dz is in DOM (injected dynamically if not)
  ensureHealerDz();
}

function ensureHealerDz() {
  if(document.getElementById('dz-eh')) return;
  // Find the enemies section and inject healer dz
  const e2Container = document.getElementById('dz-e2');
  if(!e2Container) return;
  const parentFlex = e2Container.parentElement?.parentElement;
  if(!parentFlex) return;
  const wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:5px';
  wrap.innerHTML = `
    <div class="dz" id="dz-eh" style="width:100px;height:132px" ondragover="dzDrag(event,this)" ondragleave="dzLeave(this)" ondrop="dzDrop(event,'enemy_healer',this)">
      <div class="dz-ico">✚</div><div class="dz-lbl">Sanadora</div>
      <input type="file" accept="image/*" onchange="dzFile(event,'enemy_healer',this.parentNode)">
      <button class="dz-clr" onclick="dzClr('enemy_healer',document.getElementById('dz-eh'),event)">✕</button>
    </div>
    <div class="dz-cap">Healer</div>
  `;
  parentFlex.appendChild(wrap);
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
//  CREDITS
// ═══════════════════════════════════════════════
function showCredits(){
  const charName = chById(G.charId)?chById(G.charId).name:'Cazador';
  document.getElementById('creditsChar').textContent=`${G.heroName||charName} — ${charName}`;
  document.getElementById('creditsDiff').textContent=`Dificultad ${G.difficulty}`;
  const el=document.getElementById('s-credits');
  el.querySelectorAll('.cr-line').forEach((l,i)=>{l.style.animationDelay=`${0.4+i*0.35}s`});
  show('credits');
}

// ═══════════════════════════════════════════════
//  DEV MODE
// ═══════════════════════════════════════════════
const DEV = {
  _invincible: false,
  invincible(){this._invincible=!this._invincible;console.log(`%c[DEV] Invencibilidad: ${this._invincible?'✅ ON':'❌ OFF'}`, 'color:#c9984a;font-size:14px;font-weight:bold');},
  winCombat(){if(!G.enemies){console.warn('[DEV] No hay combate activo.');return;}G.enemies.forEach(e=>e.hp=0);combatWin();},
  addGold(n=999){G.gold+=(n|0);if(document.getElementById('goldN'))document.getElementById('goldN').textContent=G.gold;saveG();console.log(`%c[DEV] +${n} oro → Total: ${G.gold}`,'color:#e8b460;font-weight:bold');},
  skipNode(){if(!G.path){console.warn('[DEV] No hay run activo.');return;}if(G.infiniteMode)advanceInfinite();else advance();},
  status(){console.log('%c[DEV] Estado actual:','color:#c9984a;font-weight:bold');console.table({Personaje:G.charId,Héroe:G.heroName,HP:`${G.player?.hp}/${G.player?.maxHp}`,Maná:`${G.player?.mana}/${G.player?.maxMana}`,Oro:G.gold,ModoInfinito:G.infiniteMode,Encuentros:G.infiniteEncounters,Multiplicador:getInfiniteMultiplier()});}
};
const _origEndTurn=endTurn;
window.endTurn=function(){
  if(DEV._invincible&&G.player){const origHp=G.player.hp;_origEndTurn();if(G.player&&G.player.hp<origHp&&G.player.hp>0){G.player.hp=origHp;renderPS&&renderPS();}else if(G.player&&G.player.hp<=0){G.player.hp=G.player.maxHp;renderPS&&renderPS();}}
  else{_origEndTurn();}
};
console.log('%c[NOCTIS DECK] Herramientas de desarrollador → escribe DEV en la consola.','color:#c9984a;font-style:italic');

// ═══════════════════════════════════════════════
//  INJECT STATS BUTTON INTO TITLE + PATCH HTML
// ═══════════════════════════════════════════════
function injectStatsButton() {
  const tBtns = document.querySelector('.t-btns');
  if(!tBtns || document.getElementById('btnStats')) return;
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:8px;margin-top:4px';
  row.innerHTML = `<button class="btn-sm" id="btnStats" onclick="showStats()">📊 Estadísticas</button>`;
  // Insert before the customize row
  const smRow = tBtns.querySelector('div');
  if(smRow) tBtns.insertBefore(row, smRow);
  else tBtns.appendChild(row);
}

// ═══════════════════════════════════════════════
//  MOBILE ENHANCEMENTS
// ═══════════════════════════════════════════════
const isMobile = () => window.innerWidth <= 640;

// ─── LOG OVERLAY BUTTON (mobile only) ──────────
// Shows the combat log in a bottom sheet since p-right is hidden
function injectMobileLogBtn() {
  if(!isMobile()) return;
  if(document.getElementById('mobileLogBtn')) return;

  // ── Portrait button (left side) ──────────────
  const portBtn = document.createElement('button');
  portBtn.id = 'mobilePortBtn';
  portBtn.innerHTML = '👤';
  portBtn.style.cssText = `
    position:fixed;bottom:68px;left:12px;
    width:44px;height:44px;border-radius:50%;
    background:linear-gradient(135deg,#1a1228,#0e0b18);
    border:1px solid var(--border);color:var(--fog);
    font-size:18px;cursor:pointer;z-index:500;
    box-shadow:0 0 14px #4a2a6a44;
    display:none;align-items:center;justify-content:center;
    transition:all .2s;overflow:hidden;padding:0;
  `;
  portBtn.onclick = toggleMobilePortrait;
  document.body.appendChild(portBtn);

  // Portrait full-screen overlay
  const portOverlay = document.createElement('div');
  portOverlay.id = 'mobilePortOverlay';
  portOverlay.style.cssText = `
    position:fixed;inset:0;z-index:700;
    background:#080610ee;
    display:none;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:16px;
  `;
  portOverlay.innerHTML = `
    <div id="mobilePortContent" style="
      width:min(340px,88vw);
      border:1px solid var(--gold);
      border-radius:12px;
      overflow:hidden;
      box-shadow:0 0 60px #c9984a44;
      aspect-ratio:3/4;
      background:#0e0b18;
      display:flex;align-items:center;justify-content:center;
    "></div>
    <div id="mobilePortName" style="font-family:'Cinzel Decorative',cursive;font-size:16px;color:var(--gold);letter-spacing:3px;text-shadow:0 0 20px #c9984a88"></div>
    <div id="mobilePortPassive" style="font-size:11px;color:var(--dim);font-style:italic;max-width:300px;text-align:center;line-height:1.6;padding:0 20px"></div>
    <div id="mobilePortStats" style="display:flex;gap:16px;font-size:12px;color:var(--fog);font-family:'Cinzel',serif"></div>
    <button class="btn-sm" onclick="toggleMobilePortrait()" style="margin-top:8px">Cerrar</button>
  `;
  portOverlay.addEventListener('click', e=>{ if(e.target===portOverlay) toggleMobilePortrait(); });
  document.body.appendChild(portOverlay);

  // ── Log button (right side) ───────────────────
  const btn = document.createElement('button');
  btn.id = 'mobileLogBtn';
  btn.innerHTML = '📜';
  btn.style.cssText = `
    position:fixed;bottom:68px;right:12px;
    width:44px;height:44px;border-radius:50%;
    background:linear-gradient(135deg,#1a1228,#0e0b18);
    border:1px solid var(--gold);color:var(--gold);
    font-size:20px;cursor:pointer;z-index:500;
    box-shadow:0 0 14px #c9984a44;
    display:none;align-items:center;justify-content:center;
    transition:all .2s;
  `;
  btn.onclick = toggleMobileLog;
  document.body.appendChild(btn);

  // Bottom sheet overlay
  const sheet = document.createElement('div');
  sheet.id = 'mobileLogSheet';
  sheet.style.cssText = `
    position:fixed;bottom:0;left:0;right:0;
    background:linear-gradient(0deg,#0e0b18,#13101e);
    border-top:1px solid var(--border);
    border-radius:16px 16px 0 0;
    padding:16px 16px 24px;
    z-index:600;
    max-height:55vh;
    overflow-y:auto;
    transform:translateY(100%);
    transition:transform .32s cubic-bezier(.32,1,.28,1);
    display:block;
  `;
  sheet.innerHTML = `
    <div style="width:36px;height:4px;background:var(--border);border-radius:2px;margin:0 auto 14px;"></div>
    <div style="font-family:'Cinzel',serif;font-size:9px;letter-spacing:3px;color:var(--dim);text-transform:uppercase;border-bottom:1px solid var(--border);padding-bottom:6px;margin-bottom:10px">📜 Registro de Combate</div>
    <div id="mobileLogContent" style="font-size:12px;color:var(--fog);display:flex;flex-direction:column;gap:4px;"></div>
    <div style="margin-top:12px;text-align:center">
      <button class="btn-sm" onclick="toggleMobileLog()">Cerrar</button>
    </div>
  `;
  document.body.appendChild(sheet);

  // Backdrop
  const bd = document.createElement('div');
  bd.id = 'mobileLogBackdrop';
  bd.style.cssText = 'position:fixed;inset:0;background:#00000066;z-index:595;display:none;';
  bd.onclick = toggleMobileLog;
  document.body.appendChild(bd);
}

function toggleMobileLog() {
  const sheet = document.getElementById('mobileLogSheet');
  const bd    = document.getElementById('mobileLogBackdrop');
  const log   = document.getElementById('clog');
  if(!sheet) return;

  const open = sheet.style.transform === 'translateY(0px)' || sheet.style.transform === 'translateY(0%)';
  if(!open) {
    // Sync content from main log
    const content = document.getElementById('mobileLogContent');
    if(content && log) content.innerHTML = log.innerHTML;
    sheet.style.transform = 'translateY(0)';
    bd.style.display = 'block';
  } else {
    sheet.style.transform = 'translateY(100%)';
    bd.style.display = 'none';
  }
}

function toggleMobilePortrait(){
  const ov = document.getElementById('mobilePortOverlay');
  if(!ov) return;
  const open = ov.style.display === 'flex';
  if(!open){
    // Populate with current character data
    const ch = chById(G.charId);
    const p  = G.player;
    const content = document.getElementById('mobilePortContent');
    const img = ch ? getImg(ch.imgKey) : null;
    if(content){
      if(img) content.innerHTML = `<img src="${img}" style="width:100%;height:100%;object-fit:cover">`;
      else if(ch) content.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;transform:scale(1.8)">${ch.svg}</div>`;
    }
    const nameEl = document.getElementById('mobilePortName');
    if(nameEl && ch) nameEl.textContent = G.heroName || ch.name;
    const passEl = document.getElementById('mobilePortPassive');
    if(passEl && ch) passEl.textContent = ch.passive;
    const statsEl = document.getElementById('mobilePortStats');
    if(statsEl && p){
      statsEl.innerHTML = `
        <span>❤ ${p.hp}/${p.maxHp}</span>
        <span>◆ ${p.mana}/${p.maxMana}</span>
        <span>🪙 ${G.gold}</span>
        ${p.block?`<span>🛡 ${p.block}</span>`:''}
        ${p.bleed?`<span>🩸 ${p.bleed}</span>`:''}
        ${p.poison?`<span>☠ ${p.poison}</span>`:''}
      `;
    }
    // Update portrait button image
    const portBtn = document.getElementById('mobilePortBtn');
    if(portBtn && img){
      portBtn.innerHTML = `<img src="${img}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
    }
    ov.style.display='flex';
    ov.style.opacity='0';
    requestAnimationFrame(()=>{ ov.style.transition='opacity .25s'; ov.style.opacity='1'; });
  } else {
    ov.style.opacity='0';
    setTimeout(()=>{ ov.style.display='none'; },250);
  }
}

function showMobileLogBtn(visible) {
  const btn  = document.getElementById('mobileLogBtn');
  const pbtn = document.getElementById('mobilePortBtn');
  if(btn)  btn.style.display  = visible ? 'flex' : 'none';
  if(pbtn) pbtn.style.display = visible ? 'flex' : 'none';
  if(!visible){
    const ov = document.getElementById('mobilePortOverlay');
    if(ov) { ov.style.display='none'; }
  }
}

// ─── RELICS MOBILE OVERLAY ─────────────────────
// On mobile, relics are hidden from left panel; show them via tapping gold area
function injectMobileRelicsIndicator() {
  if(!isMobile()) return;
  // Append a small relics peek to the top bar when in combat
  // handled by CSS showing gold row compact
}

// ─── SWIPE TO DISMISS OVERLAYS ─────────────────
function addSwipeHandlers() {
  let startY = 0;
  document.addEventListener('touchstart', e => { startY = e.touches[0].clientY; }, {passive:true});
  document.addEventListener('touchend', e => {
    const dy = e.changedTouches[0].clientY - startY;
    const sheet = document.getElementById('mobileLogSheet');
    if(sheet && dy > 60 && sheet.style.transform === 'translateY(0)') {
      toggleMobileLog();
    }
  }, {passive:true});
}

// ─── PATCH show() TO SHOW/HIDE MOBILE LOG BTN ──
const _origShow = show;
window.show = function(id) {
  _origShow(id);
  showMobileLogBtn(id === 'game');
  // Close log sheet when leaving combat
  if(id !== 'game') {
    const sheet = document.getElementById('mobileLogSheet');
    const bd    = document.getElementById('mobileLogBackdrop');
    if(sheet) sheet.style.transform = 'translateY(100%)';
    if(bd)    bd.style.display = 'none';
  }
};

// ─── PREVENT DOUBLE-TAP ZOOM ON BUTTONS ────────
function preventDoubleTapZoom() {
  let lastTap = 0;
  document.addEventListener('touchend', e => {
    const now = Date.now();
    if(now - lastTap < 300) e.preventDefault();
    lastTap = now;
  }, {passive:false});
}

// ─── VIEWPORT HEIGHT FIX (100vh on mobile) ─────
function fixMobileVh() {
  const setVh = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  };
  setVh();
  window.addEventListener('resize', setVh);
  window.addEventListener('orientationchange', () => setTimeout(setVh, 200));
}

// ─── INIT MOBILE ───────────────────────────────
function initMobile() {
  if(!isMobile()) return;
  injectMobileLogBtn();
  addSwipeHandlers();
  preventDoubleTapZoom();
  fixMobileVh();
  // Patch body height to use real viewport height
  document.body.style.height = '100dvh';
  document.getElementById('app').style.height = '100dvh';
}

// ═══════════════════════════════════════════════
//  INJECT STATS BUTTON INTO TITLE + PATCH HTML
// ═══════════════════════════════════════════════
function injectStatsButton() {
  const tBtns = document.querySelector('.t-btns');
  if(!tBtns || document.getElementById('btnStats')) return;
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:8px;margin-top:4px';
  row.innerHTML = `<button class="btn-sm" id="btnStats" onclick="showStats()">📊 Estadísticas</button>`;
  const smRow = tBtns.querySelector('div');
  if(smRow) tBtns.insertBefore(row, smRow);
  else tBtns.appendChild(row);
}

// ═══════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════
loadCustom();
updateTitle();
injectStatsButton();
initMobile();

