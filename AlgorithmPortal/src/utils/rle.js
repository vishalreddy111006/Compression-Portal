
/**

   @param {Uint8Array} input 
  @returns {Uint8Array} 
 */
export function compress(input) {
  if (input.length === 0) return new Uint8Array([0x00]); 

  const result = [];
  let i = 0;

  while (i < input.length) {
    const currentByte = input[i];
    let count = 1;


    while (i + count < input.length && input[i + count] === currentByte && count < 255) {
      count++;
    }

    result.push(count);       
    result.push(currentByte); 
    i += count;
  }

  const compressedData = new Uint8Array(result);
  const compressedWithHeader = new Uint8Array(compressedData.length + 1);
  compressedWithHeader[0] = 0x01; 
  compressedWithHeader.set(compressedData, 1);

  
  if (compressedWithHeader.length >= input.length + 1) {
    const uncompressedWithHeader = new Uint8Array(input.length + 1);
    uncompressedWithHeader[0] = 0x00; 
    uncompressedWithHeader.set(input, 1);
    return uncompressedWithHeader;
  }

  return compressedWithHeader;
}

/**
 * 
 *
 * @param {Uint8Array} input - 
 * @returns {Uint8Array} 
 */
export function decompress(input) {
  if (input.length === 0) return new Uint8Array(0);

  const header = input[0];

  if (header === 0x00) {

    return input.slice(1);
  }

  if (header === 0x01) {

    const result = [];

    for (let i = 1; i < input.length; i += 2) {
      const count = input[i];
      const value = input[i + 1];
      result.push(...Array(count).fill(value));
    }

    return new Uint8Array(result);
  }

  throw new Error("Invalid RLE header byte: " + header);
}
