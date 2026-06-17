type SubmissionRecord<T> = {
  id: string;
  kind: "contact" | "catering" | "order" | "newsletter";
  createdAt: string;
  payload: T;
};

const storageKey = "plaza-mexico-submissions";

export function createSubmissionId(prefix: string) {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export function saveSubmission<T>(
  kind: SubmissionRecord<T>["kind"],
  payload: T,
  prefix: string,
) {
  const record: SubmissionRecord<T> = {
    id: createSubmissionId(prefix),
    kind,
    createdAt: new Date().toISOString(),
    payload,
  };

  const existing = JSON.parse(
    window.localStorage.getItem(storageKey) ?? "[]",
  ) as SubmissionRecord<unknown>[];
  window.localStorage.setItem(storageKey, JSON.stringify([record, ...existing]));

  return record;
}

export function createMailtoLink(
  to: string,
  subject: string,
  lines: Array<[string, string] | string>,
) {
  const body = lines
    .map((line) => (Array.isArray(line) ? `${line[0]}: ${line[1]}` : line))
    .join("\n");

  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
