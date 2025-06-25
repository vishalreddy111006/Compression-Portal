
class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(node) {
    this.heap.push(node);
    this._bubbleUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown(0);
    return top;
  }

  size() {
    return this.heap.length;
  }

  _bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.heap[parent].frequency <= this.heap[index].frequency) break;
      [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
      index = parent;
    }
  }

  _bubbleDown(index) {
    while (true) {
      let smallest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      if (left < this.heap.length && this.heap[left].frequency < this.heap[smallest].frequency)
        smallest = left;
      if (right < this.heap.length && this.heap[right].frequency < this.heap[smallest].frequency)
        smallest = right;

      if (smallest === index) break;
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }
}


class BitWriter {
  constructor() {
    this.bytes = [];
    this.currentByte = 0;
    this.bitsFilled = 0;
  }

  writeBit(bit) {
    if (bit) this.currentByte |= (1 << (7 - this.bitsFilled));
    this.bitsFilled++;
    if (this.bitsFilled === 8) {
      this.bytes.push(this.currentByte);
      this.currentByte = 0;
      this.bitsFilled = 0;
    }
  }

  writeByte(byte) {
    for (let i = 7; i >= 0; i--) {
      this.writeBit((byte >> i) & 1);
    }
  }

  getResult() {
    if (this.bitsFilled > 0) {
      this.bytes.push(this.currentByte);
    }
    return new Uint8Array(this.bytes);
  }
}


class BitReader {
  constructor(buffer) {
    this.buffer = buffer;
    this.byteIndex = 0;
    this.bitIndex = 0;
  }

  readBit() {
    if (this.byteIndex >= this.buffer.length) return null;
    const byte = this.buffer[this.byteIndex];
    const bit = (byte >> (7 - this.bitIndex)) & 1;
    this.bitIndex++;
    if (this.bitIndex === 8) {
      this.bitIndex = 0;
      this.byteIndex++;
    }
    return bit;
  }

  readByte() {
    let byte = 0;
    for (let i = 0; i < 8; i++) {
      const bit = this.readBit();
      if (bit === null) return null;
      byte = (byte << 1) | bit;
    }
    return byte;
  }
}


function buildFrequencyTable(data) {
  const freq = new Map();
  for (const byte of data) {
    freq.set(byte, (freq.get(byte) || 0) + 1);
  }
  return freq;
}


function buildHuffmanTree(freq) {
  const heap = new MinHeap();
  for (const [byte, frequency] of freq) {
    heap.push({ byte, frequency });
  }

  if (heap.size() === 1) {
    heap.push({ byte: 255 ^ heap.heap[0].byte, frequency: 0 }); // dummy
  }

  while (heap.size() > 1) {
    const left = heap.pop();
    const right = heap.pop();
    heap.push({
      frequency: left.frequency + right.frequency,
      left,
      right
    });
  }

  return heap.pop();
}


function buildCodes(node) {
  const codes = new Map();

  function dfs(node, path) {
    if (node.byte !== undefined) {
      codes.set(node.byte, path);
    } else {
      dfs(node.left, path + '0');
      dfs(node.right, path + '1');
    }
  }

  dfs(node, '');
  return codes;
}


function serializeTree(node, writer) {
  if (node.byte !== undefined) {
    writer.writeBit(1);
    writer.writeByte(node.byte);
  } else {
    writer.writeBit(0);
    serializeTree(node.left, writer);
    serializeTree(node.right, writer);
  }
}


function deserializeTree(reader) {
  const bit = reader.readBit();
  if (bit === null) return null;
  if (bit === 1) {
    const byte = reader.readByte();
    return { byte };
  }
  const left = deserializeTree(reader);
  const right = deserializeTree(reader);
  return { left, right };
}


export function compress(input) {
  if (!(input instanceof Uint8Array)) throw new Error("Expected Uint8Array");

  const freq = buildFrequencyTable(input);
  const root = buildHuffmanTree(freq);
  const codes = buildCodes(root);


  const treeWriter = new BitWriter();
  serializeTree(root, treeWriter);
  const treeData = treeWriter.getResult();
  const treeLengthBytes = new Uint32Array([treeData.length]);


  const writer = new BitWriter();
  for (const byte of input) {
    const code = codes.get(byte);
    for (const bit of code) {
      writer.writeBit(bit === '1' ? 1 : 0);
    }
  }

  const encodedData = writer.getResult();


  const result = new Uint8Array(4 + treeData.length + encodedData.length);
  result.set(new Uint8Array(treeLengthBytes.buffer), 0);
  result.set(treeData, 4);
  result.set(encodedData, 4 + treeData.length);

  return result;
}


export function decompress(input) {
  if (!(input instanceof Uint8Array)) throw new Error("Expected Uint8Array");
  if (input.length < 4) return new Uint8Array(0);

  const treeLength = new Uint32Array(input.slice(0, 4).buffer)[0];
  const treeBytes = input.slice(4, 4 + treeLength);
  const dataBytes = input.slice(4 + treeLength);

  const treeReader = new BitReader(treeBytes);
  const root = deserializeTree(treeReader);

  const reader = new BitReader(dataBytes);
  const output = [];
  let node = root;

  while (true) {
    const bit = reader.readBit();
    if (bit === null) break;
    node = bit === 0 ? node.left : node.right;
    if (node.byte !== undefined) {
      output.push(node.byte);
      node = root;
    }
  }

  return new Uint8Array(output);
}
