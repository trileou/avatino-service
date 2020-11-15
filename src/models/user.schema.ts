import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String
});

UserSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
}

UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
    try {
        if(!this.isModified('password')) {
            return next();
        }
        const hashed = await bcrypt.hash(this['password'],10);
        this['password'] = hashed;
        return next();
    } catch(e) {
        return next(e);
    }
})