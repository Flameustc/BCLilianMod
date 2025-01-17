import { ModSDKModAPI } from "bondage-club-mod-sdk";
import { IsLilian } from "../utils/validators";

export function patchSenseDep(mod: ModSDKModAPI) {
    mod.hookFunction('ChatRoomUpdateDisplay', 10, (args, next) => {
        next(args);
        if (Player.IsBlind() && ChatRoomCharacterViewCharacterCount < 10 && ChatRoomCharacter.some(C => IsLilian(Player, C))) {
            let drawList = ChatRoomCharacterDrawlist.slice();
            let impactList = ChatRoomImpactedBySenseDep.slice();
            // These two list are not updated when RenderSingle
            if (ChatRoomCharacterViewCharacterCount === 1) {
                drawList = [ Player ];
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
            ChatRoomCharacterViewCharacterCountTotal = ChatRoomCharacterViewCharacterCount;
        }
    });

    mod.patchFunction('ChatRoomCharacterViewClickCharacter', {
        "Player.GetBlindLevel() >= 3": "Player.GetBlindLevel() >= 3 && C.MemberNumber != 40035"
    });

    mod.patchFunction('DrawCharacter', {
        "Player.GetBlindLevel() < 3": "Player.GetBlindLevel() < 3 || C.MemberNumber == 40035",
        "const DarkFactor = Math.min(CharacterGetDarkFactor(Player) * 2, 1);" : "const DarkFactor = C.MemberNumber == 40035 ? 1 : Math.min(CharacterGetDarkFactor(Player) * 2, 1);"
    });
}