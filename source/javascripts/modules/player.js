// -------------------------------------------------
//
// player.js
// 
// A look at the public soundcloud API
//
// -------------------------------------------------

(function() {

  "use strict";

  var Player = function() {
    this.init();
  };

  var s = {
    client_id: '6af6c0bb87a90c1096f671171c3893fe'
  };

  Player.prototype = {

    authenticate: function() {

      SC.initialize({
        client_id: s.client_id
      });

    },

    getData: function(url, title) {

      var self = this;

      var resolve_url = 'http://api.soundcloud.com/resolve.json?url=' + url + '&client_id=' + s.client_id;

      SC.get('/resolve', {
        url: url
      }, function(data) {
        self.streamTrack(data, title);
      });

    },

    streamTrack: function(data, title) {

      var self = this;

      var id = data.id;

      var path = '/tracks/' + id;

      SC.stream(path, function(sound) {

        // Play track
        sound.play();

        // Assign to a global variable
        self.currentTrack = sound;

        // 
        $('.js-play-text').text(title);

      });

    },

    showOverlay: function(from, to) {

      var self = this;

      $('.js-player-overlay').transition({
        'background': 'linear-gradient(to right bottom, ' + from + ' 0%, ' + to + ' 100%)'
      }, 0).show().transition({
        opacity: 0.9
      }, 500);

    },

    hideOverlay: function() {

      var self = this;

      $('.js-player-overlay').transition({
        opacity: 0
      }, 500, function() {
        $('.js-player-overlay').hide();
        $('.js-play-text').text('Loading...');
      });

    },

    events: function() {

      var self = this;

      self.authenticate();

      // Play track

      $('.js-load-track').click(function() {

        var track_url = $(this).attr('data-track');
        var track_title = $(this).attr('data-track-title');
        var color_one = $(this).attr('data-color-one');
        var color_two = $(this).attr('data-color-two');

        self.getData(track_url, track_title);

        self.showOverlay(color_one, color_two);

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