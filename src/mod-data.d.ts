interface OrgasmData {
    orgasmCount: number
}

interface ModData {
    orgasmData: OrgasmData;
}

type PartialData = Partial<ModData>;