export type VerificationType = "lab_report" | "video";
export type TestResultValue = "negative" | "positive";
export type SubmissionStatus = "pending" | "approved" | "rejected";
export type ExpiryDays = 30 | 60 | 90;

export interface TestResult {
  testName: string;
  result: TestResultValue;
}

/** Document in the `submissions` collection — written by the client, reviewed by admin. */
export interface Submission {
  id?: string;
  email: string;
  idPhotoUrl: string;
  verificationType: VerificationType;
  evidenceUrl: string;
  status: SubmissionStatus;
  /** Filled by admin during review */
  results: TestResult[];
  /** Filled by admin — true means all tests negative */
  overallClear: boolean;
  expiryDays: ExpiryDays;
  /** Populated by Cloud Function on approval */
  linkId: string | null;
  createdAt: number;
  updatedAt: number;
}

/** Document in the `links` collection — publicly readable, powers /v/:linkId */
export interface PublicLink {
  id: string;
  submissionId: string;
  idPhotoUrl: string;
  verificationType: VerificationType;
  results: TestResult[];
  overallClear: boolean;
  expiresAt: number;
  active: boolean;
  createdAt: number;
}

/** Shape of the multi-step form state before submission */
export interface SubmissionFormData {
  email: string;
  idPhoto: File | null;
  verificationType: VerificationType;
  evidence: File | null;
  expiryDays: ExpiryDays;
}
