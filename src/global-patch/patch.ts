import { ModSDKModAPI } from "bondage-club-mod-sdk";
import { patchSenseDep } from "./SenseDep";
import { patchUnrestrict } from "./Unrestrict";

export function applyPatches(mod: ModSDKModAPI) {
    patchSenseDep(mod);
    patchUnrestrict(mod);
}