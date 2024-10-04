import * as bcrypt from "bcrypt";
export async function hashPassword(plaintextPassword: string): Promise<string> {
  const saltRounds = 10; // Number of salt rounds (higher is more secure but slower)
  try {
    const hash = await bcrypt.hash(plaintextPassword, saltRounds);
    console.log("Hashed password:", hash);
    return hash;
  } catch (error: any) {
    throw new Error(`Error hashing password: ${error.message}`);
  }
}
