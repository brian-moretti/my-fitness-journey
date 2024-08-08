import bcrypt from "bcrypt";

export async function createHashedPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function compareHash(password, userPassword) {
  return await bcrypt.compare(password, userPassword);
}
