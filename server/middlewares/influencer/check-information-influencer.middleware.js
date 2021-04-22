const fetch = require('node-fetch');

module.exports = async (req, res, next) => {
    try {
        const influencer = JSON.parse(req.body.json);
        const { instagramUsername } = influencer.social.instagram;

        if (instagramUsername) {
            const response = await fetch(`https://www.instagram.com/${instagramUsername}/?__a=1`);

            const instagramAccount = await response.json();
            console.log(instagramAccount);
        }

        const cleanObject = (object) => {
            Object
                .entries(object)
                .forEach(([
                    k,
                    v
                ]) => {
                    if (v && typeof v === 'object') cleanObject(v);
                    if (v
                        && typeof v === 'object'
                        && !Object.keys(v).length
                        || v === null
                        || v === undefined
                        || v.length === 0
                    ) {
                        if (Array.isArray(object)) object.splice(k, 1);
                        else if (!(v instanceof Date)) delete object[k];
                    }
                });
            return object;
        };
        cleanObject(influencer);


        req.influencer = influencer;
        next();
    } catch (e) {
        next(e);
    }
};
