//let a=document.createElement("canvas");
let c = a.getContext("2d"), // no more $type conditional
w=window,
d = document,
M=Math,
r = M.random,
ruleSets = [
  {id: 1, name: "🪨📝✂️  Rock, Paper, Scissors", rules: '✂️ cuts 📝 covers 🪨 crushes ✂️'}],
FPS = 20,//50fps
SIZE = 0,
PIECES_COUNT = 3 * 5 * 7 * 10,
SPEED = 3,
TOUCH_DISTANCE = 3,
gameOn = false,
targetMap = {},
center = {},
emojis = [],
killFeed = [],
pieces = (new Array(90)).fill().map(() => ({o:'', x: 0, y: 0})),
myInterval = null,
gameRestartTimeout = null,
gameStartTimeout = 0,
selected = ruleSets[0];
init = () => {
  w.addEventListener('resize', resize);
  resize();
  ruleSets.map(r => r.rulesArr = r.rules.split(' '));
  gameRules.innerHTML = ruleSets.map;
  if (!myInterval) myInterval = setInterval(update, FPS);
  start();
};
const initEmojis = () => {
  const size = selected.rulesArr.length;
  targetMap = {};
  let emoji;
  for (let i = 0; i < selected.rulesArr.length; i += 2) {
    emoji = selected.rulesArr[i];
    if (!targetMap[emoji]) targetMap[emoji] = [];
    if (i < size - 1) targetMap[emoji].push(selected.rulesArr[i + 2]);
  }
  emojis = Object.keys(targetMap);
};
start = () => {
  initEmojis();
  let o;
  for (i = 0; i < 90; i++) {
    o = pieces[i];
    o.o = emojis[i % emojis.length];
    o.x = r() * innerWidth;
    o.y = r() * innerHeight
  }
  killFeed = [];
  if (gameRestartTimeout) clearTimeout(gameRestartTimeout);
  if (gameStartTimeout) clearTimeout(gameStartTimeout);
  resize();
  gameOn = false;


  gameStartTimeout = setTimeout(() => gameOn = true, 0);
};
let pieceMap = {};
let drawScore = (o, y) => {
  c.fillStyle = "black";
  c.fillText(o + ' ' + (pieceMap[o] ? pieceMap[o].length : 0), SIZE, y);
};
let isTarget = (p1, p2) => p2.o && targetMap[p1.o] && targetMap[p1.o].includes(p2.o);
let t = Date.now(), elapsed = 0, targets, weakness, closest, pangle, winIndex, tempY;
let update = () => {
  if (!gameOn) return;
  elapsed = Date.now() - t;
  clear();
  pieces.sort((a, b) => a.y - b.y);
  pieces.map(p => {
    if (!p.o) return;
    //render
    c.fillText(p.o, p.x - SIZE / 2, p.y + SIZE / 2 + ((elapsed + emojis.indexOf(p.o)) % 5));

    //find closest target piece
    targets = pieces.filter(p2 => isTarget(p, p2));
    if (targets.length > 0) {
      targets.sort((a, b) => dist(p, a) - dist(p, b));
      closest = targets[0];
      pangle = angle(p, closest);
      p.x += SPEED * M.cos(pangle);
      p.y += SPEED * M.sin(pangle);
      // line(p, closest);

      // collision dection
      if (dist(p, closest) < TOUCH_DISTANCE) {
        winIndex = selected.rulesArr.indexOf(p.o, selected.rulesArr.indexOf(closest.o));
        killFeed.unshift(getFeed(p.o, closest.o));
        closest.o = '';
        c.fillText(selected.collision || '💥', p.x - SIZE / 2, p.y + SIZE / 2);
      }
    }
    else {
      //if no targets, run away from their weakness! ...at 1/3rd the speed
      weakness = pieces.filter(p2 => !isTarget(p, p2));
      if (weakness.length > 0) {
        weakness.sort((a, b) => dist(p, a) - dist(p, b));
        closest = weakness[0];
        pangle = revertAngle(angle(p, closest));
        p.x += (SPEED / 3) * M.cos(pangle);
        p.y += (SPEED / 3) * M.sin(pangle);
      }
    }
  });

  //draw score
  tempY = 0;
  emojis.map((o, i) => {
    pieceMap[o] = pieces.filter(p => p.o === o);
    tempY = (SIZE) + (i * SIZE * 1.2);
    drawScore(o, tempY);
  });
  tempY += SIZE * 1.2;

  //check end condition
  if (isEndGame()) {
    gameOn = false;
  }
};
let getFeed = (a, b) => {
  let stop = false;
  let startIndex = 0;
  while (!stop) {
    indexA = selected.rulesArr.indexOf(a, startIndex);
    if (indexA === -1) stop = true;
    if (b == selected.rulesArr[indexA + 2]) {
      return `${a} ${selected.rulesArr[indexA + 1]} ${b}`;
    }
    startIndex = indexA + 2;
  }
  return `${a} defeated ${b}`;
};
let renderKillFeed = () => killFeed.map((o, i) => write(o, SIZE / 2, tempY + (i * SIZE), SIZE * .7));
let isEndGame = () => emojis.filter(o => didWin(o)).length === 1;
let isDead = o => !pieceMap[o] || pieceMap[o].length === 0;
let didWin = p => {
  if (emojis.filter(o => o !== p && isDead(o)).length === emojis.length - 1) {
    write(p + ' WINS', center.x, center.y, SIZE * 3, true);
    return true;
  }
  return false;
};

onload = () => init();

//---------------------------------------------------
// Utility functions
//---------------------------------------------------
const resize = () => {
  //adjust sizes of things whenever window is resized
  a.width = innerWidth;
  a.height = innerHeight;
  SIZE = M.min(a.width, a.height) / 15;
  c.font = SIZE + 'px serif';
  center.x = innerWidth / 2
  center.y = innerHeight / 2;
};
let clear = () => {
  c.fillStyle = "#888";
  c.rect(0, 0, innerWidth, innerHeight);
  c.fill();
};
let write = (str, x, y, fontSize, centered) => {
  if (!(y < innerHeight && y > 0 && x > 0 && x < innerWidth)) return; 
  c.font = fontSize + 'px serif';
  if (centered) x -= c.measureText(str).width / 2;
  c.fillText(str, x, y);
};
let dist = (p1, p2) => {
  let a = p1.x - p2.x,
  b = p1.y - p2.y;
  return M.sqrt(a * a + b * b);
};
let angle = (p1, p2) => M.atan2(p2.y - p1.y, p2.x - p1.x);// * 180 / Math.PI;//in degress
let revertAngle = radians => (radians + M.PI) % (2 * Math.PI);
