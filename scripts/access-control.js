module.exports = (robot) => {
  function isInstructor(user) {
    return robot.auth.isAdmin(user) || robot.auth.hasRole(user, 'instructor');
  }

  function isInstructionalTeam(user) {
    return isInstructor(user) || robot.auth.hasRole(user, 'assistant');
  }

  robot.listenerMiddleware((ctx, next, done) => {
    const { name: userName } = ctx.response.message.user;
    const user = robot.brain.userForName(userName);

    if ((/^instructor\./).test(ctx.listener.options.id) && !isInstructor(user)) {
      robot.logger.info(`${user.real_name} tried to run an instructor command without authorization.`);
      ctx.response.reply(`I can't let you do that, Dave.`);
      done();
    }

    if ((/^assistant\./).test(ctx.listener.options.id) && !isInstructionalTeam(user)) {
      robot.logger.info(`${user.real_name} tried to run an assistant command without authorization.`);
      ctx.response.reply(`Where'd you get this awful fake ID? I'm not buying it.`);
      done();
    }

    next(done);
  });
};
