require('../stylus/style.styl');
var template = require('../template.jade');
var Vue = require('vue');
var keyboardJS = require('keyboardjs');

var vm = new Vue({
  el: '#app',

  template: template,

  data: {
    entries: []
  },

  computed: {
    expression: function() {
      return this.entries.join('');
    },

    result: function() {
      var exp = this.expression.replace(/÷/g, '/').replace(/×/g, '*');

      if (!/\d[-+*/]/.test(exp)) return;

      try {
        var result = eval(exp);
        return result;
      }
      catch(err) {
        return;
      }
    }
  },

  methods: {
    addEntry: function(entry) {
      this.$els.expression.focus();
      this.entries.push(entry);
    },

    clearEntry: function() {
      this.$els.expression.focus();
      this.entries.pop();
    },

    clear: function() {
      this.entries = [];
    },

    calculate: function() {
      if (this.result) {
        this.entries = [this.result];
      }
    }
  }
});

var keyBindings = [
  { keys: ['0', 'num0'],        entry: '0' },
  { keys: ['1', 'num1'],        entry: '1' },
  { keys: ['2', 'num2'],        entry: '2' },
  { keys: ['3', 'num3'],        entry: '3' },
  { keys: ['4', 'num4'],        entry: '4' },
  { keys: ['5', 'num5'],        entry: '5' },
  { keys: ['6', 'num6'],        entry: '6' },
  { keys: ['7', 'num7'],        entry: '7' },
  { keys: ['8', 'num8'],        entry: '8' },
  { keys: ['9', 'num9'],        entry: '9' },
  { keys: ['+', 'numadd'],      entry: '+' },
  { keys: ['-', 'numsubtract'], entry: '-' },
  { keys: ['*', 'nummultiply'], entry: '×' },
  { keys: ['/', 'numdivide'],   entry: '÷' },
  { keys: ['.', 'numdecimal'],  entry: '.' }
];

keyBindings.forEach(function(el) {
  keyboardJS.bind(el.keys, null, function(e) {
    vm.addEntry(el.entry);
  });
});

keyboardJS.bind(['backspace', 'del'], function(e) {
  vm.clearEntry();
});

keyboardJS.bind(['enter', 'numenter'], null, function(e) {
  vm.calculate();
});
