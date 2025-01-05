function garbleChar(c: string, garbleSound: string[], allowHyphen: boolean): { content: string, allowHyphen: boolean } {
    if (/^\p{N}/u.test(c)) {
        return { content: "*", allowHyphen: false };
    } else if (/^\p{Lu}/u.test(c)) {
        return { content: "M", allowHyphen: false };
    } else if (/^[\x00-\x7F]*$/.test(c)) {
        return { content: "m", allowHyphen: false };
    } else if (allowHyphen && Math.random() < 0.7) {
        return { content: "—", allowHyphen: true };
    } else {		
        return { content: garbleSound[Math.floor(Math.random() * garbleSound.length)], allowHyphen: true };
    }
}

export function garbleMessage(msg: string, gagLevel: number, garbleSound: string[]): string {
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
        } else {
            const res = garbleChar(msg[i], garbleSound, allowHyphen);
            str.push(res.content);
            allowHyphen = res.allowHyphen;
            i++;
            continue;
        }
    }
    return str.join("");
}

export function getGarbleSound(): string[] {
    return ["呜"];
}