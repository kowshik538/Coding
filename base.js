// baseDecode.js

// Convert a single character (0-9, a-f, A-F) to a digit value
function charToDigit(ch) {
  const c = ch.toLowerCase();
  if (c >= '0' && c <= '9') {
    return c.charCodeAt(0) - '0'.charCodeAt(0);
  }
  if (c >= 'a' && c <= 'z') {
    return 10 + (c.charCodeAt(0) - 'a'.charCodeAt(0));
  }
  throw new Error(`Invalid digit character: ${ch}`);
}

// Decode a string in given base (up to base 16 here) into a BigInt
function decodeInBase(valueStr, base) {
  const b = BigInt(base);
  let result = 0n;

  for (const ch of valueStr) {
    const digit = BigInt(charToDigit(ch));
    if (digit >= b) {
      throw new Error(`Digit '${ch}' is not valid for base ${base}`);
    }
    result = result * b + digit;
  }

  return result;
}

module.exports = { decodeInBase };
