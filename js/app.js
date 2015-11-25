var Vue = require('vue');

var vm = new Vue({
  el: '#calc',

  data: {
    entries: []
  },

  computed: {
    expression: function() {
      return this.entries.join('');
    }
  },

  methods: {
    addEntry: function(entry) {
      this.entries.push(entry);
    },

    clearEntry: function() {
      this.entries.pop();
    },

    clear: function() {
      this.entries = [];
    },

    calculate: function() {
      var exp = this.expression.replace('÷', '/').replace('×', '*');
      var result = eval(exp);
      this.entries = [result];
    }
  }
})
