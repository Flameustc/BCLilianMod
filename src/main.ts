import bcMod from 'bondage-club-mod-sdk'
import { ModName, ModVersion } from './definition';
import { ChatGarbler } from './chat-control/ChatGarbler';
import { applyPatches } from './global-patch/patch';

declare global {
    interface Window {
        BCLilianMod_Loaded: boolean;
    }
}

(function () {
    if (window.BCLilianMod_Loaded) return;
    window.BCLilianMod_Loaded = false;

    const mod = bcMod.registerMod({ name: ModName, fullName: ModName, version: ModVersion });
    applyPatches(mod);
    ChatGarbler.init(mod);

    console.log(`${ModName} v${ModVersion} loaded.`);
    window.BCLilianMod_Loaded = true;
})()