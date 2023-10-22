import QRCodeStyling from "qr-code-styling";

const createQRCodeFor = (dimension) => {
    const qrCode = new QRCodeStyling({
        width: dimension,
        height: dimension,
        type: "canvas",
        data: cid,
        image: "https://raw.githubusercontent.com/p2plabsxyz/dscan/main/public/logo.png", // default
        dotsOptions: {
            color: "#000000", // default
            type: "rounded"
        },
        backgroundOptions: {
            colorLight: "#ffffff", // default
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 2
        }
    });
    return qrCode;
};

export var QR_CODE_DOWNLOAD = createQRCodeFor(400);
export var QR_CODE_DISPLAY = createQRCodeFor(150);
