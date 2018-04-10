const CountdownTimer = require('../lib/countdown-timer');

module.exports = (robot) => {
  if (robot.adapterName !== 'slack') {
    robot.logger.warn('Not using slack adapter. Not initializing instructor commands.');
    return;
  }

  function getInstructors() {
    return robot.auth.usersWithRole('instructor')
  }

  robot.hear(/urbot instructors/i, { id: 'instructor.list' }, async (res) => {
    const users = getInstructors();
    const response = users.map((user) => `Name: ${user.real_name}, Username: ${user.name}`).join('\n');
    res.send(response);
  });

  robot.hear(/urbot timer (\d+) (.+)/, { id: 'instructor.timer' }, (res) => {
    const timer = new CountdownTimer(res.match[1], { units: res.match[2] });
    timer.on('start', (duration) => res.reply(`Started timer for ${res.match[1]} ${res.match[2]} (${duration.as('milliseconds')}ms)`));
    timer.on('done', () => res.reply('Timer done!'));
    timer.start();
  });
};

