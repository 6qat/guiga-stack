import {
  Stream,
  Effect,
  Chunk,
  Option,
  type StreamEmit,
  Random,
  pipe,
  Sink,
} from "effect";

const events = [1, 2, 3, 4];

const _stream1 = Stream.async(
  (emit: StreamEmit.Emit<never, never, number, void>) => {
    for (const n of events) {
      setTimeout(() => {
        if (n === 3) {
          // Terminate the stream
          emit(Effect.fail(Option.none()));
        } else {
          // Add the current item to the stream
          emit(Effect.succeed(Chunk.of(n)));
        }
      }, 100 * n);
    }
  }
);

// Effect.runPromise(Stream.runCollect(_stream1)).then(console.log);

const _stream2 = Stream.repeatEffect(
  Effect.gen(function* () {
    const nextInt = yield* Random.nextInt;
    const number = Math.abs(nextInt % 10);
    console.log(`random number: ${number}`);
    return number;
  })
).pipe(Stream.take(3));

//Effect.runPromise(Stream.runCollect(_stream2)).then(console.log);

const createWebSocketStream = (url: string) => {
  return Stream.async<string, string>(
    (emit: StreamEmit.Emit<never, string, string, void>) => {
      const ws = new WebSocket(url);

      ws.onmessage = (event) => {
        console.log("message");
        emit.single(event.data);
      };

      ws.onerror = (_error) => {
        console.log("Error");
        emit.fail("Error");
      };

      ws.onclose = (e: CloseEvent) => {
        console.log(e.wasClean ? "Clean close" : `Unclean close: ${e.reason}`);
        e.wasClean
          ? emit.end()
          : emit.fail("Error closing websocket connection");
      };

      // Clean up on Stream termination
      return Effect.sync(() => ws.close());
    }
  );
};

// Usage example
const wsStream = createWebSocketStream("ws://example.com/socket");

const program = pipe(
  wsStream,
  Stream.run(
    // eslint-disable-next-line prefer-for-of
    Sink.forEach((message) =>
      Effect.sync(() => console.log("Received:", message))
    )
  )
);

Effect.runPromise(program);
