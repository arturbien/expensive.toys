export function addParticleEffect(canvasSelector: string, userOptions?: any) {
  let running = true;
  const defaults = {
    mousemove: false,
  };
  const options = Object.assign({}, defaults);
  let W,
    H,
    now,
    then,
    canvas,
    ctx,
    particleCount = Math.round(window.innerWidth * window.innerHeight * 0.001),
    particles = [];

  W = window.innerWidth;
  H = window.innerHeight;

  canvas = document.querySelector(canvasSelector);
  canvas.width = W;
  canvas.height = H;

  ctx = canvas.getContext("2d");
  ctx.globalCompositeOperation = "lighter";

  var mouse = {
    x: 0,
    y: 0,
    rx: 0,
    ry: 0,
    speed: 15,
    delta: 0,
  };

  function randomNorm(mean, stdev) {
    return (
      Math.abs(
        Math.round(
          Math.random() * 2 -
            1 +
            (Math.random() * 2 - 1) +
            (Math.random() * 2 - 1)
        ) * stdev
      ) + mean
    );
  }

  //Setup particle class
  function Particle() {
    //using hsl is easier when we need particles with similar colors
    this.h = parseInt("0", 10);
    this.s = parseInt((40 * Math.random() + 60).toString(), 10);
    // this.l = parseInt(40 * Math.random() + 60, 10);
    this.l = 0;
    this.a = 0.5 * Math.random();

    this.color = `#00000088`;

    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.direction = {
      x: -1 + Math.random() * 2,
      y: -1 + Math.random() * 2,
    };
    this.radius = randomNorm(0, 1);
    this.scale = 0.6 * Math.random() + 0.2;
    this.rotation = (Math.PI / 4) * Math.random();

    this.grad = ctx.createRadialGradient(
      this.x,
      this.y,
      this.radius,
      this.x,
      this.y,
      0
    );
    this.grad.addColorStop(0, this.color);

    this.vx = (2 * Math.random() + 4) * 0.08 * this.radius;
    this.vy = (2 * Math.random() + 4) * 0.08 * this.radius;

    this.valpha = 0.01 * Math.random() - 0.02;

    this.move = function () {
      this.x += this.vx * this.direction.x;
      this.y += this.vy * this.direction.y;
      this.rotation += this.valpha;
      // this.radius *= Math.abs(this.valpha * 0.01 + 1);
    };

    this.changeDirection = function (axis) {
      this.direction[axis] *= -1;
      this.valpha *= -1;
    };

    this.draw = function () {
      ctx.save();
      ctx.translate(
        this.x + (mouse.rx / -20) * this.radius,
        this.y + (mouse.ry / -20) * this.radius
      );
      ctx.rotate(this.rotation);
      ctx.scale(this.scale, this.scale);

      this.grad = ctx.createRadialGradient(0, 0, this.radius, 0, 0, 0);
      this.grad.addColorStop(1, this.color);
      ctx.beginPath();
      ctx.fillStyle = this.grad;
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.restore();
    };

    this.boundaryCheck = function () {
      if (this.x >= W * 1) {
        this.x = W * 1;
        this.changeDirection("x");
      } else if (this.x <= -W * 0) {
        this.x = -W * 0;
        this.changeDirection("x");
      }
      if (this.y >= H * 1) {
        this.y = H * 1;
        this.changeDirection("y");
      } else if (this.y <= -H * 0) {
        this.y = -H * 0;
        this.changeDirection("y");
      }
    };
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, W, H);
  }

  function createParticles() {
    for (var i = particleCount - 1; i >= 0; i--) {
      var p = new Particle();
      particles.push(p);
    }
  }

  function drawParticles() {
    for (var i = particleCount - 1; i >= 0; i--) {
      var p = particles[i];
      p.draw();
    }
  }

  function updateParticles() {
    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      p.move();
      p.boundaryCheck();
    }
  }

  function initParticleSystem() {
    createParticles();
    drawParticles();
  }

  function animateParticles() {
    if (!running) return;
    clearCanvas();
    setDelta();
    update();
    drawParticles();
    updateParticles();
    requestAnimationFrame(animateParticles);
  }

  initParticleSystem();
  requestAnimationFrame(animateParticles);

  function setDelta() {
    now = new Date().getTime();
    mouse.delta = (now - then) / 1000;
    then = now;
  }

  function update() {
    if (isNaN(mouse.delta) || mouse.delta <= 0) {
      return;
    }
  }
  return () => {
    running = false;
  };
}
