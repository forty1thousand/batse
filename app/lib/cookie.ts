import Cryptr from "cryptr";

let cryptr = new Cryptr(process.env.SECRET! ?? "HARDCODEDBISHKEKcarts");

export let encrypt = cryptr.encrypt;
export let decrypt = cryptr.decrypt;
