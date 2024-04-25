const alphabet =
  "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя";

function rotateChar(char, shift) {
  const charIndex = alphabet.indexOf(char);
  const rotatedCharIndex =
    (charIndex - shift + alphabet.length) % alphabet.length;
  return alphabet[rotatedCharIndex];
}

function caesarCipher(text, shift) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (alphabet.includes(char)) {
      result += rotateChar(char, -shift);
    } else {
      result += char;
    }
  }
  return result;
}

function caesarCipherDecrypt(text, shift) {
  return caesarCipher(text, -shift);
}

module.exports = { caesarCipher, caesarCipherDecrypt };
