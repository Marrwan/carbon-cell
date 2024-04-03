class MessageService {
  getMessage = async (user) => {
    let message;
    if (!user.name) {
      user.name = "";
    }
    message = `Hello ${user.name}, Welcome! You are able to view this because you are logged in. 
     Your email is ${user.email}. 
     You can logout and try accessing this endpoint`;

    return message;
  };
}

module.exports = MessageService;