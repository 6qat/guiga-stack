import { Effect, Schedule } from "effect";

// https://effect.website/docs/scheduling/repetition/

let count = 0;

// Handling Failures in Repetition
const action = Effect.async<string, string>((resume) => {
  if (count > 1) {
    console.log("failure");
    resume(Effect.fail("Uh oh!"));
  } else {
    count++;
    console.log("success");
    resume(Effect.succeed("yay!"));
  }
});

const policy = Schedule.addDelay(Schedule.recurs(2), () => "2000 millis");

const _program1 = Effect.repeat(action, policy);
// Effect.runPromise(
//   _program1.pipe(Effect.catchAll((error) => Effect.logError(error)))
// ).then((n) => console.log(`repetitions: ${n}`));

// Skip the first run
const _program2 = Effect.schedule(action, policy);
// Effect.runPromise(_program2).then((n) => console.log(`repetitions: ${n}`));

// Provide a handler to run when failure occurs after the retries
const _program3 = Effect.repeatOrElse(action, policy, () =>
  Effect.sync(() => {
    console.log("orElse");
    return count - 1;
  })
);
// Effect.runPromise(_program3).then((n) => console.log(`repetitions: ${n}`));

// Define an effect that simulates varying outcomes on each invocation
const _action = Effect.sync(() => {
  console.log(`Action called ${++count} time(s)`);
  return count;
});
// Repeat the action until the count reaches 3
const _program4 = Effect.repeat(_action, { until: (n) => n === 3 });
Effect.runPromise(_program4).then((n) => console.log(`repetitions: ${n}`));
