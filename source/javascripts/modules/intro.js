// -------------------------------------------------
//
// intro.js
// 
// Intro
//
// -------------------------------------------------

(function() {

  "use strict";

  var Intro = function() { this.init(); };

  Intro.prototype = {

    events: function() {

      var self = this;

    },

    shrinkTitle: function () {

      var self = this;
      var $el = $('.main-title');

      $('body').transition({
        'background-color': '#fff'
      });

      $el.transition({
        top: '1.8em',
        left: '2%',
        'text-align': 'left',
        color: '#000'
      }, 800, function () {
        $('main.container').removeClass('is-intro');
        $('.hide-for-intro').transition({
          opacity: 1
        }, 800);
      });

    },

    init: function() {

      var self = this;

      setTimeout(function () {

        self.shrinkTitle();

      }, 3000);

    }

  };

  $(document).ready(function() {
    new Intro();
  });

})();