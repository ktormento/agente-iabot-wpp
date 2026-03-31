const User = require("../models/User");

async function getUser(phone) {
    return await User.findOne({ phone });
}

async function updateUser(phone, profile, intent) {
    let user = await User.findOne({ phone });

    if(!user){
        user = new User({
            phone,
            profile,
            lastIntent: intent,
            messages: 1
        });
    } else {
        user.messages += 1;
        if(profile)user.profile = profile;
        if(intent)user.lastIntent = intent;
    }

    await user.save();
    return user;

}

module.exports = {getUser, updateUser};