import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

/**
 * Upload a file to Firebase Storage and return its download URL.
 * Files for a submission are stored under submissions/{submissionId}/
 */
export async function uploadFile(
  submissionId: string,
  folder: "profile-photo" | "id-photo" | "evidence",
  file: File,
): Promise<string> {
  const ext = file.name.split(".").pop() ?? "bin";
  const storageRef = ref(
    storage,
    `submissions/${submissionId}/${folder}.${ext}`,
  );
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}
