import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { Submission, PublicLink, VerificationType } from "../types";

/**
 * Create a new submission document. Returns the generated document ID.
 */
export async function createSubmission(data: {
  email: string;
  idPhotoUrl: string;
  verificationType: VerificationType;
  evidenceUrl: string;
}): Promise<string> {
  const colRef = collection(db, "submissions");
  const docRef = doc(colRef);

  const submission: Submission = {
    ...data,
    status: "pending",
    results: [],
    overallClear: false,
    linkId: null,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  await setDoc(docRef, submission);
  return docRef.id;
}

/**
 * Fetch a public verification link by its short ID.
 * Returns null if not found.
 */
export async function getPublicLink(
  linkId: string,
): Promise<PublicLink | null> {
  const docRef = doc(db, "links", linkId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as PublicLink;
}
