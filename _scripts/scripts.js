var $ = require('jquery');
var $ = require('bootstrap');

/* Just a bit of fun for the console log for nosey devs */
console.log("%cHey! Stop reading my code ;)", "background: #C35B5B; color: white; font-size: small");

console.log("%cWhen you finish browsing, have a wee look here:", "background: #C35B5B; color: white; font-size: small");

(function(url) {
  // Create a new `Image` instance
  var image = new Image();

  image.onload = function() {
    // Inside here we already have the dimensions of the loaded image
    var style = [
      // Hacky way of forcing image's viewport using `font-size` and `line-height`
      'font-size: 1px;',
      'line-height: ' + this.height + 'px;',

      // Hacky way of forcing a middle/center anchor point for the image
      'padding: ' + this.height * .5 + 'px ' + this.width * .5 + 'px;',

      // Set image dimensions
      'background-size: ' + this.width + 'px ' + this.height + 'px;',

      // Set image URL
      'background: url(' + url + ');'
    ].join(' ');

    console.log('%c', style);
  };

  // Actually loads the image
  image.src = url;
})('https://media.giphy.com/media/Vuw9m5wXviFIQ/giphy.gif');
