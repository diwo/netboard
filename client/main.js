requirejs.config({
  paths: {
    'rxjs': 'https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.5.2/rxjs.umd.min'
  }
});

requirejs(['netboard'], function(netboard) {
  netboard.start();
})();
