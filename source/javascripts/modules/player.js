// -------------------------------------------------
//
// player.js
// 
// A look at the public soundcloud API
//
// -------------------------------------------------

(function() {

  "use strict";

  var Player = function() { this.init(); };

  var s = {
    client_id: '6af6c0bb87a90c1096f671171c3893fe'
  };

  Player.prototype = {

    authenticate: function() {

      SC.initialize({
        client_id: s.client_id
      });

    },

    getData: function(url) {

      var self = this;

      var resolve_url = 'http://api.soundcloud.com/resolve.json?url=' + url + '&client_id=' + s.client_id;

      $.get(resolve_url, function(data) {
        self.streamTrack(data.id);
      });

    },

    streamTrack: function(id) {

      var self = this;

      var path = '/tracks/' + id;

      SC.stream(path, function(sound) {

        console.log(sound);

        // Play track
        sound.play();

        // Assign to a global variable
        self.currentTrack = sound;

        // 
        $('.js-play-text').text('Stop');

      });

    },

    showOverlay: function () {

      var self = this;

      $('.js-player-overlay').show().transition({
        opacity: 0.9
      }, 500);

    },

    hideOverlay: function () {

      var self = this;

      $('.js-player-overlay').transition({
        opacity: 0
      }, 500).hide();

    },

    events: function() {

      var self = this;

      // Play track

      $('.js-load-track').click(function() {

        var track_url = $(this).attr('data-track');

        self.authenticate();
        self.getData(track_url);

        self.showOverlay();

        return false;

      });

      // Pause current track

      $('.js-play-track').click(function() {

        self.currentTrack.play();

        return false;

      });

      // Pause current track

      $('.js-pause-track').click(function() {

        self.currentTrack.pause();

        return false;

      });

      // Stop curretn track

      $('.js-stop-track').click(function() {

        self.currentTrack.pause();

        self.hideOverlay();

        return false;

      });

      // Watch

      // setInterval(function() {

      //   if (self.currentTrack) {
      //     var completed = self.currentTrack.position / self.currentTrack.duration * 100
      //     console.log(completed + '%');

      //     $('.js-timer').text(completed + '%');

      //   }

      // }, 300);


    },

    init: function() {

      var self = this;

      self.events();

    }

  };

  $(document).ready(function() {
    new Player();
  });

})();