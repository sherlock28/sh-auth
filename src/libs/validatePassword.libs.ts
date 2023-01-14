import bcrypt from 'bcryptjs';

export const validatePassword = async (passwordFromRequest: string, passwordFromDB: string)  => {
    try {
        return await bcrypt.compare(passwordFromRequest, passwordFromDB);
    } catch (err) {
        console.error(err);
        return err;
    }
};
