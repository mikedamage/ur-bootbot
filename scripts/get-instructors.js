module.exports = (robot) => {
  const instructors = process.env.HUBOT_URBOT_INSTRUCTORS.split(',');

  if (robot.adapter.client.constructor.name !== 'SlackClient') return;
};

