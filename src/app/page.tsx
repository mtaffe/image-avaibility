"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

type FormData = {
  file: File | null;
  percent: number;
};

const UploadForm = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: { file: null, percent: 0 }, // Percentual padrão
  });

  const onSubmit = async (data: FormData) => {
    if (!data.file) {
      setMessage("No file selected.");
      return;
    }

    setLoading(true);
    setMessage("");
    setEditedImage(null);

    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("percent", data.percent.toString());

    try {
      const response = await axios.post("http://localhost:8000/api/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
      });

      const imageUrl = URL.createObjectURL(response.data);
      setEditedImage(imageUrl);
      setMessage("Upload successful!");
    } catch (error) {
      setMessage("Upload failed.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);

      // Registrando o arquivo corretamente
      setValue("file", file, { shouldValidate: true });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4 text-black">Upload File</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center gap-4">
          <div>
            <label className="block font-medium mb-2 text-black">Select Image:</label>
            <div
              className="border-2 border-dashed border-gray-300 w-64 h-64 flex items-center justify-center cursor-pointer rounded-md bg-gray-100"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              {preview ? (
                <img src={preview} alt="Selected" className="w-full h-full object-cover rounded-md" />
              ) : (
                <span className="text-black-500">Click to select image</span>
              )}
            </div>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            {errors.file && <p className="text-red-500">{String(errors.file.message)}</p>}
          </div>
          {editedImage && (
            <div className="flex flex-col items-center">
              <p className="font-medium text-black">Edited Image:</p>
              <img src={editedImage} alt="Edited" className="w-64 h-64 object-cover rounded-md shadow" />
            </div>
          )}
        </div>

        <div>
          <label className="block font-medium text-black">Percentage:</label>
          <input
            type="number"
            {...register("percent", {
              required: "Percentage is required",
              min: { value: 1, message: "Minimum value is 1%" },
              max: { value: 100, message: "Maximum value is 100%" },
            })}
            className="border p-2 w-full color-black rounded-md text-black"
          />
          {errors.percent && <p className="text-red-500">{String(errors.percent.message)}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default UploadForm;
