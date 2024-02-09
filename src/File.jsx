import Header from "./components/Header";
import Pages from "./components/Pages";
import Input from "./components/Input";
import QRcode from "./components/QRcode";
import Output from "./components/Output";
import BrandLink from "./components/BrandLink";

function File() {
  return (
    <>
      <Header />
      <Pages
        classNameFile="file active"
        classNameFolder="folder"
        urlFile=""
        urlFolder="Folder.jsx"
      />
      <Input type="file" id="fileUpload" htmlFor="fileUpload" />
      <QRcode />
      <Output />
      <BrandLink />
    </>
  );
}

export default File;
