const yargs = require('yargs');
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

  robot.respond(/activity (\d+)/, { id: 'instructor.activity' }, (res) => {
    const args = yargs
      .options({
        u: {
          alias: 'units',
          default: 'minutes',
          type: 'string',
        },
        r: {
          alias: 'resolution',
          default: 1000,
          type: 'number',
        },
      })
      .parse(res.message.text);
    const { units, resolution } = args;
    const timer = new CountdownTimer(parseInt(res.match[1], 10), { units, resolution });
    timer.on('start', (duration) => res.reply(`Started timer for ${res.match[1]} ${units} (${duration.as('milliseconds')}ms)`));
    timer.on('done', () => res.reply('Timer done!'));
    timer.start();
  });
};

