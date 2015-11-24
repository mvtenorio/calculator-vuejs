var Vue = require('vue');

var calc = new Vue({
  el: '#calc',

  data: {
    items: []
  },

  computed: {
    expression: function() {
      return this.items.join('');
    }
  },

  methods: {
    addItem: function(item) {
      this.items.push(item)
    },

    clearEntry: function() {
      this.items.pop()
    },

    clear: function() {
      this.items = [];
    },

    calculate: function() {
      var exp = this.expression.replace('÷', '/').replace('×', '*');
      var result = eval(exp);
      this.items = [result];
    }
  }
})
