import bcrypt from 'bcryptjs';
const saltRounds = 10;

export const encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSaltSync(saltRounds);
    return await bcrypt.hash(password, salt);
};
