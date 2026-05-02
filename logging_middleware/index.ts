import { ACCESS_TOKEN } from '../config';

type Stack = "backend" | "frontend";
type Level = "debug" | "info" | "warn" | "error" | "fatal";
type BackendPackage = "cache" | "controller" | "cron_job" | "db" | "domain" | "handler" | "repository" | "route" | "service";
type FrontendPackage = "api" | "component" | "hook" | "page" | "state" | "style";
type SharedPackage = "auth" | "config" | "middleware" | "utils";
type Package = BackendPackage | FrontendPackage | SharedPackage;

const isBrowser = typeof window !== "undefined";
const LOG_API_URL = isBrowser 
  ? "/evaluation-service/logs" 
  : "http://20.207.122.201/evaluation-service/logs";

export async function Log(stack: Stack, level: Level, pkg: Package, message: string): Promise<void> {
  try {
    const response = await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message
      })
    });

    if (!response.ok) {
      return; 
    }
  } catch (error) {
  }
}
