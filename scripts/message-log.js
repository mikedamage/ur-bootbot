module.exports = (robot) => {
  if (!process.env.HUBOT_LOG_MESSAGES) return;
  robot.listenerMiddleware((ctx, next, done) => {
    robot.logger.info(`${context.response.message.user.name}: ${context.response.message.text}`);
  });
};
