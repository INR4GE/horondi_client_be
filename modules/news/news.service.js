const News = require('./news.model');
const ApiError = require('../../utils/apiError');

const newsErrorMessage = JSON.stringify([
  {
    lang: 'uk',
    value: 'Новин  не знайдено',
  },
  {
    lang: 'eng',
    value: 'News not found',
  },
]);
class NewsService {
  async getAllNews() {
    return (await News.find()) || ApiError(404, newsErrorMessage);
  }

  async getNewsById(id) {
    return (await News.findById(id)) || new ApiError(404, newsErrorMessage);
  }

  async updateNews(id, news) {
    return (
      (await News.findByIdAndUpdate(id, news))
      || ApiError(404, newsErrorMessage)
    );
  }

  async addNews(data) {
    return new News(data).save();
  }

  async deleteNews(id) {
    return (
      (await News.findByIdAndDelete(id)) || ApiError(404, newsErrorMessage)
    );
  }
}
module.exports = new NewsService();
