import QRCode from "davidshimjs-qrcodejs";
import "../css/popup.css";
var Buf = require('buffer/').Buffer

// QR code js library
var QR_CODE = new QRCode("qrcode", {
  width: 150,
  height: 150,
  colorDark: "#000000",
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.L,
});

// Innfura API key
const projectId = process.env.INFURA_PROJECT_ID;
const projectSecret = process.env.INFURA_SECRET_ID;
const auth =
    'Basic ' + Buf.from(projectId + ':' + projectSecret).toString('base64');

// Generate decentralized QR code
$("#upload").on("change", function () {
  $(".loader").show(900);
  var reader = new FileReader();
  reader.onload = function () {
    var ipfs = window.IpfsHttpClient({
      host: "ipfs.infura.io",
      port: "5001",
      protocol: "https",
      headers: {
        authorization: auth,
      },
    });
    var buf = buffer.Buffer(reader.result);
    // Upload files to IPFS
    ipfs.add(buf, (err, result) => {
      if (err) {
        return console.log(err);
      }
      const cid = result[0].hash;
      let ipfsLink = `https://ipfs.infura.io/ipfs/${result[0].hash}`;
      // IPFS hash (CID)
      document.getElementById("cid").textContent = cid;
      // IPFS Infura link
      document.getElementById("link").textContent = ipfsLink;
      $("#svg-link").on("click", function () {
        window.open(ipfsLink, "_blank").focus();
      });
      // Copy CID to clipboard when copy button is clicked
      $("#svg-cid").on("click", function () {
        navigator.clipboard.writeText(cid);
      });
      // Generate QR code
      QR_CODE.makeCode(ipfsLink);
      $(".loader").hide();
      // Code to download qrcode
      $("#svg-download").on("click", function () {
        // gets the base64 source of the qr code image
        var qrCodeSrc = document.getElementById('qr-code-image').src;
        var a = document.createElement("a");
        // an invisible a tag is given that href.
        a.href = qrCodeSrc;
        // filename for the qrcode is set
        a.download = "dscan_QR.png";
        document.body.appendChild(a);
        // the a tag is clicked, triggering the download
        a.click();
        document.body.removeChild(a);
      });
    });
  };
  reader.readAsArrayBuffer(this.files[0]);
});
QR_CODE.clear();