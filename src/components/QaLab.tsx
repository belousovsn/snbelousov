import { useCallback, useEffect, useRef, useState } from "react";
import SectionHead from "./SectionHead";
import { useLang } from "../i18n/LanguageContext";
import {
  checkHealth,
  getGroups,
  getLatest,
  startRun,
  streamUrl,
  reportUrl,
  formatTitle,
  groupByCategory,
  type TestGroup,
  type TestResult,
  type RunSummary,
  type RunStatus,
  type Run,
} from "../lib/qaRunner";

type Phase = "idle" | "checking" | "offline" | "starting" | "running" | "done";

export default function QaLab() {
  const { c } = useLang();
  const q = c.ui.qa;

  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [groups, setGroups] = useState<TestGroup[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [latest, setLatest] = useState<Run | null>(null);
  const [message, setMessage] = useState<string>("");

  const [logs, setLogs] = useState<string[]>([]);
  const [tests, setTests] = useState<TestResult[]>([]);
  const [summary, setSummary] = useState<RunSummary | null>(null);
  const [finalStatus, setFinalStatus] = useState<RunStatus | null>(null);
  const [report, setReport] = useState<string | null>(null);

  const esRef = useRef<EventSource | null>(null);
  const modalBodyRef = useRef<HTMLDivElement | null>(null);
  const logPaneRef = useRef<HTMLDivElement | null>(null);

  const closeStream = useCallback(() => {
    esRef.current?.close();
    esRef.current = null;
  }, []);

  // Probe the runner when the modal opens.
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setPhase("checking");
    setMessage("");
    (async () => {
      const online = await checkHealth();
      if (cancelled) return;
      if (!online) {
        setPhase("offline");
        return;
      }
      try {
        const [g, l] = await Promise.all([getGroups(), getLatest()]);
        if (cancelled) return;
        setGroups(g);
        setSelected((prev) => prev || g[0]?.id || "");
        setLatest(l);
        setPhase("idle");
      } catch {
        if (!cancelled) setPhase("offline");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open]);

  // Clean up the stream when the modal closes or the component unmounts.
  useEffect(() => {
    if (!open) closeStream();
    return closeStream;
  }, [open, closeStream]);

  // Keep the log pane pinned to its newest line (scroll stays inside the pane).
  useEffect(() => {
    const el = logPaneRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [logs]);

  // Auto-scroll the modal body as test chips stream in, so the latest is in view.
  useEffect(() => {
    const el = modalBodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [tests]);

  // Lock background page scroll while the modal is open (so scrolling the modal
  // never moves the site underneath), and allow Escape to close it.
  useEffect(() => {
    if (!open) return;
    const { body, documentElement } = document;
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !esRef.current) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const attach = useCallback(
    (runId: string) => {
      closeStream();
      setPhase("running");
      const es = new EventSource(streamUrl(runId));
      esRef.current = es;

      es.addEventListener("log", (e) => {
        const { line } = JSON.parse((e as MessageEvent).data);
        setLogs((prev) => [...prev, line]);
      });
      es.addEventListener("test", (e) => {
        const t = JSON.parse((e as MessageEvent).data) as TestResult;
        setTests((prev) => [...prev, t]);
      });
      es.addEventListener("done", (e) => {
        const d = JSON.parse((e as MessageEvent).data) as {
          status: RunStatus;
          summary: RunSummary | null;
          reportUrl: string | null;
        };
        setSummary(d.summary);
        setFinalStatus(d.status);
        setReport(d.reportUrl);
        setPhase("done");
        closeStream();
        getLatest().then(setLatest).catch(() => {});
      });
      es.onerror = () => {
        // The server closes the stream after 'done'; only surface an error if
        // we were still mid-run.
        setPhase((p) => {
          if (p === "running") {
            setMessage(q.msgLost);
            closeStream();
            return "done";
          }
          return p;
        });
      };
    },
    [closeStream, q.msgLost],
  );

  const run = useCallback(async () => {
    if (!selected) return;
    setLogs([]);
    setTests([]);
    setSummary(null);
    setFinalStatus(null);
    setReport(null);
    setMessage("");
    setPhase("starting");

    const result = await startRun(selected);
    if (result.ok) {
      attach(result.runId);
      return;
    }
    if (result.status === 409 && result.activeRunId) {
      setMessage(q.msgInProgress);
      attach(result.activeRunId);
      return;
    }
    if (result.status === 0) {
      setPhase("offline");
      return;
    }
    setMessage(result.error);
    setPhase("idle");
  }, [selected, attach, q.msgInProgress]);

  const busy = phase === "starting" || phase === "running";
  const counts = tests.reduce(
    (acc, t) => {
      acc[t.status] = (acc[t.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <section id="qa-lab" className="section container">
      <SectionHead index="02" title={c.ui.sections.qa} aside={c.ui.sections.qaAside} />

      <div className="qa-intro">
        <p>
          {q.introBefore}
          <a
            className="link"
            href="https://github.com/belousovsn/translator-qa"
            target="_blank"
            rel="noreferrer"
          >
            {q.introLink}
          </a>
          {q.introAfter}
        </p>
        <div className="qa-flow" aria-hidden="true">
          <span className="flow__node">browser</span>
          <span className="flow__arrow">→</span>
          <span className="flow__node">runner</span>
          <span className="flow__arrow">→</span>
          <span className="flow__node">playwright</span>
          <span className="flow__arrow">→</span>
          <span className="flow__node">test.memdecks.com</span>
        </div>
        <button className="btn btn-primary" onClick={() => setOpen(true)}>
          {q.openButton}
        </button>
      </div>

      {open && (
        <div
          className="qa-modal__overlay"
          role="dialog"
          aria-modal="true"
          aria-label={c.ui.sections.qa}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !busy) setOpen(false);
          }}
        >
          <div className="qa-modal">
            <header className="qa-modal__head">
              <div>
                <p className="kicker">{q.modalKicker}</p>
                <h3 className="qa-modal__title">{q.modalTitle}</h3>
              </div>
              <button
                className="qa-modal__close"
                aria-label={q.close}
                onClick={() => setOpen(false)}
                disabled={busy}
              >
                {busy ? q.closeBusy : q.close}
              </button>
            </header>

            {phase === "checking" && <p className="qa-note">{q.connecting}</p>}

            {phase === "offline" && (
              <div className="qa-note qa-note--warn">
                <p>{q.offline}</p>
              </div>
            )}

            {phase !== "checking" && phase !== "offline" && (
              <div className="qa-modal__body" ref={modalBodyRef}>
                {/* Controls */}
                <div className="qa-controls">
                  <fieldset className="qa-groups" disabled={busy}>
                    <legend>{q.chooseGroup}</legend>
                    {groupByCategory(groups).map((cat) => (
                      <div key={cat.id} className="qa-category">
                        {cat.label && (
                          <p className="qa-category__label">{cat.label}</p>
                        )}
                        {cat.groups.map((g) => (
                          <label
                            key={g.id}
                            className={`qa-group${selected === g.id ? " is-selected" : ""}`}
                          >
                            <input
                              type="radio"
                              name="qa-group"
                              value={g.id}
                              checked={selected === g.id}
                              onChange={() => setSelected(g.id)}
                            />
                            <span className="qa-group__main">
                              <span className="qa-group__label">
                                {g.label}
                                {typeof g.count === "number" && (
                                  <span className="qa-group__count">
                                    {q.testsCount(g.count)}
                                  </span>
                                )}
                                {g.auth && (
                                  <span className="qa-group__badge">{q.signsIn}</span>
                                )}
                              </span>
                              <span className="qa-group__desc">{g.description}</span>
                              {g.kinds.length > 0 && (
                                <span className="qa-group__kinds">
                                  {g.kinds.map((k) => (
                                    <span key={k} className="qa-kind">
                                      {k}
                                    </span>
                                  ))}
                                </span>
                              )}
                            </span>
                          </label>
                        ))}
                      </div>
                    ))}
                  </fieldset>

                  <div className="qa-actions">
                    <button
                      className="btn btn-primary"
                      onClick={run}
                      disabled={busy || !selected}
                    >
                      {phase === "starting"
                        ? q.runStarting
                        : phase === "running"
                          ? q.runRunning
                          : q.runIdle}
                    </button>
                    {latest?.finishedAt && phase === "idle" && (
                      <span className="qa-latest">
                        {q.lastRun} {q.status[latest.status]} ·{" "}
                        {latest.summary
                          ? `${latest.summary.expected} ${q.passed}${
                              latest.summary.unexpected
                                ? `, ${latest.summary.unexpected} ${q.failed}`
                                : ""
                            }`
                          : "—"}
                      </span>
                    )}
                  </div>

                  {message && <p className="qa-message">{message}</p>}
                </div>

                {/* Results */}
                <div className="qa-results">
                  {(summary || finalStatus) && (
                    <div
                      className={`qa-summary qa-summary--${
                        finalStatus === "passed" ? "ok" : "bad"
                      }`}
                    >
                      <span className="qa-summary__status">
                        {finalStatus ? q.status[finalStatus] : ""}
                      </span>
                      {summary && (
                        <span className="qa-summary__nums">
                          <b>{summary.expected}</b> {q.passed}
                          {summary.unexpected > 0 && (
                            <>
                              {" · "}
                              <b className="bad">{summary.unexpected}</b> {q.failed}
                            </>
                          )}
                          {summary.skipped > 0 && (
                            <> · {summary.skipped} {q.skipped}</>
                          )}
                          {summary.flaky > 0 && <> · {summary.flaky} {q.flaky}</>}
                          {" · "}
                          {(summary.durationMs / 1000).toFixed(1)}
                          {q.secondsSuffix}
                        </span>
                      )}
                      {report && (
                        <a
                          className="link qa-summary__report"
                          href={reportUrl(report)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {q.openReport}
                        </a>
                      )}
                    </div>
                  )}

                  {tests.length > 0 && (
                    <ul className="qa-tests">
                      {tests.map((t) => {
                        const { name, context } = formatTitle(t.title);
                        return (
                          <li key={t.index} className={`qa-test qa-test--${t.status}`}>
                            <span className="qa-test__dot" aria-hidden="true" />
                            <span className="qa-test__body">
                              <span className="qa-test__name">{name}</span>
                              {context && (
                                <span className="qa-test__context">{context}</span>
                              )}
                            </span>
                            {t.duration && (
                              <span className="qa-test__dur">{t.duration}</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {logs.length > 0 && (
                    <details className="qa-log" open={tests.length === 0}>
                      <summary>
                        {q.rawOutput}{" "}
                        {busy && <span className="qa-log__live">● {q.live}</span>}
                        {tests.length > 0 && !busy && (
                          <span className="qa-log__muted">
                            {" "}
                            ({counts.passed ?? 0} ✓
                            {counts.failed ? `, ${counts.failed} ✘` : ""})
                          </span>
                        )}
                      </summary>
                      <div className="qa-log__pane" ref={logPaneRef}>
                        {logs.map((line, i) => (
                          <div key={i} className="qa-log__line">
                            {line}
                          </div>
                        ))}
                      </div>
                    </details>
                  )}

                  {report && phase === "done" && (
                    <div className="qa-report">
                      <p className="qa-report__hint">{q.visualReport}</p>
                      <iframe
                        className="qa-report__frame"
                        src={reportUrl(report)}
                        title="Playwright report"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {phase === "idle" && logs.length === 0 && !summary && (
                    <p className="qa-note qa-note--idle">{q.idleNote}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
