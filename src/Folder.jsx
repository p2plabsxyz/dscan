import Header from "./components/Header.jsx";
import Pages from "./components/Pages.jsx";
import Input from "./components/Input.jsx";
import QRcode from "./components/QRcode.jsx";
import Output from "./components/Output.jsx";
import BrandLink from "./components/BrandLink.jsx";

function Folder() {
  return (
    <>
      <Header />
      <Pages
        classNameFile="file"
        classNameFolder="folder active"
        urlFile="File.jsx"
        urlFolder=""
      />
      <Input
        type="file"
        id="folderUpload"
        htmlFor="folderUpload"
        webkitdirectory
        mozdirectory
        multiple
      />
      <QRcode />
      <Output />
      <BrandLink />
    </>
  );
}

export default Folder;
