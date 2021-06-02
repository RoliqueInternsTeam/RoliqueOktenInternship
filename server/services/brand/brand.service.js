const BrandModel = require('../../dataBase/models/Brand');

module.exports = {
    findBrandByParams: (params) => BrandModel.findOne(params),

    createBrand: (brand) => new BrandModel(brand).save(),

    addPhotoBrand: (brandId, photo) => BrandModel.findByIdAndUpdate({ _id: brandId },
        { avatar: photo }),

    getBrands: () => BrandModel.find({}),

};
