module.exports = (robot) => {
  robot.listenerMiddleware((ctx, next, done) => {
    const { name: userName } = ctx.response.message.user;
    const user = robot.brain.userForName(userName);

    if ((/^instructor\./).test(ctx.listener.options.id) && !robot.auth.hasRole(user, 'instructor')) {
      robot.logger.warn(`${user.real_name} tried to run an instructor command without authorization.`);
      ctx.response.reply(`I can't let you do that, Dave.`);
      done();
    }

    next();
  });
};
