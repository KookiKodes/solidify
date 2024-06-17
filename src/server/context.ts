"use server";
import { getRequestEvent } from "solid-js/web";

export function getHydrogenContext() {
  const event = getRequestEvent();
  if (!event) {
    throw new Error("No request event");
  }
  return event.locals.hydrogen;
}

export function getLocale() {
  const event = getRequestEvent();
  if (!event) {
    throw new Error("No request event");
  }
  return event.locals.locale;
}

export function getEnv() {
  const event = getRequestEvent();
  if (!event) {
    throw new Error("No request event");
  }
  return event.locals.env;
}
