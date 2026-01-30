/**
 * Custom text splitting utility to replace GSAP SplitText
 */

export interface SplitTextResult {
  chars: HTMLElement[];
  words: HTMLElement[];
  lines: HTMLElement[];
}

export function splitText(
  element: HTMLElement,
  options: {
    type?: 'chars' | 'words' | 'lines' | 'chars,words' | 'chars,words,lines';
    charsClass?: string;
    wordsClass?: string;
    linesClass?: string;
    reduceWhiteSpace?: boolean;
  } = {}
): SplitTextResult {
  const {
    type = 'chars',
    charsClass = 'char',
    wordsClass = 'word',
    linesClass = 'line',
    reduceWhiteSpace = false,
  } = options;

  const originalText = element.textContent || '';
  const types = type.split(',') as string[];

  const result: SplitTextResult = {
    chars: [],
    words: [],
    lines: [],
  };

  // Clear the element
  element.innerHTML = '';

  if (types.includes('lines')) {
    // Split by lines (using <br> or newlines)
    const lines = originalText.split(/\n|<br\s*\/?>/i);
    lines.forEach((lineText) => {
      const lineEl = document.createElement('div');
      lineEl.className = linesClass;
      lineEl.style.display = 'block';
      element.appendChild(lineEl);

      if (types.includes('words')) {
        const words = lineText.trim().split(/\s+/);
        words.forEach((wordText, wordIndex) => {
          if (!wordText && reduceWhiteSpace) return;

          const wordEl = document.createElement('span');
          wordEl.className = wordsClass;
          wordEl.style.display = 'inline-block';
          wordEl.style.whiteSpace = 'nowrap';
          lineEl.appendChild(wordEl);

          if (types.includes('chars')) {
            const chars = wordText.split('');
            chars.forEach((char) => {
              const charEl = document.createElement('span');
              charEl.className = charsClass;
              charEl.style.display = 'inline-block';
              charEl.textContent = char === ' ' ? '\u00A0' : char;
              wordEl.appendChild(charEl);
              result.chars.push(charEl);
            });
          } else {
            wordEl.textContent = wordText;
            result.words.push(wordEl);
          }

          if (wordIndex < words.length - 1) {
            const space = document.createTextNode(' ');
            lineEl.appendChild(space);
          }
        });
      } else if (types.includes('chars')) {
        const chars = lineText.split('');
        chars.forEach((char) => {
          const charEl = document.createElement('span');
          charEl.className = charsClass;
          charEl.style.display = 'inline-block';
          charEl.textContent = char === ' ' ? '\u00A0' : char;
          lineEl.appendChild(charEl);
          result.chars.push(charEl);
        });
      } else {
        lineEl.textContent = lineText;
        result.lines.push(lineEl);
      }
    });
  } else if (types.includes('words')) {
    const words = originalText.trim().split(/\s+/);
    words.forEach((wordText, wordIndex) => {
      if (!wordText && reduceWhiteSpace) return;

      const wordEl = document.createElement('span');
      wordEl.className = wordsClass;
      wordEl.style.display = 'inline-block';
      wordEl.style.whiteSpace = 'nowrap';
      element.appendChild(wordEl);

      if (types.includes('chars')) {
        const chars = wordText.split('');
        chars.forEach((char) => {
          const charEl = document.createElement('span');
          charEl.className = charsClass;
          charEl.style.display = 'inline-block';
          charEl.textContent = char === ' ' ? '\u00A0' : char;
          wordEl.appendChild(charEl);
          result.chars.push(charEl);
        });
      } else {
        wordEl.textContent = wordText;
        result.words.push(wordEl);
      }

      if (wordIndex < words.length - 1) {
        const space = document.createTextNode(' ');
        element.appendChild(space);
      }
    });
  } else if (types.includes('chars')) {
    const chars = originalText.split('');
    chars.forEach((char) => {
      const charEl = document.createElement('span');
      charEl.className = charsClass;
      charEl.style.display = 'inline-block';
      charEl.textContent = char === ' ' ? '\u00A0' : char;
      element.appendChild(charEl);
      result.chars.push(charEl);
    });
  }

  return result;
}

