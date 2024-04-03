const DataService = require("../services/data.service");
const { withData } = require("../utils/response.utils");

const data_service = new DataService;
const getLists = async (request, response, next) => {
    try {
     const {limit, category} = request.query;
     let data = await data_service.getLists({limit, category});
     return withData(response, data)
    } catch (error) {
      next(error);
    }
  };
module.exports = {getLists}