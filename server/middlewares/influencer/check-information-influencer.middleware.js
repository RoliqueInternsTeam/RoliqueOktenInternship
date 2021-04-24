const fetch = require('node-fetch');

module.exports = async (req, res, next) => {
    try {
        const influencer = JSON.parse(req.body.json);
        const { instagramUsername } = influencer.social.instagram;

        if (instagramUsername) {
            const response = await fetch(`https://www.instagram.com/${instagramUsername}/?__a=1`, { headers: { Cookie: 'sessionid=7001737186%3AbfNpyp88po5wkj%3A3' } });
            const instagramAccount = await response.json();
            const instagramUser = instagramAccount.graphql.user;
            const instagramPhotos = [];
            if (!instagramUser.is_private) {
                instagramUser.edge_owner_to_timeline_media.edges.forEach((data) => {
                    const photo = { photoURL: '', comment: '', liked: '' };
                    photo.photoURL = data.node.thumbnail_src;
                    photo.comment = data.node.edge_media_to_comment.count;
                    photo.liked = data.node.edge_liked_by.count;
                    instagramPhotos.push(photo);
                });
                influencer.social.instagram.instagramPhotos = instagramPhotos;
            }
            influencer.social.instagram.instagramFollowers = instagramUser.edge_followed_by.count;
            influencer.avatar = instagramUser.profile_pic_url_hd;

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
