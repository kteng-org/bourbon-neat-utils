'use strict'

function toggleGrid(value, useCookies) {

  value = value === undefined ? true : value;

  // toggle class in the html tag
  document.documentElement.classList.toggle('visualize-grid', value);

  // set grid cookie
  var date = new Date();
  date.setTime( date.getTime() + (1 * 24 * 60 * 60 * 1000));

  if (useCookies) {
    document.cookie = 'visualize-grid=' + (value ? '1' : '0') + ';expires=' + date.toUTCString() + ';path=/';
  } else {
    removeCookies();
  }
}

function removeCookies() {

  document.cookie = 'visualize-grid= ;expires = Sun, 09 Sep 1956 00:00:00 GMT';
}

function removeNeatHotkeys() {

  if (window.neatHotkeysListener) {

    // remove hotkey listener
    window.removeEventListener('keydown', window.neatHotkeysListener);
  }

  removeCookies();

  toggleGrid(false);
}


var defaultOptions = {
  useCookies: false,
  visualizeGrid: false
}

function initializeNeatHotkeys(options) {

  // merge options with default options (asign object
  options = options || {};
  options.useCookies = options.useCookies || defaultOptions.useCookies;
  options.visualizeGrid = options.visualizeGrid || defaultOptions.visualizeGrid;

  // validate options
  if (typeof options !== 'object' || options instanceof Array) {
    throw new Error('parameter value must be an object');
  }

  if (typeof options.useCookies !== 'boolean' || options.useCookies instanceof Boolean) {
    throw new Error('option "useCookies" must be an boolean');
  }

  if (typeof options.visualizeGrid !== 'boolean' || options.visualizeGrid instanceof Boolean) {
    throw new Error('option "visualizeGrid" must be an boolean');
  }

  function getCookie(name) {

    var ca = decodeURIComponent(document.cookie).split(';');

    for(var i = 0; i <ca.length; i++) {

      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }

      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }

    return "";
  }

  // remove listenener if already exists
  if (window.neatHotkeysListener) {

    window.removeEventListener('keydown', window.neatHotkeysListener);

    removeCookies();
  }

  // add or overwrite listener
  window.neatHotkeysListener = function(e) {

    var eventObject = window.event ? event : e;
    var hasGrid = document.documentElement.classList.contains('visualize-grid');

    if (eventObject.ctrlKey && eventObject.keyCode === 76) {
      toggleGrid(!hasGrid, options.useCookies);
    }
  }
  // check grid option
  var visualizeGrid = !options.visualizeGrid || getCookie('visualize-grid') === '' || !options.useCookies ? options.visualizeGrid : getCookie('visualize-grid') === '=1';
  toggleGrid(visualizeGrid, options.useCookies);

  // listen to the hotkeys
  window.addEventListener('keydown', window.neatHotkeysListener);
}

module.exports.removeNeatHotkeys = removeNeatHotkeys;
module.exports.initializeNeatHotkeys = initializeNeatHotkeys;