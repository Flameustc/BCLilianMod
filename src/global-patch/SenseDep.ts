import { ModSDKModAPI } from "bondage-club-mod-sdk";
import { IsLilian } from "../utils/validators";

export function patchSenseDep(mod: ModSDKModAPI) {
    mod.hookFunction('ChatRoomUpdateDisplay', 10, (args, next) => {
        next(args);
        if (ChatRoomCharacterViewCharacterCount < 10 && ChatRoomImpactedBySenseDep.some(character => IsLilian(Player, character))) {
            let index = -1;
            for (let CC = 0; CC < ChatRoomCharacter.length; CC++) {
                if (IsLilian(Player, ChatRoomCharacter[CC])) {
                    index = CC;
                    break;
                }
            }
            let drawList = ChatRoomCharacterDrawlist.slice();
            let impactList = ChatRoomImpactedBySenseDep.slice();
            ChatRoomCharacterDrawlist = [];
            ChatRoomImpactedBySenseDep = [];
            for (let CC = 0; CC < ChatRoomCharacter.length; CC++) {
                if (CC === index) {
                    ChatRoomCharacterDrawlist.push(ChatRoomCharacter[CC]); 
                } else {
                    if (drawList.includes(ChatRoomCharacter[CC])) {
                        ChatRoomCharacterDrawlist.push(ChatRoomCharacter[CC]);
                    }
                    if (impactList.includes(ChatRoomCharacter[CC])) {
                        ChatRoomImpactedBySenseDep.push(ChatRoomCharacter[CC]);
                    }
                }
            }
            ChatRoomCharacterViewCharacterCount = ChatRoomCharacterDrawlist.length;
        }
    });
}