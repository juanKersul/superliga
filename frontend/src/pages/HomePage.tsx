import Form from "../components/Form"
import Logo from "../components/Logo"
import { uploadCsv } from "../services/uploadService"
import { useData } from "../context/Datacontext";

const Homepage = () => {
  const { updateTables } = useData();
  const uploadAndUpload = async (file: File) => {
    await uploadCsv(file);
    await updateTables();
  }
  return (
    <div className="h-screen w-screen">
      <Logo />
      <Form uploadCsv={uploadAndUpload} />
    </div>)
};

export default Homepage;
