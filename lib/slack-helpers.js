class SlackHelpers {
  constructor(robot) {
    this.robot = robot;
    this.client = this.robot.adapter.client;
  }

  async filterUsers(cb) {
    const { members: users } = await this.client.web.users.list();
    return users.filter(cb);
  }

  async getUserId(name) {
    const user = await this.filterUsers((usr) => usr.name === name);
    return user.id;
  }

  hearMention(pattern) {
    return new RegExp(`${this.robot.name} ${pattern}`);
  }
}

module.exports = SlackHelpers;
