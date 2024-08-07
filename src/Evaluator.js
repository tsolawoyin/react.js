function removeSpace(expr) {
  let newExpr = "";

  for (let e of expr) {
    if (e != " ") newExpr += e;
  }

  return newExpr;
}

function identifyNext(expr) {
  let numberReg = /^[-]?\d+[.]?\d*/; // this should return for the number
  let parensReg = /^[-]?\d*\(/; // the parens may have a negative in front...
  if (parensReg.test(expr)) {
    // test for parens
    return "p";
  }

  if (numberReg.test(expr)) {
    // test for numbers
    return "n";
  }
}

function parseExpr(expr) {
  if (!expr) return null; // return null just in case we are done...

  let curr = identifyNext(expr);

  if (curr == "n") {
    let number = parseNumber(expr);

    return {
      a: number.first,
      b: parseExpr(number.rest), //
      o: number.operator,
      t: "n",
    };
  } else if (curr == "p") {
    let paren = parseParen(expr);

    return {
      s: paren.sign,
      a: parseExpr(paren.first), // <= the inner of the parens is one expression on its own
      b: parseExpr(paren.rest), // <= and the rest is another expression
      o: paren.operator, // <= the operator after it...
      t: "p",
    };
  }
}

function parseNumber(expr) {
  // returning
  let match = extract(expr, "n");

  return {
    first: Number(match[1]),
    rest: match[3] ? match[3] : null,
    operator: match[2] ? match[2] : null,
  };
}

function extract(expr, t) {
  if (t == "n") {
    let regex = /^([-]?\d+[.]?\d*)([+-/*%]?)(.*)/; // support modulo op.
    return expr.match(regex);
  } else {
    let regex = /^([-]?\d*)\((.*)/; // hmm.. you don't even know anything
    return expr.match(regex);
  }
}

function parseParen(expr) {
  // we don't have to use regex here... let's just use a while loop to solve this bullshit problem.
  let info = extract(expr, "p");
  // sign may be
  let sign = null;

  let op = null;

  // assigning proper sign in case of multiplication
  if (!info[1]) {
    sign = 1;
  } else if (info[1] == "-") {
    sign = -1;
  } else {
    sign = Number(info[1]); // -2, -4, 2, etc...
  }
  // sign assigned so let's continue
  let { first, rest } = parseStructure(info[2]);
  // get operand here.. shey u get?

  if (rest) {
    op = rest[0]; // well sha...
    rest = rest.slice(1); // removing the op...
  } else {
    op = null; // there is no operator
  }

  return {
    sign,
    first, // return the first
    operator: op, // return operator
    rest, // return rest
  };
}

function parseStructure(expr) {
  // return { first, rest, op }
  let first = "";

  while (expr[0] != ")") {
    // sorry, no vex joh
    // keep choping off until we get to the end
    if (expr[0] != "(") {
      first += expr[0];
      expr = expr.slice(1); // return the rest
    } else {
      first += expr[0]; // making sense... // just add the string to first
      let rest = parseStructure(expr.slice(1));

      first += rest.first + ")"; // adding close paren since it has been skipped in the recursion... omo. this is close...
      expr = rest.rest;
    }
  }

  return {
    first,
    rest: expr.slice(1),
  };
}
// ============================================================

// ============ evaluation functions =========================

function calculate(expr) {
  let a = expr.a,
    b = expr.b,
    o = expr.o,
    operands = [],
    operators = [];
  // this helps calculate * and /;
  while (a) {
    operands.push(a);

    let last = operators.length - 1;

    if (operators[last] != "/" && operators[last] != "*" && operators[last] != "%") {
      operators.push(o);
    } else {
      let lastOpr = operands.length - 1,
        secondToLastOpr = operands.length - 2;
      let res = compute(
        operands[secondToLastOpr],
        operands[lastOpr],
        operators[last]
      );
      // push res into operands with modification
      operands = operands.slice(0, secondToLastOpr);
      operands.push(res);
      operators.pop();
      if (o) operators.push(o);
    }
    a = b?.a;
    o = b?.o;
    b = b?.b;
  }
  // at this point, we only have addition and subtraction left. understood? yupyup...
  while (operands.length > 1) {
    let res = compute(operands[0], operands[1], operators[0]);
    operands = operands.slice(2);
    operators = operators.slice(1);
    operands.unshift(res);
  }

  return operands[0];
}

function compute(a, b, o) {
  if (o == "*") return a * b;
  else if (o == "/") return a / b;
  else if (o == "+") return a + b;
  else if (o == "-") return a - b;
  else if (o == "%") return a % b;
}

function evaluate(expr) {
  let opr = [];
  let op = [];

  while (expr) {
    if (expr.t == "n") {
      opr.push(expr.a);
      if (expr.o) op.push(expr.o);
      expr = expr.b;
    } else if (expr.t == "p") {
      let res = expr.s * evaluate(expr.a);
      opr.push(res);
      if (expr.o) op.push(expr.o);
      expr = expr.b;
    }
  }

  let newMath = new Expression(rebuild(opr, op));

  return calculate(newMath.expr);
}

function rebuild(listA, listB) {
  let str = "";
  for (let [i, j] of listA.entries()) {
    str += j;
    if (listB[i]) str += listB[i];
  }
  return str;
}

export default class Expression {
  constructor (expr) {
    this.expr = parseExpr(removeSpace(expr))
    this.exprString = expr;
  }

  get value() {
    return this.evaluate(this.expr);
  }
}

Expression.prototype.evaluate = function (expr) {
  return evaluate(expr);
};

