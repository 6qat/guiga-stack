import { Cron, DateTime, Effect, Schedule } from "effect";

// Build a cron that triggers at 4:00 AM
// on the 8th to the 14th of each month
const cron = Cron.make({
  seconds: [0], // Trigger at the start of a minute
  minutes: [3], // Trigger at the start of an hour
  hours: [14], // Trigger at 4:00 AM
  days: [8, 9, 10, 11, 12, 13, 14], // Specific days of the month
  months: [], // No restrictions on the month
  weekdays: [], // No restrictions on the weekday
  tz: DateTime.zoneUnsafeMakeNamed("America/Sao_Paulo"), // Optional time zone
});

// Convert the cron object to a Schedule
const schedule = Schedule.cron(cron);

const task = Effect.sync(() => {
  console.log(`Task executed at: ${new Date().toISOString()}`);
  // Your business logic here
  return "Task completed successfully";
});

// Schedule the task to run according to the cron schedule
const scheduledTask = Effect.schedule(task, schedule);

// Run the scheduled task
Effect.runFork(scheduledTask);
