module.exports = (robot) => {
  if (robot.adapterName !== 'slack') {
    robot.logger.warn('Not using slack adapter. Not initializing instructor commands.');
    return;
  }

  const { HUBOT_URBOT_INSTRUCTORS: defaultInstructors = '' } = process.env;

  async function filterUsers(fn) {
    const { members: users } = await robot.adapter.client.web.users.list();
    return users.filter(fn);
  }

  async function getInstructors() {
    let instructors = robot.brain.get('instructors');
    if (instructors) return instructors;
    instructors = await filterUsers((usr) => defaultInstructors.split(',').includes(usr.name));
    robot.brain.set('instructors', instructors);
    return instructors;
  }

  robot.hear(/@urbot instructors/i, async (res) => {
    const users = await getInstructors();
    const response = users.map((user) => `Name: ${user.real_name}, Username: ${user.name}`).join('\n');
    res.send(response);
  });
};

