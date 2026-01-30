/**
 * Custom scramble text effect utility
 */

import gsap from 'gsap';

const SCRAMBLE_CHARS = '■▪▌▐▬';

export function scrambleText(
  element: HTMLElement,
  targetText: string,
  options: {
    duration?: number;
    chars?: string;
    revealDelay?: number;
    speed?: number;
    onUpdate?: (text: string) => void;
    onComplete?: () => void;
  } = {}
): gsap.core.Timeline {
  const {
    duration = 1,
    chars = SCRAMBLE_CHARS,
    revealDelay = 0.5,
    onUpdate,
    onComplete,
  } = options;

  const originalText = element.textContent || '';
  const charsArray = chars.split('');
  const targetLength = targetText.length;
  let currentText = originalText;

  const timeline = gsap.timeline({
    onUpdate: () => {
      if (onUpdate) {
        onUpdate(currentText);
      }
      element.textContent = currentText;
    },
    onComplete: () => {
      element.textContent = targetText;
      if (onComplete) {
        onComplete();
      }
    },
  });

  // Scramble phase
  const scrambleDuration = duration * (1 - revealDelay);
  const revealDuration = duration * revealDelay;

  timeline.to(
    {},
    {
      duration: scrambleDuration,
      ease: 'none',
      onUpdate: function () {
        const progress = this.progress();
        const revealedChars = Math.floor(progress * targetLength);
        let newText = '';
        for (let i = 0; i < targetLength; i++) {
          if (i < revealedChars) {
            newText += targetText[i];
          } else {
            const randomChar =
              charsArray[Math.floor(Math.random() * charsArray.length)];
            newText += randomChar;
          }
        }
        currentText = newText;
      },
    }
  );

  // Reveal phase
  timeline.to(
    {},
    {
      duration: revealDuration,
      ease: 'power2.out',
      onUpdate: function () {
        const progress = this.progress();
        const revealedChars = Math.floor(progress * targetLength);
        let newText = targetText.substring(0, revealedChars);
        for (
          let i = revealedChars;
          i < targetLength;
          i++
        ) {
          const randomChar =
            charsArray[Math.floor(Math.random() * charsArray.length)];
          newText += randomChar;
        }
        currentText = newText;
      },
    }
  );

  return timeline;
}

