import { Effect, Logger, LogLevel, Config } from "effect";

const task1 = Effect.gen(function* () {
  yield* Effect.sleep("2 seconds");
  yield* Effect.logDebug("task1 done"); // Log a debug message
}).pipe(Logger.withMinimumLogLevel(LogLevel.Debug)); // Enable DEBUG level

const task2 = Effect.gen(function* () {
  yield* Effect.sleep("1 second");
  yield* Effect.logDebug("task2 done"); // This message won't be logged
});

const _program = Effect.gen(function* () {
  yield* Effect.log("start");
  yield* task1;
  yield* task2;
  yield* Effect.log("done");
}).pipe(Effect.withLogSpan("myspan"));

// Effect.runFork(program);
//Effect.runFork(program.pipe(Logger.withMinimumLogLevel(LogLevel.None)));

const task3 = Effect.gen(function* () {
  const host = yield* Config.string("PATH"); // Read as a string
  console.log(`Environment variable PATH: ${host}`);
});

// Effect.runPromise(task3);

Effect.runFork(
  task3.pipe(
    Effect.catchAll((error) =>
      Effect.sync(() => {
        console.error("Error occurred:", error);
        return null;
      })
    )
  )
);

console.log("END");
