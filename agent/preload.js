const { remote } = require('electron');

window.onload = () => {
  const $ = require('jquery');

  $(() => {
    $('#close').click(function() {
      remote.app.exit();
    });
  })
};
