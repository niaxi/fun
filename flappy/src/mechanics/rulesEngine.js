namespace('flappy.mechanics');


flappy.mechanics.rulesEngine = function() {
  var rules = [];
  var fluentApi = {
    add: add,
    enforce: enforce
  };

  function add(predicate, cb, args, ctx) {
    var ruleDef = {
      predicate: predicate,
      cb: cb,
      args: args,
      ctx: ctx
    };

    rules.push(ruleDef);
    return fluentApi;
  }

  function enforce() {
    var i = 0;
    var l = rules.length;
    var rule;

    for (; i<l; i++) {
      rule = rules[i];
      if (rule.predicate()) {
        rule.cb.apply(rule.ctx, rule.args);
      }
    }
  }


  // exports
  return fluentApi;
};