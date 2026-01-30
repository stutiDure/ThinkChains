"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { splitText, SplitTextResult } from '../../utils/textSplit';
import { scrambleText } from '../../utils/scrambleText';

interface WindowWithResizeTimer extends Window {
  resizeTimer?: ReturnType<typeof setTimeout>;
}

// Text items configuration - CEO Portfolio themed
const TEXT_ITEMS = [
  { text: 'THINK', top: '3%', left: '8%' },
  { text: 'CHAINS', top: '3%', left: '20%' },
  { text: 'INNOVATE', top: '3%', left: '35%' },
  { text: 'DISRUPT', top: '3%', left: '52%' },
  { text: '&', top: '3%', left: '68%' },
  { text: 'LEAD', top: '3%', left: '75%' },
  { text: 'BUILD', top: '3%', right: '8%' },
  { text: 'VISION', top: '8%', left: '12%' },
  { text: 'STRATEGY', top: '8%', left: '45%' },
  { text: 'EXECUTION', top: '8%', right: '20%' },
  { text: 'THE', top: '13%', left: '8%' },
  { text: 'FUTURE', top: '13%', left: '30%' },
  { text: 'IS', top: '13%', left: '55%' },
  { text: 'BLOCKCHAIN', top: '13%', right: '20%' },
  { text: 'AI', top: '18%', left: '5%' },
  { text: 'DRIVEN', top: '18%', left: '12%' },
  { text: 'T', top: '23%', left: '5%' },
  { text: 'H', top: '23%', left: '8%' },
  { text: 'I', top: '23%', left: '11%' },
  { text: 'N', top: '23%', left: '14%' },
  { text: 'K', top: '23%', left: '17%' },
  { text: 'CHAINS', top: '23%', left: '22%' },
  { text: 'CEO', top: '23%', right: '5%' },
  { text: 'ENTREPRENEUR', top: '28%', left: '25%' },
  { text: 'TECH LEADER', top: '28%', left: '65%' },
  { text: 'BUILDING', top: '45%', left: '5%' },
  { text: 'THE FUTURE', top: '45%', right: '5%' },
  { text: 'INNOVATION', top: '70%', left: '20%' },
  { text: 'LEADERSHIP', top: '70%', right: '20%' },
  { text: 'BLOCKCHAIN', top: '75%', left: '10%' },
  { text: 'AI', top: '75%', left: '35%' },
  { text: 'TECH', top: '75%', left: '65%' },
  { text: 'VISION', top: '75%', right: '10%' },
  { text: 'THINK', top: '80%', left: '25%' },
  { text: 'CHAINS', top: '80%', right: '25%' },
];

// Alternative texts for each state - CEO Portfolio themed
const ALTERNATIVE_TEXTS: Record<string, Record<string, string>> = {
  innovate: {
    THINK: 'IMAGINE',
    CHAINS: 'SYSTEMS',
    INNOVATE: 'CREATE',
    DISRUPT: 'TRANSFORM',
    '&': '+',
    LEAD: 'GUIDE',
    BUILD: 'CONSTRUCT',
    VISION: 'DREAM',
    STRATEGY: 'PLAN',
    EXECUTION: 'DELIVERY',
    THE: 'OUR',
    FUTURE: 'TOMORROW',
    IS: 'BECOMES',
    BLOCKCHAIN: 'WEB3',
    AI: 'ML',
    DRIVEN: 'POWERED',
    T: 'TECH',
    H: 'HUMAN',
    I: 'INTELLIGENCE',
    N: 'NETWORK',
    K: 'KNOWLEDGE',
    CEO: 'LEADER',
    ENTREPRENEUR: 'FOUNDER',
    'TECH LEADER': 'INNOVATOR',
    BUILDING: 'CREATING',
    'THE FUTURE': 'TOMORROW',
    INNOVATION: 'CREATIVITY',
    LEADERSHIP: 'GUIDANCE',
    TECH: 'TECHNOLOGY',
  },
  lead: {
    THINK: 'STRATEGIZE',
    CHAINS: 'NETWORKS',
    INNOVATE: 'PIONEER',
    DISRUPT: 'REVOLUTIONIZE',
    '&': '→',
    LEAD: 'INSPIRE',
    BUILD: 'DEVELOP',
    VISION: 'MISSION',
    STRATEGY: 'APPROACH',
    EXECUTION: 'IMPLEMENTATION',
    THE: 'EACH',
    FUTURE: 'NEXT',
    IS: 'REQUIRES',
    BLOCKCHAIN: 'CRYPTO',
    AI: 'INTELLIGENCE',
    DRIVEN: 'FOCUSED',
    T: 'TEAM',
    H: 'HUMANITY',
    I: 'INNOVATION',
    N: 'NEXT',
    K: 'KEY',
    CEO: 'EXECUTIVE',
    ENTREPRENEUR: 'BUILDER',
    'TECH LEADER': 'VISIONARY',
    BUILDING: 'SHAPING',
    'THE FUTURE': 'NEXT ERA',
    INNOVATION: 'BREAKTHROUGH',
    LEADERSHIP: 'EXCELLENCE',
    TECH: 'DIGITAL',
  },
  build: {
    THINK: 'EXECUTE',
    CHAINS: 'SOLUTIONS',
    INNOVATE: 'DEVELOP',
    DISRUPT: 'CHANGE',
    '&': '=',
    LEAD: 'ACHIEVE',
    BUILD: 'CREATE',
    VISION: 'REALITY',
    STRATEGY: 'TACTICS',
    EXECUTION: 'RESULTS',
    THE: 'THIS',
    FUTURE: 'NOW',
    IS: 'MEANS',
    BLOCKCHAIN: 'DISTRIBUTED',
    AI: 'AUTOMATION',
    DRIVEN: 'ENABLED',
    T: 'TRANSFORM',
    H: 'HORIZON',
    I: 'IMPACT',
    N: 'NEW',
    K: 'KINETIC',
    CEO: 'CHIEF',
    ENTREPRENEUR: 'CREATOR',
    'TECH LEADER': 'ARCHITECT',
    BUILDING: 'MAKING',
    'THE FUTURE': 'TODAY',
    INNOVATION: 'PROGRESS',
    LEADERSHIP: 'SUCCESS',
    TECH: 'FUTURE',
  },
};

const TYPE_LINES = [
  'innovate innovate innovate',
  'lead lead lead',
  'build build build',
  'innovate innovate innovate',
  'lead lead lead',
  'build build build',
  'innovate innovate innovate',
  'lead lead lead',
  'build build build',
  'innovate innovate innovate',
  'lead lead lead',
  'build build build',
];

interface AnimationState {
  activeRowId: string | null;
  kineticAnimationActive: boolean;
  activeKineticAnimation: gsap.core.Timeline | null;
  textRevealAnimation: gsap.core.Timeline | null;
  transitionInProgress: boolean;
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textBackgroundRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const kineticTypeRef = useRef<HTMLDivElement>(null);
  const backgroundImagesRef = useRef<Record<string, HTMLDivElement | null>>({
    default: null,
    innovate: null,
    lead: null,
    build: null,
  });
  const textItemRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const textRowRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const splitTextsRef = useRef<Record<string, SplitTextResult>>({});
  const helloTextRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<AnimationState>({
    activeRowId: null,
    kineticAnimationActive: false,
    activeKineticAnimation: null,
    textRevealAnimation: null,
    transitionInProgress: false,
  });

  // Custom ease function (approximation of customEase)
  const customEase = 'power2.inOut';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initializeAnimation = () => {
      const state = stateRef.current;
      const backgroundTextItems = Array.from(textItemRefs.current.values());
      const textRows = Array.from(textRowRefs.current.values());

      // Switch background image function
      const switchBackgroundImage = (id: string) => {
        Object.values(backgroundImagesRef.current).forEach((bg) => {
          if (bg) {
            gsap.to(bg, {
              opacity: 0,
              duration: 0.8,
              ease: customEase,
            });
          }
        });

        const targetBg = backgroundImagesRef.current[id] || backgroundImagesRef.current.default;
        if (targetBg) {
          gsap.to(targetBg, {
            opacity: 1,
            duration: 0.8,
            ease: customEase,
            delay: 0.2,
          });
        }
      };

      // Initialize split texts
      textRows.forEach((row) => {
        const textElement = row.querySelector('.text-content') as HTMLElement;
        if (!textElement) return;

        const rowId = row.dataset.rowId || '';
        const result = splitText(textElement, {
          type: 'chars',
          charsClass: 'char',
          reduceWhiteSpace: false,
        });

        splitTextsRef.current[rowId] = result;
        textElement.style.visibility = 'visible';
      });

      // Update character widths
      const updateCharacterWidths = () => {
        const isMobile = window.innerWidth < 1024;

        textRows.forEach((row) => {
          const rowId = row.dataset.rowId || '';
          const textElement = row.querySelector('.text-content') as HTMLElement;
          if (!textElement || !splitTextsRef.current[rowId]) return;

          const computedStyle = window.getComputedStyle(textElement);
          const currentFontSize = computedStyle.fontSize;
          const chars = splitTextsRef.current[rowId].chars;

          chars.forEach((char, i) => {
            const charText = char.textContent || '';
            if (!charText && i === 0) return;

            let charWidth: number;

            if (isMobile) {
              const fontSizeValue = parseFloat(currentFontSize);
              charWidth = fontSizeValue * 0.6;

              if (!char.querySelector('.char-inner') && charText) {
                char.textContent = '';
                const innerSpan = document.createElement('span');
                innerSpan.className = 'char-inner';
                innerSpan.textContent = charText;
                char.appendChild(innerSpan);
                innerSpan.style.transform = 'translate3d(0, 0, 0)';
              }

              char.style.width = `${charWidth}px`;
              char.style.maxWidth = `${charWidth}px`;
              (char as HTMLElement).dataset.charWidth = String(charWidth);
              (char as HTMLElement).dataset.hoverWidth = String(charWidth);
            } else {
              const tempSpan = document.createElement('span');
              tempSpan.style.position = 'absolute';
              tempSpan.style.visibility = 'hidden';
              tempSpan.style.fontSize = currentFontSize;
              tempSpan.style.fontFamily = 'inherit';
              tempSpan.textContent = charText;
              document.body.appendChild(tempSpan);

              const actualWidth = tempSpan.offsetWidth;
              document.body.removeChild(tempSpan);

              const fontSizeValue = parseFloat(currentFontSize);
              const fontSizeRatio = fontSizeValue / 160;
              const padding = 10 * fontSizeRatio;
              charWidth = Math.max(actualWidth + padding, 30 * fontSizeRatio);

              if (!char.querySelector('.char-inner') && charText) {
                char.textContent = '';
                const innerSpan = document.createElement('span');
                innerSpan.className = 'char-inner';
                innerSpan.textContent = charText;
                char.appendChild(innerSpan);
                innerSpan.style.transform = 'translate3d(0, 0, 0)';
              }

              char.style.width = `${charWidth}px`;
              char.style.maxWidth = `${charWidth}px`;
              (char as HTMLElement).dataset.charWidth = String(charWidth);
              const hoverWidth = Math.max(charWidth * 1.8, 85 * fontSizeRatio);
              (char as HTMLElement).dataset.hoverWidth = String(hoverWidth);
            }

            char.style.setProperty('--char-index', i.toString());
          });
        });
      };

      updateCharacterWidths();

      window.addEventListener('resize', () => {
        clearTimeout((window as WindowWithResizeTimer).resizeTimer);
        (window as WindowWithResizeTimer).resizeTimer = setTimeout(() => {
          updateCharacterWidths();
        }, 250);
      });

      // Initial text reveal animation
      textRows.forEach((row, rowIndex) => {
        const rowId = row.dataset.rowId || '';
        const chars = splitTextsRef.current[rowId]?.chars || [];

        gsap.set(chars, {
          opacity: 0,
          filter: 'blur(15px)',
        });

        gsap.to(chars, {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.09,
          ease: customEase,
          delay: 0.15 * rowIndex,
        });
      });

      // Kinetic animation functions
      const forceResetKineticAnimation = () => {
        if (state.activeKineticAnimation) {
          state.activeKineticAnimation.kill();
          state.activeKineticAnimation = null;
        }

        const kineticType = kineticTypeRef.current;
        if (!kineticType) return;

        const typeLines = kineticType.querySelectorAll('.type-line');
        gsap.killTweensOf([kineticType, typeLines]);

        gsap.set(kineticType, {
          scale: 1,
          rotation: 0,
          opacity: 1,
          visibility: 'visible',
        });

        gsap.set(typeLines, {
          opacity: 0.015,
          x: '0%',
        });

        state.kineticAnimationActive = false;
      };

      const startKineticAnimation = (text: string) => {
        forceResetKineticAnimation();

        const kineticType = kineticTypeRef.current;
        if (!kineticType) return;

        kineticType.style.display = 'grid';
        kineticType.style.opacity = '1';
        kineticType.style.visibility = 'visible';

        const repeatedText = `${text} ${text} ${text}`;
        const typeLines = kineticType.querySelectorAll('.type-line');
        typeLines.forEach((line) => {
          line.textContent = repeatedText;
        });

        setTimeout(() => {
          const timeline = gsap.timeline({
            onComplete: () => {
              state.kineticAnimationActive = false;
            },
          });

          timeline.to(kineticType, {
            duration: 1.4,
            ease: customEase,
            scale: 2.7,
            rotation: -90,
          });

          const oddLines = kineticType.querySelectorAll('.type-line.odd');
          const evenLines = kineticType.querySelectorAll('.type-line.even');

          timeline.to(
            oddLines,
            {
              keyframes: [
                { x: '20%', duration: 1, ease: customEase },
                { x: '-200%', duration: 1.5, ease: customEase },
              ],
              stagger: 0.08,
            },
            0
          );

          timeline.to(
            evenLines,
            {
              keyframes: [
                { x: '-20%', duration: 1, ease: customEase },
                { x: '200%', duration: 1.5, ease: customEase },
              ],
              stagger: 0.08,
            },
            0
          );

          timeline.to(
            typeLines,
            {
              keyframes: [
                { opacity: 1, duration: 1, ease: customEase },
                { opacity: 0, duration: 1.5, ease: customEase },
              ],
              stagger: 0.05,
            },
            0
          );

          state.kineticAnimationActive = true;
          state.activeKineticAnimation = timeline;
        }, 20);
      };

      const fadeOutKineticAnimation = () => {
        if (!state.kineticAnimationActive) return;

        if (state.activeKineticAnimation) {
          state.activeKineticAnimation.kill();
          state.activeKineticAnimation = null;
        }

        const kineticType = kineticTypeRef.current;
        if (!kineticType) return;

        const fadeOutTimeline = gsap.timeline({
          onComplete: () => {
            gsap.set(kineticType, {
              scale: 1,
              rotation: 0,
              opacity: 1,
            });

            const typeLines = kineticType.querySelectorAll('.type-line');
            gsap.set(typeLines, {
              opacity: 0.015,
              x: '0%',
            });

            state.kineticAnimationActive = false;
          },
        });

        fadeOutTimeline.to(kineticType, {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: customEase,
        });
      };

      // Text reveal animation
      const createTextRevealAnimation = (rowId: string) => {
        const timeline = gsap.timeline();

        timeline.to(backgroundTextItems, {
          opacity: 0.3,
          duration: 0.5,
          ease: customEase,
        });

        timeline.call(() => {
          backgroundTextItems.forEach((item) => {
            item.classList.add('highlight');
          });
        });

        timeline.call(
          () => {
            backgroundTextItems.forEach((item) => {
              const originalText = item.dataset.text || '';
              const altTexts = ALTERNATIVE_TEXTS[rowId];
              if (altTexts && altTexts[originalText]) {
                item.textContent = altTexts[originalText];
              }
            });
          },
          undefined,
          '+=0.5'
        );

        timeline.call(() => {
          backgroundTextItems.forEach((item) => {
            item.classList.remove('highlight');
            item.classList.add('highlight-reverse');
          });
        });

        timeline.call(
          () => {
            backgroundTextItems.forEach((item) => {
              item.classList.remove('highlight-reverse');
            });
          },
          undefined,
          '+=0.5'
        );

        return timeline;
      };

      const resetBackgroundTextWithAnimation = () => {
        const timeline = gsap.timeline();

        timeline.call(() => {
          backgroundTextItems.forEach((item) => {
            item.classList.add('highlight');
          });
        });

        timeline.call(
          () => {
            backgroundTextItems.forEach((item) => {
              item.textContent = item.dataset.originalText || '';
            });
          },
          undefined,
          '+=0.5'
        );

        timeline.call(() => {
          backgroundTextItems.forEach((item) => {
            item.classList.remove('highlight');
            item.classList.add('highlight-reverse');
          });
        });

        timeline.call(
          () => {
            backgroundTextItems.forEach((item) => {
              item.classList.remove('highlight-reverse');
            });
          },
          undefined,
          '+=0.5'
        );

        timeline.to(backgroundTextItems, {
          opacity: 1,
          duration: 0.5,
          ease: customEase,
        });

        return timeline;
      };

      const transitionBetweenRows = (fromRow: HTMLElement, toRow: HTMLElement) => {
        if (state.transitionInProgress) return;
        state.transitionInProgress = true;

        const fromRowId = fromRow.dataset.rowId || '';
        const toRowId = toRow.dataset.rowId || '';

        fromRow.classList.remove('active');
        const fromChars = splitTextsRef.current[fromRowId]?.chars || [];
        const fromInners = fromRow.querySelectorAll('.char-inner');

        gsap.killTweensOf(fromChars);
        gsap.killTweensOf(fromInners);

        toRow.classList.add('active');
        state.activeRowId = toRowId;
        const toText = (toRow.querySelector('.text-content') as HTMLElement)?.dataset.text || '';
        const toChars = splitTextsRef.current[toRowId]?.chars || [];
        const toInners = toRow.querySelectorAll('.char-inner');

        forceResetKineticAnimation();
        switchBackgroundImage(toRowId);

        startKineticAnimation(toText);

        if (state.textRevealAnimation) {
          state.textRevealAnimation.kill();
        }
        state.textRevealAnimation = createTextRevealAnimation(toRowId);

        gsap.set(fromChars, {
          maxWidth: (i: number, target: HTMLElement) => parseFloat((target as HTMLElement).dataset.charWidth || '0'),
        });

        gsap.set(fromInners, {
          x: 0,
        });

        const timeline = gsap.timeline({
          onComplete: () => {
            state.transitionInProgress = false;
          },
        });

        timeline.to(
          toChars,
          {
            maxWidth: (i: number, target: HTMLElement) => parseFloat((target as HTMLElement).dataset.hoverWidth || '0'),
            duration: 0.64,
            stagger: 0.04,
            ease: customEase,
          },
          0
        );

        timeline.to(
          toInners,
          {
            x: -35,
            duration: 0.64,
            stagger: 0.04,
            ease: customEase,
          },
          0.05
        );
      };

      const activateRow = (row: HTMLElement) => {
        const rowId = row.dataset.rowId || '';
        if (state.activeRowId === rowId) return;
        if (state.transitionInProgress) return;

        const activeRow = document.querySelector('.text-row.active') as HTMLElement;
        if (activeRow) {
          transitionBetweenRows(activeRow, row);
        } else {
          row.classList.add('active');
          state.activeRowId = rowId;
          const text = (row.querySelector('.text-content') as HTMLElement)?.dataset.text || '';
          const chars = splitTextsRef.current[rowId]?.chars || [];
          const innerSpans = row.querySelectorAll('.char-inner');

          switchBackgroundImage(rowId);
          startKineticAnimation(text);

          if (state.textRevealAnimation) {
            state.textRevealAnimation.kill();
          }
          state.textRevealAnimation = createTextRevealAnimation(rowId);

          const timeline = gsap.timeline();
          timeline.to(
            chars,
            {
              maxWidth: (i: number, target: HTMLElement) => parseFloat((target as HTMLElement).dataset.hoverWidth || '0'),
              duration: 0.64,
              stagger: 0.04,
              ease: customEase,
            },
            0
          );

          timeline.to(
            innerSpans,
            {
              x: -35,
              duration: 0.64,
              stagger: 0.04,
              ease: customEase,
            },
            0.05
          );
        }
      };

      const deactivateRow = (row: HTMLElement) => {
        const rowId = row.dataset.rowId || '';
        if (state.activeRowId !== rowId) return;
        if (state.transitionInProgress) return;

        state.activeRowId = null;
        row.classList.remove('active');
        switchBackgroundImage('default');
        fadeOutKineticAnimation();

        if (state.textRevealAnimation) {
          state.textRevealAnimation.kill();
        }
        state.textRevealAnimation = resetBackgroundTextWithAnimation();

        const chars = splitTextsRef.current[rowId]?.chars || [];
        const innerSpans = row.querySelectorAll('.char-inner');

        const timeline = gsap.timeline();
        timeline.to(
          innerSpans,
          {
            x: 0,
            duration: 0.64,
            stagger: 0.03,
            ease: customEase,
          },
          0
        );

        timeline.to(
          chars,
          {
            maxWidth: (i: number, target: HTMLElement) => parseFloat((target as HTMLElement).dataset.charWidth || '0'),
            duration: 0.64,
            stagger: 0.03,
            ease: customEase,
          },
          0.05
        );
      };

      // Initialize background text items
      backgroundTextItems.forEach((item) => {
        const originalText = item.textContent || '';
        item.dataset.originalText = originalText;
        item.dataset.text = originalText;
        gsap.set(item, { opacity: 1 });
      });

      // Parallax effect
      const initializeParallax = () => {
        const backgroundElements = [
          ...Object.values(backgroundImagesRef.current).filter(Boolean),
          textBackgroundRef.current,
        ].filter(Boolean) as HTMLElement[];

        // Exclude helloText from parallax to prevent blur
        const helloText = helloTextRef.current;
        if (helloText && backgroundElements.includes(helloText)) {
          const index = backgroundElements.indexOf(helloText);
          backgroundElements.splice(index, 1);
        }

        const parallaxLayers = [0.02, 0.03, 0.04, 0.05];

        backgroundElements.forEach((el, index) => {
          (el as HTMLElement).dataset.parallaxSpeed = String(parallaxLayers[index % parallaxLayers.length]);
          gsap.set(el, {
            transformOrigin: 'center center',
            force3D: true,
          });
        });

        let lastParallaxTime = 0;
        const throttleParallax = 20;

        const handleMouseMove = (e: MouseEvent) => {
          const now = Date.now();
          if (now - lastParallaxTime < throttleParallax) return;
          lastParallaxTime = now;

          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;
          const offsetX = (e.clientX - centerX) / centerX;
          const offsetY = (e.clientY - centerY) / centerY;

          backgroundElements.forEach((el) => {
            const speed = parseFloat((el as HTMLElement).dataset.parallaxSpeed || '0');
            if ((el as HTMLElement).id && (el as HTMLElement).id.endsWith('-bg') && (el.style.opacity === '0')) {
              return;
            }

            const moveX = offsetX * 100 * speed;
            const moveY = offsetY * 50 * speed;

            gsap.to(el, {
              x: moveX,
              y: moveY,
              duration: 1.0,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          });
        };

        const handleMouseLeave = () => {
          backgroundElements.forEach((el) => {
            gsap.to(el, {
              x: 0,
              y: 0,
              duration: 1.5,
              ease: customEase,
            });
          });
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        // Floating animation
        backgroundElements.forEach((el, index) => {
          const delay = index * 0.2;
          const floatAmount = 5 + (index % 3) * 2;
          gsap.to(el, {
            y: `+=${floatAmount}`,
            duration: 3 + (index % 2),
            ease: 'sine.inOut',
          repeat: -1,
            yoyo: true,
            delay: delay,
          });
        });

        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseleave', handleMouseLeave);
        };
      };

      // Event listeners for text rows
      textRows.forEach((row) => {
        const interactiveArea = row.querySelector('.interactive-area');
        if (interactiveArea) {
          interactiveArea.addEventListener('mouseenter', () => {
            activateRow(row);
          });

          interactiveArea.addEventListener('mouseleave', () => {
            if (state.activeRowId === row.dataset.rowId) {
              deactivateRow(row);
            }
          });
        }

        row.addEventListener('click', () => {
          activateRow(row);
        });
      });

      // Scramble random text
      const scrambleRandomText = () => {
        const randomIndex = Math.floor(Math.random() * backgroundTextItems.length);
        const randomItem = backgroundTextItems[randomIndex];
        const originalText = randomItem.dataset.text || '';

        scrambleText(randomItem, originalText, {
          duration: 1,
          revealDelay: 0.5,
          speed: 0.3,
        });

        const delay = 0.5 + Math.random() * 2;
        setTimeout(scrambleRandomText, delay * 1000);
      };

      setTimeout(scrambleRandomText, 1000);

      // Animate background text items
      backgroundTextItems.forEach((item, index) => {
        const delay = index * 0.1;
        gsap.to(item, {
          opacity: 0.85,
          duration: 2 + (index % 3),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: delay,
        });
      });

      // Simple text - no animations, just ensure visibility
      const helloText = helloTextRef.current;
      if (helloText) {
        // Force visibility - ensure it's always visible and clear
        helloText.style.opacity = '1';
        helloText.style.visibility = 'visible';
        helloText.style.display = 'block';
        helloText.style.pointerEvents = 'none';
        helloText.style.filter = 'none';
        helloText.style.transform = 'none';
        
        // Set initial state - fully visible and clear, no blur
        gsap.set(helloText, {
          opacity: 1,
          filter: 'none',
          visibility: 'visible',
        });

        // Simple fade-in on load only
        gsap.from(helloText, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.5,
        });
      }

      initializeParallax();
    };

    // Wait for fonts to load
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        setTimeout(initializeAnimation, 100);
      });
    } else {
      setTimeout(initializeAnimation, 100);
    }
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-black" ref={containerRef} style={{ position: 'relative', zIndex: 0, isolation: 'isolate' }}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" style={{ contain: 'layout style paint' }}>
        <Image
          src="/bg1.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={90}
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Keep background images refs for compatibility (hidden) */}
      <div
        ref={(el) => {
          backgroundImagesRef.current.default = el;
        }}
        className="absolute inset-0 z-[1] opacity-0 pointer-events-none"
        style={{ display: 'none' }}
      />
      <div
        ref={(el) => {
          backgroundImagesRef.current.innovate = el;
        }}
        id="innovate-bg"
        className="absolute inset-0 z-[1] opacity-0 pointer-events-none"
        style={{ display: 'none' }}
      />
      <div
        ref={(el) => {
          backgroundImagesRef.current.lead = el;
        }}
        id="lead-bg"
        className="absolute inset-0 z-[1] opacity-0 pointer-events-none"
        style={{ display: 'none' }}
      />
      <div
        ref={(el) => {
          backgroundImagesRef.current.build = el;
        }}
        id="build-bg"
        className="absolute inset-0 z-[1] opacity-0 pointer-events-none"
        style={{ display: 'none' }}
      />

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-[40vh] z-[1] pointer-events-none bg-gradient-to-t from-black via-black/50 to-transparent" />

      {/* Text Background - Hide only some on small devices */}
      <div ref={textBackgroundRef} className="absolute inset-0 z-[2] pointer-events-none">
        {TEXT_ITEMS.map((item, index) => {
          // Hide only a few items on mobile (every 6th item) - most remain visible
          // On medium/large screens, ALL items should be visible
          const shouldHideOnMobile = index % 6 === 0;
          return (
            <div
              key={index}
              ref={(el) => {
                if (el) textItemRefs.current.set(`item-${index}`, el);
              }}
              className={`absolute text-[#ffcc00] text-[10px] sm:text-xs md:text-sm uppercase opacity-60 sm:opacity-75 md:opacity-90 lg:opacity-95 whitespace-nowrap z-0 ${
                shouldHideOnMobile ? 'hidden sm:block' : ''
              }`}
              style={{
                fontFamily: '"TheGoodMonolith", monospace',
                top: item.top,
                left: item.left,
                right: 'right' in item ? item.right : undefined,
              }}
              data-text={item.text}
              data-original-text={item.text}
            >
              {item.text}
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div ref={mainContentRef} className="relative z-[10] h-screen flex flex-col justify-center items-center px-3 sm:px-4 md:px-0 lg:px-0">
        <div className="relative w-auto max-w-full mx-auto transform-gpu">
          {/* INNOVATE Row - Top */}
          <div
            ref={(el) => {
              if (el) textRowRefs.current.set('innovate', el);
            }}
            data-row-id="innovate"
            className="relative w-full h-[110px] sm:h-[120px] md:h-[140px] lg:h-[140px] mb-4 flex items-center justify-center overflow-visible z-[100]"
          >
            <div
              className="text-content relative text-[3.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[6.5rem] xl:text-[9rem] font-bold uppercase h-full flex items-center justify-center z-[1] text-[#ffcc00] tracking-tight transition-[letter-spacing] duration-500 invisible"
              style={{ 
                fontFamily: '"Longsile", sans-serif',
                fontWeight: 900,
                textShadow: '0 0 40px rgba(255, 204, 0, 0.1), 0 0 80px rgba(255, 204, 0, 0.2)',
              }}
              data-text="INNOVATE"
            >
              INNOVATE
            </div>
            <div className="interactive-area absolute inset-0 z-[10] cursor-pointer" />
          </div>

          {/* Portrait Image - Center - Simple & Clean */}
          <div className="relative z-[90] flex flex-col items-center my-3 sm:my-4 md:my-6 lg:my-8">
            <div 
              ref={imageContainerRef}
              className="hero-portrait relative w-[180px] h-[220px] sm:w-[180px] sm:h-[250px] md:w-[220px] md:h-[305px] lg:w-[280px] lg:h-[385px] xl:w-[340px] xl:h-[468px] overflow-visible"
            >
              <div className="relative w-full h-full overflow-hidden rounded-lg">
                <Image
                  src="/sirimage2.png"
                  alt="Aditya Desai - CEO Think Chains"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 200px, (max-width: 1024px) 280px, (max-width: 1280px) 320px, 360px"
                />
              </div>
              
              {/* Text Overlay at Bottom - Simple Gradient Text */}
              <div 
                ref={helloTextRef}
                className="absolute bottom-0 left-0 right-0 z-[200] pointer-events-none"
                style={{
                  paddingBottom: '1rem',
                  paddingTop: '2rem',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)',
                }}
              >
                <div
                  className="hero-portrait-title text-[1.6rem] md:text-[1.7rem] lg:text-[2rem] xl:text-[2.5rem] font-bold uppercase tracking-wider text-center px-2"
                  style={{
                    fontFamily: '"Longsile", sans-serif',
                    background: 'linear-gradient(135deg, #ffcc00 0%, #ffd700 50%, #ffcc00 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    opacity: 1,
                    visibility: 'visible',
                    filter: 'none',
                    fontWeight: '700',
                    letterSpacing: '0.1em',
                    lineHeight: '1.3',
                  } as React.CSSProperties}
                >
                  HELLO, I&apos;M ADITYA DESAI
                </div>
              </div>
            </div>
          </div>

          {/* LEAD Row - Middle */}
          <div
            ref={(el) => {
              if (el) textRowRefs.current.set('lead', el);
            }}
            data-row-id="lead"
            className="relative w-full h-[110px] sm:h-[120px] md:h-[140px] lg:h-[140px] my-4 flex items-center justify-center overflow-visible z-[100]"
          >
            <div
              className="text-content relative text-[3.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[6.5rem] xl:text-[9rem] font-bold uppercase h-full flex items-center justify-center z-[1] text-[#ffcc00] tracking-tight transition-[letter-spacing] duration-500 invisible"
              style={{ 
                fontFamily: '"Longsile", sans-serif',
                fontWeight: 900,
                textShadow: '0 0 40px rgba(255, 204, 0, 0.1), 0 0 80px rgba(255, 204, 0, 0.2)',

              }}
              data-text="LEAD"
            >
              LEAD
            </div>
            <div className="interactive-area absolute inset-0 z-[10] cursor-pointer" />
          </div>

          {/* BUILD Row - Bottom */}
          <div
            ref={(el) => {
              if (el) textRowRefs.current.set('build', el);
            }}
            data-row-id="build"
            className="relative w-full h-[110px] sm:h-[120px] md:h-[140px] lg:h-[140px] mt-4 flex items-center justify-center overflow-visible z-[100]"
          >
            <div
              className="text-content relative text-[3.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[6.5rem] xl:text-[9rem] font-bold uppercase h-full flex items-center justify-center z-[1] text-[#ffcc00] tracking-tight transition-[letter-spacing] duration-500 invisible"
              style={{ 
                fontFamily: '"Longsile", sans-serif',
                fontWeight: 900,
                textShadow: '0 0 40px rgba(255, 204, 0, 0.1), 0 0 80px rgba(255, 204, 0, 0.2)',

              }}
              data-text="BUILD"
            >
              BUILD
            </div>
            <div className="interactive-area absolute inset-0 z-[10] cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Kinetic Type */}
      <div
        ref={kineticTypeRef}
        id="kinetic-type"
        className="absolute h-[100vmax] w-[100vmax] uppercase hidden grid justify-center content-center text-center top-1/2 left-1/2 -mt-[50vmax] -ml-[50vmax] will-change-transform z-[5] transform-gpu pointer-events-none"
        aria-hidden="true"
      >
        {TYPE_LINES.map((line, index) => (
          <div
            key={index}
            className={`type-line whitespace-nowrap text-[7rem] md:text-[10rem] lg:text-[15rem] leading-[0.75] font-bold text-white opacity-[0.015] select-none will-change-transform relative ${
              index % 2 === 0 ? 'odd z-[50]' : 'even z-[150]'
            }`}
            style={{ fontFamily: '"PP Neue Montreal", sans-serif' }}
          >
            {line}
          </div>
        ))}
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .text-row:hover .text-content {
          letter-spacing: 5px;
        }

        .char {
          display: inline-block;
          position: relative;
          overflow: hidden;
          max-width: 80px;
          transition: max-width 0.64s cubic-bezier(0.86, 0, 0.07, 1);
          margin-right: 0;
        }

        .char.narrow-char {
          max-width: 40px;
        }

        .text-row.active .char::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 1px;
          height: 80%;
          background-color: rgba(255, 204, 0, 0.2);
          transform: none;
          opacity: 0;
          animation: fadeIn 0.3s forwards;
          animation-delay: calc(var(--char-index, 0) * 0.05s);
        }

        .char:last-child::after {
          display: none;
        }

        .char-inner {
          position: relative;
          display: inline-block;
          width: 100%;
          height: 100%;
          will-change: transform;
          transform: translate3d(-20px, 0, 0);
        }

        .text-item::after {
          content: '';
          position: absolute;
          top: -2px;
          left: -4px;
          width: 0;
          height: calc(100% + 4px);
          background-color: #ffcc00;
          z-index: 1;
          transition: width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .text-item.highlight::after {
          width: calc(100% + 8px);
        }

        .text-item.highlight-reverse::after {
          width: 0;
          right: -4px;
          left: auto;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        @media (max-width: 992px) {
          .text-content {
            font-size: 6rem !important;
          }
          .text-row {
            height: 110px !important;
          }
          .type-line {
            font-size: clamp(5rem, 12vh, 10rem) !important;
          }
        }

  
        @media (min-width: 1000px) and (max-width: 1500px) {
          .text-content {
            font-size: 6rem !important;
            letter-spacing: 0.06em;
          }
          .text-row,
          div[data-row-id] {
            height: 100px !important;
            margin: 8px 0 !important;
          }
          .type-line {
            font-size: clamp(4rem, 8vh, 8rem) !important;
          }
          .hero-portrait {
            width: 275px !important;
            height: 325px !important;
          }
          .hero-portrait-title {
            font-size: 1.4rem !important;
            padding-top: 1.25rem !important;
            padding-bottom: 0.5rem !important;
          }
        }

        @media (max-width: 768px) {
          .text-content {
            font-size: 4rem !important;
          }
          .text-row {
            height: 80px !important;
            margin: 6px 0 !important;
          }
          .type-line {
            font-size: clamp(3.5rem, 8vh, 7rem) !important;
          }
          .text-item {
            font-size: 0.7rem !important;
          }
        }

        @media (max-width: 480px) {
          .text-content {
            font-size: 2.5rem !important;
          }
          .text-row {
            height: 60px !important;
            margin: 4px 0 !important;
          }
          .type-line {
            font-size: clamp(2.5rem, 6vh, 5rem) !important;
          }
          .text-item {
            font-size: 0.6rem !important;
          }
        }
      `}</style>
    </section>
  );
}
