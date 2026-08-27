import React, { useEffect, useState } from "react";

type WelcomeIntroProps = {
  onComplete: () => void;
};

export default function WelcomeIntro({ onComplete }: WelcomeIntroProps) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const closeDelay = reducedMotion ? 400 : 3800;
    const completeDelay = reducedMotion ? 650 : 4600;
    const closeTimer = window.setTimeout(() => setIsClosing(true), closeDelay);
    const completeTimer = window.setTimeout(onComplete, completeDelay);

    return () => {
      window.clearTimeout(closeTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const skipIntro = () => {
    setIsClosing(true);
    window.setTimeout(onComplete, 180);
  };

  return (
    <div className={isClosing ? "welcome-intro is-closing" : "welcome-intro"} role="dialog" aria-label="Introduction du portfolio" aria-live="polite">
      <div className="welcome-intro__grid" aria-hidden="true" />
      <div className="welcome-intro__orb welcome-intro__orb--one" aria-hidden="true" />
      <div className="welcome-intro__orb welcome-intro__orb--two" aria-hidden="true" />
      <div className="welcome-intro__content">
        <div className="welcome-intro__message" aria-label="Welcome to my Portfolio Website">
          <span className="welcome-intro__word welcome-intro__word--left">Welcome to my</span>
          <span className="welcome-intro__word welcome-intro__word--right">Portfolio Website</span>
        </div>
        <span className="welcome-intro__rule" aria-hidden="true" />
      </div>
      <button type="button" className="welcome-intro__skip" onClick={skipIntro}>Passer l’introduction</button>
    </div>
  );
}
