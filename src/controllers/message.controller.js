const MessageService = require("../services/message.service");
const { withMessage } = require("../utils/response.utils");

let message_service = new MessageService();
const getMessage = async(request, response, next)=> {
    try {
        let user = request.user;
        let message = await message_service.getMessage(user)
        return withMessage(response, message)
    } catch (error) {
        next(error)
    }
}

module.exports = {getMessage}