const WINDOW_SIZE = 4096;
const LOOKAHEAD_SIZE = 18;

function findLongestMatch(data, position, windowStart) {
  let bestMatch = { distance: 0, length: 0, nextChar: data[position] || 0 };

  if (position >= data.length) {
    return bestMatch;
  }

  const searchStart = Math.max(0, windowStart);
  const searchEnd = position;
  const maxLength = Math.min(LOOKAHEAD_SIZE, data.length - position);

  for (let i = searchStart; i < searchEnd; i++) {
    let matchLength = 0;

    while (
      matchLength < maxLength &&
      position + matchLength < data.length &&
      data[i + matchLength] === data[position + matchLength]
    ) {
      matchLength++;
    }

    if (matchLength > bestMatch.length) {
      bestMatch = {
        distance: position - i,
        length: matchLength,
        nextChar: data[position + matchLength] || 0
      };
    }
  }

  return bestMatch;
}

export function compress(input) {
  if (input.length === 0) return new Uint8Array(0);

  const result = [];
  let position = 0;

  while (position < input.length) {
    const windowStart = Math.max(0, position - WINDOW_SIZE);
    const match = findLongestMatch(input, position, windowStart);

    if (match.length >= 3) {
      result.push(255);
      result.push(Math.floor(match.distance / 256));
      result.push(match.distance % 256);
      result.push(match.length);
      result.push(match.nextChar);
      position += match.length + 1;
    } else {
      result.push(input[position]);
      position++;
    }
  }

  return new Uint8Array(result);
}

export function decompress(input) {
  if (input.length === 0) return new Uint8Array(0);

  const result = [];
  let i = 0;

  while (i < input.length) {
    if (input[i] === 255 && i + 4 < input.length) {
      const distance = input[i + 1] * 256 + input[i + 2];
      const length = input[i + 3];
      const nextChar = input[i + 4];

      const startPos = result.length - distance;
      for (let j = 0; j < length; j++) {
        if (startPos + j >= 0 && startPos + j < result.length) {
          result.push(result[startPos + j]);
        }
      }

      result.push(nextChar);
      i += 5;
    } else {
      result.push(input[i]);
      i++;
    }
  }

  return new Uint8Array(result);
}
