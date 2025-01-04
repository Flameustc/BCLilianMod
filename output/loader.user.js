// ==UserScript==
// @name BCLilianMod (Loader)
// @namespace https://www.bondageprojects.com/
// @version 0
// @description Lilian's Bondage Club Mod Script Loader
// @author Lilian
// @match bondageprojects.elementfx.com/*/BondageClub/*
// @match www.bondageprojects.elementfx.com/*/BondageClub/*
// @match bondage-europe.com/*/BondageClub/*
// @match www.bondage-europe.com/*/BondageClub/*
// @grant none
// @run-at document-end
// ==/UserScript==

(function () {
    "use strict";
    const src = `https://flameustc.github.io/BCLilianMod/main.js?v=${Date.now()}`;
    if (typeof BCLilianMod_Loaded === "undefined") {
        const n = document.createElement("script");
        n.setAttribute("type", "text/javascript");
        n.setAttribute("src", src);
        n.setAttribute("id", "BCLilianModLoader");
        document.head.appendChild(n);
    }
})();
