import bcrypt from "bcrypt"

export async function hashing(password: string) {
    const salRounds = 10;
    return bcrypt.hash(password, salRounds);
}


export async function comparedPassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword)
}