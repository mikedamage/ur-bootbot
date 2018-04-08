module.exports = (robot) => {
  robot.hear(/debug-env/, (res) => {
    const env = JSON.stringify(process.env, null, 2);
    res.reply(env);
    robot.logger.info(process.env);
  });

  robot.hear(/debug-self/, (res) => {
    robot.logger.info(robot);
  });
}
