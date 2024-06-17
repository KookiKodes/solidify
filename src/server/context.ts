"use server";
import { getRequestEvent } from "solid-js/web";

export default function getServerContext() {
  const event = getRequestEvent();
  if (!event) {
    throw new Error("No request event");
  }
  return event.locals.context;
}
