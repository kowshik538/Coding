// interpolation.js
const { decodeInBase } = require('./baseDecode');
const { BigRational } = require('./rational');

// Extract and prepare points (x, y) from JSON data
function extractPointsFromData(data) {
  const n = data.keys.n;
  const k = data.keys.k;

  const points = [];

  for (const key of Object.keys(data)) {
    if (key === 'keys') continue;

    const x = BigInt(key);
    const base = parseInt(data[key].base, 10);
    const valueStr = data[key].value;

    const y = decodeInBase(valueStr, base);
    points.push({ x, y });
  }

  // Sort by x value (BigInt-safe comparison)
  points.sort((p1, p2) => {
    if (p1.x < p2.x) return -1;
    if (p1.x > p2.x) return 1;
    return 0;
  });

  // Use first k points
  const selectedPoints = points.slice(0, data.keys.k);

  if (selectedPoints.length < k) {
    throw new Error('Not enough points available');
  }

  return { points: selectedPoints, k };
}

// Lagrange interpolation at x = 0 to get constant term c = f(0)
function findSecretFromData(data) {
  const { points, k } = extractPointsFromData(data);

  let result = new BigRational(0n, 1n);

  for (let j = 0; j < k; j++) {
    const xj = points[j].x;
    const yj = points[j].y;

    let term = new BigRational(1n, 1n);

    for (let m = 0; m < k; m++) {
      if (m === j) continue;

      const xm = points[m].x;

      const num = -xm;         // -x_m
      const den = xj - xm;     // (x_j - x_m)

      term = term.multiply(new BigRational(num, den));
    }

    // Multiply by y_j
    term = term.multiplyBigInt(yj);

    // Add to total
    result = result.add(term);
  }

  // The result should be an integer (denominator 1)
  if (result.den !== 1n) {
    throw new Error(
      `Result is not an integer: ${result.num.toString()}/${result.den.toString()}`
    );
  }

  // secret c is the numerator
  return result.num;
}

module.exports = { findSecretFromData };
