module.exports = (robot) => {
  if (!process.env.HUBOT_LOG_MESSAGES) return;
  robot.respond(/.*/, (res) => robot.logger.info(res.message));
};
