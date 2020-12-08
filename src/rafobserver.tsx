type Observer<T> = [() => T, (value: T, time: number) => void];

const observers = new Set<Observer<any>>();

let af;

function rafloop(time: number) {
  // fifoqueue
  const fifoqueue = [];

  // This line ensure no new observers are added during the loop.
  // It also helps microbundle shrink the output
  const obs = Array.from(observers);

  // Measure first
  for (const [measure] of obs) {
    fifoqueue.push(measure());
  }
  // Run callbacks from measure
  for (const [, cb] of obs) {
    cb(fifoqueue.shift(), time);
  }

  af = requestAnimationFrame(rafloop);
}

export function observe<T>(measure: Observer<T>[0], cb: Observer<T>[1]) {
  const observer: Observer<T> = [measure, cb];
  // If we are adding the first observer
  observers.add(observer);
  if (observers.size === 1) {
    // Start the requestAnimationFrame measure callback loop
    af = requestAnimationFrame(rafloop);
  }
  return () => {
    observers.delete(observer);
    if (!observers.size) {
      cancelAnimationFrame(af);
    }
  };
}
