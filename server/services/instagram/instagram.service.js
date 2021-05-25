const axios = require('axios');

const { COOKIE } = require('../../config/config');

const getInstagramAccount = async (influencer) => {
    try {
        const { instagramUsername } = influencer.social.instagram;

        const response = await axios.get(`https://www.instagram.com/${instagramUsername}/?__a=1`, { headers: { Cookie: COOKIE } });
        const instagramAccount = response.data;

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

        return influencer;
    } catch (e) {
        console.log(e);
    }
};

module.exports = { getInstagramAccount };
