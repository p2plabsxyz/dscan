import QRCodeStyling from "qr-code-styling";

let cid;
const createQRCodeFor = (dimension) => {
  const qrCode = new QRCodeStyling({
    width: dimension,
    height: dimension,
    type: "canvas",
    data: cid,
    image: "./logo.png", // default
    dotsOptions: {
      color: "#000000", // default
      type: "rounded",
    },
    cornersSquareOptions: {
      type: "extra-rounded", // default
    },
    backgroundOptions: {
      colorLight: "#ffffff", // default
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 2,
    },
  });
  return qrCode;
};

export var QR_CODE_DOWNLOAD = createQRCodeFor(369);
export var QR_CODE_DISPLAY = createQRCodeFor(139);
