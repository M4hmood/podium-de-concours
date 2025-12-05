import confetti from "canvas-confetti";

export function useConfetti() {
  const fireConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ["#FFD700", "#FFA500"],
    });
    fire(0.2, {
      spread: 60,
      colors: ["#FFD700", "#FFA500", "#FF6347"],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ["#FFD700", "#C0C0C0", "#CD7F32"],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ["#FFD700", "#FFFFFF"],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ["#FFD700", "#FFA500", "#FF4500"],
    });
  };

  const fireStars = () => {
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
      zIndex: 9999,
    };

    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ["star"],
    });

    confetti({
      ...defaults,
      particleCount: 20,
      scalar: 0.75,
      shapes: ["circle"],
    });
  };

  const fireSides = () => {
    const end = Date.now() + 1000;

    const colors = ["#FFD700", "#FFA500", "#FF6347", "#C0C0C0"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
        zIndex: 9999,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
        zIndex: 9999,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return { fireConfetti, fireStars, fireSides };
}
