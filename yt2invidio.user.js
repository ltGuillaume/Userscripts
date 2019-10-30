// ==UserScript==
// @name        YT2Invidio
// @namespace   de.izzysoft
// @author      Izzy
// @description Point YouTube links to Invidio -- and Twitter links to Nitter
// @license     CC BY-NC-SA
// @include     *
// @version     1.2.0
// @run-at      document-idle
// @grant       GM.getValue
// @grant       GM.setValue
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_registerMenuCommand
// @grant       unsafeWindow
// @homepageURL https://codeberg.org/izzy/userscripts
// @downloadURL https://codeberg.org/izzy/userscripts/raw/branch/master/yt2invidio.user.js
// @require     https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// ==/UserScript==

// Get the Invidious instance to use for rewrite
GM.getValue('InvidiousHost','invidiou.sh').then(function(result) {
  rewriteLinks(result);
});


// Do the actual rewrite
function rewriteLinks(videohost) {
  console.log(`Using '${videohost}' for rewrite`);

  for(var i = 0; i < document.links.length; i++) {
    var elem = document.links[i];

    // Youtube: https://www.youtube.com/watch?v=cRRA2xRRgl8 || https://www.youtube.com/channel/dfqwfhqQ34er
    // only rewrite if we're not on Invidious already (too keep the "watch this on YouTube" links intact)
    if (elem.href.match(/(www\.)?youtube.com(\/watch\?v=[a-z0-9_-]+)/i) || elem.href.match(/(www\.)?youtube.com(\/channel\/[a-z0-9_-]+)/i)) {
      if (location.hostname != videohost) { elem.href='https://'+videohost+RegExp.$2; }
    } else if (elem.href.match(/(www\.)?youtu.be\/([a-z0-9_-]+)/i)) {
      if (location.hostname != videohost) { elem.href='https://'+videohost+'/watch?v='+RegExp.$2; }

    // Twitter
    } else if (elem.href.match(/(mobile\.)?twitter\.com\/([^&#]+)/i)) {
      elem.href='https://nitter.net/'+RegExp.$2;
    }
  }
}


// Give the user the possibility to set a different preferred instance
// A list of available instances can be found at
// https://github.com/omarroth/invidious/wiki/Invidious-Instances
async function setInstance() {
  let vhost = await GM.getValue('InvidiousHost','invidiou.sh');
  vhost = prompt('Set Invidious instance to:', vhost);
  if (vhost != null) GM.setValue('InvidiousHost',vhost);
}

GM_registerMenuCommand('Set Invidious instance',setInstance);
