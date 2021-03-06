const Material = require('./material.model');
const {
  MATERIAL_ALREADY_EXIST,
  MATERIAL_NOT_FOUND,
  IMAGE_NOT_PROVIDED,
  IMAGES_WERE_NOT_CONVERTED,
} = require('../../error-messages/material.messages');
const { uploadFiles } = require('../upload/upload.service');
const Currency = require('../currency/currency.model');

class MaterialsService {
  constructor() {
    this.currencyTypes = {
      UAH: 'UAH',
      USD: 'USD',
    };
  }
  async getAllMaterials({ skip, limit }) {
    const items = await Material.find()
      .skip(skip)
      .limit(limit);

    const count = await Material.find().countDocuments();
    return {
      items,
      count,
    };
  }

  async getMaterialById(id) {
    return Material.findById(id);
  }

  async updateMaterial(id, material) {
    const materialToUpdate = await Material.findById(id);
    if (!materialToUpdate) {
      throw new Error(MATERIAL_NOT_FOUND);
    }
    if (await this.checkMaterialExistOrDuplicated(material, id)) {
      throw new Error(MATERIAL_ALREADY_EXIST);
    }
    return await Material.findByIdAndUpdate(id, material, { new: true });
  }

  async addMaterial({ material, images }) {
    const { additionalPrice, ...rest } = material;

    if (await this.checkMaterialExistOrDuplicated(rest, null)) {
      throw new Error(MATERIAL_ALREADY_EXIST);
    }
    if (!images) {
      throw new Error(IMAGE_NOT_PROVIDED);
    }
    const currency = await Currency.findOne();

    const uploadResult = await uploadFiles(images);

    const imageResults = await Promise.allSettled(uploadResult);

    const resizedImages = imageResults.map(item => item.value.fileNames);

    if (!resizedImages) {
      throw new Error(IMAGES_WERE_NOT_CONVERTED);
    }

    const mappedColors = material.colors.map((item, index) => ({
      ...item,
      images: resizedImages[index],
    }));

    return new Material({
      ...rest,
      additionalPrice: [
        {
          currency: this.currencyTypes.UAH,
          value:
            additionalPrice *
            Math.round(currency.convertOptions[0].exchangeRate * 100),
        },
        {
          currency: this.currencyTypes.USD,
          value: additionalPrice * 100,
        },
      ],
      colors: mappedColors,
    }).save();
  }

  async deleteMaterial(id) {
    const foundMaterial = await Material.findByIdAndDelete(id);
    if (foundMaterial) {
      return foundMaterial;
    }
    throw new Error(MATERIAL_NOT_FOUND);
  }

  async checkMaterialExistOrDuplicated(data, id) {
    const materialsCount = await Material.countDocuments({
      _id: { $ne: id },
      name: {
        $elemMatch: {
          $or: [{ value: data.name[0].value }, { value: data.name[1].value }],
        },
      },
    });
    return materialsCount > 0;
  }
}

module.exports = new MaterialsService();
