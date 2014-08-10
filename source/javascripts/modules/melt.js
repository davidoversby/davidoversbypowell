// -------------------------------------------------
//
// welcome.js
// 
// Melt message to check everything is working
//
// -------------------------------------------------


(function() {

  "use strict";

  var Melt = function() { this.init(); };

  Melt.prototype = {

    test: function () {

      console.log('jfidsjafnidhfuidahufds');

    },

    wrapWords: function() {

      var self = this;

      var $p = $('.split-text');

      var array = $p.text().split(' ');

      $.each(array, function(i) {
        array[i] = '<span class="word">' + array[i] + '</span>';
      });

      $p.html(array.join(''));

    },

    randomTransitions: function() {

      $('.word').each(function() {

        var rand_x = Math.floor((Math.random() * 300) + 1);
        var rand_y = Math.floor((Math.random() * 500) + 1);
        var rand_speed = Math.floor((Math.random() * 10000) + 5000);
        var rand_rotate = Math.floor((Math.random() * 360) + 1);
        var rand_scale = Math.floor((Math.random() * 2) + 1);

        $(this).transition({
          x: rand_x,
          y: rand_y,
          rotate: rand_rotate,
          scale: rand_scale
        }, rand_speed);

      });

    },

    events: function() {

      var self = this;

      $('body').click(function() {
        self.randomTransitions();
      });

    },

    init: function() {

      var self = this;

      self.test();
      // self.wrapWords();
      // self.events();

    }

  };

  $(document).ready(function() {
    new Melt();
  });

})();