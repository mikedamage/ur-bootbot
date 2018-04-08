module.exports = (robot) => {
  robot.respond(/.*/, (res) => robot.logger.info(res.message));
}
