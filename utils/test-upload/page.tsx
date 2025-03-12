"use client";

import { useState } from "react";

export default function FileUploadTest() {
  const [fileContent, setFileContent] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      console.log("No file selected");
      return;
    }
    console.log("File selected:", file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      console.log("File content:", text);
      if (typeof text === "string") {
        setFileContent(text);
      }
    };
    reader.onerror = (event) => {
      console.error("Error reading file:", event);
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <label className="block text-gray-700 mb-2">
        Upload Resume File (TXT):
      </label>
     

<input
  type="file"
  accept=".txt"
  onClick={() => console.log("Input clicked")}
  onChange={handleFileUpload}
  className="border p-2 rounded"
/>

      <div className="mt-4 p-2 border rounded bg-gray-100 text-gray-800">
        <pre>{fileContent || "File content will appear here..."}</pre>
      </div>
    </div>
  );
}
