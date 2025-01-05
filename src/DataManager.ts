import { ModSDKModAPI } from "bondage-club-mod-sdk";
import { DataKeyName } from "./definition";

export class DataManager {
    private static _instance: DataManager | undefined;

    static init(mod: ModSDKModAPI, msg?: string) {
        if (this._instance === undefined)
            this._instance = new DataManager;

        function LoadAndMessage(C: Partial<ServerAccountData> | PlayerCharacter | string | null | undefined) {
            if (typeof C !== 'object') return;
            if (C) DataManager.instance.ServerTakeData(C as Pick<PlayerCharacter, 'ExtensionSettings'>);
            if (msg) console.log(msg);
        }

        mod.hookFunction('LoginResponse', 0, (args, next) => {
            LoadAndMessage(args[0]);
            next(args);
        });

        if (Player && Player.MemberNumber) {
            LoadAndMessage(Player);
        }
    }

    static get instance() {
        return DataManager._instance as DataManager;
    }

    private modData: PartialData = {};

    static DefaultValue: ModData = {
        orgasmData: {
            orgasmCount: 0
        }
    };

    private EncodeDataStr() {
        let data: { [k: string]: any } = {}
        for (const k in this.modData) {
            data[k] = this.modData[k as keyof ModData];
        }
        return LZString.compressToBase64(JSON.stringify(data));
    }

    private DecodeDataStr(str: string | undefined) {
        if (str === undefined) {
            Object.assign(this.modData, DataManager.DefaultValue);
            return;
        }

        let d = LZString.decompressFromBase64(str);
        let data = {};

        try {
            if (!d) throw new Error();
            let decoded = JSON.parse(d);
            data = decoded;
        } catch { }
    }
    
    ServerStoreData() {
        if (Player && Player.ExtensionSettings) {
            Player.ExtensionSettings.BCLatexAutomataStatus = this.EncodeDataStr();
            ServerPlayerExtensionSettingsSync(DataKeyName);
        }
    }

    ServerTakeData(C: Pick<PlayerCharacter, 'ExtensionSettings'>) {
        const raw_data = C.ExtensionSettings[DataKeyName];
        this.DecodeDataStr(raw_data);
    }

    get data() {
        return this.modData as ModData;
    }

    set data(d: ModData) {
        this.modData = d;
    }

}