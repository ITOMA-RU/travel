'use strict';

/* ===== 候補データ（盤面にはこの順で並ぶ） ===== */
const PREFS = [
  { name: '沖縄', full: '沖縄県', region: '九州・沖縄', emoji: '🌺', tags: ['美ら海水族館', 'エメラルドの海', 'ソーキそば'] },
  { name: '長崎', full: '長崎県', region: '九州・沖縄', emoji: '⛪', tags: ['世界新三大夜景', 'ハウステンボス', 'ちゃんぽん'] },
  { name: '宮崎', full: '宮崎県', region: '九州・沖縄', emoji: '🌴', tags: ['高千穂峡', '日南海岸', 'チキン南蛮'] },
  { name: '熊本', full: '熊本県', region: '九州・沖縄', emoji: '🐻', tags: ['阿蘇の大草原', '熊本城', '馬刺し'] },
  { name: '大分', full: '大分県', region: '九州・沖縄', emoji: '♨️', tags: ['別府の地獄めぐり', '湯布院', 'とり天'] },
  { name: '鹿児島', full: '鹿児島県', region: '九州・沖縄', emoji: '🌋', tags: ['桜島', '屋久島', '黒豚しゃぶしゃぶ'] },
  { name: '福岡', full: '福岡県', region: '九州・沖縄', emoji: '🏮', tags: ['中洲の屋台', '太宰府天満宮', 'もつ鍋'] },
  { name: '広島', full: '広島県', region: '中国・四国', emoji: '⛩️', tags: ['宮島・厳島神社', '原爆ドーム', 'お好み焼き'] },
  { name: '兵庫', full: '兵庫県', region: '近畿', emoji: '🏯', tags: ['姫路城', '有馬温泉', '神戸ビーフ'] },
  { name: '香川', full: '香川県', region: '中国・四国', emoji: '🍜', tags: ['讃岐うどん', '直島のアート', '小豆島'] },
  { name: '徳島', full: '徳島県', region: '中国・四国', emoji: '🌀', tags: ['鳴門の渦潮', '祖谷のかずら橋', '徳島ラーメン'] },
  { name: '愛媛', full: '愛媛県', region: '中国・四国', emoji: '🍊', tags: ['道後温泉', 'しまなみ海道', '鯛めし'] },
  { name: '高知', full: '高知県', region: '中国・四国', emoji: '🐟', tags: ['桂浜', '四万十川', 'カツオのたたき'] },
  { name: '大阪', full: '大阪府', region: '近畿', emoji: '🐙', tags: ['USJ', '道頓堀', 'たこ焼き'] },
  { name: '富山', full: '富山県', region: '中部', emoji: '🦑', tags: ['ホタルイカ', '富山湾の寿司', '雨晴海岸'] },
  { name: '長野', full: '長野県', region: '中部', emoji: '🏔️', tags: ['白馬でスキー', '善光寺', '信州そば'] },
  { name: '愛知', full: '愛知県', region: '中部', emoji: '🍤', tags: ['ジブリパーク', '名古屋めし', 'レゴランド'] },
  { name: '新潟', full: '新潟県', region: '中部', emoji: '🍙', tags: ['湯沢でスキー', 'コシヒカリ', 'へぎそば'] },
  { name: '山梨', full: '山梨県', region: '中部', emoji: '🍇', tags: ['富士五湖', '富士急ハイランド', 'ほうとう'] },
  { name: '静岡', full: '静岡県', region: '中部', emoji: '🗻', tags: ['富士山ビュー', '熱海温泉', '浜松うなぎ'] },
  { name: '群馬', full: '群馬県', region: '関東', emoji: '🧖', tags: ['草津温泉の湯畑', '伊香保の石段街', '焼きまんじゅう'] },
  { name: '茨城', full: '茨城県', region: '関東', emoji: '🍠', tags: ['偕楽園の梅', '大洗の神磯の鳥居', 'あんこう鍋'] },
  { name: '栃木', full: '栃木県', region: '関東', emoji: '🥟', tags: ['日光東照宮', '鬼怒川温泉', '宇都宮餃子'] },
  { name: '山形', full: '山形県', region: '東北', emoji: '🍒', tags: ['銀山温泉', '蔵王の樹氷', '米沢牛'] },
  { name: '宮城', full: '宮城県', region: '東北', emoji: '🐄', tags: ['日本三景・松島', '仙台牛タン', '秋保温泉'] },
];

const REGIONS = ['九州・沖縄', '中国・四国', '近畿', '中部', '関東', '東北'];

/* 盤面の和色：朱・桜・藍・山吹・若竹・藤 */
const PALETTE = [
  { bg: '#d9482b', fg: '#fffaf0', stroke: 'rgba(60, 10, 0, .35)' },
  { bg: '#f3b6c4', fg: '#5a1f2e', stroke: 'rgba(255, 255, 255, .55)' },
  { bg: '#2f4c80', fg: '#fffaf0', stroke: 'rgba(0, 10, 40, .4)' },
  { bg: '#eea933', fg: '#3d2200', stroke: 'rgba(255, 255, 255, .45)' },
  { bg: '#4f9a6e', fg: '#fffaf0', stroke: 'rgba(0, 40, 20, .4)' },
  { bg: '#8e6fb8', fg: '#fffaf0', stroke: 'rgba(30, 10, 60, .4)' },
];

const TAU = Math.PI * 2;
const STORE_KEY = 'ikisaki-roulette:v1';
const HISTORY_MAX = 50;
const MIN_CANDIDATES = 2;
const LABEL_FONT = '"Yuji Syuku", "Hiragino Mincho ProN", "Yu Mincho", serif';
const EMOJI_FONT = '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const $ = (sel) => document.querySelector(sel);
const mod = (a, n) => ((a % n) + n) % n;

/* ===== 乱数（完全ランダム） ===== */
// 0..n-1 を一様に返す。crypto の32bit乱数を棄却サンプリングして剰余バイアスを取り除く
function randomInt(n) {
  const RANGE = 0x100000000;
  const limit = RANGE - (RANGE % n);
  const buf = new Uint32Array(1);
  do {
    crypto.getRandomValues(buf);
  } while (buf[0] >= limit);
  return buf[0] % n;
}

// [0, 1) の実数
function randomFloat() {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0] / 0x100000000;
}

/* ===== 保存（使えない環境でも動くように） ===== */
function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || {};
  } catch {
    return {};
  }
}

function persist() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify({
      excluded: [...state.excluded],
      history: state.history,
      muted: state.muted,
    }));
  } catch {
    // プライベートモード等では保存しない
  }
}

const saved = loadSaved();
const state = {
  excluded: new Set((Array.isArray(saved.excluded) ? saved.excluded : []).filter((n) => PREFS.some((p) => p.name === n))),
  history: (Array.isArray(saved.history) ? saved.history : [])
    .filter((h) => h && PREFS.some((p) => p.name === h.name) && Number.isFinite(h.at) && Number.isFinite(h.no))
    .slice(0, HISTORY_MAX),
  muted: saved.muted === true,
  items: [],
  rotation: 0,
  spinning: false,
  result: null,
};
if (PREFS.length - state.excluded.size < MIN_CANDIDATES) state.excluded.clear();

const el = {
  wheel: $('#wheel'),
  rim: $('#rim'),
  canvas: $('#wheelCanvas'),
  pointer: $('#pointer'),
  hub: $('#hubBtn'),
  spinBtn: $('#spinBtn'),
  status: $('#status'),
  soundBtn: $('#soundBtn'),
  candidates: $('#candidates'),
  candCount: $('#candCount'),
  allOn: $('#allOnBtn'),
  history: $('#history'),
  historyEmpty: $('#historyEmpty'),
  clearHist: $('#clearHistBtn'),
  modal: $('#modal'),
  resultEmoji: $('#resultEmoji'),
  resultName: $('#resultName'),
  resultRegion: $('#resultRegion'),
  resultTags: $('#resultTags'),
  share: $('#shareBtn'),
  again: $('#againBtn'),
  exclude: $('#excludeBtn'),
  toast: $('#toast'),
};

/* ===== 盤面の描画 ===== */
const wheelCtx = el.canvas.getContext('2d');
const shippo = makeShippoPattern(wheelCtx);

// 七宝つなぎの地紋
function makeShippoPattern(ctx) {
  const r = 26;
  const tile = document.createElement('canvas');
  tile.width = tile.height = r * 2;
  const g = tile.getContext('2d');
  g.strokeStyle = '#fff';
  g.lineWidth = 2;
  [[0, 0], [2 * r, 0], [0, 2 * r], [2 * r, 2 * r], [r, r]].forEach(([x, y]) => {
    g.beginPath();
    g.arc(x, y, r, 0, TAU);
    g.stroke();
  });
  return ctx.createPattern(tile, 'repeat');
}

// 隣り合う区画（最後と最初も）が同じ色にならないようにする
function segmentColor(i, n) {
  let k = i % PALETTE.length;
  if (i === n - 1 && n > 1 && k === 0) k = Math.floor(PALETTE.length / 2);
  return PALETTE[k];
}

// 区画 i は針（真上）から時計回りに [i*seg, (i+1)*seg) の範囲
function drawWheel() {
  const ctx = wheelCtx;
  const S = el.canvas.width;
  const C = S / 2;
  const R = C - 2;
  const items = state.items;
  const n = items.length;
  const seg = TAU / n;

  ctx.clearRect(0, 0, S, S);
  ctx.save();
  ctx.translate(C, C);

  items.forEach((_, i) => {
    const a0 = -Math.PI / 2 + i * seg;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, R, a0, a0 + seg);
    ctx.closePath();
    ctx.fillStyle = segmentColor(i, n).bg;
    ctx.fill();
  });

  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, R, 0, TAU);
  ctx.clip();
  ctx.globalAlpha = 0.13;
  ctx.fillStyle = shippo;
  ctx.fillRect(-C, -C, S, S);
  ctx.globalAlpha = 1;
  const sheen = ctx.createRadialGradient(0, 0, R * 0.2, 0, 0, R);
  sheen.addColorStop(0, 'rgba(255, 255, 255, .22)');
  sheen.addColorStop(0.65, 'rgba(255, 255, 255, 0)');
  sheen.addColorStop(1, 'rgba(0, 0, 0, .2)');
  ctx.fillStyle = sheen;
  ctx.fillRect(-C, -C, S, S);
  ctx.restore();

  ctx.strokeStyle = 'rgba(255, 246, 225, .9)';
  ctx.lineWidth = 3;
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + i * seg;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(a) * R, Math.sin(a) * R);
    ctx.stroke();
  }

  // 県名は外周から中心へ縦書き（針の位置に来たとき正しく読める向き）
  const fs = 62;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineJoin = 'round';
  items.forEach((p, i) => {
    const col = segmentColor(i, n);
    ctx.save();
    ctx.rotate((i + 0.5) * seg);
    ctx.font = `54px ${EMOJI_FONT}`;
    ctx.fillText(p.emoji, 0, -(R - 58));
    ctx.font = `${fs}px ${LABEL_FONT}`;
    ctx.lineWidth = 8;
    ctx.strokeStyle = col.stroke;
    ctx.fillStyle = col.fg;
    [...p.name].forEach((ch, j) => {
      const y = -(R - 136 - j * fs * 1.06);
      ctx.strokeText(ch, 0, y);
      ctx.fillText(ch, 0, y);
    });
    ctx.restore();
  });

  ctx.restore();
}

function setRotation(rad) {
  el.canvas.style.transform = `rotate(${rad}rad)`;
}

// 回転角 rot のとき針の下にある区画
function indexAt(rot, n) {
  return Math.floor(mod(-rot, TAU) / (TAU / n)) % n;
}

/* ===== 効果音（Web Audio で合成） ===== */
const sound = (() => {
  let ac = null;
  let master = null;
  let noise = null;

  function ctx() {
    if (state.muted) return null;
    if (!ac) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ac = new AC();
      master = ac.createGain();
      master.gain.value = 0.6;
      master.connect(ac.destination);
      noise = ac.createBuffer(1, ac.sampleRate * 0.5, ac.sampleRate);
      const d = noise.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    if (ac.state === 'suspended') ac.resume();
    return ac;
  }

  function envelope(gain, t, peak, decay) {
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(peak, t + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + decay);
  }

  // 拍子木風の「カッ」
  function tick() {
    const a = ctx();
    if (!a) return;
    const t = a.currentTime;
    const o = a.createOscillator();
    const g = a.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(1300, t);
    o.frequency.exponentialRampToValueAtTime(800, t + 0.05);
    envelope(g, t, 0.35, 0.07);
    o.connect(g).connect(master);
    o.start(t);
    o.stop(t + 0.08);

    const src = a.createBufferSource();
    const bp = a.createBiquadFilter();
    const ng = a.createGain();
    src.buffer = noise;
    bp.type = 'bandpass';
    bp.frequency.value = 2800;
    bp.Q.value = 3;
    envelope(ng, t, 0.3, 0.03);
    src.connect(bp).connect(ng).connect(master);
    src.start(t);
    src.stop(t + 0.04);
  }

  // 太鼓の「ドン」
  function taiko(a, t) {
    const o = a.createOscillator();
    const g = a.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(140, t);
    o.frequency.exponentialRampToValueAtTime(52, t + 0.45);
    envelope(g, t, 0.9, 0.9);
    o.connect(g).connect(master);
    o.start(t);
    o.stop(t + 1);

    const src = a.createBufferSource();
    const lp = a.createBiquadFilter();
    const ng = a.createGain();
    src.buffer = noise;
    lp.type = 'lowpass';
    lp.frequency.value = 600;
    envelope(ng, t, 0.5, 0.15);
    src.connect(lp).connect(ng).connect(master);
    src.start(t);
    src.stop(t + 0.2);
  }

  // 琴っぽく弾いた音
  function pluck(a, freq, t, decay, vol) {
    [[1, 'triangle', vol], [2, 'sine', vol * 0.35]].forEach(([mul, type, v]) => {
      const o = a.createOscillator();
      const g = a.createGain();
      o.type = type;
      o.frequency.value = freq * mul;
      envelope(g, t, v, decay);
      o.connect(g).connect(master);
      o.start(t);
      o.stop(t + decay + 0.05);
    });
  }

  // 太鼓 → 陽音階のアルペジオ → 和音
  function fanfare() {
    const a = ctx();
    if (!a) return;
    const t = a.currentTime + 0.02;
    taiko(a, t);
    const notes = [587.33, 659.25, 783.99, 880, 987.77, 1174.66];
    notes.forEach((f, i) => pluck(a, f, t + 0.14 + i * 0.09, 0.9, 0.18));
    const chord = t + 0.14 + notes.length * 0.09 + 0.06;
    taiko(a, chord);
    [587.33, 880, 1174.66].forEach((f) => pluck(a, f, chord, 1.8, 0.14));
  }

  return { tick, fanfare, unlock: ctx };
})();

/* ===== 紙吹雪（桜の花びら＋金・朱） ===== */
const confetti = (() => {
  const cv = $('#confetti');
  const c = cv.getContext('2d');
  const COLORS = ['#f7b6c8', '#f39bb3', '#ffd6e0', '#ffffff', '#d9482b', '#e8b94a', '#2f4c80'];
  let parts = [];
  let raf = 0;
  let W = 0;
  let H = 0;

  function resize() {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    W = window.innerWidth;
    H = window.innerHeight;
    cv.width = W * dpr;
    cv.height = H * dpr;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function petalPath(s) {
    c.beginPath();
    c.moveTo(0, s * 0.5);
    c.bezierCurveTo(-s * 0.6, s * 0.1, -s * 0.45, -s * 0.5, -s * 0.12, -s * 0.5);
    c.lineTo(0, -s * 0.32);
    c.lineTo(s * 0.12, -s * 0.5);
    c.bezierCurveTo(s * 0.45, -s * 0.5, s * 0.6, s * 0.1, 0, s * 0.5);
    c.closePath();
  }

  function particle(x, y, vx, vy, i) {
    const petal = Math.random() < 0.6;
    return {
      x, y, vx, vy,
      petal,
      color: petal ? COLORS[i % 3] : COLORS[3 + (i % 4)],
      size: petal ? 12 + Math.random() * 8 : 7 + Math.random() * 6,
      rot: Math.random() * TAU,
      vr: (Math.random() - 0.5) * 0.25,
      flip: Math.random() * TAU,
      vf: 0.06 + Math.random() * 0.12,
      life: 0,
    };
  }

  function burst() {
    if (reduceMotion) return;
    resize();
    for (let i = 0; i < 140; i++) {
      const left = i % 2 === 0;
      parts.push(particle(
        left ? -10 : W + 10,
        H * (0.55 + Math.random() * 0.25),
        (left ? 1 : -1) * (4 + Math.random() * 9),
        -(9 + Math.random() * 10),
        i,
      ));
    }
    for (let i = 0; i < 70; i++) {
      parts.push(particle(Math.random() * W, -20 - Math.random() * H * 0.4, (Math.random() - 0.5) * 2, 1 + Math.random() * 2, i));
    }
    if (!raf) raf = requestAnimationFrame(step);
  }

  function step() {
    c.clearRect(0, 0, W, H);
    parts = parts.filter((p) => p.y < H + 40 && p.life < 700);
    for (const p of parts) {
      p.life++;
      p.vy = Math.min(p.vy + 0.25, p.petal ? 2.2 : 4.2);
      p.vx *= p.petal ? 0.97 : 0.985;
      p.x += p.vx + Math.sin(p.life * 0.05 + p.flip) * (p.petal ? 0.9 : 0.3);
      p.y += p.vy;
      p.rot += p.vr;
      p.flip += p.vf;
      c.save();
      c.translate(p.x, p.y);
      c.rotate(p.rot);
      c.scale(1, Math.cos(p.flip));
      c.fillStyle = p.color;
      if (p.petal) {
        petalPath(p.size);
        c.fill();
      } else {
        c.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      }
      c.restore();
    }
    if (parts.length) {
      raf = requestAnimationFrame(step);
    } else {
      raf = 0;
      c.clearRect(0, 0, W, H);
    }
  }

  return { burst };
})();

/* ===== 回す ===== */
let pointerAnim = null;

function flickPointer() {
  if (reduceMotion) return;
  if (pointerAnim) pointerAnim.cancel();
  pointerAnim = el.pointer.animate(
    [{ transform: 'rotate(-18deg)' }, { transform: 'rotate(0deg)' }],
    { duration: 140, easing: 'ease-out' },
  );
}

// 最後にじわじわ粘る減速カーブ
function easeOut(t) {
  return 1 - Math.pow(1 - t, 3.6);
}

function spin() {
  const items = state.items;
  const n = items.length;
  if (state.spinning || n < MIN_CANDIDATES) return;

  sound.unlock();
  closeModal(false);

  // 当選は先に一様乱数で決め、区画内のどこに止まるかも乱数で決める
  const seg = TAU / n;
  const winner = randomInt(n);
  const landing = (winner + 0.15 + 0.7 * randomFloat()) * seg;
  const start = state.rotation;
  const end = start + (6 + randomInt(4)) * TAU + mod(-landing - start, TAU);
  const duration = 6500 + randomInt(1500);

  state.spinning = true;
  setBusy(true);
  el.status.textContent = '運命の行き先は……';

  let last = indexAt(start, n);
  const t0 = performance.now();
  const frame = (now) => {
    const t = Math.min(1, (now - t0) / duration);
    const rot = start + (end - start) * easeOut(t);
    setRotation(rot);
    const idx = indexAt(rot, n);
    if (idx !== last) {
      last = idx;
      sound.tick();
      flickPointer();
    }
    if (t < 1) requestAnimationFrame(frame);
    else finish(winner, end);
  };
  requestAnimationFrame(frame);
}

function finish(winner, end) {
  const n = state.items.length;
  state.rotation = mod(end, TAU);
  // 念のため、針の下の区画と当選結果が一致しているか確認（ずれたら区画の中央へ）
  if (indexAt(state.rotation, n) !== winner) state.rotation = mod(-(winner + 0.5) * (TAU / n), TAU);
  setRotation(state.rotation);

  const pref = state.items[winner];
  state.result = pref;
  addHistory(pref);
  el.status.textContent = `${pref.emoji} ${pref.full} に決定！`;
  sound.fanfare();
  el.wheel.classList.remove('is-spinning');
  el.wheel.classList.add('is-win');
  setTimeout(() => el.wheel.classList.remove('is-win'), 2600);

  setTimeout(() => {
    state.spinning = false;
    setBusy(false);
    openModal(pref);
    confetti.burst();
  }, 650);
}

function setBusy(busy) {
  document.body.classList.toggle('is-spinning', busy);
  el.wheel.classList.toggle('is-spinning', busy);
  el.spinBtn.disabled = busy;
  el.hub.disabled = busy;
  el.allOn.disabled = busy;
  el.spinBtn.textContent = busy ? '運命の行き先は…' : 'ルーレットを回す';
  el.candidates.querySelectorAll('.chip').forEach((b) => { b.disabled = busy; });
}

/* ===== 結果モーダル ===== */
function openModal(p) {
  el.resultEmoji.textContent = p.emoji;
  el.resultName.textContent = p.full;
  el.resultRegion.textContent = `${p.region}地方`;
  el.resultTags.replaceChildren(...p.tags.map((t) => make('li', '', t)));
  el.exclude.disabled = state.items.length <= MIN_CANDIDATES;
  el.modal.hidden = false;
  el.again.focus();
}

function closeModal(restoreFocus = true) {
  if (el.modal.hidden) return;
  el.modal.hidden = true;
  if (restoreFocus) el.spinBtn.focus();
}

async function share() {
  const p = state.result;
  if (!p) return;
  const url = location.href.split('#')[0];
  const text = `春休み六人旅の行き先は【${p.full}】に決定！${p.emoji}\nやりたいこと：${p.tags.join('・')}\n#行き先ルーレット`;
  if (navigator.share) {
    try {
      await navigator.share({ title: document.title, text, url });
      return;
    } catch (e) {
      if (e.name === 'AbortError') return;
    }
  }
  try {
    await navigator.clipboard.writeText(`${text}\n${url}`);
    toast('結果をコピーしました！LINEに貼り付けてね');
  } catch {
    toast('コピーできませんでした');
  }
}

/* ===== 候補ON/OFF ===== */
function make(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderCandidates() {
  const groups = REGIONS.map((region) => {
    const group = make('div', 'region');
    const chips = make('div', 'chips');
    PREFS.filter((p) => p.region === region).forEach((p) => {
      const b = make('button', 'chip');
      b.type = 'button';
      b.dataset.name = p.name;
      b.append(make('span', 'chip__emoji', p.emoji), p.name);
      b.firstChild.setAttribute('aria-hidden', 'true');
      chips.append(b);
    });
    group.append(make('p', 'region__label', region), chips);
    return group;
  });
  el.candidates.replaceChildren(...groups);
}

function onCandidatesChanged() {
  state.items = PREFS.filter((p) => !state.excluded.has(p.name));
  const n = state.items.length;
  el.candidates.querySelectorAll('.chip').forEach((b) => {
    b.setAttribute('aria-pressed', String(!state.excluded.has(b.dataset.name)));
  });
  el.candCount.textContent = n;
  el.canvas.setAttribute('aria-label', `ルーレット盤面：${state.items.map((p) => p.name).join('、')}`);
  if (!state.spinning) el.status.textContent = `候補 ${n}件 ・ 当たる確率はどれも ${(100 / n).toFixed(1)}%`;
  drawWheel();
  persist();
}

el.candidates.addEventListener('click', (e) => {
  const b = e.target.closest('.chip');
  if (!b || state.spinning) return;
  const name = b.dataset.name;
  if (state.excluded.has(name)) {
    state.excluded.delete(name);
  } else {
    if (PREFS.length - state.excluded.size <= MIN_CANDIDATES) {
      toast(`候補は${MIN_CANDIDATES}つ以上残してください`);
      return;
    }
    state.excluded.add(name);
  }
  onCandidatesChanged();
});

el.allOn.addEventListener('click', () => {
  if (state.spinning) return;
  state.excluded.clear();
  onCandidatesChanged();
  toast('25府県すべてを候補に戻しました');
});

/* ===== 履歴 ===== */
function formatTime(ms) {
  const d = new Date(ms);
  const pad = (v) => String(v).padStart(2, '0');
  return `${d.getMonth() + 1}/${d.getDate()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function addHistory(p) {
  const no = (state.history[0]?.no || 0) + 1;
  state.history.unshift({ no, name: p.name, at: Date.now() });
  state.history.length = Math.min(state.history.length, HISTORY_MAX);
  persist();
  renderHistory();
}

function renderHistory() {
  const rows = state.history.map((h) => {
    const p = PREFS.find((x) => x.name === h.name);
    const li = make('li');
    const emoji = make('span', 'history__emoji', p.emoji);
    emoji.setAttribute('aria-hidden', 'true');
    const time = make('time', 'history__time', formatTime(h.at));
    time.dateTime = new Date(h.at).toISOString();
    li.append(make('span', 'history__no', `第${h.no}回`), emoji, make('span', 'history__name', p.full), time);
    return li;
  });
  el.history.replaceChildren(...rows);
  el.historyEmpty.hidden = rows.length > 0;
  el.clearHist.hidden = rows.length === 0;
}

el.clearHist.addEventListener('click', () => {
  if (!window.confirm('抽選の履歴をすべて消しますか？')) return;
  state.history = [];
  persist();
  renderHistory();
});

/* ===== 効果音の切り替え ===== */
function renderSound() {
  el.soundBtn.textContent = state.muted ? '🔇 効果音 OFF' : '🔊 効果音 ON';
  el.soundBtn.setAttribute('aria-pressed', String(!state.muted));
}

el.soundBtn.addEventListener('click', () => {
  state.muted = !state.muted;
  renderSound();
  persist();
  sound.tick();
});

/* ===== トースト ===== */
let toastTimer = 0;
function toast(msg) {
  el.toast.textContent = msg;
  el.toast.classList.add('is-show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.toast.classList.remove('is-show'), 2400);
}

/* ===== 飾り ===== */
function makeStuds() {
  for (let i = 0; i < 24; i++) {
    const s = make('span', 'stud');
    s.style.setProperty('--i', i);
    el.rim.append(s);
  }
}

function makePetals() {
  if (reduceMotion) return;
  const box = $('#petals');
  for (let i = 0; i < 16; i++) {
    const p = make('span', 'petal');
    const dur = 9 + Math.random() * 8;
    p.style.setProperty('--x', `${Math.random() * 100}vw`);
    p.style.setProperty('--s', `${10 + Math.random() * 9}px`);
    p.style.setProperty('--d', `${dur}s`);
    p.style.setProperty('--delay', `${-Math.random() * dur}s`);
    p.style.setProperty('--drift', `${(Math.random() - 0.5) * 220}px`);
    p.style.setProperty('--sd', `${2 + Math.random() * 3}s`);
    box.append(p);
  }
}

// 青海波（重なり順を守って描いた SVG タイル）
function setSeigaiha() {
  const r = 24;
  const rings = [r - 0.5, r * 0.72, r * 0.46, r * 0.2]
    .map((rr) => `<circle r="${rr}" fill="none" stroke="#2f4c80" stroke-opacity=".38" stroke-width="1.4"/>`)
    .join('');
  const scale = ([x, y]) => `<g transform="translate(${x} ${y})"><circle r="${r - 0.5}" fill="#f6ecd8"/>${rings}</g>`;
  const centers = [[r, -r / 2], [0, 0], [2 * r, 0], [r, r / 2], [0, r], [2 * r, r], [r, 1.5 * r]];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${2 * r}" height="${r}">${centers.map(scale).join('')}</svg>`;
  document.documentElement.style.setProperty('--seigaiha', `url("data:image/svg+xml,${encodeURIComponent(svg)}")`);
}

/* ===== イベント ===== */
el.spinBtn.addEventListener('click', spin);
el.hub.addEventListener('click', spin);
el.again.addEventListener('click', spin);
el.share.addEventListener('click', share);

el.exclude.addEventListener('click', () => {
  const p = state.result;
  if (!p || state.items.length <= MIN_CANDIDATES) return;
  state.excluded.add(p.name);
  onCandidatesChanged();
  closeModal(false);
  toast(`${p.full} を候補から外しました`);
  setTimeout(spin, 450);
});

el.modal.addEventListener('click', (e) => {
  if (e.target.closest('[data-close]')) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !el.modal.hidden) {
    closeModal();
    return;
  }
  // ボタン以外にフォーカスがあるとき Space / Enter で回す
  if ((e.key === ' ' || e.key === 'Enter') && e.target === document.body && el.modal.hidden) {
    e.preventDefault();
    spin();
  }
});

/* ===== 初期化 ===== */
setSeigaiha();
makeStuds();
makePetals();
renderCandidates();
onCandidatesChanged();
renderHistory();
renderSound();
state.rotation = mod(-0.5 * (TAU / state.items.length), TAU);
setRotation(state.rotation);

// 筆文字フォントの読み込みが終わったら描き直す
if (document.fonts) {
  document.fonts.load(`62px "Yuji Syuku"`, PREFS.map((p) => p.name).join('')).then(drawWheel, () => {});
  document.fonts.ready.then(drawWheel);
}
