// ═══════════════════════════════════════════════
//  MUSIC SYSTEM
//  Pon tu canción en: resources/music/background.mp3
//  (también acepta .ogg y .wav)
// ═══════════════════════════════════════════════
const MUSIC_SRC = 'resources/music/background.mp3';
let _bgAudio = null;
function initMusic() {
  if(_bgAudio) return;
  _bgAudio = new Audio(MUSIC_SRC);
  _bgAudio.loop = true;
  _bgAudio.volume = getMusicVolume();
  _bgAudio.play().catch(()=>{});
}
function getMusicVolume() {
  try { const v = parseFloat(localStorage.getItem('noctis_music_vol')); return isNaN(v)?0.5:v; } catch(e){ return 0.5; }
}
function setMusicVolume(v) {
  try { localStorage.setItem('noctis_music_vol', v); } catch(e){}
  if(_bgAudio) _bgAudio.volume = v;
}
function getSfxVolume() {
  try { const v = parseFloat(localStorage.getItem('noctis_sfx_vol')); return isNaN(v)?0.6:v; } catch(e){ return 0.6; }
}
function setSfxVolume(v) {
  try { localStorage.setItem('noctis_sfx_vol', v); } catch(e){}
}
function getDoubleConfirm() {
  try { const cfg = loadSettings(); return cfg.doubleConfirm === true; } catch(e){ return false; }
}
function setDoubleConfirm(v) {
  const cfg = loadSettings(); cfg.doubleConfirm = v; saveSettings(cfg);
}
// Arrancar música al primer gesto del usuario
document.addEventListener('click', ()=>{ initMusic(); }, { once:true });

// ═══════════════════════════════════════════════
//  UI SOUND SYSTEM
//  ── Rutas de sonido — edita aquí para cambiarlos ──
//
//  UI / menús / fin de turno:
const UI_SOUND_SRC       = 'resources/music/ui_click.mp3';
//  Enemigo cuando muere:
const SFX_ENEMY_DEATH    = 'resources/music/sfx_enemy_death.mp3';
//  Cuando juegas una carta:
const SFX_PLAY_CARD      = 'resources/music/sfx_play_card.mp3';
//  Cuando empieza tu turno:
const SFX_PLAYER_TURN    = 'resources/music/sfx_player_turn.mp3';
//  Cuando abres un cofre:
const SFX_CHEST_OPEN     = 'resources/music/sfx_chest_open.mp3';
//  Cuando entras en la tienda:
const SFX_SHOP_ENTER     = 'resources/music/sfx_shop_enter.mp3';
//  Cuando el jugador obtiene escudo:
const SFX_BLOCK          = 'resources/music/sfx_block.mp3';
//  Cuando el jugador golpea a un enemigo:
const SFX_PLAYER_ATTACK  = 'resources/music/sfx_player_attack.mp3';
//  Cuando el jugador muere:
const SFX_PLAYER_DEATH   = 'resources/music/sfx_player_death.mp3';
//  Cuando recibes un golpe:
const SFX_PLAYER_HIT     = 'resources/music/sfx_player_hit.mp3';
//  Cuando una carta cura al jugador:
const SFX_HEAL           = 'resources/music/sfx_heal.mp3';
//
// ════════════════════════════════════════════════
function _playSfx(src) {
  try {
    const s = new Audio(src);
    s.volume = getSfxVolume();
    s.play().catch(()=>{});
  } catch(e) {}
}
function playUI()          { _playSfx(UI_SOUND_SRC); }
function sfxEnemyDeath()   { _playSfx(SFX_ENEMY_DEATH); }
function sfxPlayCard()     { _playSfx(SFX_PLAY_CARD); }
function sfxPlayerTurn()   { _playSfx(SFX_PLAYER_TURN); }
function sfxChestOpen()    { _playSfx(SFX_CHEST_OPEN); }
function sfxShopEnter()    { _playSfx(SFX_SHOP_ENTER); }
function sfxPlayerHit()    { _playSfx(SFX_PLAYER_HIT); }
function sfxPlayerAttack() { _playSfx(SFX_PLAYER_ATTACK); }
function sfxPlayerDeath()  { _playSfx(SFX_PLAYER_DEATH); }
function sfxBlock()        { _playSfx(SFX_BLOCK); }
function sfxHeal()         { _playSfx(SFX_HEAL); }

// Deseleccionar carta al pulsar fuera de la mano
document.addEventListener('click', e => {
  if(!e.target.closest('.c-slot')) {
    document.querySelectorAll('.c-slot.card-selected').forEach(el => {
      el.classList.remove('card-selected');
      el.style.transform = el._baseTransform || '';
    });
  }
});


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
  // PISTOLERO — coloca tu imagen en resources/personajes/pistolero.png
  char_pistolero:  'resources/personajes/pistolero.png',
  enemy0:          'resources/enemigos/enemigo1.png',
  enemy1:          'resources/enemigos/enemigo2.png',
  enemy2:          'resources/enemigos/enemigo3.png',
  enemy_healer:    'resources/enemigos/healer.png',
  // ── Enemigos Acto 2 ──
  // Coloca tus imágenes en resources/enemigos/
  enemy_vampiro:        'resources/enemigos/vampiro.png',
  enemy_condesa:        'resources/enemigos/condesa.png',
  enemy_guardian:       'resources/enemigos/guardian.png',
  enemy_murcielago:     'resources/enemigos/murcielago.png',
  enemy_baron_hemlock:  'resources/enemigos/baron_hemlock.png',
  card_strike:     'resources/cartas/golpesombrio.jpg',
  card_slash:      'resources/cartas/tajocruento.jpg',
  card_lance:      'resources/cartas/lanzaniebla.png',
  card_double:     'resources/cartas/Golpe doble.png',
  card_shield:     'resources/cartas/escudoarcano.jpg',
  card_mantle:     'resources/cartas/manto de sombras.jpg',
  card_ritual:     'resources/cartas/ritual of blood.jpg',
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
  // ── NPCs / Eventos de diálogo ──
  npc_mendigo:       'resources/npc/mendigo.jpg',
  npc_comerciante:   'resources/npc/comerciante.jpg',
  npc_sacerdote:     'resources/npc/sacerdote.jpg',
  npc_noble:         'resources/npc/noble.jpg',
  npc_viuda:         'resources/npc/viuda.jpg',
  npc_soldado:       'resources/npc/soldado.jpg',
  npc_nino:          'resources/npc/nino.jpg',
  npc_alquimista:    'resources/npc/alquimista.jpg',
  npc_medico:        'resources/npc/medico.jpg',
  npc_ladron:        'resources/npc/ladron.jpg',
  npc_profeta:       'resources/npc/profeta.jpg',
  npc_herrero:       'resources/npc/herrero.jpg',
  npc_investigador:  'resources/npc/investigador.jpg',
  npc_superviviente: 'resources/npc/superviviente.jpg',
  npc_figura:        'resources/npc/figura.jpg',
  

};
// ═══════════════════════════════════════════════
//  IMÁGENES ALTERNATIVAS (no generadas por IA)
//  Cambia estas rutas por tus propias imágenes.
//  Se usan cuando el jugador desactiva "Imágenes IA" en Ajustes.
// ═══════════════════════════════════════════════
const ALT_IMGS = {
  // ── Personajes ──
  char_cazador:    'resources/alt/personajes/cazador.png',
  char_hechicera:  'resources/alt/personajes/hechicera.png',
  char_espectro:   'resources/alt/personajes/espectro.png',
  char_pistolero:  'resources/alt/personajes/pistolero.png',
  // ── Enemigos ──
  enemy0:          'resources/alt/enemigos/enemigo1.png',
  enemy1:          'resources/alt/enemigos/enemigo2.png',
  enemy2:          'resources/alt/enemigos/enemigo3.png',
  enemy_healer:    'resources/alt/enemigos/healer.png',
  // ── Enemigos Acto 2 (imágenes alternativas sin IA) ──
  enemy_vampiro:        'resources/alt/enemigos/vampiro.png',
  enemy_condesa:        'resources/alt/enemigos/condesa.png',
  enemy_guardian:       'resources/alt/enemigos/guardian.png',
  enemy_murcielago:     'resources/alt/enemigos/murcielago.png',
  enemy_baron_hemlock:  'resources/alt/enemigos/baron_hemlock.png',
  // ── Cartas ──
  card_strike:     'resources/alt/cartas/strike.png',
  card_slash:      'resources/alt/cartas/slash.png',
  card_lance:      'resources/alt/cartas/lance.png',
  card_double:     'resources/alt/cartas/double.png',
  card_shield:     'resources/alt/cartas/shield.png',
  card_mantle:     'resources/alt/cartas/mantle.png',
  card_ritual:     'resources/alt/cartas/ritual.png',
  card_cloud:      'resources/alt/cartas/cloud.png',
  card_smite:      'resources/alt/cartas/smite.png',
  card_retaliate:  'resources/alt/cartas/retaliate.png',
  card_mend:       'resources/alt/cartas/mend.png',
  card_bullet:     'resources/alt/cartas/bullet.png',
  card_quickdraw:  'resources/alt/cartas/quickdraw.png',
  card_headshot:   'resources/alt/cartas/headshot.png',
  card_fanfire:    'resources/alt/cartas/fanfire.png',
  card_smokebomb:  'resources/alt/cartas/smokebomb.png',
  // ── NPCs / Eventos de diálogo ──
  npc_mendigo:       'resources/alt/npc/mendigo.png',
  npc_comerciante:   'resources/alt/npc/comerciante.png',
  npc_sacerdote:     'resources/alt/npc/sacerdote.png',
  npc_noble:         'resources/alt/npc/noble.png',
  npc_viuda:         'resources/alt/npc/viuda.png',
  npc_soldado:       'resources/alt/npc/soldado.png',
  npc_nino:          'resources/alt/npc/nino.png',
  npc_alquimista:    'resources/alt/npc/alquimista.png',
  npc_medico:        'resources/alt/npc/medico.png',
  npc_ladron:        'resources/alt/npc/ladron.png',
  npc_profeta:       'resources/alt/npc/profeta.png',
  npc_herrero:       'resources/alt/npc/herrero.png',
  npc_investigador:  'resources/alt/npc/investigador.png',
  npc_superviviente: 'resources/alt/npc/superviviente.png',
  npc_figura:        'resources/alt/npc/figura.png',
  card_nightmare: 'resources/alt/cartas/nightmare.png',
  card_bloodpact: 'resources/alt/cartas/blood.png',
};

// ── Imágenes alternativas para reliquias (no-IA) ──
const ALT_RELIC_IMGS = {
  corazon_eterno:          'resources/alt/reliquias/corazon_eterno.png',
  corazon_eterno_locked:   'resources/alt/reliquias/corazon_eterno_locked.png',
  tomo_envenenado:         'resources/alt/reliquias/tomo_envenenado.png',
  tomo_envenenado_locked:  'resources/alt/reliquias/tomo_envenenado_locked.png',
  espejo_espectral:        'resources/alt/reliquias/espejo_espectral.png',
  espejo_espectral_locked: 'resources/alt/reliquias/espejo_espectral_locked.png',
  cilindro_veloz:          'resources/alt/reliquias/cilindro_veloz.png',
  cilindro_veloz_locked:   'resources/alt/reliquias/cilindro_veloz_locked.png',
  amuleto_carmesi:         'resources/alt/reliquias/amuleto_carmesi.png',
  amuleto_carmesi_locked:  'resources/alt/reliquias/amuleto_carmesi_locked.png',
  corona_voraz:            'resources/alt/reliquias/corona_voraz.png',
  corona_voraz_locked:     'resources/alt/reliquias/corona_voraz_locked.png',
  orbe_eterno:             'resources/alt/reliquias/orbe_eterno.png',
  orbe_eterno_locked:      'resources/alt/reliquias/orbe_eterno_locked.png',
};

// ═══════════════════════════════════════════════
//  SETTINGS — clave localStorage
// ═══════════════════════════════════════════════
const SETTINGS_KEY = 'noctis_cfg_v1';

function loadSettings() {
  try { return JSON.parse(localStorage.getItem(SETTINGS_KEY) || 'null') || { aiImages: true }; }
  catch(e) { return { aiImages: true }; }
}
function saveSettings(s) {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch(e) {}
}
function isAiImages() { return loadSettings().aiImages !== false; }

// Devuelve la imagen correcta según el ajuste activo
function getRelicImg(key) {
  if (!isAiImages()) return ALT_RELIC_IMGS[key] || null;
  return RELIC_IMGS[key] || null;
}

let CUSTOM={};
function getImg(k){
  // Las imágenes personalizadas (CUSTOM) siempre tienen prioridad
  if(CUSTOM[k]) return CUSTOM[k];
  // Si el jugador desactivó imágenes IA, usar las alternativas
  if(!isAiImages() && ALT_IMGS[k]) return ALT_IMGS[k];
  return DEFAULT_IMGS[k]||null;
}

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
//  Pesos de rareza: base common 20% · uncommon 48% · rare 24% · legendary 8%
//  Élite: common 10% · uncommon 40% · rare 35% · legendary 15%
//  Boss: common 5% · uncommon 28% · rare 38% · legendary 29%
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
  {id:'double',   name:'Golpe Doble',      type:'attack', rarity:'uncommon',  cost:2,dmg:8,  blk:0, bleed:0,psn:0,desc:'Golpea dos veces.',dbl:true}, // ✏ CAMBIO 1: dmg 5→8 (bufeo)
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
  {id:'bloodpact',name:'Pacto de Sangre',  type:'skill',  rarity:'legendary', cost:2,dmg:0,  blk:0, bleed:3,psn:0,heal:10,desc:'Cura con la sangre del enemigo.'}, // ✏ CAMBIO 3: bleed 6→3, heal 14→10 (nerf)
  {id:'nightmare',name:'Pesadilla Eterna', type:'attack', rarity:'legendary', cost:3,dmg:9,  blk:0, bleed:3,psn:3,desc:'Inflige todos los males.'}, // ✏ CAMBIO 2: dmg 14→9 (nerf)
];

// Rareza → peso base y elite
// Pool filtrada (sin strike/shield/bullet): 3 comunes · 6 infrecuentes · 3 raras · 3 legendarias
// Pesos ajustados para dar variedad real en encuentros normales
const RARITY_WEIGHTS = {
  common:    {base:20, elite:10, boss:5 },
  uncommon:  {base:48, elite:40, boss:28},
  rare:      {base:24, elite:35, boss:38},
  legendary: {base:8,  elite:15, boss:29},
};
const RARITY_COLORS = {
  common:'#a0a0b0', uncommon:'#60aaee', rare:'#cc80ff', legendary:'#ffcc44'
};
const RARITY_LABELS = {
  common:'COMÚN', uncommon:'INFREC.', rare:'RARA', legendary:'LEGENDARIA'
};

// Weighted random card pick for rewards
function pickRewardCards(count, tier) {
  const tierKey = tier===2?'boss':tier===1?'elite':'base';
  const pool = CARDS.filter(c=>!['strike','shield','bullet'].includes(c.id));

  // Weighted random sin repetición: para cada selección hacemos una tirada real
  // en base a los pesos, así todas las rarezas tienen su probabilidad exacta
  function weightedPick(remaining) {
    const totalW = remaining.reduce((sum, c) => sum + (RARITY_WEIGHTS[c.rarity]?.[tierKey] || 5), 0);
    let r = Math.random() * totalW;
    for(const c of remaining) {
      r -= (RARITY_WEIGHTS[c.rarity]?.[tierKey] || 5);
      if(r <= 0) return c;
    }
    return remaining[remaining.length - 1];
  }

  const available = [...pool];
  const picked = [];
  while(picked.length < count && available.length > 0) {
    const chosen = weightedPick(available);
    picked.push(chosen);
    // Eliminar del pool para no repetir
    const idx = available.indexOf(chosen);
    if(idx >= 0) available.splice(idx, 1);
  }
  return picked;
}

// ═══════════════════════════════════════════════
//  ENEMIES
// ═══════════════════════════════════════════════

// Acto 1 — enemigos originales
const ENM_TEMPLATES = {
  normal: [
    {name:'Rata Espectral',    hp:18,dmg:5, bleed:0,psn:0,rw:6},
    {name:'Mendigo Maldito',   hp:16,dmg:6, bleed:0,psn:0,rw:6},
    {name:'Sombra Errante',    hp:20,dmg:4, bleed:1,psn:0,rw:7},
    {name:'Lacayo Corrupto',   hp:17,dmg:5, bleed:0,psn:1,rw:6},
    {name:'Espectro Callejero',hp:15,dmg:7, bleed:0,psn:0,rw:7},
  ],
  elite: [
    {name:'Guardia Corrompido',hp:38,dmg:11,bleed:0,psn:0,rw:18},
    {name:'Heraldo de Niebla', hp:34,dmg:12,bleed:0,psn:2,rw:20},
    {name:'Vampiro Menor',     hp:40,dmg:10,bleed:3,psn:0,rw:18},
  ],
  // HEALER — aparece en grupos normales y elite de cualquier acto, nunca en boss
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

// ── ACTO 2 — Nuevos enemigos ──────────────────────────────────────────────
// Imagen: resources/enemigos/vampiro.png
// Al matar a otros enemigos recupera mucha vida. Roba vida al atacar.
const ACT2_VAMPIRO = {
  name:'Vampiro Sanguinario', hp:55, dmg:12, bleed:0, psn:0, rw:22,
  imgKey:'enemy_vampiro', tier:1,
  isVampiro: true,
  lifestealOnAttack: 6,   // HP que roba al jugador al atacar
  reviveHealOnKill: 22,   // HP que recupera cuando muere un aliado
};

// Imagen: resources/enemigos/condesa.png
// Cambia de modo cada turno: ataque → defensa → veneno
const ACT2_CONDESA = {
  name:'Condesa sin Rostro', hp:50, dmg:13, bleed:0, psn:0, rw:22,
  imgKey:'enemy_condesa', tier:1,
  isCondesa: true,
  condensaTurn: 0,  // 0=ataque, 1=defensa, 2=veneno
  shieldPerTurn: 10,
  poisonPerTurn: 3,
};

// Imagen: resources/enemigos/guardian.png
// Reduce el daño del jugador y oculta a un aliado el siguiente turno
const ACT2_GUARDIAN = {
  name:'Guardián del Candil', hp:58, dmg:10, bleed:0, psn:0, rw:22,
  imgKey:'enemy_guardian', tier:1,
  isGuardian: true,
  damageReductionStacks: 0, // se acumula: cada 2 turnos reduce 2 de daño del jugador
  hiddenAllyIdx: null,
};

// Imagen: resources/enemigos/murcielago.png
// Solo puede atacar al jugador. Tras 5 turnos se convierte en vampiro.
function makeMurcielago(mult) {
  return {
    name:'Murciélago de Hemlock', hp: Math.round(20 * mult), maxHp: Math.round(20 * mult),
    dmg: Math.round(7 * mult), bleed:0, psn:0, block:0, poison:0,
    imgKey:'enemy_murcielago', tier:1,
    dead:false,
    isMurcielago: true,
    murcielagoTurns: 0, // se evoluciona a vampiro a los 5 turnos
    rw: 10,
  };
}

// Imagen: resources/enemigos/baron_hemlock.png
// Boss Acto 2: puede invocar murciélagos (máx 2), curarse y atacar.
const ACT2_BARON = {
  name:'Barón Hemlock', hp:130, dmg:16, bleed:0, psn:0, rw:80,
  imgKey:'enemy_baron_hemlock', tier:2,
  isBaron: true,
  baronPhase: 0,       // contador de acciones del barón
  lastSummonTurn: -99, // turno del último summón (cooldown 5 turnos)
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
  // Multiplicador base: ×1.5 por cada acto completado en modo normal
  const actMult = (!infiniteMultiplier && G.path) ? Math.pow(1.5, G.path.act || 0) : 1;
  const mult = (infiniteMultiplier || 1) * actMult;
  const currentAct = (G.path && G.path.act) || 0;
  const rnd = t => ENM_TEMPLATES[t][Math.floor(Math.random()*ENM_TEMPLATES[t].length)];
  const mkE = (tpl, ti) => ({
    ...tpl,
    hp: Math.round(tpl.hp * mult),
    maxHp: Math.round(tpl.hp * mult),
    dmg: Math.round(tpl.dmg * mult),
    block:0, bleed:0, poison:0, tier:ti, dead:false,
    healAmt: tpl.healAmt ? Math.round(tpl.healAmt * mult) : 0,
    shieldAmt: tpl.shieldAmt ? Math.round(tpl.shieldAmt * mult) : 0,
    healerTurn: 0,
    imgKey: tpl.imgKey || null,
  });

  // 20% chance to include a healer in normal/elite groups (any act)
  const includeHealer = (tier < 2) && Math.random() < 0.20;

  // ── ACTO 2 ────────────────────────────────────
  if(currentAct === 1) {
    return buildAct2EnemyGroup(tier, mult, includeHealer);
  }

  // ── ACTO 1 y 3 (modo estándar) ────────────────
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

// ── Construye grupos de enemigos del Acto 2 ──────────────────────────────
function buildAct2EnemyGroup(tier, mult, includeHealer) {
  const mkAct2 = (tpl) => ({
    ...tpl,
    hp: Math.round(tpl.hp * mult),
    maxHp: Math.round(tpl.hp * mult),
    dmg: Math.round(tpl.dmg * mult),
    block:0, bleed:0, poison:0, dead:false,
    isVampiro: tpl.isVampiro || false,
    isCondesa: tpl.isCondesa || false,
    isGuardian: tpl.isGuardian || false,
    lifestealOnAttack: tpl.lifestealOnAttack ? Math.round(tpl.lifestealOnAttack * mult) : 0,
    reviveHealOnKill: tpl.reviveHealOnKill ? Math.round(tpl.reviveHealOnKill * mult) : 0,
    condensaTurn: 0,
    shieldPerTurn: tpl.shieldPerTurn ? Math.round(tpl.shieldPerTurn * mult) : 0,
    poisonPerTurn: tpl.poisonPerTurn || 0,
    damageReductionStacks: 0,
    hiddenAllyIdx: null,
    baronPhase: 0,
    lastSummonTurn: -99,
    _hidden: false,
  });

  const mkRndHealer = () => {
    const h = ENM_TEMPLATES.healer[Math.floor(Math.random()*ENM_TEMPLATES.healer.length)];
    return {
      ...h,
      hp: Math.round(h.hp * mult), maxHp: Math.round(h.hp * mult),
      dmg: Math.round(h.dmg * mult), block:0, bleed:0, poison:0, tier:0, dead:false,
      healAmt: Math.round(h.healAmt * mult), shieldAmt: Math.round(h.shieldAmt * mult),
      healerTurn: 0, imgKey: 'enemy_healer', _hidden: false,
    };
  };

  if(tier === 2) {
    return [mkAct2(ACT2_BARON)];
  }

  // ── Grupos de 3 miembros siempre ────────────────────────────────────────
  // Los tipos base del Acto 2: V=Vampiro, C=Condesa, G=Guardián
  // Todas las combinaciones posibles de 3 con repetición:
  // VVV, CCC, GGG, VVC, VVG, CCG, VCC, GGV, GGC, VCG
  const TEMPLATES = [ACT2_VAMPIRO, ACT2_CONDESA, ACT2_GUARDIAN];
  const COMBOS = [
    [0,0,0], [1,1,1], [2,2,2],          // 3 iguales
    [0,0,1], [0,0,2], [1,1,0],          // 2+1
    [1,1,2], [2,2,0], [2,2,1],          // 2+1 variantes
    [0,1,2],                             // 1 de cada
  ];

  let group;
  if(includeHealer) {
    // Con healer: 2 enemigos Acto 2 + 1 healer
    const combo = COMBOS[Math.floor(Math.random() * COMBOS.length)];
    group = [mkAct2(TEMPLATES[combo[0]]), mkAct2(TEMPLATES[combo[1]]), mkRndHealer()];
  } else {
    // Sin healer: 3 enemigos Acto 2 de combinación aleatoria
    const combo = COMBOS[Math.floor(Math.random() * COMBOS.length)];
    group = combo.map(i => mkAct2(TEMPLATES[i]));
  }

  return group;
}


// ═══════════════════════════════════════════════
//  RELICS SYSTEM
//  ──────────────────────────────────────────────
//  Imágenes: cambia las rutas en RELIC_IMGS para
//  personalizar el arte de cada reliquia.
//  NO existe interfaz de usuario para cambiarlas.
// ═══════════════════════════════════════════════

// ── Rutas de imagen (edita aquí para cambiar arte) ──
// Para cambiar la imagen BLOQUEADA de cada reliquia: añade la clave con sufijo _locked
// Ej: corazon_eterno_locked: 'resources/reliquias/corazon_eterno_locked.png'
// Si no hay imagen _locked se usa el emoji oscurecido por defecto
const RELIC_IMGS = {
  corazon_eterno:          'resources/reliquias/corazon_eterno.png',
  corazon_eterno_locked:   '',   // ← pon aquí la ruta de imagen bloqueada o deja '' para usar el emoji
  tomo_envenenado:         'resources/reliquias/tomo_envenenado.png',
  tomo_envenenado_locked:  '',
  espejo_espectral:        'resources/reliquias/espejo_espectral.png',
  espejo_espectral_locked: '',
  cilindro_veloz:          'resources/reliquias/cilindro_veloz.png',
  cilindro_veloz_locked:   '',
  amuleto_carmesi:         'resources/reliquias/amuleto_carmesi.png',
  amuleto_carmesi_locked:  '',
  corona_voraz:            'resources/reliquias/corona_voraz.png',
  corona_voraz_locked:     '',
  orbe_eterno:             'resources/reliquias/orbe_eterno.png',
  orbe_eterno_locked:      '',
};

// ── Definición de reliquias ──
const RELICS = [
  // ─── DESBLOQUEABLES CON PERSONAJE ──────────────────────────────────────
  {
    id:'corazon_eterno', name:'Corazón Eterno', icon:'❤', color:'#c03050', rarity:'rare',
    unlockChar:'cazador', unlockDesc:'Completa el juego con El Cazador',
    desc:'Al inicio de cada combate recuperas 6 HP. Tu HP máximo aumenta en 10.',
    effect:{ startCombatHeal:6, maxHpBonus:10 },
  },
  {
    id:'tomo_envenenado', name:'Tomo Envenenado', icon:'📖', color:'#5aaa30', rarity:'rare',
    unlockChar:'hechicera', unlockDesc:'Completa el juego con La Hechicera',
    desc:'Las cartas de veneno aplican +1 veneno adicional. El veneno no decae al final del turno.',
    effect:{ poisonBonus:1, poisonNoDecay:true },
  },
  {
    id:'espejo_espectral', name:'Espejo Espectral', icon:'🪞', color:'#4a8aaa', rarity:'rare',
    unlockChar:'espectro', unlockDesc:'Completa el juego con El Espectro',
    desc:'El primer golpe de cada combate es ignorado (cualquier personaje). Esquivar un golpe otorga 4 bloqueo.',
    effect:{ firstHitBlock:true, firstHitBlockBonus:4 },
  },
  {
    id:'cilindro_veloz', name:'Cilindro Veloz', icon:'🔫', color:'#d4804a', rarity:'rare',
    unlockChar:'pistolero', unlockDesc:'Completa el juego con El Pistolero',
    desc:'Cada 2 cartas de ataque cargan el Cargador (antes 3). Ganas +1 maná al inicio de cada combate.',
    effect:{ gunslingerThreshold:2, startCombatMana:1 },
  },
  // ─── RELIQUIAS ESPECIALES (desbloqueo más difícil) ──────────────────────
  {
    id:'amuleto_carmesi', name:'Amuleto Carmesí', icon:'🔮', color:'#9a2f45', rarity:'legendary',
    unlockCondition:'all_chars', unlockDesc:'Completa el juego con TODOS los personajes',
    desc:'Al matar un enemigo robas 1 carta adicional ese turno. Las cartas legendarias cuestan 1 maná menos.',
    effect:{ drawOnKill:1, legendaryDiscount:1 },
  },
  {
    id:'corona_voraz', name:'Corona Voraz', icon:'👑', color:'#f0c040', rarity:'legendary',
    unlockCondition:'infinite_10', unlockDesc:'Sobrevive 10 encuentros en Modo Infinito',
    desc:'Cada encuentro completado otorga +2 HP permanentes (máximo +20 por run). El oro se incrementa en 50%.',
    effect:{ encounterHpBonus:2, encounterHpMax:20, goldBonus:0.5 },
  },
  {
    id:'orbe_eterno', name:'Orbe Eterno', icon:'🌑', color:'#8060cc', rarity:'legendary',
    unlockCondition:'infinite_20', unlockDesc:'Sobrevive 20 encuentros en Modo Infinito',
    desc:'Comienzas cada run con 2 cartas legendarias aleatorias. Tu maná máximo aumenta en 1.',
    effect:{ startWithLegendaries:2, maxManaBonus:1 },
  },
];

const RELIC_UNLOCK_KEY = 'noctis_relics_v1';
const RELIC_EQUIP_KEY  = 'noctis_equip_v1';

function loadRelicData(){
  try{ const r=localStorage.getItem(RELIC_UNLOCK_KEY); return r?JSON.parse(r):{unlocked:[],winsPerChar:{}}; }
  catch(e){ return {unlocked:[],winsPerChar:{}}; }
}
function saveRelicData(d){ try{ localStorage.setItem(RELIC_UNLOCK_KEY,JSON.stringify(d)); }catch(e){} }
function loadEquippedRelics(){ try{ const r=localStorage.getItem(RELIC_EQUIP_KEY); return r?JSON.parse(r):[]; }catch(e){ return []; } }
function saveEquippedRelics(arr){ try{ localStorage.setItem(RELIC_EQUIP_KEY,JSON.stringify(arr)); }catch(e){} }
function getEquippedRelics(){ return loadEquippedRelics(); }
function hasRelic(id){ return getEquippedRelics().includes(id); }
function getRelicDef(id){ return RELICS.find(r=>r.id===id); }

function checkRelicUnlocks(survived){
  // Reliquias de personaje: solo al ganar (survived=true)
  if(survived){
    const data = loadRelicData();
    const cid = G.charId;
    if(!data.winsPerChar[cid]) data.winsPerChar[cid]=0;
    data.winsPerChar[cid]++;
    // Reliquia por personaje
    RELICS.forEach(r=>{
      if(data.unlocked.includes(r.id)) return;
      if(r.unlockChar && r.unlockChar===cid){ data.unlocked.push(r.id); showRelicUnlockToast(r); }
    });
    // Reliquia todos los personajes
    const allWon = CHARS.every(c=>(data.winsPerChar[c.id]||0)>0);
    if(allWon){
      const r=RELICS.find(x=>x.id==='amuleto_carmesi');
      if(r&&!data.unlocked.includes(r.id)){ data.unlocked.push(r.id); showRelicUnlockToast(r); }
    }
    saveRelicData(data);
  }
  // Reliquias de Modo Infinito: se desbloquean al alcanzar el umbral (no requieren sobrevivir)
  checkInfiniteRelicUnlocks();
}

// Comprueba reliquias de modo infinito al momento de alcanzar el umbral
// Se llama tanto al morir como al completar encuentros
function checkInfiniteRelicUnlocks(){
  if(!G.infiniteMode) return;
  const enc = G.infiniteEncounters || 0;
  const data = loadRelicData();
  let changed = false;
  if(enc >= 10){
    const r=RELICS.find(x=>x.id==='corona_voraz');
    if(r&&!data.unlocked.includes(r.id)){ data.unlocked.push(r.id); showRelicUnlockToast(r); changed=true; }
  }
  if(enc >= 20){
    const r=RELICS.find(x=>x.id==='orbe_eterno');
    if(r&&!data.unlocked.includes(r.id)){ data.unlocked.push(r.id); showRelicUnlockToast(r); changed=true; }
  }
  if(changed) saveRelicData(data);
}

function showRelicUnlockToast(relic){
  const toast=document.createElement('div');
  toast.style.cssText=`position:fixed;bottom:90px;left:50%;transform:translateX(-50%) translateY(20px);z-index:9999;background:linear-gradient(135deg,#1a1228,#2a1a3a);border:1px solid ${relic.color};border-radius:10px;padding:14px 24px;display:flex;align-items:center;gap:14px;box-shadow:0 0 40px ${relic.color}66;opacity:0;transition:all .4s;max-width:340px;`;
  toast.innerHTML=`<div style="font-size:32px;filter:drop-shadow(0 0 8px ${relic.color})">${relic.icon}</div><div><div style="font-family:'Cinzel',serif;font-size:9px;letter-spacing:3px;color:${relic.color};text-transform:uppercase;margin-bottom:3px">✦ Reliquia Desbloqueada ✦</div><div style="font-family:'Cinzel Decorative',cursive;font-size:15px;color:#f0e8de">${relic.name}</div><div style="font-size:11px;color:#a090b8;font-style:italic;margin-top:2px">${relic.desc}</div></div>`;
  document.body.appendChild(toast);
  requestAnimationFrame(()=>requestAnimationFrame(()=>{ toast.style.opacity='1'; toast.style.transform='translateX(-50%) translateY(0)'; }));
  setTimeout(()=>{ toast.style.opacity='0'; toast.style.transform='translateX(-50%) translateY(-10px)'; setTimeout(()=>toast.remove(),500); },4500);
}

function applyRelicCombatStart(){
  const p=G.player;
  getEquippedRelics().forEach(rid=>{
    const r=getRelicDef(rid); if(!r) return;
    const ef=r.effect;
    if(ef.startCombatHeal){ const h=Math.min(p.maxHp-p.hp,ef.startCombatHeal); if(h>0){p.hp+=h;addLog(`${r.name}: +${h} HP`,'heal');} }
    if(ef.startCombatMana){ p.mana=Math.min(p.maxMana,p.mana+ef.startCombatMana); addLog(`${r.name}: +${ef.startCombatMana} maná`,'sta'); }
    if(ef.firstHitBlock){ G._relicFirstHitPending=true; }
  });
}

function applyRelicEncounterBonus(){
  if(!hasRelic('corona_voraz')) return;
  const p=G.player;
  const bonus=RELICS.find(r=>r.id==='corona_voraz').effect;
  const cur=G._coronaBonus||0;
  if(cur<bonus.encounterHpMax){
    const gain=Math.min(bonus.encounterHpBonus,bonus.encounterHpMax-cur);
    p.maxHp+=gain; p.hp=Math.min(p.hp+gain,p.maxHp);
    G._coronaBonus=(G._coronaBonus||0)+gain;
    addLog(`Corona Voraz: +${gain} HP permanente`,'heal');
  }
}

function applyRelicRunStart(){
  const p=G.player;
  getEquippedRelics().forEach(rid=>{
    const r=getRelicDef(rid); if(!r) return;
    const ef=r.effect;
    if(ef.maxHpBonus){ p.maxHp+=ef.maxHpBonus; p.hp+=ef.maxHpBonus; }
    if(ef.maxManaBonus){ p.maxMana+=ef.maxManaBonus; p.mana+=ef.maxManaBonus; }
    if(ef.startWithLegendaries){
      const legends=CARDS.filter(c=>c.rarity==='legendary');
      for(let i=0;i<ef.startWithLegendaries;i++){
        const pick=legends[Math.floor(Math.random()*legends.length)];
        if(pick) p.deck.push(pick.id);
      }
    }
  });
}

function renderRelicsPanel(){
  const el=document.getElementById('relics'); if(!el) return;
  const equipped=getEquippedRelics();
  if(equipped.length===0){ el.innerHTML='<span style="font-size:11px;color:var(--dim);font-style:italic">Sin reliquias</span>'; return; }
  el.innerHTML='';
  equipped.forEach(rid=>{
    const r=getRelicDef(rid); if(!r) return;
    const div=document.createElement('div');
    div.style.cssText=`width:44px;height:44px;border-radius:6px;background:linear-gradient(135deg,#1a1228,#2a1a3a);border:1px solid ${r.color}88;display:flex;align-items:center;justify-content:center;cursor:help;position:relative;transition:transform .2s,box-shadow .2s;box-shadow:0 0 8px ${r.color}33;overflow:hidden;flex-shrink:0;`;
    const imgSrc=getRelicImg(rid);
    if(imgSrc){
      div.innerHTML=`<img src="${imgSrc}" style="width:38px;height:38px;object-fit:contain;border-radius:4px;filter:drop-shadow(0 0 6px ${r.color}66)">`;
    } else {
      div.style.fontSize='22px';
      div.textContent=r.icon;
    }
    div.addEventListener('mouseenter',()=>{
      div.style.transform='scale(1.25)'; div.style.boxShadow=`0 0 18px ${r.color}88`;
      const tip=document.createElement('div');
      tip.id='relicTip';
      const rect=div.getBoundingClientRect();
      tip.style.cssText=`position:fixed;z-index:9999;background:linear-gradient(135deg,#1a1228,#0e0b18);border:1px solid ${r.color};border-radius:8px;padding:12px 16px;max-width:250px;font-size:13px;color:#e0d8f0;font-style:italic;line-height:1.6;box-shadow:0 0 20px ${r.color}44;pointer-events:none;left:${rect.right+12}px;top:${rect.top-4}px;`;
      tip.innerHTML=`<b style="font-family:'Cinzel',serif;font-size:12px;color:${r.color};font-style:normal;display:block;margin-bottom:4px">${r.name}</b>${r.desc}`;
      document.body.appendChild(tip);
    });
    div.addEventListener('mouseleave',()=>{ div.style.transform=''; div.style.boxShadow=`0 0 8px ${r.color}33`; document.getElementById('relicTip')?.remove(); });
    el.appendChild(div);
  });
}

// ════════════════════════════════════════════════
//  PANTALLA DE DESBLOQUEOS
// ════════════════════════════════════════════════
function showUnlocks(){playUI();
  let ov=document.getElementById('unlocksOverlay');
  if(!ov){ ov=document.createElement('div'); ov.id='unlocksOverlay'; ov.style.cssText='position:fixed;inset:0;z-index:8000;background:#080610f8;display:flex;align-items:flex-start;justify-content:center;opacity:0;transition:opacity .35s;overflow-y:auto;'; document.body.appendChild(ov); }
  buildUnlocksUI(ov);
  ov.style.display='flex';
  requestAnimationFrame(()=>requestAnimationFrame(()=>{ ov.style.opacity='1'; }));
}
function closeUnlocks(){
  playUI();
  const ov=document.getElementById('unlocksOverlay'); if(!ov) return;
  ov.style.opacity='0'; setTimeout(()=>{ ov.style.display='none'; },350);
}

function buildUnlocksUI(ov){
  const data=loadRelicData();
  const equipped=loadEquippedRelics();
  const MAX_EQUIPPED=1;
  const RARITY_CLR={rare:'#cc80ff',legendary:'#ffcc44'};
  const RARITY_LBL={rare:'RARA',legendary:'LEGENDARIA'};

  const equippedHTML = equipped.length===0
    ? '<span style="font-size:12px;color:#5a5070;font-style:italic">Ninguna reliquia equipada — selecciona una abajo</span>'
    : equipped.map(rid=>{
        const r=getRelicDef(rid); if(!r) return '';
        return `<div onclick="toggleEquipRelic('${rid}')" style="display:flex;align-items:center;gap:10px;padding:8px 16px;background:#2a1a3a;border:1px solid ${r.color}88;border-radius:8px;cursor:pointer;transition:all .2s;" title="Click para desequipar">
          <span style="font-size:22px">${r.icon}</span>
          <div><div style="font-family:'Cinzel',serif;font-size:11px;color:${r.color}">${r.name}</div><div style="font-size:10px;color:#7a6888;font-style:italic">Click para desequipar</div></div>
        </div>`;
      }).join('');

  const cardsHTML = RELICS.map(r=>{
    const isUnlocked=data.unlocked.includes(r.id);
    const isEquipped=equipped.includes(r.id);
    const canEquip=isUnlocked&&!isEquipped&&equipped.length<MAX_EQUIPPED;
    const rc=RARITY_CLR[r.rarity]||'#a0a0b0';
    const rl=RARITY_LBL[r.rarity]||'';
    const imgSrc=getRelicImg(r.id);
    const imgLockedSrc=getRelicImg(r.id+'_locked');
    const artHtml=isUnlocked
      ? (imgSrc
          ? `<img src="${imgSrc}" style="width:88px;height:88px;object-fit:contain;border-radius:8px;filter:drop-shadow(0 0 12px ${r.color}66)">`
          : `<div style="font-size:60px;filter:drop-shadow(0 0 16px ${r.color}88);line-height:1">${r.icon}</div>`)
      : (imgLockedSrc
          ? `<img src="${imgLockedSrc}" style="width:88px;height:88px;object-fit:contain;border-radius:8px;filter:grayscale(1) brightness(.35) contrast(1.5)">`
          : `<div style="width:88px;height:88px;border-radius:8px;background:#0a0812;border:2px solid #1a1428;display:flex;align-items:center;justify-content:center;font-size:48px;filter:grayscale(1) brightness(.18)">${r.icon}</div>`);
    const bdr=isEquipped?r.color:(isUnlocked?r.color+'66':'#2a1f3a');
    const glow=isEquipped?`0 0 28px ${r.color}55,0 0 8px ${r.color}33`:'none';
    let btn='';
    if(isEquipped) btn=`<button onclick="toggleEquipRelic('${r.id}')" style="font-family:'Cinzel',serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;padding:8px 18px;border:1px solid ${r.color};border-radius:3px;background:${r.color}22;color:${r.color};cursor:pointer;transition:all .2s">✓ Equipada · Desequipar</button>`;
    else if(canEquip) btn=`<button onclick="toggleEquipRelic('${r.id}')" style="font-family:'Cinzel',serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;padding:8px 18px;border:1px solid #d4a84366;border-radius:3px;background:#d4a84318;color:#d4a843;cursor:pointer;transition:all .2s">⚔ Equipar</button>`;
    else if(isUnlocked) btn=`<div style="font-size:12px;color:#5a5070;font-style:italic;padding:4px">Ya tienes una reliquia equipada — desequípala primero</div>`;
    else btn=`<div style="font-family:'Cinzel',serif;font-size:10px;letter-spacing:1.5px;color:#4a3a58;padding:6px 12px;border:1px solid #2a1f3a;border-radius:3px;text-transform:uppercase">🔒 Bloqueada</div>`;

    return `<div style="background:linear-gradient(160deg,${isEquipped?'#2a1a3a,#1a1028':'#13101e,#0e0b18'});border:1px solid ${bdr};border-top:2px solid ${bdr};border-radius:12px;padding:20px 16px;display:flex;flex-direction:column;align-items:center;gap:14px;position:relative;overflow:hidden;box-shadow:${glow};transition:transform .2s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform=''">
      <div style="position:absolute;top:9px;right:9px;font-family:'Cinzel',serif;font-size:8px;letter-spacing:2px;color:${rc};border:1px solid ${rc}44;padding:2px 7px;border-radius:2px;background:${rc}11">${rl}</div>
      ${artHtml}
      <div style="text-align:center;width:100%;display:flex;flex-direction:column;gap:8px">
        <div style="font-family:'Cinzel Decorative',cursive;font-size:15px;color:${isUnlocked?'#f0e8de':'#3a2e48'};letter-spacing:1px">${r.name}</div>
        <div style="font-size:13px;line-height:1.65;font-style:italic;color:${isUnlocked?'#c8b8d8':'#3a2e48'}">
          ${isUnlocked ? r.desc : `<span style="color:#5a4a68">🔒 Reliquia oculta</span>`}
        </div>
        ${!isUnlocked?`<div style="border-top:1px solid #2a1f3a;padding-top:9px;margin-top:3px"><div style="font-family:'Cinzel',serif;font-size:9px;letter-spacing:2px;color:#7a3a50;text-transform:uppercase;margin-bottom:5px">Cómo desbloquear</div><div style="font-size:13px;color:#a87080;font-style:italic;line-height:1.6">${r.unlockDesc||r.unlockCondition}</div></div>`:''}
      </div>
      ${btn}
    </div>`;
  }).join('');

  ov.innerHTML=`
  <div style="width:100%;max-width:960px;padding:52px 28px 110px;display:flex;flex-direction:column;align-items:center;gap:30px;position:relative">
    <!-- Decoración fondo -->
    <div style="position:fixed;inset:0;pointer-events:none;z-index:-1;background:radial-gradient(ellipse 80% 60% at 50% 0%,#2a0a4a22,transparent),radial-gradient(ellipse 60% 80% at 80% 100%,#6a102022,transparent)"></div>

    <!-- Header -->
    <div style="text-align:center;display:flex;flex-direction:column;align-items:center;gap:6px">
      <div style="font-size:52px;filter:drop-shadow(0 0 24px #c9984aaa);animation:eyePulse 3s ease-in-out infinite">⚜</div>
      <div style="font-family:'Cinzel Decorative',cursive;font-size:clamp(22px,4vw,40px);color:#f0c060;text-shadow:0 0 50px #d4a84366,0 0 100px #d4a84322;letter-spacing:5px">DESBLOQUEOS</div>
      <div style="font-family:'Cinzel',serif;font-size:11px;letter-spacing:5px;text-transform:uppercase;color:#7a6888">Reliquias del Cazador · Máx. ${MAX_EQUIPPED} equipadas</div>
      <div style="width:200px;height:1px;background:linear-gradient(90deg,transparent,#d4a84344,transparent);margin-top:4px"></div>
    </div>

    <!-- Equipadas -->
    <div style="width:100%;background:linear-gradient(135deg,#1a1228,#13101e);border:1px solid #d4a84333;border-radius:12px;padding:20px 24px;display:flex;flex-direction:column;gap:12px">
      <div style="font-family:'Cinzel',serif;font-size:11px;letter-spacing:3px;color:#d4a843;text-transform:uppercase;border-bottom:1px solid #d4a84333;padding-bottom:8px">⚔ Equipadas (${equipped.length}/${MAX_EQUIPPED})</div>
      <div style="display:flex;gap:14px;flex-wrap:wrap;min-height:50px;align-items:center">${equippedHTML}</div>
    </div>

    <!-- Grid reliquias -->
    <div style="width:100%">
      <div style="font-family:'Cinzel',serif;font-size:10px;letter-spacing:4px;color:#5a4a68;text-transform:uppercase;margin-bottom:14px">✦ Todas las Reliquias</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:18px;width:100%">${cardsHTML}</div>
    </div>

    <!-- Botón cerrar -->
    <button onclick="closeUnlocks()" style="position:fixed;bottom:26px;left:50%;transform:translateX(-50%);font-family:'Cinzel',serif;font-size:12px;letter-spacing:3px;text-transform:uppercase;padding:13px 36px;border:1px solid #d4a84366;border-radius:4px;background:linear-gradient(135deg,#1a1228dd,#0e0b18dd);backdrop-filter:blur(8px);color:#d4a843;cursor:pointer;transition:all .25s;z-index:10;clip-path:polygon(8px 0%,calc(100% - 8px) 0%,100% 50%,calc(100% - 8px) 100%,8px 100%,0% 50%)"
      onmouseover="this.style.borderColor='#d4a843';this.style.boxShadow='0 0 24px #d4a84444'"
      onmouseout="this.style.borderColor='#d4a84366';this.style.boxShadow=''">
      ← Volver al Menú
    </button>
  </div>`;
}

function toggleEquipRelic(relicId){
  playUI();
  const MAX_EQUIPPED=1;
  let equipped=loadEquippedRelics();
  const idx=equipped.indexOf(relicId);
  if(idx>=0){ equipped.splice(idx,1); }
  else{
    const data=loadRelicData();
    if(!data.unlocked.includes(relicId)) return;
    if(equipped.length>=MAX_EQUIPPED) return;
    equipped.push(relicId);
  }
  saveEquippedRelics(equipped);
  const ov=document.getElementById('unlocksOverlay');
  if(ov) buildUnlocksUI(ov);
}

// ═══════════════════════════════════════════════
//  STATISTICS
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
function deleteSave(){playUI();localStorage.removeItem(SK);updateTitle()}
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
  checkRelicUnlocks(survived); // ← desbloquear reliquias si corresponde
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
  applyRelicRunStart(); // ← reliquias equipadas al inicio de run
  G._coronaBonus = 0;
  G._relicFirstHitPending = false;
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
  const raw = Array.from({length:3},(_,ai)=>({
    rows: Array.from({length:6},(_,ri)=>[
      {type:pickType(ri,ai),visited:false},
      {type:pickType(ri,ai),visited:false}
    ]),
    boss:{type:'boss',visited:false},
    dialoguePool:[],
    dialogueUsed:[],
    dialogueTriggers:[]
  }));
  // Asignar triggers de diálogo: filas del mapa tras las que aparecerá el evento
  // Son entre 2 y 4 por acto, en filas aleatorias (no la última antes del boss)
  raw.forEach((act, ai) => {
    act.dialoguePool = pickDialogueEvents(ai); // 2-4 eventos
    act.dialogueUsed = [];
    // Elegir en qué filas (0-5) se disparará el diálogo al completarlas
    const eligibleRows = [0,1,2,3,4,5];
    const shuffled = [...eligibleRows].sort(()=>Math.random()-0.5);
    act.dialogueTriggers = shuffled.slice(0, act.dialoguePool.length).sort((a,b)=>a-b);
  });
  return raw;
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
function goTitle(){playUI();updateTitle();show('title')}
function updateTitle(){
  const sv=loadG();
  const bc=document.getElementById('btnContinue'),sb=document.getElementById('saveBadge'),bd=document.getElementById('btnDel');
  if(sv){bc.style.display='';sb.style.display='';bd.style.display='';const ch=chById(sv.charId);const p=sv.path||{act:0,row:0};sb.textContent=`${sv.heroName||ch?.name||'?'}  ·  ${sv.infiniteMode?'Modo Infinito':'Acto '+(p.act||0+1)}  ·  ${sv.savedAt}`}
  else{bc.style.display='none';sb.style.display='none';bd.style.display='none'}
  const db=document.getElementById('diffBadge');
  if(db) db.textContent='';
}
function goCharSelect(){playUI();renderChars();show('chars')}

function continueGame(){
  playUI();
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
  playUI();
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
    card.addEventListener('click',()=>{playUI();selChar=ch.id;document.querySelectorAll('.char-card').forEach(c=>c.classList.toggle('selected',c.dataset.id===ch.id));const b=document.getElementById('btnStart');b.style.opacity='1';b.style.pointerEvents='';});
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
  // ✏ CAMBIO 7: mostrar oro del jugador en el mapa
  let mapGold=document.getElementById('mapGoldDisplay');
  if(!mapGold){
    mapGold=document.createElement('div');
    mapGold.id='mapGoldDisplay';
    mapGold.className='map-gold-display';
    document.getElementById('s-map').insertBefore(mapGold,document.getElementById('mapActs'));
  }
  mapGold.innerHTML='🪙 <b style="color:var(--gold2);font-family:\'Cinzel Decorative\',cursive">'+(G.gold||0)+'</b> <span style="font-size:0.75em;opacity:.6">oro</span>';
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


// ═══════════════════════════════════════════════
//  SISTEMA DE EVENTOS DE DIÁLOGO — NOCTIS DECK
// ═══════════════════════════════════════════════

const DIALOGUE_EVENTS = [

  // ══════════════════════════════
  //  ACTO 1 — Barrios exteriores
  // ══════════════════════════════

  {
    id: 'mendigo_moneda',
    acts: [0],
    npc: 'npc_mendigo',
    npcName: 'Un mendigo bajo el farol',
    intro: 'Un hombre cubierto de harapos yace contra la pared húmeda. La luz del farol tiembla sobre su rostro. Extiende la mano sin mirarte, murmurando algo sobre "la noche que no acaba".',
    options: [
      { text: 'Dejarle una moneda y seguir tu camino', outcomes: [
        { w:40, type:'gold_loss', amount:8,  gold_gain:20, msg:'Le das unas monedas. Él las aprieta con fuerza y sin mirarte señala un callejón. "Por allí es más corto. Que la oscuridad no te alcance." En el callejón, entre escombros, encuentras una pequeña bolsa olvidada.' },
        { w:35, type:'gold_loss', amount:8,  msg:'Le das las monedas. Él las cuenta lentamente, luego te mira por primera vez. Sus ojos son completamente negros. "Gracias", dice, y desaparece como si la niebla se lo tragara.' },
        { w:25, type:'heal',      amount:12, msg:'Mientras depositas las monedas en su mano, él te agarra la muñeca. "La oscuridad te ha visto ya." Te suelta y saca un pequeño frasco. "Toma esto. Antes de que sea demasiado tarde." El líquido sabe a cobre y a algo más.' }
      ]},
      { text: 'Ignorarle y continuar', outcomes: [
        { w:50, type:'none',   msg:'Pasas de largo. A tu espalda, su murmullo se vuelve más alto: "La ciudad recuerda a quienes la ignoran..." No te detienes.' },
        { w:30, type:'ambush', msg:'Cuando doblas la esquina, tres figuras encapuchadas te cierran el paso. "Debiste haberle escuchado", dice una voz desde atrás. El mendigo ya no está, pero sus palabras sí.' },
        { w:20, type:'card',   msg:'Al pasar junto a él, notas que sujeta en la mano algo que no son monedas. Un papel doblado con tu nombre escrito. No entiendes cómo es posible. Dentro hay una carta entre los pliegues.' }
      ]},
      { text: 'Preguntarle qué ha visto esta noche', outcomes: [
        { w:45, type:'lore',   msg:'"Las luces del Palacio Cendral llevan cuatro noches sin apagarse", murmura. "Los nobles encendieron algo que no saben cómo apagar. Los que entran no salen. Los que salen... ya no son los mismos."' },
        { w:35, type:'bleed',  amount:2, msg:'Al agacharte para escucharle, sientes un pinchazo en el cuello. Sus dedos retraídos. "Perdona, reflejo... Lo hacemos cuando alguien se acerca demasiado ahora." Retrocedes. La herida escuece con una extraña frialdad.' },
        { w:20, type:'gold',   amount:15, msg:'Te mira sorprendido. Nadie le había preguntado nada en semanas. Con manos temblorosas saca una moneda de un escondite en su bota. "De la última persona que me ayudó. Guárdala tú."' }
      ]}
    ]
  },

  {
    id: 'comerciante_caja',
    acts: [0],
    npc: 'npc_comerciante',
    npcName: 'Comerciante de medianoche',
    intro: 'Un hombre de edad indefinida empuja un carrito desvencijado entre la niebla. Sobre él, cajas cerradas con candados oxidados. Al verte, se detiene y sonríe demasiado ampliamente para ser natural.',
    options: [
      { text: 'Comprarle la caja más pequeña por diez monedas', outcomes: [
        { w:40, type:'card',        msg:'Dentro hay una carta envuelta en tela encerada. "Una reliquia de un Cazador anterior", dice él. "O eso me contaron." Se aleja empujando el carrito sin esperar respuesta.' },
        { w:35, type:'gold_loss',   amount:10, msg:'La caja está vacía. El comerciante encoge los hombros. "A veces la suerte no está dentro." Desaparece entre la niebla antes de que puedas decir nada.' },
        { w:25, type:'debuff_poison', amount:2, msg:'Dentro hay un frasco roto que rezuma un líquido verdoso. El olor es suficiente para marcarte. "Ah, esa era la especial", dice él, ya alejándose.' }
      ]},
      { text: 'Preguntarle por la caja más grande', outcomes: [
        { w:50, type:'gold_loss',   amount:20, msg:'"Esa no está en venta." Pero si insistes... veinte monedas. Dentro hay ropa vieja y una nota: "Si estás leyendo esto, la ciudad ya te tiene." No hay firma.' },
        { w:30, type:'heal',        amount:18, msg:'"Esa no está en venta." Pero antes de que te vayas, la abre él mismo. Dentro, entre telas viejas, hay un frasco de tintura médica antigua. "Para ti, sin coste."' },
        { w:20, type:'gold',        amount:30, msg:'La caja tiene doble fondo. "Vaya", dice el comerciante, genuinamente sorprendido. "Yo tampoco sabía eso." Os repartís lo encontrado a partes iguales.' }
      ]},
      { text: 'Seguir de largo sin comprar nada', outcomes: [
        { w:55, type:'none',   msg:'Al alejarte, escuchas cómo el carrito se detiene. "Volverás", dice su voz desde la niebla. No te vuelves.' },
        { w:25, type:'gold',   amount:12, msg:'A los pocos pasos escuchas un silbido. Cuando te giras, el carrito está vacío y el comerciante te hace señas desde un portal. "Dejé algo para ti en el suelo."' },
        { w:20, type:'ambush', msg:'La niebla se espesa de golpe. El carrito está volcado. El comerciante ha desaparecido. En su lugar, dos figuras con capas oscuras. "El señor pedía sus monedas de vuelta."' }
      ]}
    ]
  },

  {
    id: 'sacerdote_plegaria',
    acts: [0],
    npc: 'npc_sacerdote',
    npcName: 'Sacerdote de la Orden Pálida',
    intro: 'Un sacerdote con hábito blanco manchado de ceniza recita plegarias frente a una pared cubierta de marcas grabadas. Al escuchar tus pasos se interrumpe y te mira con ojos cansados que han visto demasiado.',
    options: [
      { text: 'Pedirle que rece por ti', outcomes: [
        { w:45, type:'heal',      amount:15, msg:'"La oración no cura el cuerpo, dice la iglesia. La iglesia miente." Posa sus manos en tus hombros y musita algo en un idioma que no reconoces. Sientes calor donde había frío.' },
        { w:35, type:'debuff_bleed', amount:3, msg:'Cierra los ojos y comienza a rezar. Cuando los abre, su expresión ha cambiado. "La oscuridad ya te ha tocado. Lo que rezo no alcanza para limpiar eso." Sus palabras quedan en ti como espinas.' },
        { w:20, type:'lore',      msg:'"Antes del Ritual de los Cien Faroles, esta ciudad tenía día", dice en voz baja. "Los nobles creyeron que podían capturar la noche. Capturaron algo que usa la noche como ropa." Se vuelve hacia la pared y no dice más.' }
      ]},
      { text: 'Ayudarle a grabar más marcas en la pared', outcomes: [
        { w:40, type:'gold',  amount:18, msg:'"Cada marca es una barrera." Lo dice mientras grabáis juntos. Al terminar saca una bolsa. "De la colecta. Para quien tenga el valor de continuar."' },
        { w:35, type:'card',  msg:'Entre las marcas, él te guía para trazar una diferente. "Esta no es de protección. Es de acceso." Cuando termina, arranca el trozo de piedra con la marca. En tus manos se convierte en algo más útil.' },
        { w:25, type:'none',  msg:'Grabáis en silencio durante un rato. Cuando termina, el sacerdote contempla la pared. "No sirve de nada", admite. "Pero hacer algo es mejor que no hacer nada."' }
      ]},
      { text: 'Preguntarle qué significan las marcas', outcomes: [
        { w:50, type:'lore',       msg:'"Son el lenguaje de antes del Tiempo de la Noche. La aristocracia lo estudió para invocarlo. Nosotros lo estudiamos para sellarlo." Señala hacia el centro. "Allí ya no funcionan. Algo muy potente las borra."' },
        { w:30, type:'gold',       amount:10, msg:'"Son contratos. Esta calle pertenece a los que aún resisten." Te da unas monedas de su propio bolsillo. "Para que puedas llegar más lejos que yo."' },
        { w:20, type:'debuff_mana', msg:'"No debería explicarlo a alguien que no ha sido consagrado." Pero lo hace. Y mientras habla, algo en el aire cambia. Como si el conocimiento tuviera un precio que no se paga con monedas.' }
      ]}
    ]
  },

  {
    id: 'nino_perdido',
    acts: [0],
    npc: 'npc_nino',
    npcName: 'Una figura pequeña entre la niebla',
    intro: 'Entre la niebla distingues lo que parece ser un niño parado en mitad de la calle vacía. Demasiado quieto para ser normal. Demasiado solo para esta hora.',
    options: [
      { text: 'Acercarte a ver si está bien', outcomes: [
        { w:35, type:'heal',      amount:20, msg:'Es una niña, no mayor de diez años, con una cesta cubierta. "Mi madre me dijo que si encontraba a un Cazador le diera esto." Dentro hay vendas y ungüento. No entiendes cómo supo lo que eres.' },
        { w:35, type:'ambush',    msg:'Cuando te acercas lo suficiente, la figura levanta la cabeza. No es un niño. O ya no lo es. Sus ojos son el color de la tinta. "Gracias por venir", dice con una voz que no encaja con ese cuerpo.' },
        { w:30, type:'gold_loss', amount:15, msg:'Es un niño de verdad, asustado. Cuando intentas ayudarle, se pierde entre la niebla. En el suelo donde estaba, tus monedas han desaparecido. No recuerdas haberlas sacado.' }
      ]},
      { text: 'Llamarle desde donde estás sin moverte', outcomes: [
        { w:45, type:'lore',  msg:'"Mi padre decía que el centro de la ciudad latía como un corazón. Antes de que se lo llevaran." Señala hacia las torres más altas. "Aún puedo escucharlo de noche." Se aleja entre la niebla.' },
        { w:30, type:'card',  msg:'Al llamarle, se vuelve y camina hacia ti. Deja caer algo al suelo antes de desaparecer en la niebla. Una carta de combate envuelta en una cinta negra con un nudo que no reconoces.' },
        { w:25, type:'none',  msg:'No responde. Se queda quieto un momento más y luego la niebla se lo traga. Ni siquiera pisadas en el suelo húmedo.' }
      ]},
      { text: 'Rodearle y continuar tu camino', outcomes: [
        { w:50, type:'none',  msg:'Le rodeas con distancia. La figura no se mueve. Cuando miras atrás desde el final de la calle, ya no está.' },
        { w:30, type:'bleed', amount:2, msg:'Mientras le rodeas, escuchas su voz a tu espalda: "Te sangra la mano." Y es verdad. Una herida que no recuerdas haberte hecho.' },
        { w:20, type:'gold',  amount:25, msg:'Al pasar junto a él, deja caer algunas monedas al suelo sin mirarte. "Para el Cazador." No sabes si debería preocuparte que te reconozca.' }
      ]}
    ]
  },

  {
    id: 'soldado_herido',
    acts: [0],
    npc: 'npc_soldado',
    npcName: 'Guardia de la Ciudad',
    intro: 'Un soldado con el uniforme desgarrado está apoyado contra una farola, apretando una herida en el costado. La insignia en su pecho es la de la Guardia de Noctis, aunque el emblema tiene algo rayado encima.',
    options: [
      { text: 'Ayudarle a curar la herida', outcomes: [
        { w:40, type:'gold',  amount:20, msg:'"No tengo monedas. Pero sé dónde hay un alijo de la Guardia Vieja. Antes de que todo cambiara." Te da instrucciones precisas. El alijo estaba donde dijo.' },
        { w:35, type:'heal',  amount:10, msg:'"Llevamos tres semanas sin recibir órdenes del Palacio Central. Los que fueron a preguntar no volvieron." Termina de curarte las propias heridas con lo que sobra.' },
        { w:25, type:'bleed', amount:3, msg:'La herida es más rara de lo que parece. Algo en ella reacciona al contacto. No es veneno exactamente. Es otra cosa. Y ahora está en ti también.' }
      ]},
      { text: 'Preguntarle qué le pasó', outcomes: [
        { w:50, type:'lore',       msg:'"Una de esas... cosas. No sé cómo llamarlas. Tenía forma de persona hasta que se acercó demasiado al farol." Escupe. "En el Cuarto Distrito ya no hay humanos. Sólo formas que recuerdan haber sido humanos."' },
        { w:30, type:'debuff_bleed', amount:2, msg:'"Pronto lo verás tú mismo." Cuando te acercas, nota algo. "Ya te han tocado también, ¿verdad? Uno siempre reconoce a otro marcado."' },
        { w:20, type:'card',       msg:'Saca un papel del bolsillo interior. "Encontré esto en la guarida de lo que me atacó. No sé qué es, pero no debería quedarse allí." En tus manos cobra forma de carta de combate.' }
      ]},
      { text: 'Dejarle y seguir adelante', outcomes: [
        { w:55, type:'none',   msg:'A tu espalda escuchas su voz apagarse: "Correcto. No pares. Nunca pares." No sabes si era consejo o amenaza.' },
        { w:25, type:'ambush', msg:'A diez pasos de allí, el sonido de botas en los tejados. No suenan del todo humanas.' },
        { w:20, type:'gold',   amount:12, msg:'Cuando llevas unos pasos algo rueda por el suelo. Una bolsa pequeña. "Para el siguiente que pase. Tú eres el siguiente."' }
      ]}
    ]
  },

  // ══════════════════════════════
  //  ACTO 2 — Corazón de la ciudad
  // ══════════════════════════════

  {
    id: 'noble_refugio',
    acts: [1],
    npc: 'npc_noble',
    npcName: 'Noble en las ruinas de su mansión',
    intro: 'Entre las columnas caídas de lo que fue una mansión aristocrática, un hombre vestido con ropas que fueron lujosas contempla retratos familiares esparcidos por el suelo. No parece sorprendido de verte.',
    options: [
      { text: 'Ofrecerle protección a cambio de información', outcomes: [
        { w:40, type:'lore',  msg:'"¿Protección?" Ríe sin humor. "Fui uno de los que organizó el Ritual de los Cien Faroles. Mi familia lo inició. Yo intenté detenerlo. Llegué tarde." Te cuenta todo lo que sabe sobre el Palacio Central.' },
        { w:35, type:'gold',  amount:35, msg:'"Información a cambio de monedas ya no tiene sentido aquí." Abre un panel oculto. "Toma lo que hay. A mí no me sirve para nada donde voy." No explica adónde va.' },
        { w:25, type:'debuff_poison', amount:2, msg:'"La información tiene precio. El precio es entender lo que significan las palabras." Mientras habla, el aire de la habitación cambia. No fue intencional. O eso dice.' }
      ]},
      { text: 'Preguntarle por qué no ha huido de la ciudad', outcomes: [
        { w:45, type:'lore', msg:'"La ciudad no deja ir a quienes le pertenecen. Noctis no es un lugar, es un acuerdo. Mi familia firmó ese acuerdo hace tres generaciones. No se puede romper huyendo." Pausa. "Sólo puede romperse desde dentro."' },
        { w:30, type:'card', msg:'Abre un baúl sin responder. "Mi abuelo decía que el conocimiento debería caber en la mano." Te da varias cartas antiguas, una de las cuales aún tiene poder.' },
        { w:25, type:'heal', amount:22, msg:'"Porque la respuesta está aquí." Saca una botella de la chimenea. "Del último médico de la familia. Guardaba esto para mí. Pero yo ya no voy a necesitarlo."' }
      ]},
      { text: 'Registrar la mansión mientras él mira', outcomes: [
        { w:40, type:'gold',   amount:28, msg:'Observa en silencio. "En el tercer cajón del escritorio", dice por fin. "Siempre se olvidan del tercero." Tiene razón.' },
        { w:35, type:'ambush', msg:'Detrás de uno de los paneles hay algo que no debería estar dentro de una mansión. El noble suspira. "Lo sé. Por eso no la he abandonado. Alguien tiene que vigilarlo."' },
        { w:25, type:'card',   msg:'Bajo las tablas del suelo, una caja lacada. "La robé hace años para que no pudieran usarla. Úsala tú."' }
      ]}
    ]
  },

  {
    id: 'alquimista_laboratorio',
    acts: [1],
    npc: 'npc_alquimista',
    npcName: 'Alquimista entre sus frascos rotos',
    intro: 'Un laboratorio improvisado en un sótano, con frascos chispeantes y anotaciones en las paredes. La alquimista no levanta la vista cuando entras, aunque claramente sabe que estás ahí.',
    options: [
      { text: 'Pedirle una poción', outcomes: [
        { w:40, type:'heal',          amount:25, msg:'"Esta estabiliza el flujo vital. Temporal, pero suficiente para llegar más lejos." Lo dice con la frialdad de quien ha catalogado demasiados experimentos.' },
        { w:35, type:'bleed',         amount:3,  msg:'"Esto purifica el sistema." No miente exactamente. El proceso de purificación tiene efectos secundarios que no mencionó. "Todo lo que limpia, también corta."' },
        { w:25, type:'debuff_poison', amount:2,  msg:'"Esta neutraliza venenos." Dicho y hecho. Lo que no dice es que la neutralización crea su propio compuesto. "Conocimiento necesario para la siguiente fase."' }
      ]},
      { text: 'Ofrecerte a ayudar en su experimento actual', outcomes: [
        { w:45, type:'card',  msg:'El experimento requiere un elemento que sólo se obtiene en combate. Cuando lo consigues y vuelves, ella transforma el resultado. "El conocimiento siempre tiene forma de herramienta, si sabes verlo."' },
        { w:30, type:'gold',  amount:22, msg:'El experimento resulta en un descubrimiento que ella ya sabía pero necesitaba verificar. "Para los datos de campo necesitaba a alguien de fuera." Te paga con naturalidad.' },
        { w:25, type:'debuff_bleed', amount:2, msg:'El experimento requería contacto directo con el compuesto. "Debería haber avisado del tiempo de exposición máximo." No parece arrepentida, sólo precisa.' }
      ]},
      { text: 'Preguntarle qué está investigando exactamente', outcomes: [
        { w:50, type:'lore', msg:'"El núcleo de la noche permanente tiene una frecuencia. Como un corazón. No es metáfora: tiene ritmo real, medible. Lo que lo mantiene activo está en el Palacio Central, en la sala más profunda, latiendo desde hace años." Se vuelve hacia ti. "¿Vas hacia allí?"' },
        { w:30, type:'card', msg:'Saca un cuaderno y arranca una página con un esquema. "Esto es una anomalía que no sé cómo clasificar." En tus manos, el esquema se convierte en algo funcional.' },
        { w:20, type:'gold', amount:15, msg:'"Lo que me pagaba la Orden que quedó. Ya no vienen a pagar." Saca una bolsa. "Supongo que esto es tuyo ahora."' }
      ]}
    ]
  },

  {
    id: 'viuda_puerta',
    acts: [1],
    npc: 'npc_viuda',
    npcName: 'Mujer frente a una puerta sellada',
    intro: 'Frente a una puerta cubierta de símbolos grabados, una mujer de negro contempla un retrato. No llora. Sus ojos están secos de tanto llorar que ya no puede.',
    options: [
      { text: 'Preguntarle a quién espera', outcomes: [
        { w:40, type:'lore',  msg:'"A nadie. Mi marido entró por esa puerta hace seis noches. Los que entran en las puertas selladas no salen, pero tampoco mueren. Permanecen. La ciudad los conserva." Mira el retrato. "Puedo escucharle respirar al otro lado."' },
        { w:35, type:'heal',  amount:18, msg:'"Ya no espero a nadie." Pero se vuelve hacia ti. "Esperaba a alguien que supiera leer esos símbolos." Saca un frasco. "Esto lo preparó él antes de entrar. Para quien llegara después."' },
        { w:25, type:'debuff_bleed', amount:2, msg:'Al hablar, sus manos aprietan tanto el retrato que sus uñas se clavan en sus palmas. La sangre cae de un modo que no parece accidental. No te das cuenta hasta después de que algo de eso te tocó.' }
      ]},
      { text: 'Intentar abrir la puerta sellada', outcomes: [
        { w:35, type:'gold',   amount:30, msg:'Los símbolos no responden a la fuerza. Responden al reconocimiento. Al tocarlos, algo al otro lado reacciona. Una ranura se abre. Dentro, una caja que alguien dejó para quien tuviera la curiosidad de intentarlo.' },
        { w:35, type:'ambush', msg:'Los símbolos reaccionan de una forma que no esperabas. No es la puerta lo que se abre.' },
        { w:30, type:'debuff_mana', msg:'La puerta absorbe algo al contacto. No duele. Simplemente, cuando te retiras, algo que antes estaba disponible en ti ahora está al otro lado de esa puerta.' }
      ]},
      { text: 'Dejarle una moneda sin decir nada', outcomes: [
        { w:50, type:'none', msg:'La acepta sin mirar. "Gracias." Esa sola palabra contiene demasiadas cosas. Continúas.' },
        { w:30, type:'gold', amount:18, msg:'Al marcharte, algo rueda por el suelo. Varias monedas. "Las de él. Decía que el dinero debía seguir moviéndose." No quieres saber cómo llegaron a sus manos.' },
        { w:20, type:'card', msg:'La moneda cae de canto. Ambos la miráis. Ella recoge algo del suelo junto a la moneda. "Era suya. Supongo que ahora es tuya."' }
      ]}
    ]
  },

  {
    id: 'medico_vacio',
    acts: [1],
    npc: 'npc_medico',
    npcName: 'Médico en una clínica vacía',
    intro: 'Una clínica con instrumentos ordenados y camas sin usar. El médico limpia bisturís con una meticulosidad que lleva demasiado tiempo practicando. Al entrar, señala una silla sin hablar.',
    options: [
      { text: 'Sentarte y dejar que te examine', outcomes: [
        { w:45, type:'heal', amount:30, msg:'"Sin heridas externas graves. Exposición moderada a la oscuridad concentrada. Tratable." La cura es metódica, eficaz, y no incluye preguntas personales.' },
        { w:35, type:'lore', msg:'"Llevas marca de la niebla en los pulmones. No es enfermedad. Es registro. La ciudad anota en los cuerpos de quienes la atraviesan." Sigue examinando. "¿Cuánto tiempo llevas dentro?"' },
        { w:20, type:'bleed', amount:2, msg:'La revisión encuentra algo que no esperaba. "Esto complica el diagnóstico estándar." El tratamiento experimental funciona a medias. La otra mitad tiene sus propias consecuencias.' }
      ]},
      { text: 'Preguntarle dónde están todos sus pacientes', outcomes: [
        { w:50, type:'lore', msg:'"Los del Primer Distrito evacuaron en la segunda semana. Los del Tercero... dejaron de necesitar médico en la cuarta. Los del Quinto no sé si siguen siendo pacientes en el sentido estricto." Pausa larga. "Tú eres el primero humano no marcado que veo en doce días."' },
        { w:30, type:'gold', amount:20, msg:'"Se fueron o cambiaron." Saca una caja de debajo de la mesa. "Esto es de las familias que pagaron por adelantado y no volvieron a recoger. A mí ya no me sirve de moneda aquí."' },
        { w:20, type:'card', msg:'Abre un armario de fichas médicas. "Caso 1247: síntomas, conocimiento involuntario de cosas que no deberían saberse. Tratamiento: ninguno conocido. Resultado: útil en combate, según el propio paciente." Te da la ficha.' }
      ]},
      { text: 'Pedirle suministros para el camino', outcomes: [
        { w:40, type:'heal',     amount:15, msg:'Sin preguntar, llena una pequeña bolsa con vendas y frascos. "Suficiente para tres usos. Cuatro si eres cuidadoso." No cobra.' },
        { w:35, type:'gold_loss', amount:12, msg:'"Los suministros tienen precio incluso aquí. Especialmente aquí." No es codicia. Es principio. La mejora es real.' },
        { w:25, type:'debuff_mana', msg:'Te da lo que pides. Luego añade algo que no pediste: "Para el dolor que viene." No especifica qué dolor. Tiene efectos secundarios que no incluyó.' }
      ]}
    ]
  },

  // ══════════════════════════════
  //  ACTO 3 — El núcleo oscuro
  // ══════════════════════════════

  {
    id: 'investigador_notas',
    acts: [2],
    npc: 'npc_investigador',
    npcName: 'Investigador de la Torre Obscura',
    intro: 'Una habitación cuyas paredes están cubiertas de notas, mapas y esquemas conectados con hilos de colores. Un hombre teclea en una máquina de escribir sin papel. Escribe en el aire, o en algo que tú no puedes ver.',
    options: [
      { text: 'Preguntarle qué está escribiendo', outcomes: [
        { w:45, type:'lore', msg:'"El informe final. La aristocracia creía que el Tiempo de la Noche era un estado que podía mantenerse indefinidamente. Tenían razón en la mecánica. Se equivocaron en la fuente. No usa energía ritual. Nos usa a nosotros. A todos los que seguimos dentro." Para de teclear. "Incluyéndote a ti, ahora."' },
        { w:30, type:'card', msg:'Sin dejar de escribir, empuja hacia ti una carpeta. "Toma el anexo B. Tiene aplicaciones prácticas." Dentro hay algo que en tus manos se convierte en una herramienta de combate.' },
        { w:25, type:'debuff_mana', msg:'"Las conclusiones del Experimento 7." Se detiene. "No debería habértelo dicho. Algunas conclusiones modifican a quien las conoce." Tiene razón. Algo cambia en la forma en que percibes el espacio.' }
      ]},
      { text: 'Leer sus notas en la pared', outcomes: [
        { w:40, type:'lore',   msg:'Líneas de fuerza convergiendo en el Palacio Central. Fechas, nombres de familias nobles, rituales detallados. "Tres generaciones de investigación", dice él. "Y la conclusión siempre es la misma: hay que llegar al centro y romper el nudo."' },
        { w:35, type:'gold',   amount:25, msg:'"Observas bien." Se levanta y señala una parte del mapa. "Eso es un fallo en el patrón. Un punto ciego. Úsalo." Te da también una bolsa.' },
        { w:25, type:'ambush', msg:'Mientras lees, una de las notas reacciona a tu presencia. "Ah. Parece que el sistema te ha registrado ya. Sabrán exactamente dónde estás."' }
      ]},
      { text: 'Ofrecerle salir contigo', outcomes: [
        { w:50, type:'lore',  msg:'"No puedo salir. Soy parte del sistema de observación ahora. Si salgo, el registro se interrumpe." Señala las notas. "Pero tú puedes llevar lo que he documentado."' },
        { w:30, type:'gold',  amount:30, msg:'"No." Sin matices. "Pero toma esto. Es lo que me sobra y a ti te falta."' },
        { w:20, type:'heal',  amount:28, msg:'Por primera vez deja de escribir y te mira. "Nadie me lo había propuesto." Abre un cajón. "Lo preparé para mí. Pero si alguien va a llegar al centro, que sea en buenas condiciones."' }
      ]}
    ]
  },

  {
    id: 'superviviente_portal',
    acts: [2],
    npc: 'npc_superviviente',
    npcName: 'Figura en las sombras del portal',
    intro: 'No te habla. Está de espaldas a ti, pegado a la pared del portal como si intentara fundirse con la piedra. Cuando presientes su presencia y te detienes, se vuelve lentamente. Sus ojos no reflejan la luz de los faroles de la forma correcta.',
    options: [
      { text: 'Hablarle en voz baja', outcomes: [
        { w:40, type:'lore',   msg:'Tarda en responder. "En el Palacio Central hay una sala que no aparece en los planos. Es donde todo empezó. Es donde todo termina. Cuando llegues allí..." Se detiene. "No toques el suelo con las manos desnudas."' },
        { w:35, type:'heal',   amount:20, msg:'Se queda mirándote. Luego rebusca en su ropa. "Tenía esto desde el inicio. Esperaba al momento correcto." No explica cómo sabe que eres tú ese momento.' },
        { w:25, type:'bleed',  amount:3, msg:'"No deberías haber venido aquí." No como amenaza. Como advertencia genuina. "Este portal cambia a quienes se detienen demasiado tiempo." Te has detenido demasiado tiempo.' }
      ]},
      { text: 'Ofrecerle comida o agua', outcomes: [
        { w:45, type:'gold', amount:22, msg:'Rechaza con un gesto. "Ya no necesito eso." Pero deja caer algo al suelo. "De los que vinieron antes. No llegaron hasta donde vas tú."' },
        { w:30, type:'card', msg:'"Ya no funciona en mí." Acepta el gesto. Te devuelve algo marcado con un símbolo del sacerdote del primer distrito. "Para el momento en que lo necesites."' },
        { w:25, type:'none', msg:'Niega con la cabeza. Señala hacia el interior del portal. "Por ahí es más directo. Aunque más peligroso." Cuando te vuelves para darle las gracias, ya no está.' }
      ]},
      { text: 'Pedirle que te guíe por esta zona', outcomes: [
        { w:35, type:'lore',   msg:'Te guía por callejones que no aparecen en ningún mapa. En silencio señala marcas, patrones en las sombras, puntos donde la niebla es más densa. "La ciudad te habla si sabes escucharla. Dice que llegas tarde."' },
        { w:35, type:'ambush', msg:'Asiente y empieza a caminar. A mitad del trayecto se detiene. "Aquí es hasta donde puedo acompañarte." Cuando te vuelves a mirarle, entiendes por qué no puede ir más lejos.' },
        { w:30, type:'gold',   amount:18, msg:'La guía es silenciosa y eficaz. Al terminar, señala un punto en el suelo de un callejón. "El anterior dejó esto. Dijo que sería para el siguiente." Hay una bolsa bajo una piedra suelta.' }
      ]}
    ]
  },

  {
    id: 'figura_encapuchada',
    acts: [2],
    npc: 'npc_figura',
    npcName: 'Una figura que te esperaba',
    intro: 'Está de pie en mitad de la calle, mirando exactamente hacia donde ibas a aparecer tú. La capa oscura no tiene insignia de ninguna facción que reconozcas. Cuando llegas a su altura, habla primero.',
    options: [
      { text: 'Escuchar lo que tiene que decir', outcomes: [
        { w:40, type:'lore',   msg:'"El ritual que mantiene la noche no está en el Palacio Central. Está bajo él. En la cámara que construyeron antes de que hubiera Palacio, antes de que hubiera ciudad. Y lo que lo activa no es un mecanismo. Es una decisión que alguien tomó y que tiene que ser revocada por alguien con la misma capacidad." Se va antes de que preguntes qué significa.' },
        { w:35, type:'card',   msg:'"Toma esto." Un objeto que en sus manos era opaco, en las tuyas adquiere forma y uso. "Lo encontrarás útil en la última sala." No especifica cuál es la última sala.' },
        { w:25, type:'ambush', msg:'"Llevo tiempo siguiéndote. No soy el único." Cuando te preparas, levanta una mano. "Yo no soy el problema inmediato." Tiene razón.' }
      ]},
      { text: 'Preguntarle quién le envió', outcomes: [
        { w:50, type:'lore', msg:'"Nadie me envía. Me muevo por las mismas razones que tú. O razones parecidas." Pausa. "Lo que hay en el centro tiene que acabarse. En eso coincidimos, al menos."' },
        { w:30, type:'gold', amount:35, msg:'"Una pregunta justa." Saca una bolsa. "Lo que sobra de los que ya no necesitan monedas aquí. Tú eres el primero que ha llegado haciendo las preguntas correctas."' },
        { w:20, type:'debuff_bleed', amount:2, msg:'"Prefiero no responder a eso." Antes de irse, roza tu brazo. "Un registro. Para saber que estuviste aquí. Por si alguien pregunta después."' }
      ]},
      { text: 'Intentar ver su rostro', outcomes: [
        { w:45, type:'none', msg:'No lo evita activamente. Pero cuando consigues el ángulo correcto, la capucha está vacía. Se aleja como si nada de eso fuera relevante.' },
        { w:30, type:'heal', amount:25, msg:'Bajo la capucha hay un rostro que podría ser cualquiera. Lo que reconoces son sus manos: llevan los mismos símbolos del sacerdote del primer distrito. "Para que llegues", dice, y te cura sin pedírselo.' },
        { w:25, type:'card', msg:'Lo que ves te resulta familiar de una forma que no puedes precisar. La figura deja algo en el suelo y se marcha. Una carta. Con tu nombre escrito en el reverso.' }
      ]}
    ]
  },

  {
    id: 'herrero_fragua_fria',
    acts: [2],
    npc: 'npc_herrero',
    npcName: 'Herrero en una fragua que no quema',
    intro: 'La fragua arde con un fuego que no da calor. El herrero trabaja metal que no debería ser maleable, con la concentración de quien lleva tiempo adaptándose a reglas nuevas.',
    options: [
      { text: 'Pedirle que refuerce tu equipo', outcomes: [
        { w:40, type:'card',      msg:'"No trabajo el metal que traen los Cazadores. Trabajo lo que queda en sus manos después de los combates. El rastro." Hace algo con gestos que no entiendes. El resultado es funcional.' },
        { w:35, type:'gold_loss', amount:15, msg:'"El trabajo tiene precio." Lo cobra sin negociar. La mejora es real pero no lo que esperabas. "El metal de este distrito no obedece las mismas reglas."' },
        { w:25, type:'heal',      amount:15, msg:'"No es lo que pediste, pero es lo que necesitas." Trabaja algo que lleva en la fragua desde hace tiempo. El resultado te cura de formas que el metal no debería poder hacer.' }
      ]},
      { text: 'Preguntarle qué es ese fuego que no calienta', outcomes: [
        { w:50, type:'lore',       msg:'"Fuego de Noctis. Del núcleo. Cuando la noche se volvió permanente, el calor fue lo primero que cambió. La ciudad mantiene la temperatura que necesita para sus propósitos, no los nuestros."' },
        { w:30, type:'gold',       amount:20, msg:'"No me lo explico yo mismo después de meses." Te da algo forjado con ese fuego. "Vende esto fuera si llegas. Vale más de lo que pesa."' },
        { w:20, type:'debuff_mana', msg:'"Eso pregunto yo cada día." Te deja tocar las llamas. No quema. Pero toma algo. "El fuego de la ciudad siempre toma algo. No sé qué tomó de ti."' }
      ]},
      { text: 'Ayudarle a mover el metal pesado', outcomes: [
        { w:45, type:'gold', amount:25, msg:'Trabaja en silencio a tu lado. Al terminar, divide lo producido equitativamente. "Primera vez en semanas que hay dos pares de manos."' },
        { w:30, type:'card', msg:'El trabajo conjunto produce algo inesperado. "El metal reacciona diferente con energía de dos personas." Te da el resultado. "No sé usarlo. Puede que tú sí."' },
        { w:25, type:'bleed', amount:2, msg:'El metal de la ciudad tiene filo propio. "Debería haberte advertido." Lo trata con eficiencia profesional. "No siempre se corta de la misma forma."' }
      ]}
    ]
  },

  // ══════════════════════════════
  //  TODOS LOS ACTOS
  // ══════════════════════════════

  {
    id: 'profeta_callejon',
    acts: [0, 1, 2],
    npc: 'npc_profeta',
    npcName: 'Voz desde un callejón oscuro',
    intro: 'Desde un callejón lateral, una voz recita nombres en voz alta. Nombres que no reconoces. Salvo uno, que podría ser el tuyo, aunque no puedas explicar cómo lo sabe.',
    options: [
      { text: 'Entrar al callejón', outcomes: [
        { w:35, type:'lore',   msg:'Una figura anciana con ojos completamente blancos. "Los que llegan al centro tienen siempre el mismo problema: no entienden que llegar no es suficiente. El acto de romper algo requiere entender qué es lo que lo sostiene."' },
        { w:35, type:'gold',   amount:20, msg:'El callejón está vacío cuando entras. Sólo una bolsa en el suelo con tu nombre escrito. La voz ya no se escucha.' },
        { w:30, type:'ambush', msg:'La voz calla cuando entras. El callejón huele a niebla concentrada. "Curiosidad excesiva", dice alguien en la oscuridad.' }
      ]},
      { text: 'Llamar a la voz sin entrar', outcomes: [
        { w:40, type:'lore', msg:'"Los nombres que recito son los que la ciudad ha registrado como amenazas a su continuidad. Llevo tu nombre en la lista desde que cruzaste el primer portal." Pausa. "Eso es bueno. Significa que te tiene miedo."' },
        { w:35, type:'heal', amount:12, msg:'"Bien. No entres donde no puedes ver." Algo rueda desde el callejón hasta tus pies. Un frasco. "Para los que tienen la prudencia de no entrar en todos los callejones oscuros."' },
        { w:25, type:'none', msg:'La voz se interrumpe al escucharte. Larga pausa. "Pasas de largo. Interesante." No dice nada más.' }
      ]},
      { text: 'Ignorarlo y seguir', outcomes: [
        { w:50, type:'none',        msg:'La voz sigue recitando. Tu nombre aparece una vez más en la lista mientras te alejas. Hace frío de una forma que no tiene que ver con la temperatura.' },
        { w:30, type:'card',        msg:'Cuando has dado cinco pasos, algo cae a tus pies desde arriba. "Para los que saben cuándo no detenerse."' },
        { w:20, type:'debuff_bleed', amount:1, msg:'La lista continúa. Sientes algo al alejarte, como si una parte muy pequeña de ti se quedara escuchando aunque no quieras.' }
      ]}
    ]
  },

  {
    id: 'ladron_tejado',
    acts: [0, 1],
    npc: 'npc_ladron',
    npcName: 'Figura ágil en el tejado',
    intro: 'Percibes movimiento en un tejado cercano antes de que la voz llegue desde arriba. "No te mueves mal para alguien que va por la calle principal." No es una amenaza. Suena casi a cumplido.',
    options: [
      { text: 'Invitarle a bajar', outcomes: [
        { w:40, type:'gold',   amount:18, msg:'Baja con facilidad. "Llevo aquí desde antes de que todo cambiara. Conozco cada tejado, cada portal, cada guarida." Te da información específica y una bolsa que "ya no necesitaba el anterior propietario".' },
        { w:35, type:'ambush', msg:'Baja. Pero no está solo. "Los tejados tienen sus propias reglas. Y sus propios impuestos."' },
        { w:25, type:'card',   msg:'Baja, evalúa, y saca algo de su bolsa. "Encontré esto en el último nido que vacié. No es para vender. Es para usar." Te lo da sin negociar.' }
      ]},
      { text: 'Preguntarle qué ha visto desde los tejados', outcomes: [
        { w:50, type:'lore', msg:'"El patrón de movimiento del Quinto Distrito. Los puntos donde la niebla es artificial. Los tres portales que llevan al nivel inferior sin pasar por el Palacio Central." Sonríe. "Eso último no lo sabe casi nadie."' },
        { w:30, type:'gold', amount:22, msg:'"Información cara." Pero no pide pago. "Estás yendo al centro. Los que van al centro hacen las cosas más interesantes." Tira algo desde el tejado.' },
        { w:20, type:'gold_loss', amount:12, msg:'"Desde los tejados se ve cuando alguien no presta atención a sus bolsillos." Sonríe. "La lección es gratis. Las monedas ya las cobré."' }
      ]},
      { text: 'Seguir sin prestarle atención', outcomes: [
        { w:45, type:'gold_loss', amount:10, msg:'La lección de prestar atención a voces en tejados se aprende tarde. Las monedas ya no están donde estaban.' },
        { w:35, type:'none',      msg:'"Bien jugado", dice la voz alejándose. "Los que ignoran lo que está encima suelen llegar más lejos." Podría ser verdad.' },
        { w:20, type:'card',      msg:'Tres pasos después, algo cae del tejado. Una carta. "Para el siguiente que pase. Tú eres el siguiente."' }
      ]}
    ]
  }

];

// ═══════════════════════════════════════════════
//  GESTIÓN DE EVENTOS EN EL MAPA
// ═══════════════════════════════════════════════

function pickDialogueEvents(actNum) {
  const pool = DIALOGUE_EVENTS.filter(e => e.acts.includes(actNum));
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const count = 2 + Math.floor(Math.random() * 3); // 2, 3 o 4 por acto
  return shuffled.slice(0, count).map(e => e.id);
}

function assignDialogueEvents(mapData) {
  return mapData.map((act, ai) => ({
    ...act,
    dialoguePool: pickDialogueEvents(ai),
    dialogueUsed: []
  }));
}

function getNextDialogueEvent(actNum) {
  const act = G.map[actNum];
  if (!act || !act.dialoguePool) return null;
  const remaining = act.dialoguePool.filter(id => !(act.dialogueUsed || []).includes(id));
  if (remaining.length === 0) return null;
  const id = remaining[Math.floor(Math.random() * remaining.length)];
  if (!act.dialogueUsed) act.dialogueUsed = [];
  act.dialogueUsed.push(id);
  return DIALOGUE_EVENTS.find(e => e.id === id) || null;
}

// ═══════════════════════════════════════════════
//  APLICAR RESULTADO DE EVENTO
// ═══════════════════════════════════════════════

function applyEventOutcome(outcome) {
  const p = G.player;
  switch(outcome.type) {
    case 'heal': {
      const healed = Math.min(p.maxHp - p.hp, outcome.amount || 0);
      p.hp += healed;
      break;
    }
    case 'gold':
      G.gold += (outcome.amount || 0);
      break;
    case 'gold_loss':
      G.gold = Math.max(0, G.gold - (outcome.amount || 0));
      if (outcome.gold_gain) G.gold += outcome.gold_gain;
      break;
    case 'card': {
      const cardPool = CARDS.filter(c =>
        !['strike','shield','bullet'].includes(c.id) &&
        ['uncommon','rare'].includes(c.rarity)
      );
      if (cardPool.length > 0) {
        const picked = cardPool[Math.floor(Math.random() * cardPool.length)];
        p.deck.push(picked.id);
        saveG();
        return { pickedCard: picked }; // ← devuelve la carta para mostrarla
      }
      break;
    }
    case 'bleed':
    case 'debuff_bleed':
      G._pendingBleed = (G._pendingBleed || 0) + (outcome.amount || 1);
      break;
    case 'poison':
    case 'debuff_poison':
      G._pendingPoison = (G._pendingPoison || 0) + (outcome.amount || 1);
      break;
    case 'debuff_mana':
      G._pendingManaMinus = (G._pendingManaMinus || 0) + 1;
      break;
    case 'ambush':
      G._ambushPenalty = true;
      break;
    case 'lore':
    case 'none':
    default:
      break;
  }
  saveG();
  return {};
}

function applyPendingDebuffs() {
  const p = G.player;
  if (G._pendingBleed)    { p.bleed  = (p.bleed  || 0) + G._pendingBleed;  delete G._pendingBleed; }
  if (G._pendingPoison)   { p.poison = (p.poison || 0) + G._pendingPoison; delete G._pendingPoison; }
  if (G._pendingManaMinus){ p.mana   = Math.max(0, p.mana - G._pendingManaMinus); delete G._pendingManaMinus; }
}

// ═══════════════════════════════════════════════
//  PANTALLA DE EVENTO DE DIÁLOGO
// ═══════════════════════════════════════════════

function showDialogueEvent(event, onComplete) {
  playUI();
  const existing = document.getElementById('dialogueOverlay');
  if (existing) existing.remove();

  const npcImg = getImg(event.npc);
  const imgHtml = npcImg
    ? `<img src="${npcImg}" style="width:100px;height:136px;object-fit:cover;border-radius:6px;border:1px solid #d4a84344;box-shadow:0 0 20px #00000088;flex-shrink:0;">`
    : `<div style="width:100px;height:136px;border-radius:6px;border:1px solid #d4a84344;background:#1a1030;display:flex;align-items:center;justify-content:center;font-size:38px;flex-shrink:0;">👤</div>`;

  const optionsHtml = event.options.map((opt, i) => `
    <button class="dialogue-opt" data-idx="${i}" style="
      width:100%;background:#160e26;border:1px solid #2a1e3a;border-radius:8px;
      padding:13px 16px;cursor:pointer;text-align:left;transition:border-color .2s,background .2s;
      font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#e8d8ba;line-height:1.6;
      margin-bottom:9px;box-sizing:border-box;
    " onmouseover="this.style.borderColor='#d4a84366';this.style.background='#1e1430'"
       onmouseout="this.style.borderColor='#2a1e3a';this.style.background='#160e26'">
      <span style="color:#d4a843;font-family:'Cinzel',serif;font-size:11px;letter-spacing:.18em;text-transform:uppercase;display:block;margin-bottom:5px">${String.fromCharCode(65+i)}</span>
      ${opt.text}
    </button>
  `).join('');

  const ov = document.createElement('div');
  ov.id = 'dialogueOverlay';
  ov.style.cssText = 'position:fixed;inset:0;z-index:8500;display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;background:rgba(5,3,12,.95);backdrop-filter:blur(8px);animation:fadeIn .3s ease;padding:16px 0 40px;';
  ov.innerHTML = `
    <div style="background:linear-gradient(160deg,#1a1030,#110c20);border:1px solid #d4a84333;border-radius:12px;padding:22px 20px 24px;width:min(540px,96vw);box-shadow:0 0 60px #00000099,0 0 30px #d4a84311;box-sizing:border-box;">
      <div style="font-size:10px;letter-spacing:.35em;text-transform:uppercase;color:#7a6888;margin-bottom:14px;font-family:'Cinzel',serif;text-align:center;">✦ &nbsp; Encuentro &nbsp; ✦</div>
      <div style="display:flex;gap:14px;align-items:flex-start;margin-bottom:18px;flex-wrap:nowrap;">
        ${imgHtml}
        <div style="flex:1;min-width:0;">
          <div style="font-family:'Cinzel',serif;font-size:13px;color:#d4a843;letter-spacing:.08em;margin-bottom:8px;">${event.npcName}</div>
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#c8b89a;line-height:1.7;">${event.intro}</div>
        </div>
      </div>
      <div style="height:1px;background:linear-gradient(90deg,transparent,#d4a84333,transparent);margin-bottom:16px;"></div>
      <div id="dialogueOptions">${optionsHtml}</div>
      <div id="dialogueResult" style="display:none;"></div>
    </div>`;

  document.body.appendChild(ov);

  ov.querySelectorAll('.dialogue-opt').forEach(btn => {
    btn.addEventListener('click', function() {
      const opt = event.options[parseInt(this.dataset.idx)];
      let r = Math.random() * opt.outcomes.reduce((s,o)=>s+o.w,0);
      let chosen = opt.outcomes[opt.outcomes.length-1];
      for (const o of opt.outcomes) { r -= o.w; if (r <= 0) { chosen = o; break; } }

      const applyResult = applyEventOutcome(chosen);

      document.getElementById('dialogueOptions').style.display = 'none';
      const resultEl = document.getElementById('dialogueResult');
      resultEl.style.display = 'block';
      resultEl.innerHTML = `
        <div style="background:#0f0c18;border:1px solid #d4a84322;border-radius:8px;padding:16px 18px;margin-bottom:4px;">
          ${getResultBadge(chosen.type, applyResult && applyResult.pickedCard, chosen.amount)}
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#c8b89a;line-height:1.75;margin-top:12px;">${chosen.msg}</div>
        </div>
        <div style="text-align:center;margin-top:18px;">
          <button id="dialogueContinue" style="font-family:'Cinzel',serif;font-size:12px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#d4a843;background:linear-gradient(135deg,#2a1a3a,#1a0a28);border:1px solid #d4a84344;border-radius:4px;padding:12px 28px;cursor:pointer;transition:all .25s;"
            onmouseover="this.style.borderColor='#d4a843';this.style.background='linear-gradient(135deg,#3a2a4a,#2a1a3a)'"
            onmouseout="this.style.borderColor='#d4a84344';this.style.background='linear-gradient(135deg,#2a1a3a,#1a0a28)'">
            Continuar →
          </button>
        </div>`;

      document.getElementById('dialogueContinue').addEventListener('click', () => {
        playUI();
        ov.style.animation = 'fadeOut .2s ease forwards';
        setTimeout(() => {
          ov.remove();
          if (chosen.type === 'ambush') { G._ambushPenalty = true; startCombat(G.path && G.path.act === 1 ? 1 : 0); }
          else { onComplete(); }
        }, 200);
      });
    });
  });
}
function getResultBadge(type, pickedCard, amount) {
  const rarityColors = { common:'#a0a0b0', uncommon:'#60aaee', rare:'#cc80ff', legendary:'#ffcc44' };
  if (type === 'card' && pickedCard) {
    const rc = rarityColors[pickedCard.rarity] || '#9a5aee';
    const rarityLabel = {common:'Común',uncommon:'Infrecuente',rare:'Rara',legendary:'Legendaria'}[pickedCard.rarity] || '';
    return `<div style="display:flex;flex-direction:column;gap:4px;">
      <div style="display:inline-flex;align-items:center;gap:8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;text-transform:uppercase;color:#9a5aee;border:1px solid #9a5aee33;border-radius:4px;padding:5px 12px;background:#9a5aee0f;">🃏&nbsp;Carta obtenida</div>
      <div style="display:inline-flex;align-items:center;gap:8px;font-family:'Cinzel',serif;font-size:13px;color:${rc};border:1px solid ${rc}44;border-radius:4px;padding:6px 14px;background:${rc}11;margin-top:2px;">
        <span style="font-size:16px;">✦</span>
        <span style="font-weight:600;letter-spacing:.05em;">${pickedCard.name}</span>
        <span style="font-size:10px;opacity:.7;letter-spacing:.1em;text-transform:uppercase;">${rarityLabel}</span>
      </div>
    </div>`;
  }
  const goldLabel = amount ? `+${amount} 🪙 Oro` : '🪙 Recompensa';
  const healLabel = amount ? `❤ +${amount} Vitalidad recuperada` : '❤ Curación';
  const b = {
    heal:          { c:'#4acc70', i:'❤',  t: amount ? `+${amount} Vitalidad recuperada` : 'Curación' },
    gold:          { c:'#d4a843', i:'🪙', t: amount ? `+${amount} monedas de oro` : 'Recompensa' },
    gold_loss:     { c:'#c03040', i:'🪙', t: amount ? `-${amount} monedas de oro` : 'Pérdida' },
    card:          { c:'#9a5aee', i:'🃏', t:'Carta obtenida' },
    bleed:         { c:'#c03040', i:'🩸', t:'Sangrado al inicio del próximo combate' },
    debuff_bleed:  { c:'#c03040', i:'🩸', t:'Sangrado al inicio del próximo combate' },
    debuff_poison: { c:'#4a8a30', i:'☠',  t:'Veneno al inicio del próximo combate' },
    debuff_mana:   { c:'#3a6acc', i:'✦',  t:'Maná reducido en el próximo combate' },
    ambush:        { c:'#c03040', i:'⚔',  t:'¡Emboscada!' },
    lore:          { c:'#7a6888', i:'📜', t:'Conocimiento' },
  }[type];
  if (!b) return '';
  return `<div style="display:inline-flex;align-items:center;gap:8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:${b.c};border:1px solid ${b.c}33;border-radius:4px;padding:5px 12px;background:${b.c}0f;">${b.i}&nbsp;${b.t}</div>`;
}


function enterNode(ai,ri,ci){
  G.path={act:ai,row:ri,col:ci};
  saveG();
  const node = ri===6 ? G.map[ai].boss : G.map[ai].rows[ri][ci];
  if(!node)return;
  if(['combat','elite','boss'].includes(node.type)){
    playUI();
    runEncounters++;
    startCombat(node.type==='combat'?0:node.type==='elite'?1:2);
  } else if(node.type==='rest'){
    playUI(); show('rest');
  } else if(node.type==='shop'){
    playUI(); showShop();
  } else if(node.type==='chest'){
    playUI(); showChest();
  }
}

function advance(){
  const {act,row,col}=G.path;
  // Marcar nodo actual como visitado
  if(row===6){ G.map[act].boss.visited=true; }
  else if(col!==null){ G.map[act].rows[row][col].visited=true; }

  // ── Cambio de acto (tras boss) ──
  if(row===6){
    const nextAct=act+1;
    if(nextAct>=G.map.length){
      localStorage.removeItem(SK);
      showPostAct3();
      return;
    }
    // Arrancar el acto siguiente siempre desde fila 0, sin columna elegida
    G.path={act:nextAct, row:0, col:null};
    saveG();
    showMap();
    return;
  }

  // ── Avance normal dentro del mismo acto ──
  const nextRow = row + 1;
  G.path = {act, row:nextRow, col:null};
  saveG();

  // ¿Toca evento de diálogo tras completar esta fila?
  const actData = G.map[act];
  if(actData && Array.isArray(actData.dialogueTriggers) && actData.dialogueTriggers.includes(row)){
    const evt = getNextDialogueEvent(act);
    if(evt){
      showDialogueEvent(evt, ()=>showMap());
      return;
    }
  }
  showMap();
}

// ═══════════════════════════════════════════════
//  POST-ACT 3 — Menu or Infinite Mode
// ═══════════════════════════════════════════════
function showPostAct3() {
  // ← Desbloquear reliquia de personaje AQUÍ, sin importar qué elija el jugador después
  checkRelicUnlocks(true);

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
  finalizeRunStats(true);  // stats + leaderboard (checkRelicUnlocks ya fue en showPostAct3)
  const ov = document.getElementById('postAct3Overlay');
  if(ov) { ov.style.opacity='0'; setTimeout(()=>ov.style.display='none',350); }
  showCredits();
}

function startInfiniteMode() {
  const ov = document.getElementById('postAct3Overlay');
  if(ov) { ov.style.opacity='0'; setTimeout(()=>ov.style.display='none',350); }
  // Guardar stats de la run normal antes de entrar al infinito
  finalizeRunStats(true); // usa el guard runFinalized, no duplica
  runFinalized = false;   // reset para que el infinito pueda registrarse al morir
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

function pickInfiniteType(enc) {
  // Encuentros 9, 19, 29... → jefe (índice base-0 antes de incrementar)
  if((enc + 1) % 10 === 0) return 'boss';
  // Cada 10 encuentros la probabilidad de tienda/descanso/cofre baja un 15%
  const cycles = Math.floor(enc / 10);
  const bonusMult = Math.max(0, 1 - cycles * 0.15);
  const r = Math.random();
  const rest  = 0.16 * bonusMult;
  const shop  = rest  + 0.12 * bonusMult;
  const chest = shop  + 0.12 * bonusMult;
  const elite = chest + 0.18;
  if(r < rest)  return 'rest';
  if(r < shop)  return 'shop';
  if(r < chest) return 'chest';
  if(r < elite) return 'elite';
  return 'combat';
}

function renderInfiniteMap() {
  const c = document.getElementById('mapActs');
  c.innerHTML = '';

  const mult = getInfiniteMultiplier();
  const enc  = G.infiniteEncounters || 0;
  const nextType = pickInfiniteType(enc);

  const IC    = {combat:'⚔',elite:'💀',rest:'🕯',shop:'🛒',chest:'📦',boss:'👁'};
  const LABEL = {combat:'COMBATE',elite:'ÉLITE',rest:'DESCANSO',shop:'TIENDA',chest:'COFRE',boss:'JEFE'};
  const DESC  = {
    combat:'Un grupo de enemigos acecha entre las sombras.',
    elite:'Criaturas de élite bloquean tu camino.',
    rest:'Un santuario olvidado. Recupera fuerzas.',
    shop:'La Botica del Heraldo. Gasta tu oro con sabiduría.',
    chest:'Un cofre misterioso aguarda en la oscuridad.',
    boss:'El terror hecho carne te espera. Prepárate.'
  };

  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:24px';

  const title = document.createElement('div');
  title.style.cssText = 'font-family:"Cinzel Decorative",cursive;font-size:16px;color:#9a2f45;letter-spacing:3px;text-shadow:0 0 30px #c0305066';
  title.textContent = '🌑 Modo Infinito — La Oscuridad Sin Fin';
  wrapper.appendChild(title);

  const info = document.createElement('div');
  info.style.cssText = 'font-family:"Cinzel",serif;font-size:10px;color:#b8a8c8;letter-spacing:2px;text-align:center';
  info.innerHTML = `Encuentros: <span style="color:#e8b460">${enc}</span> · Multiplicador: <span style="color:#cc4060">${mult.toFixed(1)}×</span> · 🪙 <span style="color:#e8b460">${G.gold||0} oro</span>`;
  wrapper.appendChild(info);

  // Tarjeta del próximo encuentro
  const isBoss = nextType === 'boss';
  const card = document.createElement('div');
  card.style.cssText = `display:flex;flex-direction:column;align-items:center;gap:16px;background:linear-gradient(160deg,#1a1228,#0e0b18);border:2px solid ${isBoss?'#c03040':'#d4a84366'};border-radius:14px;padding:32px 48px;cursor:pointer;transition:all .25s;box-shadow:0 0 ${isBoss?'40px #c0304055':'20px #d4a84322'}`;
  card.innerHTML = `
    <div style="font-size:52px;filter:drop-shadow(0 0 20px ${isBoss?'#c03040aa':'#d4a843aa'})">${IC[nextType]}</div>
    <div style="font-family:'Cinzel Decorative',cursive;font-size:16px;color:${isBoss?'#e85060':'#d4a843'};letter-spacing:3px">${LABEL[nextType]}</div>
    <div style="font-family:'IM Fell English',serif;font-style:italic;font-size:12px;color:#7a6888;text-align:center;max-width:240px;line-height:1.6">${DESC[nextType]}</div>
    <div style="font-size:10px;color:#5a4870;font-family:'Cinzel',serif;letter-spacing:2px">Pulsa para continuar →</div>`;
  card.addEventListener('mouseenter', ()=>{ card.style.transform='translateY(-4px)'; card.style.boxShadow=`0 0 ${isBoss?'60px #c0304077':'36px #d4a84344'}`; });
  card.addEventListener('mouseleave', ()=>{ card.style.transform=''; card.style.boxShadow=`0 0 ${isBoss?'40px #c0304055':'20px #d4a84322'}`; });
  card.addEventListener('click', ()=> enterInfiniteNode(nextType));
  wrapper.appendChild(card);

  // Próximo jefe
  const next10 = 10 - (enc % 10);
  if(nextType !== 'boss'){
    const hint = document.createElement('div');
    hint.style.cssText = 'font-size:10px;color:#5a4070;font-family:"Cinzel",serif;letter-spacing:1.5px;font-style:italic';
    hint.textContent = next10 === 1 ? '⚠ El siguiente encuentro es un Jefe' : `👁 Jefe en ${next10} encuentros`;
    wrapper.appendChild(hint);
  }

  c.appendChild(wrapper);
}

function enterInfiniteNode(type) {
  playUI();
  G.infiniteEncounters = (G.infiniteEncounters||0) + 1;
  runEncounters++;
  checkInfiniteRelicUnlocks();
  saveG();
  if(type === 'combat') {
    startCombat(0, true);
  } else if(type === 'elite') {
    startCombat(1, true);
  } else if(type === 'boss') {
    startCombat(2, true);
  } else if(type === 'rest') {
    show('rest');
  } else if(type === 'shop') {
    showShop();
  } else if(type === 'chest') {
    showChest();
  }
}

function advanceInfinite() {
  saveG();
  const enc = G.infiniteEncounters || 0;
  showInfiniteMap();
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
  applyPendingDebuffs();
  const infiniteMult = (G.infiniteMode || isInfinite) ? getInfiniteMultiplier() : 1;
  G.enemies = buildEnemyGroup(tier, infiniteMult);
  G._combatTier = tier; // 0=normal, 1=elite, 2=boss
  G.targetIdx = 0;
  G.turn = 1;
  combatTurn = 0;
  G.firstHitUsed = false;
  G._playerDmgReduction = 0; // Guardián del Candil: se resetea en cada combate
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
  // En móvil: ocultar passiveInfo del panel (va al popup)
  if(isMobile()) { const pi = document.getElementById('passiveInfo'); if(pi) pi.style.display='none'; }
  _gunslingerAttacks = 0;
  _gunslingerReady   = false;
  // Cilindro Veloz: reduce threshold to 2
  if(hasRelic('cilindro_veloz')) _gunslingerThreshold = 2;
  else _gunslingerThreshold = 3;
  applyRelicCombatStart(); // ← startCombatHeal, firstHitBlock, startCombatMana
  renderRelicsPanel();
  renderEnemies();
  renderHand();
  renderPS();
  updMana();
  updateGunslingerHUD();
  document.getElementById('turnLbl').textContent = 'Turno 1';
  document.getElementById('clog').innerHTML = '';
  addLog(`¡Combate! ${G.enemies.map(e=>e.name).join(', ')}`, 'ene');
  show('game');
  // Móvil: asegurar que los bloques HP/MANA tienen la clase correcta
  if(isMobile()) {
    markMobileStatBlocks();
    // Ocultar pasiva del panel
    const pi = document.getElementById('passiveInfo');
    if(pi) pi.style.setProperty('display','none','important');
  }
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

    // Determine image key: custom imgKey > healer key > tier key
    const imgKey = e.imgKey ? e.imgKey : (e.isHealer ? 'enemy_healer' : ('enemy'+(e.tier||0)));
    const imgHtml = getImg(imgKey)
      ? `<img src="${getImg(imgKey)}" style="width:100%;height:100%;object-fit:contain">`
      : (e.isHealer ? getHealerSVG() : getESVG(e.name, e.tier||0));

    let statusHtml = '';
    if(e.block)  statusHtml += `<span class="si si-bk">🛡 ${e.block}</span>`;
    if(e.bleed)  statusHtml += `<span class="si si-bl">🩸 ${e.bleed}</span>`;
    if(e.poison) statusHtml += `<span class="si si-ps">☠ ${e.poison}</span>`;

    // Intent text
    let intentText;
    if(e.isHealer) {
      const action = getHealerAction(e, combatTurn);
      if(action==='heal')   intentText = `❤ Cura aliados (${e.healAmt||8})`;
      else if(action==='shield') intentText = `🛡 Escudo aliados (${e.shieldAmt||6})`;
      else if(action==='debuff') intentText = `☠ Maldición · Veneno/Sangrado`;
      else                  intentText = `⚔ Ataque: ${e.dmg}`;
    } else if(e.isCondesa) {
      const mode = e.condensaTurn % 3;
      if(mode === 0) intentText = `⚔ Ataque: ${e.dmg}`;
      else if(mode === 1) intentText = `🛡 Defensa: +${e.shieldPerTurn} escudo`;
      else intentText = `☠ Veneno: +${e.poisonPerTurn}`;
    } else if(e.isGuardian) {
      intentText = combatTurn % 2 === 0 ? `⚔ Ataque + reduce tu daño` : `👁 Oculta a un aliado`;
    } else if(e.isBaron) {
      intentText = `⚔ Barón Hemlock actúa...`;
    } else if(e.isMurcielago) {
      const turnsLeft = Math.max(0, 5 - (e.murcielagoTurns || 0));
      intentText = `⚔ Ataque: ${e.dmg} ${turnsLeft > 0 ? `· 🧛 en ${turnsLeft} turnos` : '· ¡Se transforma!'}`;
    } else if(e.isVampiro) {
      intentText = `⚔ Ataque: ${e.dmg} (roba ${e.lifestealOnAttack} HP)`;
    } else {
      intentText = `⚔ Ataque: ${e.dmg}`;
    }

    // Special badges
    const healerBadge  = e.isHealer ? `<div style="font-family:'Cinzel',serif;font-size:7px;letter-spacing:1.5px;color:#60ee90;background:#1a3a1a55;border:1px solid #4acc7066;padding:2px 6px;border-radius:3px;margin-bottom:2px">✚ SANADORA</div>` : '';
    const hiddenBadge  = e._hidden    ? `<div style="font-family:'Cinzel',serif;font-size:8px;letter-spacing:2px;color:#b8a8d8;background:#1a1a3a99;border:1px solid #8870cc88;padding:3px 8px;border-radius:3px;margin-bottom:2px">👤 OCULTO</div>` : '';

    // If enemy is hidden: ghost appearance + big OCULTO overlay, no click
    const hiddenStyle = e._hidden ? 'opacity:.22;filter:grayscale(.9) blur(1px)' : '';
    const hiddenOverlay = e._hidden ? `
      <div style="
        position:absolute;inset:0;z-index:20;
        display:flex;flex-direction:column;align-items:center;justify-content:center;
        background:linear-gradient(180deg,#080610cc,#1a103888);
        border-radius:6px;pointer-events:none;gap:4px;
      ">
        <div style="font-size:22px;filter:drop-shadow(0 0 8px #9060cc)">👤</div>
        <div style="font-family:'Cinzel',serif;font-size:9px;letter-spacing:3px;color:#c8b0f0;text-shadow:0 0 10px #9060cc;text-transform:uppercase">Oculto</div>
      </div>` : '';

    wrap.innerHTML = `
      ${healerBadge}
      <div class="e-name">${e.name}</div>
      <div class="e-sprite" id="eSprite${i}" style="position:relative;${hiddenStyle}">
        ${imgHtml}
        ${hiddenOverlay}
      </div>
      <div class="e-hp-wrap">
        <div class="e-hp-bar" id="eHpBar${i}" style="width:${hpPct}%"></div>
        <div class="e-hp-txt">${Math.max(0,e.hp)} / ${e.maxHp}</div>
      </div>
      <div class="e-intent">${e._hidden ? '👤 Oculto en la oscuridad' : intentText}</div>
      <div class="si-wrap" style="justify-content:center;margin-top:3px">${statusHtml}</div>
      <div class="target-indicator">${i===G.targetIdx?'▼ OBJETIVO ▼':''}</div>
    `;
    // Bloquear selección de enemigos ocultos
    if(e._hidden) {
      wrap.style.cursor = 'not-allowed';
      wrap.style.opacity = '0.5';
      wrap.addEventListener('click', (ev) => {
        ev.stopPropagation();
        addLog('No puedes atacar a un enemigo oculto en la oscuridad.','sta');
      });
    } else {
      wrap.addEventListener('click', () => { G.targetIdx = i; renderEnemies(); });
    }
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


// ✏ CAMBIO 9: TOOLTIP DE ESTADOS ALTERADOS EN CARTAS
const STATUS_DESCRIPTIONS = {
  bleed: { label:'🩸 Sangrado', color:'#ff7080',
    text:'Al final de cada turno el objetivo pierde 2 HP por contador de sangrado. Se reduce en 1 cada turno.' },
  poison: { label:'☠ Veneno',  color:'#a0e060',
    text:'Al final de cada turno el objetivo pierde HP igual a su nivel de veneno. Decae en 1 por turno.' },
  block:  { label:'🛡 Bloqueo', color:'#90c8ff',
    text:'Absorbe el daño entrante antes de afectar la Vitalidad. Se pierde al inicio del siguiente turno.' },
};

// Portal dedicado — se añade directamente al <html> para escapar de
// cualquier stacking context creado por overflow:hidden o transform en #app / .screen
function _getTipPortal(){
  let p = document.getElementById('_tipPortal');
  if(!p){
    p = document.createElement('div');
    p.id = '_tipPortal';
    // Fuera del #app por completo
    p.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:2147483647;overflow:visible';
    document.documentElement.appendChild(p); // <html>, no <body>
  }
  return p;
}

let _activeTip = null;
function _removeTip(){
  if(_activeTip){ _activeTip.remove(); _activeTip = null; }
}

function addStatusTooltips(wrapEl, card){
  wrapEl.querySelectorAll('.fx').forEach(fxEl => {
    let sk = null;
    if(fxEl.classList.contains('fx-bl'))     sk = 'bleed';
    else if(fxEl.classList.contains('fx-p')) sk = 'poison';
    else if(fxEl.classList.contains('fx-b')) sk = 'block';
    if(!sk) return;
    const info = STATUS_DESCRIPTIONS[sk];
    if(!info) return;

    function showTip(){
      _removeTip();
      const rect = fxEl.getBoundingClientRect();
      const tip = document.createElement('div');
      tip.className = 'status-tooltip';
      tip.innerHTML = '<b style="color:'+info.color+'">'+info.label+'</b>'+info.text;
      // Insertar en el portal invisible primero para medir
      const portal = _getTipPortal();
      tip.style.cssText = 'position:absolute;left:-9999px;top:-9999px;visibility:hidden';
      portal.appendChild(tip);
      _activeTip = tip;
      const tw = tip.offsetWidth  || 200;
      const th = tip.offsetHeight || 88;
      // Posición: centrado sobre el badge, preferir arriba
      let lx = rect.left + rect.width/2 - tw/2;
      lx = Math.max(8, Math.min(window.innerWidth - tw - 8, lx));
      let ty = rect.top - th - 10;
      if(ty < 8) ty = rect.bottom + 8;
      if(ty + th > window.innerHeight - 8) ty = Math.max(8, (window.innerHeight - th) / 2);
      tip.style.cssText = 'position:fixed;left:'+lx+'px;top:'+ty+'px;pointer-events:none;visibility:visible';
    }

    fxEl.addEventListener('mouseenter', e => { e.stopPropagation(); showTip(); });
    fxEl.addEventListener('mouseleave', () => _removeTip());
    fxEl.addEventListener('touchstart', e => {
      e.stopPropagation();
      if(_activeTip){ _removeTip(); return; }
      showTip();
      setTimeout(_removeTip, 3200);
    }, {passive:true});
  });
}

// ═══════════════════════════════════════════════
//  RENDER HAND
// ═══════════════════════════════════════════════
function renderHand(){
  const zone=document.getElementById('handZone');zone.innerHTML='';
  const p=G.player,n=p.hand.length;
  for(let hi=0;hi<n;hi++){
    const card=cById(p.hand[hi]);
    if(!card)continue;
    const wrap=document.createElement('div');wrap.className='c-slot';
    const sp=Math.min(26,13*n),angle=n>1?-sp/2+(sp/(n-1))*hi:0;
    wrap.style.cssText=`transform:rotate(${angle}deg) translateY(${Math.abs(angle)*.5}px);z-index:${hi+1};margin-left:${hi===0?0:-16}px`;
    const can=card.cost<=p.mana;
    const g=document.createElement('div');g.className=`gcard ${card.type} ${can?'playable':'unplayable'}`;
    const ds=card.triple?card.dmg*3:card.dbl?card.dmg*2:card.dmg;
    let fx='';
    if(card.dmg)fx+=`<span class="fx fx-d">⚔ ${ds}</span>`;
    if(card.blk)fx+=`<span class="fx fx-b">🛡 ${card.blk}</span>`;
    if(card.bleed)fx+=`<span class="fx fx-bl">🩸 ${card.bleed}</span>`;
    if(card.psn)fx+=`<span class="fx fx-p">☠ ${card.psn}</span>`;
    if(card.heal)fx+=`<span class="fx fx-hl">❤ ${card.heal}</span>`;
    g.innerHTML=`<div class="c-bar"></div><div class="c-cost">${card.cost}</div><div class="c-art">${getCArt(card)}</div><div class="c-name">${card.name}</div><div class="c-fx">${fx}</div>`;
    wrap.appendChild(g);
    if(can){
      // Capturar el ID de la carta — buscar posición en tiempo de click para evitar índices obsoletos
      (function(cardId,w){
        w.addEventListener('click',function(ev){
          ev.stopPropagation();
          const currentIdx = G.player.hand.indexOf(cardId);
          if(currentIdx === -1) return; // carta ya jugada
          if(!getDoubleConfirm()){
            playCard(currentIdx);
            return;
          }
          if(w.classList.contains('card-selected')){
            const idx2 = G.player.hand.indexOf(cardId);
            if(idx2 === -1) return;
            playCard(idx2);
            return;
          }
          document.querySelectorAll('.c-slot.card-selected').forEach(function(el){
            el.classList.remove('card-selected');
            el.style.transform=el._baseTransform||'';
          });
          w._baseTransform=w.style.transform;
          w.classList.add('card-selected');
          w.style.transform=(w._baseTransform||'')+' translateY(-48px) scale(1.12)';
        });
      })(p.hand[hi],wrap);
    }
    addStatusTooltips(wrap,card);
    zone.appendChild(wrap);
  }
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
let _gunslingerThreshold = 3;

function playCard(hi){
  sfxPlayCard();
  const p=G.player;
  const id=p.hand[hi];
  const card=cById(id);
  const e=G.enemies[G.targetIdx];
  // Amuleto Carmesí: cartas legendarias cuestan 1 menos (mín 0)
  const costReduction = (hasRelic('amuleto_carmesi') && card && card.rarity==='legendary') ? 1 : 0;
  if(!card||(card.cost - costReduction)>p.mana)return;
  if(!e||e.dead||e._hidden){
    // Si el target está muerto u oculto, busca el primer enemigo válido (vivo y no oculto)
    const alive = G.enemies.findIndex(en=>!en.dead && !en._hidden);
    if(alive>=0){ G.targetIdx=alive; }
    else {
      // Solo quedan ocultos: no se puede atacar
      if(card.dmg) { addLog('No hay objetivos atacables — todos están ocultos.','sta'); return; }
    }
  }
  // Verificación final: si el target actual está oculto y la carta hace daño, avisar
  const currentTarget = G.enemies[G.targetIdx];
  if(card.dmg && currentTarget && currentTarget._hidden) {
    addLog('No puedes atacar a un enemigo oculto en la oscuridad.','sta');
    return;
  }
  const target = G.enemies[G.targetIdx];

  p.mana-=Math.max(0, card.cost - costReduction);
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
        if(_gunslingerAttacks>=_gunslingerThreshold){_gunslingerReady=true;_gunslingerAttacks=0;}
        updateGunslingerHUD();
      }
    }

    let hits = card.triple ? 3 : (card.dbl ? 2 : 1);
    let totalDmgDealt = 0;
    sfxPlayerAttack();
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
  if(card.blk){p.block+=card.blk;msg+=` · +${card.blk} bloqueo`;spawnN(card.blk,'bk');sfxBlock();}
  if(card.bleed){target.bleed+=card.bleed;msg+=` · ${card.bleed} sangrado`;}
  if(card.psn){let ps=card.psn;if(G.charId==='hechicera')ps++;if(hasRelic('tomo_envenenado'))ps+=1;target.poison+=ps;msg+=` · ${ps} veneno`;}
  if(card.heal){
    const h=Math.min(p.maxHp,p.hp+card.heal)-p.hp;
    p.hp+=h;
    msg+=` · +${h} vida`;
    runDmgHealed += h;
    animateHeal(h);
    if(h>0) sfxHeal();
  }
  addLog(msg,'sta');

  if(target.hp<=0){
    target.dead=true;
    sfxEnemyDeath();
    // Amuleto Carmesí: draw 1 card on kill
    if(hasRelic('amuleto_carmesi')){
      drawUpTo(G.player.hand.length+1);
      addLog('Amuleto Carmesí: roba 1 carta','sta');
    }
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
  if(G.charId!=='pistolero'&&!hasRelic('cilindro_veloz')){el.style.display='none';return;}
  if(G.charId!=='pistolero'){el.style.display='none';return;}
  el.style.display='flex';
  el.innerHTML=_gunslingerReady
    ? `<span style="color:#ffcc44;font-size:10px;letter-spacing:1px;font-family:'Cinzel',serif">🔥 ¡CARGADO!</span>`
    : `<span style="font-size:9px;letter-spacing:1px;color:var(--dim)">🔫 ${_gunslingerAttacks}/${_gunslingerThreshold}</span>`;
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
  playUI();
  const p=G.player;
  const aliveEnemies = G.enemies.filter(e=>!e.dead);

  // DoTs on enemies
  aliveEnemies.forEach(e=>{
    if(e.bleed>0){const d=2;e.hp=Math.max(0,e.hp-d);e.bleed--;addLog(`${e.name} sangra (-${d})`,'ene');animateHit(e);}
    if(e.poison>0){
      const poisBonus=(G.charId==='hechicera'||hasRelic('tomo_envenenado'))?1:0;
      const d=e.poison+poisBonus;
      e.hp=Math.max(0,e.hp-d);
      // Tomo Envenenado: el veneno no decae
      if(!hasRelic('tomo_envenenado')) e.poison=Math.max(0,e.poison-1);
      addLog(`${e.name} envenena (-${d})`,'ene');animateHit(e);
    }
    if(e.hp<=0){ e.dead=true; sfxEnemyDeath(); }
  });

  // Vampiro se cura cuando muere un aliado
  checkVampiroAllyDeaths();

  if(G.enemies.filter(e=>!e.dead).length===0){
    renderEnemies();
    setTimeout(()=>combatWin(),400);
    return;
  }

  // Each alive enemy acts
  // Primero: limpiar el estado oculto del turno anterior (ya duró todo el turno del jugador)
  G.enemies.forEach(e => { e._hidden = false; });

  aliveEnemies.filter(e=>!e.dead).forEach(e=>{
    if(e.isHealer) {
      doHealerAction(e);
    } else if(e.isVampiro) {
      doVampiroAction(e);
    } else if(e.isCondesa) {
      doCondesaAction(e);
    } else if(e.isGuardian) {
      doGuardianAction(e);
    } else if(e.isBaron) {
      doBaronAction(e);
    } else if(e.isMurcielago) {
      doMurcielagoAction(e);
    } else {
      // Normal attack
      if(!e._hidden) {
        let actualDmg=e.dmg;
        // Espectro firstHit OR Espejo Espectral relic
        const hasFirstHitEffect = (G.charId==='espectro') || hasRelic('espejo_espectral');
        if(hasFirstHitEffect && !G.firstHitUsed){
          G.firstHitUsed=true;actualDmg=0;
          const relicBonus=hasRelic('espejo_espectral')&&G.charId!=='espectro';
          if(relicBonus){ G.player.block+=4; addLog('Espejo Espectral: golpe evitado · +4 bloqueo','sta'); }
          else addLog('Forma Etérea: golpe evitado!','sta');
        }
        // Guardián: reduce daño del jugador (accumulated stacks)
        const dmgReduction = G._playerDmgReduction || 0;
        actualDmg = Math.max(1, actualDmg - dmgReduction);
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
    }
  });

  // Aplicar ocultaciones pendientes del Guardián (durarán el turno del jugador)
  G.enemies.forEach(e => {
    if(e._hiddenNextTurn) { e._hidden = true; e._hiddenNextTurn = false; }
  });

  // Evolucionar murciélagos a vampiros si llegan a 5 turnos
  G.enemies.forEach((e, idx) => {
    if(e.isMurcielago && !e.dead) {
      e.murcielagoTurns = (e.murcielagoTurns || 0) + 1;
      if(e.murcielagoTurns >= 5) {
        evolveToVampiro(idx);
      }
    }
  });

  combatTurn++;

  // Player DoTs
  if(p.bleed>0){p.hp=Math.max(0,p.hp-2);p.bleed--;}
  if(p.poison>0){p.hp=Math.max(0,p.hp-p.poison);p.poison=Math.max(0,p.poison-1);}

  if(p.hp<=0){
    sfxPlayerDeath();
    renderPS();
    document.getElementById('s-game').classList.add('shake');
    setTimeout(()=>{
      document.getElementById('s-game').classList.remove('shake');
      localStorage.removeItem(SK);
      checkInfiniteRelicUnlocks(); // ← comprobar reliquias infinitas al morir
      finalizeRunStats(false);
      document.getElementById('overStats').textContent=`${G.heroName}  ·  Turno ${G.turn}  ·  Oro: ${G.gold}${G.infiniteMode?' · Modo Infinito':''}`;
      show('over');
    },400);
    return;
  }

  G.turn++;
  sfxPlayerTurn();
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

// ─── ACTO 2: VAMPIRO ─────────────────────────────
// Roba vida al atacar. Recupera mucha vida cuando muere un aliado.
function doVampiroAction(e) {
  const p = G.player;
  if(e._hidden) return;
  let actualDmg = e.dmg;
  const hasFirstHit = (G.charId==='espectro') || hasRelic('espejo_espectral');
  if(hasFirstHit && !G.firstHitUsed){
    G.firstHitUsed = true; actualDmg = 0;
    const relicBonus = hasRelic('espejo_espectral') && G.charId!=='espectro';
    if(relicBonus){ G.player.block+=4; addLog('Espejo Espectral: golpe evitado · +4 bloqueo','sta'); }
    else addLog('Forma Etérea: golpe evitado!','sta');
  }
  const dmgRed = G._playerDmgReduction || 0;
  actualDmg = Math.max(1, actualDmg - dmgRed);
  const ab = Math.min(p.block, actualDmg);
  p.block = Math.max(0, p.block - actualDmg);
  const nd = actualDmg - ab;
  p.hp = Math.max(0, p.hp - nd);
  if(nd > 0){
    addLog(`${e.name} golpea por ${nd}`,'ene');
    spawnN(nd,'pl');
    runDmgTanked += nd;
    animatePlayerHit();
    // Vampiro roba vida
    const steal = e.lifestealOnAttack || 6;
    const healed = Math.min(e.maxHp - e.hp, steal);
    if(healed > 0){
      e.hp += healed;
      addLog(`${e.name} roba ${healed} HP 🧛`,'ene');
      animateEnemyHeal(e);
    }
  }
}

// Vampiro se cura al morir un aliado — llamado desde checkEnemyDeaths
function vampiroAllyDeathHeal(vampiro) {
  const heal = vampiro.reviveHealOnKill || 22;
  const gained = Math.min(vampiro.maxHp - vampiro.hp, heal);
  if(gained > 0){
    vampiro.hp += gained;
    addLog(`${vampiro.name} absorbe la muerte de su aliado · +${gained} HP 🧛`,'ene');
    animateEnemyHeal(vampiro);
  }
}

// ─── ACTO 2: CONDESA SIN ROSTRO ──────────────────
// Cada turno alterna: ataque → defensa → veneno → repite
function doCondesaAction(e) {
  const p = G.player;
  const mode = e.condensaTurn % 3;
  e.condensaTurn = (e.condensaTurn || 0) + 1;

  if(mode === 1) {
    // Turno de defensa: se escuda
    const shield = e.shieldPerTurn || 10;
    e.block += shield;
    addLog(`${e.name} cambia de forma · +${shield} escudo 🛡`,'sta');
    return;
  }
  if(mode === 2) {
    // Turno de veneno
    const psn = e.poisonPerTurn || 3;
    p.poison = (p.poison || 0) + psn;
    addLog(`${e.name} cambia de forma · te envenena (☠ +${psn})`,'ene');
    spawnN(psn, 'pl');
    return;
  }
  // mode === 0: ataque normal
  if(e._hidden) return;
  let actualDmg = e.dmg;
  const hasFirstHit = (G.charId==='espectro') || hasRelic('espejo_espectral');
  if(hasFirstHit && !G.firstHitUsed){
    G.firstHitUsed = true; actualDmg = 0;
    const relicBonus = hasRelic('espejo_espectral') && G.charId!=='espectro';
    if(relicBonus){ G.player.block+=4; addLog('Espejo Espectral: golpe evitado · +4 bloqueo','sta'); }
    else addLog('Forma Etérea: golpe evitado!','sta');
  }
  const dmgRed = G._playerDmgReduction || 0;
  actualDmg = Math.max(1, actualDmg - dmgRed);
  const ab = Math.min(p.block, actualDmg);
  p.block = Math.max(0, p.block - actualDmg);
  const nd = actualDmg - ab;
  p.hp = Math.max(0, p.hp - nd);
  if(nd > 0){
    addLog(`${e.name} cambia de forma · ataca por ${nd}`,'ene');
    spawnN(nd,'pl'); runDmgTanked += nd; animatePlayerHit();
  }
}

// ─── ACTO 2: GUARDIÁN DEL CANDIL ─────────────────
// Turno par: ataca y aplica reducción de daño al jugador.
// Turno impar: oculta a un aliado (o a sí mismo si está solo) hasta su siguiente turno.
// El oculto NO puede ser atacado pero SÍ actúa normalmente.
function doGuardianAction(e) {
  const p = G.player;
  const phase = (combatTurn || 0) % 2;

  if(phase === 1) {
    // Turno de ocultación: usar _hiddenNextTurn para que dure el turno del jugador
    const aliveOthers = G.enemies.filter(en => !en.dead && en !== e);
    const target = aliveOthers.length > 0
      ? aliveOthers[Math.floor(Math.random() * aliveOthers.length)]
      : e; // Solo: se oculta a sí mismo
    target._hiddenNextTurn = true;
    addLog(`${e.name} apaga el candil · ${target === e ? 'desaparece en la oscuridad' : target.name + ' queda oculto'} hasta el próximo turno 👤`, 'sta');

    // El guardián también ataca en este turno
    let actualDmg = e.dmg;
    const hasFirstHit = (G.charId==='espectro') || hasRelic('espejo_espectral');
    if(hasFirstHit && !G.firstHitUsed){
      G.firstHitUsed = true; actualDmg = 0;
      const relicBonus = hasRelic('espejo_espectral') && G.charId!=='espectro';
      if(relicBonus){ G.player.block+=4; addLog('Espejo Espectral: golpe evitado · +4 bloqueo','sta'); }
      else addLog('Forma Etérea: golpe evitado!','sta');
    }
    const dmgRed0 = G._playerDmgReduction || 0;
    actualDmg = Math.max(1, actualDmg - dmgRed0);
    const ab0 = Math.min(p.block, actualDmg);
    p.block = Math.max(0, p.block - actualDmg);
    const nd0 = actualDmg - ab0;
    p.hp = Math.max(0, p.hp - nd0);
    if(nd0 > 0){ addLog(`${e.name} ataca desde las sombras por ${nd0}`,'ene'); spawnN(nd0,'pl'); runDmgTanked+=nd0; animatePlayerHit(); }
    return;
  }

  // phase === 0: ataque normal + aplica debuff de daño
  let actualDmg = e.dmg;
  const hasFirstHit = (G.charId==='espectro') || hasRelic('espejo_espectral');
  if(hasFirstHit && !G.firstHitUsed){
    G.firstHitUsed = true; actualDmg = 0;
    const relicBonus = hasRelic('espejo_espectral') && G.charId!=='espectro';
    if(relicBonus){ G.player.block+=4; addLog('Espejo Espectral: golpe evitado · +4 bloqueo','sta'); }
    else addLog('Forma Etérea: golpe evitado!','sta');
  }
  const dmgRed = G._playerDmgReduction || 0;
  actualDmg = Math.max(1, actualDmg - dmgRed);
  const ab = Math.min(p.block, actualDmg);
  p.block = Math.max(0, p.block - actualDmg);
  const nd = actualDmg - ab;
  p.hp = Math.max(0, p.hp - nd);
  if(nd > 0){ addLog(`${e.name} ataca por ${nd}`,'ene'); spawnN(nd,'pl'); runDmgTanked+=nd; animatePlayerHit(); }
  G._playerDmgReduction = Math.min((G._playerDmgReduction || 0) + 2, 6);
  addLog(`${e.name} reduce tu daño en 2 (total -${G._playerDmgReduction}) 🕯`,'ene');
}

// ─── ACTO 2: MURCIÉLAGO ──────────────────────────
// Solo ataca. Evoluciona a Vampiro a los 5 turnos (gestionado en endTurn).
function doMurcielagoAction(e) {
  const p = G.player;
  if(e._hidden || e.dead) return;
  let actualDmg = e.dmg;
  const dmgRed = G._playerDmgReduction || 0;
  actualDmg = Math.max(1, actualDmg - dmgRed);
  const ab = Math.min(p.block, actualDmg);
  p.block = Math.max(0, p.block - actualDmg);
  const nd = actualDmg - ab;
  p.hp = Math.max(0, p.hp - nd);
  if(nd > 0){ addLog(`${e.name} ataca por ${nd} 🦇`,'ene'); spawnN(nd,'pl'); runDmgTanked+=nd; animatePlayerHit(); }
}

// Evoluciona un murciélago a vampiro
function evolveToVampiro(idx) {
  const e = G.enemies[idx];
  if(!e || e.dead) return;
  const mult = (G.infiniteMode ? getInfiniteMultiplier() : 1) * (G.path ? Math.pow(1.5, G.path.act || 0) : 1);
  const newVampiro = {
    ...ACT2_VAMPIRO,
    hp: Math.round(ACT2_VAMPIRO.hp * mult * 0.8), // llega con el 80% de vida
    maxHp: Math.round(ACT2_VAMPIRO.hp * mult),
    dmg: Math.round(ACT2_VAMPIRO.dmg * mult),
    block: 0, bleed: 0, poison: 0, dead: false,
    lifestealOnAttack: Math.round((ACT2_VAMPIRO.lifestealOnAttack || 6) * mult),
    reviveHealOnKill: Math.round((ACT2_VAMPIRO.reviveHealOnKill || 22) * mult),
    isVampiro: true, isMurcielago: false, tier: 1, rw: 20,
  };
  G.enemies[idx] = newVampiro;
  addLog(`¡${e.name} se ha transformado en Vampiro Sanguinario! 🧛`,'ene');
  renderEnemies();
}

// ─── ACTO 2: BARÓN HEMLOCK (BOSS) ────────────────
// Acciones posibles: invocar murciélagos, curarse, atacar.
// Puede invocar si hay menos de 2 murciélagos/vampiros y pasaron ≥5 turnos desde el último summón.
function doBaronAction(e) {
  const p = G.player;
  e.baronPhase = (e.baronPhase || 0) + 1;
  const turn = e.baronPhase;

  // Contar murciélagos y vampiros vivos invocados
  const summonedAlive = G.enemies.filter(en => !en.dead && (en.isMurcielago || en.isVampiro) && en !== e).length;
  const turnsSinceLastSummon = turn - (e.lastSummonTurn || -99);
  const canSummon = summonedAlive < 2 && turnsSinceLastSummon >= 5;

  // Decidir acción (pesos): invocar > curar (si hp < 60%) > atacar
  const hpPct = e.hp / e.maxHp;
  let action;

  if(canSummon && Math.random() < 0.45) {
    action = 'summon';
  } else if(hpPct < 0.60 && Math.random() < 0.40) {
    action = 'heal';
  } else {
    action = 'attack';
  }

  if(action === 'summon') {
    // Cuántos invocar: si hay 0 invoca 2; si hay 1 invoca 1
    const toSummon = summonedAlive === 0 ? 2 : 1;
    const mult = (G.infiniteMode ? getInfiniteMultiplier() : 1) * (G.path ? Math.pow(1.5, G.path.act || 0) : 1);
    for(let i = 0; i < toSummon; i++){
      G.enemies.push(makeMurcielago(mult));
    }
    e.lastSummonTurn = turn;
    addLog(`${e.name} extiende las alas · ¡invoca ${toSummon} Murciélago(s) de Hemlock! 🦇`,'ene');
    // Seleccionar al barón como target si se añaden enemigos
    renderEnemies();
    return;
  }

  if(action === 'heal') {
    const healAmt = Math.round(e.maxHp * 0.18); // cura 18% de su HP máx
    const gained = Math.min(e.maxHp - e.hp, healAmt);
    e.hp += gained;
    addLog(`${e.name} absorbe las sombras · +${gained} HP 💀`,'ene');
    animateEnemyHeal(e);
    return;
  }

  // attack
  if(e._hidden) return;
  let actualDmg = e.dmg;
  const hasFirstHit = (G.charId==='espectro') || hasRelic('espejo_espectral');
  if(hasFirstHit && !G.firstHitUsed){
    G.firstHitUsed = true; actualDmg = 0;
    const relicBonus = hasRelic('espejo_espectral') && G.charId!=='espectro';
    if(relicBonus){ G.player.block+=4; addLog('Espejo Espectral: golpe evitado · +4 bloqueo','sta'); }
    else addLog('Forma Etérea: golpe evitado!','sta');
  }
  const dmgRed = G._playerDmgReduction || 0;
  actualDmg = Math.max(1, actualDmg - dmgRed);
  const ab = Math.min(p.block, actualDmg);
  p.block = Math.max(0, p.block - actualDmg);
  const nd = actualDmg - ab;
  p.hp = Math.max(0, p.hp - nd);
  if(nd > 0){ addLog(`${e.name} golpea por ${nd} 💀`,'ene'); spawnN(nd,'pl'); runDmgTanked+=nd; animatePlayerHit(); }
}

// ─── HELPER: animación de curación en enemigo ────
function animateEnemyHeal(e) {
  const idx = G.enemies.indexOf(e);
  const el = document.getElementById('eSprite'+idx);
  if(el){
    const pulse = document.createElement('div');
    pulse.style.cssText = 'position:absolute;inset:-4px;border-radius:4px;background:radial-gradient(circle,#cc304055,transparent 70%);border:2px solid #cc304099;pointer-events:none;z-index:5;animation:healPulseAnim .8s forwards';
    el.style.position = 'relative';
    el.appendChild(pulse);
    setTimeout(()=>pulse.remove(), 800);
  }
}

// ─── Vampiro se cura cuando muere un aliado ───────
// Esta función se llama desde el bloque DoTs en endTurn,
// después de marcar un enemigo como muerto.
function checkVampiroAllyDeaths() {
  const deadThisTurn = G.enemies.filter(e => e.dead && !e._deathProcessed);
  deadThisTurn.forEach(dead => {
    dead._deathProcessed = true;
    // Buscar vampiros vivos y curarlos
    G.enemies.filter(en => !en.dead && en.isVampiro).forEach(v => vampiroAllyDeathHeal(v));
  });
}

function animateHit(e) {
  const idx = G.enemies.indexOf(e);
  const el = document.getElementById('eSprite'+idx);
  if(el){el.classList.add('hit-flash');setTimeout(()=>el.classList.remove('hit-flash'),400);}
}

function animatePlayerHit(){
  sfxPlayerHit();
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
  let totalRw = G.enemies.reduce((sum,e)=>sum+(e.rw||0),0);
  // Corona Voraz: +50% gold
  if(hasRelic('corona_voraz')){ totalRw = Math.ceil(totalRw * 1.5); }
  G.gold += totalRw;
  addLog(`¡Victoria! +${totalRw} oro`,'heal');
  applyRelicEncounterBonus(); // Corona Voraz: +2 HP permanente
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
  const hpMaxEl=document.getElementById('hpMax');if(hpMaxEl)hpMaxEl.textContent='/'+p.maxHp; // ✏ CAMBIO 5: hpMax dinámico (Espectro 65/65, no 65/70)
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
  // ✏ CAMBIO 6: totales del mazo dinámicos — dkTotal y dsTotal si existen
  const dkTot=document.getElementById('dkTotal');if(dkTot)dkTot.textContent=p.deck.length+p.discard.length+p.hand.length;
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
  const desc = showDesc ? `<div style="font-size:11px;color:var(--dim);padding:2px 5px 6px;text-align:center;line-height:1.5;font-style:italic">${card.desc}</div>` : '';
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
    w.innerHTML = buildCardHTML(card, 170, 258, true); // ✏ CAMBIO D: reward más grande
    requestAnimationFrame(()=>addStatusTooltips(w, card)); // ✏ FIX 3a: tooltips en reward
    w.addEventListener('click', ()=>{
      if(isBoss){
        if(bossChosen >= 2) return;
        playUI();
        G.player.deck.push(card.id);
        bossChosen++;
        w.style.opacity='.3'; w.style.pointerEvents='none';
        const subEl=document.getElementById('rewSub');
        if(subEl) subEl.textContent=`${2-bossChosen} carta(s) restante(s)`;
        if(bossChosen>=2){ saveG(); setTimeout(()=>doAdvance(),600); }
      } else {
        playUI();
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
  if(G.infiniteMode) {
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
      item.innerHTML = buildCardHTML(card, 104, 158, true) + // ✏ CAMBIO D: deck editor más grande con desc
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
      requestAnimationFrame(()=>addStatusTooltips(item, card)); // ✏ FIX 3c: tooltips en deck editor
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
  playUI();
  if(G.infiniteMode) {
    advanceInfinite();
  } else {
    advance();
  }
}
function doHeal(){playUI();const p=G.player;p.hp=Math.min(p.maxHp,p.hp+20);saveG();if(G.infiniteMode)advanceInfinite();else advance();}
function doPurge(){const i=G.player.deck.indexOf('strike');if(i>=0)G.player.deck.splice(i,1);saveG();if(G.infiniteMode)advanceInfinite();else advance();}

function showShop(){
  sfxShopEnter();
  document.getElementById('shopG').textContent=G.gold;
  // Tienda: 4 cartas con sistema de pesos igual que las recompensas de combate
  // Se usa tier 0 (base) pero con pool más amplia y sin excluir bullet
  const shopPool = CARDS.filter(c=>!['strike','shield'].includes(c.id));
  function shopWeightedPick(rem) {
    const tw = rem.reduce((s,c)=>(s+(RARITY_WEIGHTS[c.rarity]?.base||5)),0);
    let r=Math.random()*tw;
    for(const c of rem){r-=(RARITY_WEIGHTS[c.rarity]?.base||5);if(r<=0)return c;}
    return rem[rem.length-1];
  }
  const shopAvail=[...shopPool], stock=[];
  while(stock.length<4&&shopAvail.length>0){const c=shopWeightedPick(shopAvail);stock.push(c);shopAvail.splice(shopAvail.indexOf(c),1);}
  G._shop=stock;
  const c=document.getElementById('shopSt');c.innerHTML='';
  stock.forEach(card=>{
    const price=(card.cost+1)*8;
    const w=document.createElement('div');w.className='shop-item';
    w.innerHTML=buildCardHTML(card, 130, 196, true)+'<div class="shop-price">🪙 '+price+'</div>'; // ✏ CAMBIO D: tienda usa buildCardHTML con desc
    requestAnimationFrame(()=>addStatusTooltips(w, card)); // ✏ FIX 3b: tooltips en tienda
    w.addEventListener('click',()=>{
      if(G.gold<price)return;
      playUI();
      G.gold-=price;
      G.player.deck.push(card.id);
      w.style.opacity='.2';w.style.pointerEvents='none';
      document.getElementById('shopG').textContent=G.gold;
      saveG();
    });
    c.appendChild(w);
  });
  // ✏ FIX 4b: Añadir item de descarte de carta en la tienda
  const discardCost = G.discardCost || 40;
  const dItem = document.createElement('div');
  dItem.className = 'shop-item';
  dItem.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:0;cursor:pointer;opacity:'+( G.player.deck.length + G.player.hand.length + G.player.discard.length > 4 ? '1' : '.4')+';pointer-events:'+(G.player.deck.length + G.player.hand.length + G.player.discard.length > 4 ? 'auto' : 'none');
  // Construir la carta de descarte con el mismo aspecto que las demás
  const discardImgSrc = 'resources/alt/cartas/cubobasura.png';
  dItem.innerHTML = `
    <div style="
      width:130px;height:196px;border-radius:6px;position:relative;
      border:1px solid #c0304a88;border-top:2px solid #c0304a;
      background:linear-gradient(160deg,#1a0a14,#0e0b18);
      display:flex;flex-direction:column;overflow:hidden;
      box-shadow:0 8px 24px #00000088,0 0 14px #c0304a22;
      cursor:pointer;
    ">
      <!-- Barra superior de tipo (igual que .c-bar) -->
      <div style="height:3px;background:linear-gradient(90deg,#c0304a,#ff4060,#c0304a);opacity:.7;flex-shrink:0"></div>
      <!-- Coste en círculo -->
      <div style="position:absolute;top:6px;right:6px;width:20px;height:20px;border-radius:50%;background:#1a0a14;border:1px solid #c0304a88;display:flex;align-items:center;justify-content:center;font-size:11px;color:#cc4060;font-family:'Cinzel',serif;z-index:2">✂</div>
      <!-- Label rareza -->
      <div style="position:absolute;top:8px;left:0;right:0;text-align:center;font-size:7px;letter-spacing:1.5px;color:#c0304a;font-family:'Cinzel',serif;opacity:.9">ESPECIAL</div>
      <!-- Arte: imagen propia a tamaño completo de la zona c-art -->
      <div style="flex:1;padding:9px 5px 3px;overflow:hidden;display:flex;align-items:center;justify-content:center;min-height:0">
        <img src="${discardImgSrc}"
          onerror="this.parentNode.innerHTML='<div style=\'font-size:40px;text-align:center\'>🗑️</div>'"
          style="width:100%;height:100%;object-fit:cover;border-radius:2px;display:block">
      </div>
      <!-- Nombre -->
      <div style="font-family:'Cinzel',serif;font-size:10px;color:#e8c0c8;text-align:center;padding:3px 5px 2px;letter-spacing:.5px;background:#1a0a1488;flex-shrink:0">Descartar Carta</div>
      <!-- Descripción -->
      <div style="font-size:9px;color:var(--dim);padding:2px 5px 5px;text-align:center;line-height:1.4;font-style:italic;flex-shrink:0">Elimina 1 carta del mazo</div>
    </div>
    <div class="shop-price" id="shopDiscardPrice">🪙 ${discardCost}</div>`;
  dItem.addEventListener('click', ()=>{
    playUI();
    shopDiscard();
  });
  c.appendChild(dItem);

  show('shop');
}

function leaveShop(){
  playUI();
  if(G.infiniteMode) advanceInfinite();
  else advance();
}

// ✏ FIX 4: Descarte en tienda — muestra deckEditor de 1 sola carta
function shopDiscard(){
  const cost = G.discardCost || 40;
  if(G.gold < cost){ addLog('No tienes suficiente oro para descartar.','sta'); return; }
  G.gold -= cost;
  G.discardCost = cost + 20; // próxima vez cuesta más
  saveG();
  // Mostrar deckEditor especial: sólo 1 descarte permitido
  showDeckEditorShop();
}

function showDeckEditorShop(){
  const allCards = [...G.player.deck, ...G.player.hand, ...G.player.discard];
  let pending = [...allCards];
  let discarded = 0;
  const MAX = 1;
  const MIN = 4;

  const overlay = document.createElement('div');
  overlay.id = 'deckEditorOverlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9000;background:#080610ee;display:flex;align-items:center;justify-content:center;animation:fadeIn .3s';

  function buildUI(){
    const canDiscard = discarded < MAX && pending.length > MIN;
    overlay.innerHTML = `
      <div style="background:linear-gradient(160deg,#1a1228,#0e0b18);border:1px solid var(--gold);border-radius:14px;padding:28px 24px;max-width:860px;width:96%;max-height:90vh;overflow-y:auto;display:flex;flex-direction:column;gap:16px;box-shadow:0 0 80px #c9984a33">
        <div style="font-family:'Cinzel Decorative',cursive;font-size:18px;color:var(--gold);text-align:center;letter-spacing:2px">✂ Descartar Carta</div>
        <div style="font-size:12px;color:var(--dim);text-align:center;font-style:italic">
          Elige una carta de tu mazo para eliminarla permanentemente.
          <br><span style="color:var(--fog)">Cartas: <b style="color:var(--gold)">${pending.length}</b></span>
          ${discarded >= MAX ? '&nbsp;·&nbsp;<span style="color:#c0304a">Ya has descartado una carta.</span>' : ''}
        </div>
        <div id="deDeckGrid" style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;padding:8px 0"></div>
        <div style="display:flex;gap:12px;justify-content:center;margin-top:4px">
          <button class="btn" onclick="confirmShopDiscard()">Confirmar y Continuar →</button>
        </div>
      </div>`;

    const grid = overlay.querySelector('#deDeckGrid');
    pending.forEach((cardId, idx)=>{
      const card = cById(cardId);
      if(!card) return;
      const canDo = discarded < MAX && pending.length > MIN;
      const item = document.createElement('div');
      item.style.cssText = `display:flex;flex-direction:column;align-items:center;gap:4px;cursor:${canDo?'pointer':'default'};transition:all .2s;position:relative`;
      item.innerHTML = buildCardHTML(card, 104, 158, true) +
        `<div style="font-size:9px;letter-spacing:1px;color:${canDo?'#c0304a':'#444'};font-family:'Cinzel',serif;opacity:${canDo?'.8':'.3'};border:1px solid ${canDo?'#c0304a44':'#33333344'};border-radius:3px;padding:2px 6px">DESCARTAR</div>`;
      if(canDo){
        item.addEventListener('click',()=>{ pending.splice(idx,1); discarded++; buildUI(); });
        item.addEventListener('mouseenter',()=>{ item.style.transform='translateY(-6px)'; });
        item.addEventListener('mouseleave',()=>{ item.style.transform=''; });
      }
      requestAnimationFrame(()=>addStatusTooltips(item, card));
      grid.appendChild(item);
    });
  }

  buildUI();
  document.body.appendChild(overlay);
  overlay.style.opacity='0';
  requestAnimationFrame(()=>{ overlay.style.transition='opacity .3s'; overlay.style.opacity='1'; });

  window.confirmShopDiscard = function(){
    playUI();
    G.player.deck = pending;
    G.player.hand = [];
    G.player.discard = [];
    saveG();
    overlay.style.opacity='0';
    setTimeout(()=>{ overlay.remove(); delete window.confirmShopDiscard; }, 300);
    // Actualizar precio en la tienda si sigue abierta
    const priceEl = document.getElementById('shopDiscardPrice');
    if(priceEl) priceEl.textContent = '🪙 '+(G.discardCost||40);
  };
}

// ═══════════════════════════════════════════════
//  CHEST
// ═══════════════════════════════════════════════
function showChest(){
  sfxChestOpen();
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
function chestGold(n){playUI();G.gold+=n;saveG();if(G.infiniteMode)advanceInfinite();else advance();}
function chestCard(){playUI();showRew();}
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
  playUI();
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
  playUI();
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
    {key:'enemy_healer',      id:'dz-eh',  ico:'✚', lbl:'Sanadora',  cap:'Healer'},
    {key:'enemy_vampiro',     id:'dz-ev',  ico:'🧛', lbl:'Vampiro',   cap:'Acto 2'},
    {key:'enemy_condesa',     id:'dz-ec',  ico:'👁', lbl:'Condesa',   cap:'Acto 2'},
    {key:'enemy_guardian',    id:'dz-eg',  ico:'🕯', lbl:'Guardián',  cap:'Acto 2'},
    {key:'enemy_murcielago',  id:'dz-em',  ico:'🦇', lbl:'Murciélago',cap:'Acto 2'},
    {key:'enemy_baron_hemlock',id:'dz-eb', ico:'💀', lbl:'Barón',     cap:'Boss A2'},
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
  const e2Container = document.getElementById('dz-e2');
  if(!e2Container) return;
  const parentFlex = e2Container.parentElement?.parentElement;
  if(!parentFlex) return;

  const extraSlots = [
    {id:'dz-eh', key:'enemy_healer',      ico:'✚', lbl:'Sanadora',   cap:'Healer'},
    {id:'dz-ev', key:'enemy_vampiro',     ico:'🧛', lbl:'Vampiro',    cap:'Acto 2'},
    {id:'dz-ec', key:'enemy_condesa',     ico:'👁', lbl:'Condesa',    cap:'Acto 2'},
    {id:'dz-eg', key:'enemy_guardian',    ico:'🕯', lbl:'Guardián',   cap:'Acto 2'},
    {id:'dz-em', key:'enemy_murcielago',  ico:'🦇', lbl:'Murciélago', cap:'Acto 2'},
    {id:'dz-eb', key:'enemy_baron_hemlock',ico:'💀',lbl:'Barón',      cap:'Boss A2'},
  ];

  extraSlots.forEach(slot => {
    if(document.getElementById(slot.id)) return;
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:5px';
    wrap.innerHTML = `
      <div class="dz" id="${slot.id}" style="width:100px;height:132px" ondragover="dzDrag(event,this)" ondragleave="dzLeave(this)" ondrop="dzDrop(event,'${slot.key}',this)">
        <div class="dz-ico">${slot.ico}</div><div class="dz-lbl">${slot.lbl}</div>
        <input type="file" accept="image/*" onchange="dzFile(event,'${slot.key}',this.parentNode)">
        <button class="dz-clr" onclick="dzClr('${slot.key}',document.getElementById('${slot.id}'),event)">✕</button>
      </div>
      <div class="dz-cap">${slot.cap}</div>
    `;
    parentFlex.appendChild(wrap);
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
function saveCustomAndReturn(){playUI();saveCustom();goTitle()}

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
//  MOBILE ENHANCEMENTS
// ═══════════════════════════════════════════════
const isMobile = () => window.innerWidth <= 640;

// ─── LOG OVERLAY BUTTON (mobile only) ──────────
// Shows the combat log in a bottom sheet since p-right is hidden
function injectMobileLogBtn() {
  if(!isMobile()) return;
  if(document.getElementById('mobileLogBtn')) return;

  // ── Portrait button — se inyecta en el DOM del body (position:fixed en la barra) ──
  const portBtn = document.createElement('button');
  portBtn.id = 'mobilePortBtn';
  portBtn.innerHTML = '👤';
  portBtn.style.cssText = `
    position:fixed;top:6px;left:8px;
    width:46px;height:46px;border-radius:50%;
    background:linear-gradient(135deg,#1a1228,#0e0b18);
    border:2px solid #4a3a5a;color:#b8a8c8;
    font-size:20px;cursor:pointer;z-index:490;
    display:none;align-items:center;justify-content:center;
    overflow:hidden;padding:0;
    transition:border-color .2s,box-shadow .2s;
    box-shadow:0 0 12px #4a2a6a44;
  `;
  portBtn.onclick = toggleMobilePortrait;
  document.body.appendChild(portBtn);

  // Portrait full-screen overlay
  const portOverlay = document.createElement('div');
  portOverlay.id = 'mobilePortOverlay';
  portOverlay.style.cssText = `
    position:fixed;inset:0;z-index:9000;
    background:#080610ee;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:16px;
    visibility:hidden;
    opacity:0;
    transition:opacity .25s;
    pointer-events:none;
  `;
  portOverlay.innerHTML = `
    <div style="
      width:min(400px,96vw);
      max-height:88vh;
      overflow-y:auto;
      background:linear-gradient(160deg,#13101e,#0e0b18);
      border:1px solid var(--gold);
      border-radius:14px;
      box-shadow:0 0 60px #c9984a33;
      padding:20px 16px 16px;
      display:flex;
      flex-direction:column;
      gap:14px;
      position:relative;
    ">
      <!-- Cerrar -->
      <button onclick="toggleMobilePortrait()" style="position:absolute;top:10px;right:12px;background:none;border:none;color:#7a6888;font-size:20px;cursor:pointer;line-height:1;padding:0" title="Cerrar">✕</button>

      <!-- Foto + nombre + pasiva -->
      <div style="display:flex;gap:14px;align-items:center">
        <div id="mobilePortContent" style="
          width:72px;height:72px;border-radius:50%;
          border:2px solid var(--gold);overflow:hidden;
          background:#0e0b18;flex-shrink:0;
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 0 20px #c9984a44;
        "></div>
        <div style="flex:1;min-width:0">
          <div id="mobilePortName" style="font-family:'Cinzel Decorative',cursive;font-size:15px;color:var(--gold);letter-spacing:2px;text-shadow:0 0 16px #c9984a88;margin-bottom:4px"></div>
          <div id="mobilePortPassive" style="font-size:11px;color:var(--dim);font-style:italic;line-height:1.5"></div>
        </div>
      </div>

      <!-- Stats vitales -->
      <div id="mobilePortStats" style="
        display:grid;grid-template-columns:1fr 1fr;
        gap:6px;font-size:12px;color:var(--fog);font-family:'Cinzel',serif;
        background:#0a081244;border:1px solid #2a1f3a;border-radius:8px;
        padding:10px 12px;
      "></div>

      <!-- Separador -->
      <div style="height:1px;background:linear-gradient(90deg,transparent,var(--border),transparent)"></div>

      <!-- Registro de combate -->
      <div>
        <div style="font-family:'Cinzel',serif;font-size:9px;letter-spacing:3px;color:var(--dim);text-transform:uppercase;margin-bottom:8px">📜 Registro de Combate</div>
        <div id="mobilePortLog" style="
          font-size:11px;color:var(--fog);
          display:flex;flex-direction:column;gap:3px;
          max-height:160px;overflow-y:auto;
          font-style:italic;
        "></div>
      </div>
    </div>
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
  const open = ov.style.visibility === 'visible';
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
      const statRow = (ico, label, val, cls='') =>
        `<div style="display:flex;align-items:center;gap:5px${cls?';color:'+cls:''}">
          <span style="font-size:14px">${ico}</span>
          <span style="font-size:10px;letter-spacing:1px;color:var(--dim);text-transform:uppercase">${label}</span>
          <span style="margin-left:auto;font-size:13px;color:var(--mist)">${val}</span>
        </div>`;
      statsEl.innerHTML =
        statRow('❤','Vida', `${p.hp}/${p.maxHp}`, '#cc4060') +
        statRow('◆','Maná', `${p.mana}/${p.maxMana}`, '#3a6acc') +
        statRow('🪙','Oro', G.gold) +
        (p.block ? statRow('🛡','Escudo', p.block, '#6090ee') : '') +
        (p.bleed ? statRow('🩸','Sangrado', p.bleed, '#f07080') : '') +
        (p.poison ? statRow('☠','Veneno', p.poison, '#a8e060') : '') +
        statRow('📚','Mazo', `${p.deck.length+p.discard.length+p.hand.length} cartas`) +
        statRow('✋','Mano', `${p.hand.length}/${getMaxHand()}`) +
        statRow('🗑','Descarte', p.discard.length);
    }
    // Registro de combate
    const logEl = document.getElementById('mobilePortLog');
    const clogEl = document.getElementById('clog');
    if(logEl && clogEl) logEl.innerHTML = clogEl.innerHTML || '<span style="color:var(--dim);font-style:italic">Sin entradas aún.</span>';
    // Update portrait button image
    const portBtn = document.getElementById('mobilePortBtn');
    if(portBtn && img){
      portBtn.innerHTML = `<img src="${img}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
    } else if(portBtn && ch){
      portBtn.innerHTML = `<div style="transform:scale(1.4)">${ch.svg}</div>`;
    }
    ov.style.visibility='visible';
    ov.style.pointerEvents='auto';
    requestAnimationFrame(()=>{ ov.style.opacity='1'; });
  } else {
    ov.style.opacity='0';
    ov.style.pointerEvents='none';
    setTimeout(()=>{ ov.style.visibility='hidden'; },260);
  }
}

function showMobileLogBtn(visible) {
  const btn  = document.getElementById('mobileLogBtn');
  const pbtn = document.getElementById('mobilePortBtn');
  if(btn)  btn.style.display  = visible ? 'flex' : 'none';
  // portBtn está en .p-left — su visibilidad la gestiona CSS en combate
  // pero forzamos display:flex cuando visible para que arranque bien
  if(pbtn) pbtn.style.display = visible ? 'flex' : 'none';
  if(visible){
    // Actualizar imagen del botón portrait con el personaje actual
    const ch = chById(G.charId);
    const img = ch ? getImg(ch.imgKey) : null;
    if(pbtn && img) pbtn.innerHTML = `<img src="${img}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
    else if(pbtn && ch) pbtn.innerHTML = `<div style="transform:scale(1.4)">${ch.svg}</div>`;
  }
  if(!visible){
    const ov = document.getElementById('mobilePortOverlay');
    if(ov){ ov.style.opacity='0'; ov.style.pointerEvents='none'; ov.style.visibility='hidden'; }
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
function fixNameModalMobile() {
  // ✏ BLOQUE 3: name-modal en móvil — evitar overflow del dado
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width:640px){
      .name-modal{ padding:24px 18px; width:94vw; max-width:94vw; box-sizing:border-box; }
      .name-title{ font-size:18px; letter-spacing:1px; }
      .name-sub{ font-size:13px; }
      .name-row{ width:100%; box-sizing:border-box; display:flex; gap:6px; }
      .name-input{ font-size:15px; padding:8px 10px; min-width:0; flex:1; }
      .name-dice{ width:38px; height:38px; font-size:18px; flex-shrink:0; }
      .name-hint{ font-size:12px; }
      /* ✏ BLOQUE 4: mapa oro no se desborda */
      #s-map{ overflow:visible !important; }
      .map-gold-display{ position:relative; z-index:2; }
    }
  `;
  document.head.appendChild(style);
}

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
  markMobileStatBlocks();
  injectMobileLogBtn();
  addSwipeHandlers();
  preventDoubleTapZoom();
  fixMobileVh();
  fixNameModalMobile();
  document.body.style.height = '100dvh';
  document.getElementById('app').style.height = '100dvh';
}


function markMobileStatBlocks() {
  if(!isMobile()) return;
  // Marcar el div-bloque que contiene hpBar con mobile-stat-block
  ['hpBar','mpBar'].forEach(barId => {
    const bar = document.getElementById(barId);
    if(!bar) return;
    const bw  = bar.closest('.bar-wrap') || bar.parentElement;
    if(!bw) return;
    const blk = bw.parentElement;
    const pLeft = document.querySelector('.p-left');
    if(blk && blk !== pLeft && blk.parentElement === pLeft){
      blk.classList.add('mobile-stat-block');
    }
  });
}
// ═══════════════════════════════════════════════
//  TUTORIAL
// ═══════════════════════════════════════════════
const TUTORIAL_PAGES = [
  {
    title: '¿Qué es Noctis Deck?',
    imgKey: 'logo',
    content: `<p>Noctis Deck es un <b>roguelike de cartas</b> gótico-victoriano.<br>Cada partida es única: elige un personaje, recorre el mapa, derrota enemigos y acumula cartas.</p><p>Si mueres empiezas de cero, pero las <b>Reliquias</b> desbloqueadas te esperan para siempre.</p>`
  },
  {
    title: 'Los Personajes',
    isCharPage: true,
    content: `<p>Elige entre <b>4 cazadores</b> con pasiva única:</p><ul><li><b style="color:#c03050">El Cazador</b> — Vampirismo: roba 2 HP por ataque directo.</li><li><b style="color:#5aaa30">La Hechicera</b> — Miasma: el veneno hace +1 daño extra/turno.</li><li><b style="color:#4a8aaa">El Espectro</b> — Forma Etérea: el primer golpe de cada combate se ignora.</li><li><b style="color:#d4804a">El Pistolero</b> — Cargador: cada 3 ataques el siguiente hace el doble.</li></ul>`
  },
  {
    title: 'Maná y Cartas',
    isCardPage: true,
    content: `<p>Cada turno recuperas todo tu <b>Maná</b> (◆ abajo). Juega cartas gastando maná según su coste.</p><p><b>Rarezas:</b></p><ul><li><b style="color:#a0a0b0">Común</b> — Básica y fiable.</li><li><b style="color:#4a9fff">Infrecuente</b> — Más potente.</li><li><b style="color:#cc80ff">Rara</b> — Efectos especiales.</li><li><b style="color:#ffcc44">Legendaria</b> — Devastadora.</li></ul><p>Pulsa <b>Fin de Turno</b> cuando termines.</p>`
  },
  {
    title: 'El Combate y los Estados',
    isEnemyPage: true,
    content: `<p>Selecciona un enemigo pulsando sobre él. Los enemigos muestran su intención antes de actuar.</p><p><b>Estados:</b></p><ul><li>🛡 <b>Bloqueo</b> — absorbe daño hasta agotarse.</li><li>🩸 <b>Sangrado</b> — pierde 2 HP al fin de turno.</li><li>☠ <b>Veneno</b> — pierde HP igual al nivel, que decae.</li></ul><p>Al ganar obtienes <b>Oro</b> y una nueva carta.</p>`
  },
  {
    title: 'El Mapa',
    isMapPage: true,
    content: `<p><b>3 Actos</b>, cada uno con 6 filas y un jefe final.</p><ul><li>⚔ <b>Combate</b> — enemigos normales.</li><li>💀 <b>Élite</b> — enemigos fuertes, mejor recompensa.</li><li>🕯 <b>Descanso</b> — recupera 20 HP.</li><li>🛒 <b>Tienda</b> — compra cartas con oro.</li><li>📦 <b>Cofre</b> — carta o monedas gratis.</li><li>☠☠ <b>Jefe</b> — al ganar eliges 2 cartas.</li></ul>`
  },
  {
    title: 'Las Reliquias',
    isRelicPage: true,
    content: `<p>Las <b>Reliquias</b> son objetos poderosos que equipas antes de la partida (máx. 1).</p><p>Se desbloquean completando el juego con cada personaje o superando retos del <b>Modo Infinito</b>.</p><p>La reliquia equipada aparece en el panel izquierdo. Pasa el ratón para ver su efecto.</p><p>Gestiónala en <b>Menú Principal → ⚜ Desbloqueos</b>.</p>`
  },
  {
    title: 'Modo Infinito y Ranking',
    imgKey: 'logo',
    content: `<p>Al completar los 3 Actos puedes entrar en el <b>🌑 Modo Infinito</b>.</p><p>Los enemigos escalan con cada 10 encuentros. Sobrevive el máximo posible.</p><p>Superar 10 y 20 encuentros desbloquea <b>Reliquias Legendarias</b> exclusivas.</p><p>Tu récord queda guardado en <b>📊 Estadísticas</b>. ¡Buena caza, Cazador!</p>`
  },
];

function showTutorial(page){
  page = page||0;
  let ov=document.getElementById('tutorialOverlay');
  if(!ov){ ov=document.createElement('div'); ov.id='tutorialOverlay'; ov.style.cssText='position:fixed;inset:0;z-index:9500;background:#080610f4;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;padding:16px;'; document.body.appendChild(ov); }
  buildTutorialPage(ov, page);
  ov.style.display='flex';
  requestAnimationFrame(()=>requestAnimationFrame(()=>{ ov.style.opacity='1'; }));
}

function closeTutorial(){
  const ov=document.getElementById('tutorialOverlay'); if(!ov) return;
  ov.style.opacity='0'; setTimeout(()=>{ ov.style.display='none'; },300);
}

function buildTutorialPage(ov, idx){
  const p=TUTORIAL_PAGES[idx];
  const total=TUTORIAL_PAGES.length;
  const isFirst=idx===0, isLast=idx===total-1;

  let imgHtml='';
  if(p.isCharPage){
    imgHtml=`<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">${CHARS.map(c=>{const img=getImg(c.imgKey);return`<div style="display:flex;flex-direction:column;align-items:center;gap:5px"><div style="width:62px;height:78px;border-radius:6px;overflow:hidden;border:1px solid #3a2a4a;background:#0e0b18">${img?`<img src="${img}" style="width:100%;height:100%;object-fit:cover">`:`<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:26px">${c.svg||'👤'}</div>`}</div><span style="font-size:9px;font-family:'Cinzel',serif;color:#c8b0d8;text-align:center;max-width:64px">${c.name}</span></div>`;}).join('')}</div>`;
  } else if(p.isEnemyPage){
    imgHtml=`<div style="display:flex;gap:8px;justify-content:center">${['enemy0','enemy1','enemy2','enemy_healer'].map(k=>{const img=getImg(k);return`<div style="width:50px;height:64px;border-radius:5px;overflow:hidden;border:1px solid #3a2a4a;background:#0e0b18">${img?`<img src="${img}" style="width:100%;height:100%;object-fit:contain">`:`<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:22px">👹</div>`}</div>`;}).join('')}</div>`;
  } else if(p.isCardPage){
    const samples=['strike','shield','ritual'].map(id=>CARDS.find(c=>c.id===id)).filter(Boolean);
    imgHtml=`<div style="display:flex;gap:8px;justify-content:center">${samples.map(card=>{const rc={'common':'#a0a0b0','uncommon':'#4a9fff','rare':'#cc80ff','legendary':'#ffcc44'}[card.rarity]||'#a0a0b0';const cImg=getImg('card_'+card.id);return`<div style="width:58px;height:86px;border-radius:4px;background:linear-gradient(160deg,#1a1228,#0e0b18);border:1px solid ${rc}55;border-top:2px solid ${rc};display:flex;flex-direction:column;overflow:hidden;position:relative;">${cImg?`<img src="${cImg}" style="width:100%;height:56px;object-fit:cover">`:`<div style="height:56px;display:flex;align-items:center;justify-content:center;font-size:20px">⚔</div>`}<div style="font-family:'Cinzel',serif;font-size:6.5px;color:#d0c0e0;text-align:center;padding:2px">${card.name}</div><div style="position:absolute;top:3px;right:3px;width:13px;height:13px;border-radius:50%;background:#1a1228;border:1px solid ${rc};display:flex;align-items:center;justify-content:center;font-size:7px;color:${rc}">${card.cost}</div></div>`;}).join('')}</div>`;
  } else if(p.isRelicPage){
    const data=loadRelicData();
    imgHtml=`<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">${RELICS.slice(0,4).map(r=>{const img=getRelicImg(r.id);const unl=data.unlocked.includes(r.id);return`<div style="width:50px;height:50px;border-radius:8px;background:linear-gradient(135deg,#1a1228,#2a1a3a);border:1px solid ${r.color}${unl?'':'22'};display:flex;align-items:center;justify-content:center;overflow:hidden;box-shadow:0 0 ${unl?'10px':'2px'} ${r.color}${unl?'55':'11'}">${img?`<img src="${img}" style="width:42px;height:42px;object-fit:contain;${unl?'':'filter:grayscale(1) brightness(.25)'}">`:`<div style="font-size:24px;${unl?'':'filter:grayscale(1) brightness(.25)'}">${r.icon}</div>`}</div>`;}).join('')}</div>`;
  } else if(p.isMapPage){
    imgHtml=`<div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap">${[['⚔','#c03050','Combate'],['💀','#9a2f45','Élite'],['🕯','#4a8aaa','Descanso'],['🛒','#d4a843','Tienda'],['📦','#5aaa30','Cofre']].map(([ico,clr,lbl])=>`<div style="width:50px;height:58px;border-radius:7px;background:linear-gradient(135deg,#1a1228,#0e0b18);border:1px solid ${clr}44;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px"><div style="font-size:20px">${ico}</div><div style="font-size:7.5px;font-family:'Cinzel',serif;color:${clr};letter-spacing:1px">${lbl}</div></div>`).join('')}</div>`;
  } else if(p.imgKey){
    const imgSrc = p.imgKey==='logo' ? 'resources/logo/logo.png' : getImg(p.imgKey);
    if(imgSrc) imgHtml=`<img src="${imgSrc}" style="width:72px;height:72px;object-fit:contain;border-radius:10px;filter:drop-shadow(0 0 14px #c9984a88)">`;
  }

  const dots=Array.from({length:total},(_,i)=>`<div onclick="buildTutorialPage(document.getElementById('tutorialOverlay'),${i})" style="width:${i===idx?'22px':'8px'};height:8px;border-radius:4px;background:${i===idx?'#d4a843':'#3a2a4a'};cursor:pointer;transition:all .25s;flex-shrink:0"></div>`).join('');

  ov.innerHTML=`<div style="background:linear-gradient(160deg,#1a1228,#0e0b18);border:1px solid #d4a84366;border-top:2px solid #d4a84388;border-radius:14px;max-width:520px;width:100%;padding:28px 26px 22px;display:flex;flex-direction:column;align-items:center;gap:16px;box-shadow:0 0 80px #d4a84422;position:relative;max-height:90vh;overflow-y:auto;">
    <button onclick="closeTutorial()" style="position:absolute;top:12px;right:14px;background:none;border:none;color:#7a6888;font-size:20px;cursor:pointer;line-height:1;padding:0" title="Cerrar">✕</button>
    <div style="text-align:center">
      <div style="font-family:'Cinzel',serif;font-size:8px;letter-spacing:4px;color:#7a6888;text-transform:uppercase;margin-bottom:6px">${idx+1} / ${total}</div>
      <div style="font-family:'Cinzel Decorative',cursive;font-size:clamp(15px,3vw,21px);color:#f0c060;letter-spacing:2px;text-shadow:0 0 30px #d4a84466">${p.title}</div>
    </div>
    ${imgHtml?`<div style="display:flex;justify-content:center">${imgHtml}</div>`:''}
    <div style="font-family:'IM Fell English',serif;font-size:clamp(13px,2vw,15px);color:#c8b8d8;line-height:1.85;text-align:left;width:100%">${p.content}</div>
    <div style="display:flex;align-items:center;justify-content:space-between;width:100%;gap:12px;margin-top:4px">
      <button onclick="buildTutorialPage(document.getElementById('tutorialOverlay'),${idx-1})" ${isFirst?'disabled':''} style="font-family:'Cinzel',serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;padding:9px 16px;border:1px solid #d4a84344;border-radius:3px;background:#d4a84310;color:${isFirst?'#4a3a58':'#d4a843'};cursor:${isFirst?'default':'pointer'};transition:all .2s;white-space:nowrap;flex-shrink:0">← Anterior</button>
      <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:center">${dots}</div>
      ${isLast
        ?`<button onclick="closeTutorial()" style="font-family:'Cinzel',serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;padding:9px 16px;border:1px solid #d4a843;border-radius:3px;background:#d4a84322;color:#d4a843;cursor:pointer;transition:all .2s;white-space:nowrap;flex-shrink:0">✓ ¡Entendido!</button>`
        :`<button onclick="buildTutorialPage(document.getElementById('tutorialOverlay'),${idx+1})" style="font-family:'Cinzel',serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;padding:9px 16px;border:1px solid #d4a84344;border-radius:3px;background:#d4a84310;color:#d4a843;cursor:pointer;transition:all .2s;white-space:nowrap;flex-shrink:0">Siguiente →</button>`
      }
    </div>
  </div>`;
}

// ═══════════════════════════════════════════════
//  AJUSTES — MENÚ DE CONFIGURACIÓN
// ═══════════════════════════════════════════════
function showSettings() {
  playUI();
  const existing = document.getElementById('settingsOverlay');
  if(existing) { existing.remove(); return; }
  const cfg = loadSettings();
  const aiOn = cfg.aiImages !== false;
  const ov = document.createElement('div');
  ov.id = 'settingsOverlay';
  ov.style.cssText = `position:fixed;inset:0;z-index:9000;display:flex;align-items:center;justify-content:center;background:rgba(5,3,12,.88);backdrop-filter:blur(6px);animation:fadeIn .2s ease;`;
  ov.innerHTML = `<div style="background:linear-gradient(160deg,#1a1030 0%,#110c20 100%);border:1px solid #d4a84355;border-radius:12px;padding:32px 28px;width:min(440px,92vw);box-shadow:0 0 60px #00000088,0 0 30px #d4a84311;position:relative;font-family:'Cinzel',serif;">
    <button id="settingsClose" style="position:absolute;top:14px;right:16px;background:none;border:none;color:#7a6888;font-size:20px;cursor:pointer;line-height:1;transition:color .2s;" onmouseover="this.style.color='#d4a843'" onmouseout="this.style.color='#7a6888'">✕</button>
    <div style="text-align:center;margin-bottom:28px">
      <div style="font-size:26px;margin-bottom:8px;filter:drop-shadow(0 0 12px #d4a84366)">⚙</div>
      <div style="font-size:15px;letter-spacing:.25em;text-transform:uppercase;color:#d4a843;text-shadow:0 0 12px #d4a84355">Ajustes</div>
    </div>
    <div style="margin-bottom:24px">
      <div style="font-size:9px;letter-spacing:.35em;text-transform:uppercase;color:#7a6888;margin-bottom:12px;padding-bottom:6px;border-bottom:1px solid #2a1e3a">🎵 &nbsp; Música</div>
      <div style="background:#160e26;border:1px solid #2a1e3a;border-radius:8px;padding:14px 16px;display:flex;flex-direction:column;gap:10px">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div>
            <div style="font-size:13px;color:#e8d8ba;letter-spacing:.05em;margin-bottom:3px">Volumen de música</div>
            <div style="font-size:11px;color:#5a4870;font-family:'IM Fell English',serif;font-style:italic">Archivo: resources/music/background.mp3</div>
          </div>
          <span id="musicVolLabel" style="font-family:'Cinzel',serif;font-size:12px;color:#d4a843;min-width:36px;text-align:right">${Math.round(getMusicVolume()*100)}%</span>
        </div>
        <input id="musicVolSlider" type="range" min="0" max="100" value="${Math.round(getMusicVolume()*100)}"
          style="width:100%;accent-color:#d4a843;cursor:pointer"
          oninput="setMusicVolume(this.value/100);document.getElementById('musicVolLabel').textContent=this.value+'%'">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:12px">
          <div>
            <div style="font-size:13px;color:#e8d8ba;letter-spacing:.05em;margin-bottom:3px">Volumen de efectos de sonido</div>
            <div style="font-size:11px;color:#5a4870;font-family:'IM Fell English',serif;font-style:italic">Cartas, golpes, menús, muerte...</div>
          </div>
          <span id="sfxVolLabel" style="font-family:'Cinzel',serif;font-size:12px;color:#d4a843;min-width:36px;text-align:right">${Math.round(getSfxVolume()*100)}%</span>
        </div>
        <input id="sfxVolSlider" type="range" min="0" max="100" value="${Math.round(getSfxVolume()*100)}"
          style="width:100%;accent-color:#d4a843;cursor:pointer"
          oninput="setSfxVolume(this.value/100);document.getElementById('sfxVolLabel').textContent=this.value+'%'">
      </div>
    </div>
    <div style="margin-bottom:24px">
      <div style="font-size:9px;letter-spacing:.35em;text-transform:uppercase;color:#7a6888;margin-bottom:12px;padding-bottom:6px;border-bottom:1px solid #2a1e3a">🎨 &nbsp; Visual</div>
      <div style="display:flex;align-items:center;justify-content:space-between;background:#160e26;border:1px solid #2a1e3a;border-radius:8px;padding:14px 16px;">
        <div>
          <div style="font-size:13px;color:#e8d8ba;letter-spacing:.05em;margin-bottom:3px">Imágenes generadas por IA</div>
          <div style="font-size:11px;color:#5a4870;font-family:'IM Fell English',serif;font-style:italic">Personajes, cartas y enemigos con arte IA</div>
        </div>
        <button id="aiToggleBtn" onclick="toggleAiImages()" style="width:48px;height:26px;border-radius:13px;border:none;cursor:pointer;background:${aiOn?'#d4a843':'#2a1e3a'};position:relative;transition:background .25s;flex-shrink:0;margin-left:16px;box-shadow:${aiOn?'0 0 10px #d4a84355':'none'};">
          <span style="position:absolute;top:3px;left:${aiOn?'24px':'3px'};width:20px;height:20px;border-radius:50%;background:${aiOn?'#fff':'#5a4870'};transition:left .25s;display:block;"></span>
        </button>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;background:#160e26;border:1px solid #2a1e3a;border-radius:8px;padding:14px 16px;margin-top:8px">
        <div>
          <div style="font-size:13px;color:#e8d8ba;letter-spacing:.05em;margin-bottom:3px">Confirmar carta con doble clic</div>
          <div style="font-size:11px;color:#5a4870;font-family:'IM Fell English',serif;font-style:italic">Primer clic selecciona · segundo clic ejecuta</div>
        </div>
        <button id="dcToggleBtn" onclick="toggleDoubleConfirm()" style="width:48px;height:26px;border-radius:13px;border:none;cursor:pointer;background:${getDoubleConfirm()?'#d4a843':'#2a1e3a'};position:relative;transition:background .25s;flex-shrink:0;margin-left:16px;box-shadow:${getDoubleConfirm()?'0 0 10px #d4a84355':'none'};">
          <span style="position:absolute;top:3px;left:${getDoubleConfirm()?'24px':'3px'};width:20px;height:20px;border-radius:50%;background:${getDoubleConfirm()?'#fff':'#5a4870'};transition:left .25s;display:block;"></span>
        </button>
      </div>
    </div>
    <div style="margin-bottom:8px">
      <div style="font-size:9px;letter-spacing:.35em;text-transform:uppercase;color:#7a6888;margin-bottom:12px;padding-bottom:6px;border-bottom:1px solid #2a1e3a">🗑 &nbsp; Borrar Datos</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <button onclick="settingsDeleteSave()" style="display:flex;align-items:center;gap:12px;width:100%;background:#160e26;border:1px solid #2a1e3a;border-radius:8px;padding:12px 16px;cursor:pointer;text-align:left;transition:all .2s;" onmouseover="this.style.borderColor='#c03040';this.style.background='#1e0e1c'" onmouseout="this.style.borderColor='#2a1e3a';this.style.background='#160e26'">
          <span style="font-size:18px">💾</span>
          <div><div style="font-size:12px;color:#e8d8ba;font-family:'Cinzel',serif;letter-spacing:.05em">Borrar partida guardada</div><div style="font-size:10px;color:#5a4870;font-family:'IM Fell English',serif;font-style:italic;margin-top:2px">Elimina el progreso actual del mapa</div></div>
        </button>
        <button onclick="settingsDeleteRelics()" style="display:flex;align-items:center;gap:12px;width:100%;background:#160e26;border:1px solid #2a1e3a;border-radius:8px;padding:12px 16px;cursor:pointer;text-align:left;transition:all .2s;" onmouseover="this.style.borderColor='#c03040';this.style.background='#1e0e1c'" onmouseout="this.style.borderColor='#2a1e3a';this.style.background='#160e26'">
          <span style="font-size:18px">🔮</span>
          <div><div style="font-size:12px;color:#e8d8ba;font-family:'Cinzel',serif;letter-spacing:.05em">Borrar reliquias desbloqueadas</div><div style="font-size:10px;color:#5a4870;font-family:'IM Fell English',serif;font-style:italic;margin-top:2px">Resetea todos los desbloqueos y reliquias equipadas</div></div>
        </button>
        <button onclick="settingsDeleteStats()" style="display:flex;align-items:center;gap:12px;width:100%;background:#160e26;border:1px solid #2a1e3a;border-radius:8px;padding:12px 16px;cursor:pointer;text-align:left;transition:all .2s;" onmouseover="this.style.borderColor='#c03040';this.style.background='#1e0e1c'" onmouseout="this.style.borderColor='#2a1e3a';this.style.background='#160e26'">
          <span style="font-size:18px">📊</span>
          <div><div style="font-size:12px;color:#e8d8ba;font-family:'Cinzel',serif;letter-spacing:.05em">Borrar estadísticas y ranking</div><div style="font-size:10px;color:#5a4870;font-family:'IM Fell English',serif;font-style:italic;margin-top:2px">Limpia el historial de partidas y la tabla de clasificación</div></div>
        </button>
        <button onclick="settingsDeleteAll()" style="display:flex;align-items:center;gap:12px;width:100%;background:#1a0a0e;border:1px solid #8a1a2a44;border-radius:8px;padding:12px 16px;cursor:pointer;text-align:left;transition:all .2s;margin-top:4px;" onmouseover="this.style.borderColor='#c03040';this.style.background='#220a0e'" onmouseout="this.style.borderColor='#8a1a2a44';this.style.background='#1a0a0e'">
          <span style="font-size:18px">☠</span>
          <div><div style="font-size:12px;color:#e87070;font-family:'Cinzel',serif;letter-spacing:.05em">Borrar TODO el progreso</div><div style="font-size:10px;color:#5a4870;font-family:'IM Fell English',serif;font-style:italic;margin-top:2px">Elimina partida, reliquias, estadísticas y ranking</div></div>
        </button>
      </div>
    </div>
    <div style="text-align:center;margin-top:22px;font-size:10px;color:#3a2a4a;letter-spacing:.15em">NOCTIS DECK · v0.0.7</div>
  </div>`;
  document.body.appendChild(ov);
  ov.addEventListener('click', e => { if(e.target === ov) closeSettings(); });
  document.getElementById('settingsClose').onclick = closeSettings;
}

function closeSettings() {
  playUI();
  const ov = document.getElementById('settingsOverlay');
  if(!ov) return;
  ov.style.animation = 'fadeOut .15s ease forwards';
  setTimeout(() => ov.remove(), 160);
}

function toggleAiImages() {
  const cfg = loadSettings();
  cfg.aiImages = cfg.aiImages === false ? true : false;
  saveSettings(cfg);
  const btn = document.getElementById('aiToggleBtn');
  if(!btn) return;
  const on = cfg.aiImages !== false;
  btn.style.background = on ? '#d4a843' : '#2a1e3a';
  btn.style.boxShadow = on ? '0 0 10px #d4a84355' : 'none';
  const knob = btn.querySelector('span');
  if(knob) { knob.style.left = on ? '24px' : '3px'; knob.style.background = on ? '#fff' : '#5a4870'; }
  try { renderRelicsPanel(); } catch(e) {}
}

function toggleDoubleConfirm() {
  const on = !getDoubleConfirm();
  setDoubleConfirm(on);
  const btn = document.getElementById('dcToggleBtn');
  if(!btn) return;
  btn.style.background = on ? '#d4a843' : '#2a1e3a';
  btn.style.boxShadow = on ? '0 0 10px #d4a84355' : 'none';
  const knob = btn.querySelector('span');
  if(knob) { knob.style.left = on ? '24px' : '3px'; knob.style.background = on ? '#fff' : '#5a4870'; }
}

function settingsDeleteSave() {
  if(!confirm('¿Borrar la partida guardada actual?')) return;
  playUI();
  localStorage.removeItem(SK);
  updateTitle();
  showSettingsToast('💾 Partida borrada');
}

function settingsDeleteRelics() {
  if(!confirm('¿Borrar todas las reliquias desbloqueadas y equipadas?')) return;
  playUI();
  localStorage.removeItem(RELIC_UNLOCK_KEY);
  localStorage.removeItem(RELIC_EQUIP_KEY);
  showSettingsToast('🔮 Reliquias reseteadas');
}

function settingsDeleteStats() {
  if(!confirm('¿Borrar todas las estadísticas y el ranking?')) return;
  playUI();
  try { localStorage.removeItem('noctis_stats_v1'); } catch(e) {}
  localStorage.removeItem(LB_KEY);
  showSettingsToast('📊 Estadísticas borradas');
}

function settingsDeleteAll() {
  if(!confirm('⚠ ¿Borrar TODO el progreso? Esta acción no se puede deshacer.')) return;
  playUI();
  [SK, RELIC_UNLOCK_KEY, RELIC_EQUIP_KEY, LB_KEY, 'noctis_stats_v1'].forEach(k => {
    try { localStorage.removeItem(k); } catch(e) {}
  });
  try { Object.keys(localStorage).filter(k => k.startsWith('ni_')).forEach(k => localStorage.removeItem(k)); } catch(e) {}
  CUSTOM = {};
  updateTitle();
  showSettingsToast('☠ Todo el progreso ha sido borrado');
}

function showSettingsToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = `position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#1a1030,#2a1a3a);border:1px solid #d4a84355;border-radius:8px;padding:10px 22px;font-family:'Cinzel',serif;font-size:12px;color:#d4a843;letter-spacing:.1em;z-index:9999;animation:fadeIn .2s ease;pointer-events:none;box-shadow:0 4px 20px #00000066;`;
  document.body.appendChild(t);
  setTimeout(() => { t.style.animation='fadeOut .3s ease forwards'; setTimeout(()=>t.remove(),300); }, 2200);
}

// ═══════════════════════════════════════════════
//  INJECT STATS BUTTON INTO TITLE + PATCH HTML
// ═══════════════════════════════════════════════
function injectStatsButton() {
  const tBtns = document.querySelector('.t-btns');
  if(!tBtns || document.getElementById('btnStats')) return;
  // Fila principal: stats + desbloqueos
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:8px;margin-top:4px;flex-wrap:wrap;align-items:center;justify-content:center;width:100%';
  row.innerHTML = `
    <button class="btn-sm" id="btnStats" onclick="showStats()">📊 Estadísticas</button>
    <button class="btn-sm" id="btnUnlocks" onclick="showUnlocks()">⚜ Desbloqueos</button>
  `;
  const smRow = tBtns.querySelector('div');
  if(smRow) tBtns.insertBefore(row, smRow);
  else tBtns.appendChild(row);

  // ✏ FIX ⚙: poner el engranaje en #s-title, position:absolute, justo a la derecha del ?
  if(!document.getElementById('btnSettings')){
    const sTitle = document.getElementById('s-title');
    if(sTitle){
      const settBtn = document.createElement('button');
      settBtn.id = 'btnSettings';
      settBtn.title = 'Ajustes';
      settBtn.textContent = '⚙';
      settBtn.style.cssText = 'position:absolute;top:8px;left:8px;z-index:200;background:linear-gradient(135deg,#1a1228,#0e0b18);border:1px solid #4a3a5a;border-radius:4px;color:#b8a8c8;font-size:16px;width:36px;height:36px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:border-color .2s,color .2s;font-family:Arial,sans-serif;';
      settBtn.onmouseenter = ()=>{ settBtn.style.borderColor='#e8b460'; settBtn.style.color='#e8b460'; };
      settBtn.onmouseleave = ()=>{ settBtn.style.borderColor='#4a3a5a'; settBtn.style.color='#b8a8c8'; };
      settBtn.onclick = showSettings;
      sTitle.appendChild(settBtn);
    }
  }
}

// ═══════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════
loadCustom();
updateTitle();
injectStatsButton();
initMobile();
