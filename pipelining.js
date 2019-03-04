$(document).ready(function () {
  $('#submit').click(function (e) {
    var a = parseInt($('#input_a').val());
    var b = parseInt($('#input_b').val());
    var t = parseInt($('#input_t').val()) || 1;
    if (a > 256 || b > 256) {
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
    var diff = 8 - number.length;
    for (var i = 0; i < diff; i++) {
      number = '0' + number;
    }
    return number;
  }

  function multiplyGradually(first, second) {

  }
})
