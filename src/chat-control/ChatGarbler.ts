import { ModSDKModAPI } from "bondage-club-mod-sdk";
import { garbleMessage, getGarbleSound } from "./garble";

export class ChatGarbler {
    static init(mod: ModSDKModAPI) {
        mod.hookFunction('ChatRoomGenerateChatRoomChatMessage', 10, (args, next) => {
            let [ type, originalMsg ] = args;
            let garbledMsg = garbleMessage(originalMsg, SpeechTransformGagGarbleIntensity(Player), getGarbleSound())
            let msgDict: ChatMessageDictionary = [ { Effects: [ "gagGarble" ], Original: originalMsg } ];     
            let res: ServerChatRoomMessage = { Content: garbledMsg, Type: type, Dictionary: msgDict };
            return res;
        });
    }
}