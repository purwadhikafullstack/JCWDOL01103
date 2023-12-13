const crypto = require("crypto");

const algorithm = process.env.ENCRYPT_METHOD;
const key = crypto
  .pbkdf2Sync(process.env.ENCRYPT_KEY, "salt", 100000, 32, "sha512")
  .toString("hex")
  .substring(0, 32);

function encryptData(value) {
  try {
    const iv = crypto.randomBytes(16).toString("hex");
    const cipher = crypto.createCipheriv(
      algorithm,
      key,
      Buffer.from(iv, "hex")
    );
    return (
      Buffer.from(
        cipher.update(value.toString(), "utf8", "hex") + cipher.final("hex"),
        "hex"
      ).toString("base64") + iv
    );
  } catch (err) {
    throw Error(err);
  }
}

function decryptData(value) {
  try {
    const iv = value.toString().slice(-32);
    const encryptedText = value.toString().slice(0, -32);
    const buff = Buffer.from(encryptedText, "base64");
    const decipher = crypto.createDecipheriv(
      algorithm,
      key,
      Buffer.from(iv, "hex")
    );
    return (
      decipher.update(buff.toString("hex"), "hex", "utf8") +
      decipher.final("utf8")
    );
  } catch (error) {
    throw Error(error);
  }
}

module.exports = { encryptData, decryptData };
