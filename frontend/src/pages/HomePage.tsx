import Form from "../components/Form"
import Logo from "../components/Logo"
import { uploadCsv } from "../services/uploadService"

const Homepage = () => (
  <div className="bg-custom-bg bg-cover bg-center h-screen w-screen">
    <Logo />
    <Form uploadCsv={uploadCsv} />
  </div>
);

export default Homepage;
