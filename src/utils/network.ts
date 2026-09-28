import { wait } from "./timer";

export async function simulateNetwork() {
  if (!navigator.onLine) {
    throw new Error("You are offline");
  }
  await wait(400);
}
