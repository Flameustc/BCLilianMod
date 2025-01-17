(function () {
	'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var bcmodsdk = {};

	var hasRequiredBcmodsdk;

	function requireBcmodsdk () {
		if (hasRequiredBcmodsdk) return bcmodsdk;
		hasRequiredBcmodsdk = 1;
		(function (exports) {
			// Bondage Club Mod Development Kit (1.2.0)
			// For more info see: https://github.com/Jomshir98/bondage-club-mod-sdk
			/** @type {ModSDKGlobalAPI} */
			(function(){const o="1.2.0";function e(o){alert("Mod ERROR:\n"+o);const e=new Error(o);throw console.error(e),e}const t=new TextEncoder;function n(o){return !!o&&"object"==typeof o&&!Array.isArray(o)}function r(o){const e=new Set;return o.filter((o=>!e.has(o)&&e.add(o)))}const i=new Map,a=new Set;function c(o){a.has(o)||(a.add(o),console.warn(o));}function s(o){const e=[],t=new Map,n=new Set;for(const r of f.values()){const i=r.patching.get(o.name);if(i){e.push(...i.hooks);for(const[e,a]of i.patches.entries())t.has(e)&&t.get(e)!==a&&c(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e)||""}\nPatch2:\n${a}`),t.set(e,a),n.add(r.name);}}e.sort(((o,e)=>e.priority-o.priority));const r=function(o,e){if(0===e.size)return o;let t=o.toString().replaceAll("\r\n","\n");for(const[n,r]of e.entries())t.includes(n)||c(`ModSDK: Patching ${o.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return (0, eval)(`(${t})`)}(o.original,t);let i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||undefined===i?undefined:i.call(t,o.name,n),c=r.apply(this,e);return null==a||a(),c};for(let t=e.length-1;t>=0;t--){const n=e[t],r=i;i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||undefined===i?undefined:i.call(t,o.name,n.mod),c=n.hook.apply(this,[e,o=>{if(1!==arguments.length||!Array.isArray(e))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof o}`);return r.call(this,o)}]);return null==a||a(),c};}return {hooks:e,patches:t,patchesSources:n,enter:i,final:r}}function l(o,e=false){let r=i.get(o);if(r)e&&(r.precomputed=s(r));else {let e=window;const a=o.split(".");for(let t=0;t<a.length-1;t++)if(e=e[a[t]],!n(e))throw new Error(`ModSDK: Function ${o} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const c=e[a[a.length-1]];if("function"!=typeof c)throw new Error(`ModSDK: Function ${o} to be patched not found`);const l=function(o){let e=-1;for(const n of t.encode(o)){let o=255&(e^n);for(let e=0;e<8;e++)o=1&o?-306674912^o>>>1:o>>>1;e=e>>>8^o;}return ((-1^e)>>>0).toString(16).padStart(8,"0").toUpperCase()}(c.toString().replaceAll("\r\n","\n")),d={name:o,original:c,originalHash:l};r=Object.assign(Object.assign({},d),{precomputed:s(d),router:()=>{},context:e,contextProperty:a[a.length-1]}),r.router=function(o){return function(...e){return o.precomputed.enter.apply(this,[e])}}(r),i.set(o,r),e[r.contextProperty]=r.router;}return r}function d(){for(const o of i.values())o.precomputed=s(o);}function p(){const o=new Map;for(const[e,t]of i)o.set(e,{name:e,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((o=>o.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return o}const f=new Map;function u(o){f.get(o.name)!==o&&e(`Failed to unload mod '${o.name}': Not registered`),f.delete(o.name),o.loaded=false,d();}function g(o,t){o&&"object"==typeof o||e("Failed to register mod: Expected info object, got "+typeof o),"string"==typeof o.name&&o.name||e("Failed to register mod: Expected name to be non-empty string, got "+typeof o.name);let r=`'${o.name}'`;"string"==typeof o.fullName&&o.fullName||e(`Failed to register mod ${r}: Expected fullName to be non-empty string, got ${typeof o.fullName}`),r=`'${o.fullName} (${o.name})'`,"string"!=typeof o.version&&e(`Failed to register mod ${r}: Expected version to be string, got ${typeof o.version}`),o.repository||(o.repository=undefined),undefined!==o.repository&&"string"!=typeof o.repository&&e(`Failed to register mod ${r}: Expected repository to be undefined or string, got ${typeof o.version}`),null==t&&(t={}),t&&"object"==typeof t||e(`Failed to register mod ${r}: Expected options to be undefined or object, got ${typeof t}`);const i=true===t.allowReplace,a=f.get(o.name);a&&(a.allowReplace&&i||e(`Refusing to load mod ${r}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(a));const c=o=>{let e=g.patching.get(o.name);return e||(e={hooks:[],patches:new Map},g.patching.set(o.name,e)),e},s=(o,t)=>(...n)=>{var i,a;const c=null===(a=(i=m.errorReporterHooks).apiEndpointEnter)||undefined===a?undefined:a.call(i,o,g.name);g.loaded||e(`Mod ${r} attempted to call SDK function after being unloaded`);const s=t(...n);return null==c||c(),s},p={unload:s("unload",(()=>u(g))),hookFunction:s("hookFunction",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);"number"!=typeof t&&e(`Mod ${r} failed to hook function '${o}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&e(`Mod ${r} failed to hook function '${o}': Expected hook function, got ${typeof n}`);const s={mod:g.name,priority:t,hook:n};return a.hooks.push(s),d(),()=>{const o=a.hooks.indexOf(s);o>=0&&(a.hooks.splice(o,1),d());}})),patchFunction:s("patchFunction",((o,t)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);n(t)||e(`Mod ${r} failed to patch function '${o}': Expected patches object, got ${typeof t}`);for(const[n,i]of Object.entries(t))"string"==typeof i?a.patches.set(n,i):null===i?a.patches.delete(n):e(`Mod ${r} failed to patch function '${o}': Invalid format of patch '${n}'`);d();})),removePatches:s("removePatches",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const t=l(o);c(t).patches.clear(),d();})),callOriginal:s("callOriginal",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to call a function: Expected function name string, got ${typeof o}`);const i=l(o);return Array.isArray(t)||e(`Mod ${r} failed to call a function: Expected args array, got ${typeof t}`),i.original.apply(null!=n?n:globalThis,t)})),getOriginalHash:s("getOriginalHash",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to get hash: Expected function name string, got ${typeof o}`);return l(o).originalHash}))},g={name:o.name,fullName:o.fullName,version:o.version,repository:o.repository,allowReplace:i,api:p,loaded:true,patching:new Map};return f.set(o.name,g),Object.freeze(p)}function h(){const o=[];for(const e of f.values())o.push({name:e.name,fullName:e.fullName,version:e.version,repository:e.repository});return o}let m;const y=undefined===window.bcModSdk?window.bcModSdk=function(){const e={version:o,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:p,errorReporterHooks:Object.seal({apiEndpointEnter:null,hookEnter:null,hookChainExit:null})};return m=e,Object.freeze(e)}():(n(window.bcModSdk)||e("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==o&&alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk);return (Object.defineProperty(exports,"__esModule",{value:true}),exports.default=y),y})(); 
		} (bcmodsdk));
		return bcmodsdk;
	}

	var bcmodsdkExports = requireBcmodsdk();
	var bcMod = /*@__PURE__*/getDefaultExportFromCjs(bcmodsdkExports);

	const ModName = 'BCLilianMod';
	const ModVersion = '0.1.0';

	function garbleChar(c, garbleSound, allowHyphen) {
	    if (/^\p{N}/u.test(c)) {
	        return { content: "*", allowHyphen: false };
	    }
	    else if (/^\p{Lu}/u.test(c)) {
	        return { content: "M", allowHyphen: false };
	    }
	    else if (/^[\x00-\x7F]*$/.test(c)) {
	        return { content: "m", allowHyphen: false };
	    }
	    else if (allowHyphen && Math.random() < 0.7) {
	        return { content: "—", allowHyphen: true };
	    }
	    else {
	        return { content: garbleSound[Math.floor(Math.random() * garbleSound.length)], allowHyphen: true };
	    }
	}
	function garbleMessage(msg, gagLevel, garbleSound) {
	    if (gagLevel <= 0) {
	        return msg;
	    }
	    let inOOC = false;
	    let allowHyphen = false;
	    let str = [];
	    let i = 0;
	    while (i < msg.length) {
	        switch (msg[i]) {
	            case "(":
	            case "（":
	                inOOC = true;
	                allowHyphen = false;
	                str.push(msg[i++]);
	                continue;
	            case ")":
	            case "）":
	                inOOC = false;
	                allowHyphen = false;
	                str.push(msg[i++]);
	                continue;
	        }
	        if (inOOC || !/^(\p{L}|\p{N})/u.test(msg[i])) {
	            allowHyphen = false;
	            str.push(msg[i++]);
	            continue;
	        }
	        if (Math.random() * 30 > gagLevel + 6) {
	            allowHyphen = false;
	            str.push(msg[i++]);
	            continue;
	        }
	        else {
	            const res = garbleChar(msg[i], garbleSound, allowHyphen);
	            str.push(res.content);
	            allowHyphen = res.allowHyphen;
	            i++;
	            continue;
	        }
	    }
	    return str.join("");
	}
	function getGarbleSound() {
	    return ["呜"];
	}

	class ChatGarbler {
	    static init(mod) {
	        mod.hookFunction('ChatRoomGenerateChatRoomChatMessage', 10, (args, next) => {
	            let [type, originalMsg] = args;
	            let garbledMsg = garbleMessage(originalMsg, SpeechTransformGagGarbleIntensity(Player), getGarbleSound());
	            let msgDict = [{ Effects: ["gagGarble"], Original: originalMsg }];
	            let res = { Content: garbledMsg, Type: type, Dictionary: msgDict };
	            return res;
	        });
	    }
	}

	function HexStr(C) {
	    return C.toString(16);
	}
	function IsLilian(player, C) {
	    return C.MemberNumber !== undefined && HexStr(C.MemberNumber) === `9c63`;
	}

	function patchSenseDep(mod) {
	    mod.hookFunction('ChatRoomUpdateDisplay', 10, (args, next) => {
	        next(args);
	        if (Player.IsBlind() && ChatRoomCharacterViewCharacterCount < 10 && ChatRoomCharacter.some(C => IsLilian(Player, C))) {
	            let drawList = ChatRoomCharacterDrawlist.slice();
	            let impactList = ChatRoomImpactedBySenseDep.slice();
	            // These two list are not updated when RenderSingle
	            if (ChatRoomCharacterViewCharacterCount === 1) {
	                drawList = [Player];
	                impactList = ChatRoomCharacter.filter(C => !C.IsPlayer());
	            }
	            let index = -1;
	            for (let CC = 0; CC < ChatRoomCharacter.length; CC++) {
	                if (IsLilian(Player, ChatRoomCharacter[CC])) {
	                    index = CC;
	                    break;
	                }
	            }
	            ChatRoomCharacterDrawlist = [];
	            ChatRoomImpactedBySenseDep = [];
	            for (let CC = 0; CC < ChatRoomCharacter.length; CC++) {
	                if (CC === index) {
	                    ChatRoomCharacterDrawlist.push(ChatRoomCharacter[CC]);
	                }
	                else {
	                    if (drawList.includes(ChatRoomCharacter[CC])) {
	                        ChatRoomCharacterDrawlist.push(ChatRoomCharacter[CC]);
	                    }
	                    if (impactList.includes(ChatRoomCharacter[CC])) {
	                        ChatRoomImpactedBySenseDep.push(ChatRoomCharacter[CC]);
	                    }
	                }
	            }
	            ChatRoomCharacterViewCharacterCount = ChatRoomCharacterDrawlist.length;
	            ChatRoomCharacterViewCharacterCountTotal = ChatRoomCharacterViewCharacterCount;
	        }
	    });
	    mod.patchFunction('ChatRoomCharacterViewClickCharacter', {
	        "Player.GetBlindLevel() >= 3": "Player.GetBlindLevel() >= 3 && C.MemberNumber != 40035"
	    });
	    mod.patchFunction('DrawCharacter', {
	        "Player.GetBlindLevel() < 3": "Player.GetBlindLevel() < 3 || C.MemberNumber == 40035",
	        "const DarkFactor = Math.min(CharacterGetDarkFactor(Player) * 2, 1);": "const DarkFactor = C.MemberNumber == 40035 ? 1 : Math.min(CharacterGetDarkFactor(Player) * 2, 1);"
	    });
	}

	function applyPatches(mod) {
	    patchSenseDep(mod);
	}

	(function () {
	    if (window.BCLilianMod_Loaded)
	        return;
	    window.BCLilianMod_Loaded = false;
	    const mod = bcMod.registerMod({ name: ModName, fullName: ModName, version: ModVersion });
	    applyPatches(mod);
	    ChatGarbler.init(mod);
	    console.log(`${ModName} v${ModVersion} loaded.`);
	    window.BCLilianMod_Loaded = true;
	})();

})();