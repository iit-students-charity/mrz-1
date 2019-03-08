var binaryZero = '00000000';
var bitCount = 8;
var decimalLimit = Math.pow(2, bitCount);

$(document).ready(function () {
  $('#submit').click(function (e) {
    var a = parseInt($('#input_a').val());
    var b = parseInt($('#input_b').val());
    var t = parseInt($('#input_t').val()) || 1;
    if (a > decimalLimit || b > decimalLimit) {
      alert('Pleace input numbers less or equal to 256.');
      $('#input_a').val("");
      $('#input_b').val("");
      return;
    }
    var aBin = addTo8Bit(a.toString(2));
    var bBin = addTo8Bit(b.toString(2));
    var result = multiplyGradually(aBin, bBin);
  })

  function addTo8Bit(number) {
    var diff = bitCount - number.length;
    for (var i = 0; i < diff; i++) {
      number = '0' + number;
    }
    return number;
  }

  function multiplyGradually(first, second) {
    var result = binaryZero;
    var multResult = binaryZero;
    for (var i = bitCount - 1; i >= 0; i--) {
      multResult = multiplyOneBit(first, second[i]);
      multResult = leftShift(multResult, bitCount - 1 - i);
      result = sum(multResult, result);
      doNothing();
    }
    return result;
  }

  function doNothing() {}

  function multiplyOneBit(binary, bit) {
    return bit == '0' ? binaryZero : binary;
  }

  function sum(first, second) {
    first = reverseString(first);
    second = reverseString(second);
    var remainder = 0;
    var subResult = [];
    var result = ''
    for (var i = 0; i < first.length; i++) {
      subResult = addOneBit(first[i], second[i] || '0', remainder);
      result += subResult[0];
      remainder = subResult[1];
    }
    if (remainder == '1') {
      result += '1';
    }
    return reverseString(result);
  }

  function reverseString(string) {
    return string.split("").reverse().join("");
  }

  function addOneBit(firstBit, secondBit, remainder) {
    var sum = parseInt(firstBit) + parseInt(secondBit) + parseInt(remainder);
    switch(sum) {
      case 0:
        return ['0', '0']
      case 1:
        return ['1', '0']
      case 2:
        return ['0', '1']
      case 3:
        return ['1', '1']
    }
  }

  function leftShift(binary, count) {
    for (var i = 0; i < count; i++) {
      binary += '0';
    }
    return binary;
  }
})

//  mult one    sum R + p    shift R  ...
// ---------------------------------------------------------------------------
// A 00001100  A 00001100  A  00001100
// B 00011011  B 00011011  B  00011011
// R 00000000  R 00000000  R  00001100
// -----------------------------------
// p 00001100  R 00001100  R 000011000
//                                     A  00001100  A  00001100  A   00001100
//                                     B  00011011  B  00011011  B   00011011
//                                     R 000011000  R 000011000  R 0001001000
//                                     ---------R-----------------------------
//                                     p  00001100  R 000100100  A 0000110000
