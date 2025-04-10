import { Effect, Schedule } from "effect";

let count = 0;
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

const program = Effect.repeat(action, policy);

// Run the program and log the number of repetitions
Effect.runPromise(program).then((n) => console.log(`repetitions: ${n}`));
