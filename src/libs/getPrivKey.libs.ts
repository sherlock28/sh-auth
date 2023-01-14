import fs from 'fs';
import path from "path";

export const getPrivKey = (): string => {
    return fs.readFileSync(path.join(__dirname, "../keys/") + "RS512.key", "utf8");
}
