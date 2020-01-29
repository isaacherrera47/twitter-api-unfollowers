(async () => {
    require('dotenv').config()
    const Twit = require('twit');
    const config = require('./config');

    const T = new Twit(config);
    const followers = await T.get('followers/ids').then(r => r.data.ids);
    const friends = await T.get('friends/ids').then(r => r.data.ids);
    const diff = friends.filter(x => !followers.includes(x));

    const detailedProfiles = await T.get('users/lookup', {user_id: diff});

    console.log(detailedProfiles.data.map(x => `https://mobile.twitter.com/${x.screen_name}`));
})();