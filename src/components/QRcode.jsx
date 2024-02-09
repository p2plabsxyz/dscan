import logo from "../assets/logo.png";
import imageFillIcon from "../assets/image-fill.svg";
import downloadIcon from "../assets/download.svg";

function QRcode() {
  return (
    <div style={{ textAlign: "center", position: "relative" }}>
      <div className="qrcode-container" style={{ position: "relative" }}>
        <div className="loader-container">
          <div className="loader">
            <div className="loader-progress"></div>
            <div className="loader-spinner"></div>
          </div>
        </div>
        <div id="qrcode"></div>
        <div id="qrcode-download"></div>
      </div>
      <div id="colorPickerContainer">
        <div>
          <input type="color" id="colorPickerLight" value="#ffffff" />
          <input type="color" id="colorPickerDark" value="#000000" />
        </div>
      </div>
      <div id="logoPickerContainer">
        <img src={logo} alt="Logo" />
        <input
          type="file"
          id="logoInput"
          accept="image/*"
          style={{ display: "none" }}
        />
      </div>
      <div id="stylePickerContainer">
        <img src={imageFillIcon} alt="Image Fill" />
        <div id="styleOptions">
          <label>
            <input type="radio" name="style" value="rounded" /> Rounded
          </label>
          <label>
            <input type="radio" name="style" value="dots" /> Dots
          </label>
          <label>
            <input type="radio" name="style" value="classy" /> Classy
          </label>
          <label>
            <input type="radio" name="style" value="classy-rounded" /> Classy
            Rounded
          </label>
          <label>
            <input type="radio" name="style" value="square" /> Square
          </label>
          <label>
            <input type="radio" name="style" value="extra-rounded" /> Extra
            Rounded
          </label>
        </div>
      </div>
      <img src={downloadIcon} alt="Download Icon" />
    </div>
  );
}

export default QRcode;
