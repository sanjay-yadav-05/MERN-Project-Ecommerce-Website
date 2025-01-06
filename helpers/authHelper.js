import bcrpyt, { hash } from 'bcrypt'

export const hashPassword = async (password) => {
    try {
        const salt = await bcrpyt.genSalt(10);
        const hashedPassword = await bcrpyt.hash(password, salt);
        return hashedPassword;

    } catch (error) {
        console.log(error)
    }
}

export const comparePassword = async(password,hashPassword) => {
    return bcrpyt.compare(password,hashPassword);
}
