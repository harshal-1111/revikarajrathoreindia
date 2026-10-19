/* Preview gate — keeps the full site behind the coming-soon page until the password is entered.
   This runs in the browser, so it hides the site from casual visitors only; it is not real security.
   TOKEN is the SHA-256 of "rri-preview:" + password. Change both here and in index.html together. */
(function () {
  'use strict';
  var KEY = 'rri-preview';
  var TOKEN = 'dd5ba3c0cf4561100f51b45635e5144ccf5172f78206abc0bb4c2e2396f1226a';
  var ok = false;
  try { ok = localStorage.getItem(KEY) === TOKEN; } catch (e) { /* storage unavailable */ }
  if (!ok) {
    document.documentElement.style.display = 'none';
    location.replace('index.html');
  }
  window.RRI_GATE = { key: KEY };
})();
