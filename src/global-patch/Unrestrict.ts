import { ModSDKModAPI } from "bondage-club-mod-sdk";
import { IsLilian, IsOwnedBy } from "../utils/validators";

export function patchUnrestrict(mod: ModSDKModAPI) {
    mod.hookFunction('InventoryGroupIsBlockedForCharacter', 10, (args, next) => {
        let [ C, GroupName, Activity ] = args;
        if (IsLilian(Player, Player) && IsOwnedBy(C, Player)) {
            return false;
        } else {
            return next(args);
        }
    });
}