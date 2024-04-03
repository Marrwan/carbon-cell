const { VALIDATION_ERROR } = require("../middlewares/errors/ApiError");
const { doGet } = require("./http.service");

class DataService{
    getLists = async({limit, category}) => {
    let url = "https://api.publicapis.org/entries";
    if (category) {
        url += `?Category=${encodeURIComponent(category)}`;
      }
  
      // Fetch data from the public API
      try {
        const response = await doGet(url);
        let entries = response?.data?.entries;
  
        // Apply limit if provided
        if (limit) {
          entries = entries.slice(0, limit);
        }
  
        return {count:entries.length,entries};
  
      } catch (error) {
        throw new VALIDATION_ERROR("validation error", 400, "Failed to fetch data from the public API");
      }
    }
}

module.exports = DataService;