import './style.css';

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const sprite = new Image();
sprite.src = './sprites/pink/Pink_Monster_Idle_4.png';

let imgIndex = 0;
let start = null;

window.onkeydown = (e) => {
  console.log(e);
  if (e.keyCode === 39) {
    sprite.src = './sprites/pink/Pink_Monster_Walk_6.png';
  } else if (e.keyCode === 38) {
    sprite.src = './sprites/pink/Pink_Monster_Climb_4.png';
  }
};

function lala(timestamp: DOMHighResTimeStamp) {
  const imgPosition = imgIndex * 32;
  const timeNow = new Date().getTime();

  ctx.clearRect(10, 10, 42, 42);
  ctx.drawImage(sprite, imgPosition, 0, 32, 32, 10, 10, 42, 42);

  if (!start) start = new Date().getTime();
  const progress = timeNow - start;

  if (progress > 1000 / 12) {
    start = new Date().getTime();
    if (imgIndex > 2) {
      imgIndex = 0;
    } else {
      imgIndex++;
    }
  }

  requestAnimationFrame(lala);
}

requestAnimationFrame(lala);
