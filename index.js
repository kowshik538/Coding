const fs = require('fs');
const path = require('path');
const { findSecretFromData } = require('./interpolation');

function loadJson(filename) {
  const fullPath = path.join(__dirname, filename);
  const content = fs.readFileSync(fullPath, 'utf-8');
  return JSON.parse(content);
}

function main() {
  const testcase1 = loadJson('testcase1.json');
  const testcase2 = loadJson('testcase2.json');

  const secret1 = findSecretFromData(testcase1);
  const secret2 = findSecretFromData(testcase2);

  console.log(secret1.toString());
  console.log(secret2.toString());
}

main();
