import { createHash, isValidPassword } from "../helpers/helpers.js";
import { MongoUsers } from "../containers/MongoUsers.js";

const User = new MongoUsers()

export async function signupLocalStrategy(req, username, password, done){
    try {
        const user = await User.findOne({ 'username': username });
        if (user) {
            return done(null, false);}
        const newUser = {
            username: username,
            password: createHash(password),
            email: req.body.email,
            fullName: `${req.body.firstname} ${req.body.lastname}`,
            role: req.body.role};
        const newUserWithId = await User.create(newUser);
        return done(null, newUserWithId);
    } catch (err) {
        return done(err);}
}

export async function loginLocalStrategy(username, password, done){
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return done(null, false);
        }

        if (!isValidPassword(user, password)) {
            return done(null, false);
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}

export async function twitterStrategy(token, tokenSecret, userProfile, done){
    try {
        const updateFields = {
            username: userProfile._json.screen_name,
            fullName: userProfile._json.name,
            role : "user",
            twitterId : userProfile.id
          }
        const user = await User.findOneAndUpdate({ twitterId: userProfile.id },
             updateFields,{ upsert: true, new: true })
        done(null, user);
    } catch (err) {
        done(err);
    }
}

export async function deserializer(user, callback){
    if(user._id){
        User.setConnection()
        User.model.findById(user._id).exec()
            .then((user) => {
                return callback(null, user);
            })
            .catch((err) => {
                return callback(err);
            });
    } else {
        return callback(null, user);
    }
}
