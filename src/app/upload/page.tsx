"use client";
import { useState } from "react";
import { processPdfFile } from "./actions";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function PDFUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("pdf", file);
      const result = await processPdfFile(formData);

      if (result.success) {
        setMessage({
          type: "success",
          text: result.message || "PDF processed successfully",
        });
        setTimeout(() => {
          e.target.value = "";
          setFileName("");
        }, 3000);
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to process PDF",
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: "An error occurred while processing the PDF",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-md space-y-12">
        <div className="space-y-2">
          <h1 className="text-2xl font-light tracking-tight text-black">
            Upload PDF
          </h1>
          <p className="text-sm text-gray-500 font-light">
            Select a file to process
          </p>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <Label
              htmlFor="pdf-upload"
              className="text-sm font-normal text-black"
            >
              File
            </Label>

            <div className="relative">
              <Input
                id="pdf-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                disabled={isLoading}
                className="hidden"
              />
              <label
                htmlFor="pdf-upload"
                className={`
                  block w-full h-32 border border-gray-300 rounded
                  flex items-center justify-center
                  transition-colors duration-150
                  ${
                    isLoading
                      ? "bg-gray-50 cursor-not-allowed"
                      : "bg-white hover:bg-gray-50 cursor-pointer"
                  }
                `}
              >
                <span className="text-sm text-gray-600 font-light">
                  {fileName || "Choose file"}
                </span>
              </label>
            </div>
          </div>

          {isLoading && (
            <p className="text-sm text-gray-500 font-light">Processing...</p>
          )}

          {message && (
            <Alert
              variant={message.type === "error" ? "destructive" : "default"}
              className={`
                border rounded
                ${
                  message.type === "success"
                    ? "bg-white border-black text-black"
                    : "bg-white border-black text-black"
                }
              `}
            >
              <AlertDescription className="text-sm font-light">
                {message.text}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
