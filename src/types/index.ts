export type VerificationType = "lab_report" | "video";
export type TestResultValue = "negative" | "positive";
export type SubmissionStatus = "pending" | "approved" | "rejected";

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
  createdAt: number;
  updatedAt: number;
}

/** Shape of the multi-step form state before submission */
export interface SubmissionFormData {
  email: string;
  idPhoto: File | null;
  verificationType: VerificationType;
  evidence: File | null;
}
