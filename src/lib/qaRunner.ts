/**
 * Client for the translator-qa live test runner.
 *
 * The runner base URL is configurable at build time via `VITE_RUNNER_URL`
 * (see `.env` / `.env.example`). Defaults to localhost for development.
 */

export const RUNNER_URL = (
  import.meta.env.VITE_RUNNER_URL ?? "http://localhost:8787"
).replace(/\/$/, "");

export interface TestGroup {
  id: string;
  label: string;
  description: string;
  auth: boolean;
  /** Test-type labels: e2e, api, integration, smoke, regression, component. */
  kinds: string[];
  /** Number of tests in the group (computed by the runner via --list). */
  count: number | null;
}

export type RunStatus =
  | "running"
  | "passed"
  | "failed"
  | "timedout"
  | "error";

export interface RunSummary {
  expected: number;
  unexpected: number;
  skipped: number;
  flaky: number;
  durationMs: number;
}

export type TestPhase = "passed" | "failed" | "skipped" | "flaky";

export interface TestResult {
  index: number;
  title: string;
  status: TestPhase;
  duration: string | null;
}

export interface Run {
  id: string;
  group: string;
  status: RunStatus;
  startedAt: string;
  finishedAt: string | null;
  summary: RunSummary | null;
  tests: TestResult[];
  reportUrl: string | null;
  exitCode: number | null;
}

export type StartResult =
  | { ok: true; runId: string }
  | { ok: false; status: number; error: string; activeRunId?: string };

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${RUNNER_URL}${path}`);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return (await res.json()) as T;
}

export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${RUNNER_URL}/api/health`, {
      signal: AbortSignal.timeout(5000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function getGroups(): Promise<TestGroup[]> {
  const data = await getJson<{ groups: TestGroup[] }>("/api/groups");
  return data.groups;
}

export async function getLatest(): Promise<Run | null> {
  const data = await getJson<{ run: Run | null }>("/api/latest");
  return data.run;
}

export async function getRun(runId: string): Promise<Run> {
  const data = await getJson<{ run: Run }>(`/api/run/${runId}`);
  return data.run;
}

export async function startRun(group: string): Promise<StartResult> {
  let res: Response;
  try {
    res = await fetch(`${RUNNER_URL}/api/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ group }),
    });
  } catch {
    return { ok: false, status: 0, error: "The live runner is not reachable." };
  }
  if (res.status === 202) {
    const { runId } = (await res.json()) as { runId: string };
    return { ok: true, runId };
  }
  const body = (await res.json().catch(() => ({}))) as {
    error?: string;
    activeRunId?: string;
  };
  return {
    ok: false,
    status: res.status,
    error: body.error ?? `Request failed (${res.status}).`,
    activeRunId: body.activeRunId,
  };
}

export function streamUrl(runId: string): string {
  return `${RUNNER_URL}/api/run/${runId}/stream`;
}

export function reportUrl(path: string): string {
  return `${RUNNER_URL}${path}`;
}

/** Turn `[chromium] › tests\unauth\file.spec.ts:1:1 › Suite › name` into parts. */
export function formatTitle(raw: string): { name: string; context: string } {
  const cleaned = raw.replace(/^\[[^\]]+\]\s*›\s*/, "");
  const parts = cleaned.split(" › ");
  const name = parts.pop() ?? cleaned;
  return { name, context: parts.join(" › ") };
}
