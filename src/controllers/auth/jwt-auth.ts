import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

interface IPayLoad {
  email: string;
  userId: string;
  role: string;
}

const keysPath = path.join(__dirname, "../../", "keys");

const privateKey = fs.readFileSync(
  path.join(keysPath, "user-private.key"),
  "utf8"
);
const publicKey = fs.readFileSync(
  path.join(keysPath, "user-public.key"),
  "utf8"
);

export const verify = (token: string) => {
  try {
    const decodedToken = jwt.verify(token, publicKey, {
      algorithms: ["RS256"],
    });

    if (!decodedToken) {
      throw new Error("Unable to verify token");
    }

    return decodedToken;
  } catch (_err) {
    return false;
  }
};

export const sign = (payLoad: IPayLoad) => {  
  const token = jwt.sign(payLoad, privateKey, {
    algorithm: "RS256",
    expiresIn: "12h",
  });
  

  return token;
};
