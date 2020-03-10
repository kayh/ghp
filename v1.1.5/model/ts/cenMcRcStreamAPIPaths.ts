abstract class Path {
    abstract path(): String
    url(base?: string): String {
        return (base ? base : CenMcRcStreamAPIPaths.baseUrl) + this.path();
    }
}

class Coding {
    constructor(private parent){}
    private path() { return this.parent.path() + "/" + "coding"; }
    readonly transmitMailpieceAttributes = new CodingTransmitMailpieceAttributes(this);
}

class CodingTransmitMailpieceAttributes {
    constructor(private parent){}
    private path() { return this.parent.path() + "/" + "transmit-mailpiece-attributes"; }
    srcSystem(srcSystem?: string){ return new CodingTransmitMailpieceAttributesSrcSystem(this, srcSystem); }
}

class CodingTransmitMailpieceAttributesSrcSystem {
    constructor(private parent, private value?: string){}
    private path() { return this.parent.path() + "/" + (this.value ? this.value : "{srcSystem}"); }
    srcInstance(srcInstance?: string){ return new CodingTransmitMailpieceAttributesSrcSystemSrcInstance(this, srcInstance); }
}

class CodingTransmitMailpieceAttributesSrcSystemSrcInstance extends Path {
    constructor(private parent, private value?: string){super();}
    path() { return this.parent.path() + "/" + (this.value ? this.value : "{srcInstance}"); }
    dstSystem(dstSystem?: string){ return new CodingTransmitMailpieceAttributesSrcSystemSrcInstanceDstSystem(this, dstSystem); }
}

class CodingTransmitMailpieceAttributesSrcSystemSrcInstanceDstSystem {
    constructor(private parent, private value?: string){}
    private path() { return this.parent.path() + "/" + (this.value ? this.value : "{dstSystem}"); }
    dstInstance(dstInstance?: string){ return new CodingTransmitMailpieceAttributesSrcSystemSrcInstanceDstSystemDstInstance(this, dstInstance); }
}

class CodingTransmitMailpieceAttributesSrcSystemSrcInstanceDstSystemDstInstance {
    constructor(private parent, private value?: string){}
    private path() { return this.parent.path() + "/" + (this.value ? this.value : "{dstInstance}"); }
    conversationId(conversationId?: string){ return new CodingTransmitMailpieceAttributesSrcSystemSrcInstanceDstSystemDstInstanceConversationId(this, conversationId); }
}

class CodingTransmitMailpieceAttributesSrcSystemSrcInstanceDstSystemDstInstanceConversationId extends Path {
    constructor(private parent, private value?: string){super();}
    path() { return this.parent.path() + "/" + (this.value ? this.value : "{conversationId}"); }
}

class Machine {
    constructor(private parent){}
    private path() { return this.parent.path() + "/" + "machine"; }
    readonly requestMailpieceAttributes = new MachineRequestMailpieceAttributes(this);
    readonly submitMailpiece = new MachineSubmitMailpiece(this);
    readonly updateMailpieceAttributes = new MachineUpdateMailpieceAttributes(this);
}

class MachineRequestMailpieceAttributes {
    constructor(private parent){}
    private path() { return this.parent.path() + "/" + "request-mailpiece-attributes"; }
    srcSystem(srcSystem?: string){ return new MachineRequestMailpieceAttributesSrcSystem(this, srcSystem); }
}

class MachineRequestMailpieceAttributesSrcSystem {
    constructor(private parent, private value?: string){}
    private path() { return this.parent.path() + "/" + (this.value ? this.value : "{srcSystem}"); }
    srcInstance(srcInstance?: string){ return new MachineRequestMailpieceAttributesSrcSystemSrcInstance(this, srcInstance); }
}

class MachineRequestMailpieceAttributesSrcSystemSrcInstance {
    constructor(private parent, private value?: string){}
    private path() { return this.parent.path() + "/" + (this.value ? this.value : "{srcInstance}"); }
    conversationId(conversationId?: string){ return new MachineRequestMailpieceAttributesSrcSystemSrcInstanceConversationId(this, conversationId); }
}

class MachineRequestMailpieceAttributesSrcSystemSrcInstanceConversationId extends Path {
    constructor(private parent, private value?: string){super();}
    path() { return this.parent.path() + "/" + (this.value ? this.value : "{conversationId}"); }
}

class MachineSubmitMailpiece {
    constructor(private parent){}
    private path() { return this.parent.path() + "/" + "submit-mailpiece"; }
    srcSystem(srcSystem?: string){ return new MachineSubmitMailpieceSrcSystem(this, srcSystem); }
}

class MachineSubmitMailpieceSrcSystem {
    constructor(private parent, private value?: string){}
    private path() { return this.parent.path() + "/" + (this.value ? this.value : "{srcSystem}"); }
    srcInstance(srcInstance?: string){ return new MachineSubmitMailpieceSrcSystemSrcInstance(this, srcInstance); }
}

class MachineSubmitMailpieceSrcSystemSrcInstance extends Path {
    constructor(private parent, private value?: string){super();}
    path() { return this.parent.path() + "/" + (this.value ? this.value : "{srcInstance}"); }
}

class MachineUpdateMailpieceAttributes {
    constructor(private parent){}
    private path() { return this.parent.path() + "/" + "update-mailpiece-attributes"; }
    srcSystem(srcSystem?: string){ return new MachineUpdateMailpieceAttributesSrcSystem(this, srcSystem); }
}

class MachineUpdateMailpieceAttributesSrcSystem {
    constructor(private parent, private value?: string){}
    private path() { return this.parent.path() + "/" + (this.value ? this.value : "{srcSystem}"); }
    srcInstance(srcInstance?: string){ return new MachineUpdateMailpieceAttributesSrcSystemSrcInstance(this, srcInstance); }
}

class MachineUpdateMailpieceAttributesSrcSystemSrcInstance extends Path {
    constructor(private parent, private value?: string){super();}
    path() { return this.parent.path() + "/" + (this.value ? this.value : "{srcInstance}"); }
}

export default class CenMcRcStreamAPIPaths {
    private constructor(){}
    static readonly baseUrl = "server:8080mqtt";
    static readonly basePath = "/cen-mc-rc/v1";
    private path() { return CenMcRcStreamAPIPaths.basePath; }
    static readonly coding = new Coding(new CenMcRcStreamAPIPaths());
    static readonly machine = new Machine(new CenMcRcStreamAPIPaths());
}

