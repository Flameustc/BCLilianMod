import { ModSDKModAPI } from "bondage-club-mod-sdk";
import { patchSenseDep } from "./SenseDep";

export function applyPatches(mod: ModSDKModAPI) {
    patchSenseDep(mod);
}