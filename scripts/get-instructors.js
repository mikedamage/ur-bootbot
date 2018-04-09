const SlackHelpers = require('../lib/slack-helpers');

module.exports = (robot) => {
  if (robot.adapterName !== 'slack') {
    robot.logger.warn('Not using slack adapter. Not initializing instructor commands.');
    return;
  }

  const slack = new SlackHelpers(robot);
  const { HUBOT_URBOT_INSTRUCTORS: defaultInstructors = '' } = process.env;

  async function getInstructors() {
    let instructors = robot.brain.get('instructors');
    if (instructors) return instructors;
    instructors = await slack.filterUsers((usr) => defaultInstructors.split(',').includes(usr.name));
    robot.brain.set('instructors', instructors);
    return instructors;
  }

  robot.hear(/@urbot instructors/i, { id: 'instructors.list' } async (res) => {
    const users = await getInstructors();
    const response = users.map((user) => `Name: ${user.real_name}, Username: ${user.name}`).join('\n');
    res.send(response);
  });

  robot.respond(/instructors add (.+)/, { id: 'instructors.add' }, async (res) => {

  });

  robot.respond(/assistants add (.+)/, { id: 'assistants.add' }, async (res) => {

  });
};

