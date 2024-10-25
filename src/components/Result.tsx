import React from "react";
import { ResultType } from '../type/types';

interface ResultProps {
  result: ResultType;
}
 
const Result: React.FC<ResultProps> = ({ result }) => {
  return (
    <div
      className={`text-white font-bold rounded-md text-center mt-4 py-2 ${
        result.type === "player" ? "bg-green-600" : "bg-red-700"
      }`}
    >
      <h2 className="text-2xl ">{result.message}</h2>
    </div>
  );
}

export default Result;