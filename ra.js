
function gcdBigInt(a, b) {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
}

class BigRational {
  constructor(num, den = 1n) {
    if (den === 0n) {
      throw new Error('Denominator cannot be zero');
    }

    // Normalize sign: denominator always positive
    if (den < 0n) {
      num = -num;
      den = -den;
    }

    const g = gcdBigInt(num, den);
    this.num = num / g;
    this.den = den / g;
  }

  static fromBigInt(bi) {
    return new BigRational(bi, 1n);
  }

  add(other) {
    const num = this.num * other.den + other.num * this.den;
    const den = this.den * other.den;
    return new BigRational(num, den);
  }

  multiply(other) {
    const num = this.num * other.num;
    const den = this.den * other.den;
    return new BigRational(num, den);
  }

  multiplyBigInt(bi) {
    return new BigRational(this.num * bi, this.den);
  }

  toString() {
    if (this.den === 1n) {
      return this.num.toString();
    }
    return `${this.num.toString()}/${this.den.toString()}`;
  }
}

module.exports = { BigRational };

