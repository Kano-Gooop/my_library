// Lesson - CPS

var show = console.log;

var queue = [];

function addTask(task)
{
  queue.push(task);
}

function run()
{
  while (queue.length != 0)
  {
    // show(queue)
    var t1 = queue.shift();
    t1()
  }
}

function multC(a, b, k)
{
  return k(a * b);
  // addTask(() => k(a * b));
}

function addC(a, b, k)
{
  return k(a + b);
  // addTask(() => k(a + b))
}

function subC(a, b, k)
{
  return k(a - b);
  // addTask(() => k(a - b))
}

// show(multC(2, 3, x => 1 + x));
// multC(2, 3, x => show(1 + x));
// multC(2, 3, x => addC(1, x, show));
// show(multC(2, 3, x => addC(1, x, x => x)))

function fact(n)
{
  if (n == 0)
  {
    return 1;
  }
  else
  {
    return n * fact(n - 1);
  }
}

// show(fact(5))

function factC(n, k)
{
  if (n == 0)
  {
    return addTask(() => k(1));
  }
  else
  {
    return subC(n, 1,
            sub1 => factC(sub1, 
              fact1 => multC(n, fact1, k)));
  }
}

// show(factC(5, x => x))
// factC(5, show)

// show(factC(5, x => 10 + x));

function fib(n)
{
  if (n == 0)
  {
    return 0;
  }
  else if (n == 1)
  {
    return 1;
  }
  else
  {
    return fib(n - 1) + fib(n - 2);
  }
}

// show(fib(8))

function fibC(n, k)
{
  if (n == 0)
  {
    return k(0);
  }
  else if (n == 1)
  {
    return k(1);
  }
  else
  {
    return subC(n, 1, 
            sub1 => fibC(sub1, 
              fib1 => subC(n, 2, 
                sub2 => fibC(sub2, 
                  fib2 => addC(fib1, fib2, k)))))
  }
}

show("------------")

fibC(15, x => show("fib(15) =", x))
fibC(8, x => show("fib(8) =", x));
fibC(10, x => show("fib(10) =", x))


factC(5, x => show("fact(5) =", x))
factC(10, x => show("fact(10) =", x))
multC(2, 3, x => addC(1, x, show));

run()