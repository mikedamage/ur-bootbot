module.exports = (robot) => {
  if (robot.adapterName !== 'slack') {
    robot.logger.warn('Not using slack adapter. Not initializing instructor commands.');
    return;
  }

  const { HUBOT_URBOT_INSTRUCTORS: defaultInstructors = '' } = process.env;
  const instructors = robot.brain.get('instructors') || defaultInstructors.split(',');

  async function filterUsers(fn) {
    const { members: users } = await robot.adapter.client.web.users.list();
    return users.filter(fn);
  }

  robot.hear(/@urbot instructors/i, async (res) => {
    const users = await filterUsers((usr) => instructors.includes(usr.name));
    const response = users.map((user) => `Name: ${user.real_name}, Username: ${user.name}`).join('\n');
    res.send(response);
  });
};

