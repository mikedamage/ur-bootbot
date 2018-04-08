module.exports = (robot) => {
  const sayHi = (res) => res.send(`Hello, @${res.message.user.name}`);
  robot.respond(/(hi|hello|hey)/i, sayHi);
  robot.hear(/@urbot (hi|hello|hey)/i, sayHi);
};
