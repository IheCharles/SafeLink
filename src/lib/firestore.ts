import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { Submission, VerificationType } from "../types";

/**
 * Create a new submission document with a specific ID. Returns the document ID.
 */
export async function createSubmission(
  id: string,
  data: {
    email: string;
    photoUrl: string;
    verificationType: VerificationType;
    evidenceUrl: string;
  },
): Promise<string> {
  const docRef = doc(db, "submissions", id);

  const submission: Submission = {
    ...data,
    status: "pending",
    results: [],
    overallClear: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  await setDoc(docRef, submission);
  return id;
}

/**
 * Fetch a submission by its document ID.
 * Returns null if not found.
 */
export async function getSubmission(
  submissionId: string,
): Promise<Submission | null> {
  const docRef = doc(db, "submissions", submissionId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Submission;
}
