import bcrypt from 'bcryptjs';
import logger from '../config/logger';

export const validatePassword = async (passwordFromRequest: string, passwordFromDB: string)  => {
    try {
        return await bcrypt.compare(passwordFromRequest, passwordFromDB);
    } catch (err) {
        logger.error(err);
        return err;
    }
};
