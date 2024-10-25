import Cryptr from "cryptr";

let cryptr = new Cryptr(process.env.SECRET!);

export let encrypt = cryptr.encrypt;
export let decrypt = cryptr.decrypt;
