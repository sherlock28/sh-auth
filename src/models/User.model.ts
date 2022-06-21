import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    email: string,
    password: string,
    token: string
}

const UserSchema = new Schema(
    {
        email: {type: String, required: true},
        password: {type: String, required: true},
        token: {type: String}
    }, 
    {
        toJSON: {
            transform(_doc, returnedObject) {
                returnedObject.id = returnedObject._id;
                delete returnedObject.__v;
                delete returnedObject.token;
            },
        }
    });

export default model<IUser>('User', UserSchema);