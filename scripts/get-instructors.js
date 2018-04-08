module.exports = (robot) => {
  const instructors = process.env.HUBOT_URBOT_INSTRUCTORS.split(',');

  if (robot.adapterName !== 'slack') return;

  async function filterUsers(fn) {
    const { members: users } = await robot.adapter.client.web.users.list();
    return users.filter(fn);
  }

  robot.hear(/@urbot instructors/i, async (res) => {
    const users = await filterUsers((usr) => instructors.includes(usr.name));
    res.send(users.map((user) => {
      return `Name: ${user.real_name}, Username: ${user.name}`;
    }).join('\n'));
  });
};

