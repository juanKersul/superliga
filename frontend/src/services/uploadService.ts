import axios from "axios";

const BASE_URL = "http://localhost:8000";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const uploadCsv = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await apiClient.post("/Csv", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error uploading CSV:", error);
    throw error;
  }
};
