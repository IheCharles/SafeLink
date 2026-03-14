import type { TestResult } from "../../types";

interface Props {
  result: TestResult;
  clear: boolean;
}

export default function ResultCard({ result, clear }: Props) {
  const isNegative = result.result === "negative";

  return (
    <div
      className={`flex items-center justify-between rounded-lg px-4 py-3 ${
        clear
          ? "bg-green-50 border border-green-200"
          : "bg-red-50 border border-red-200"
      }`}
    >
      <span className="font-medium text-gray-900">{result.testName}</span>
      <span
        className={`text-sm font-bold uppercase ${
          isNegative ? "text-green-700" : "text-red-700"
        }`}
      >
        {result.result}
      </span>
    </div>
  );
}
