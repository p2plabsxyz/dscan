import "../css/popup.css";
import QRCode from "davidshimjs-qrcodejs";
import $ from "jquery";
import { Web3Storage } from "web3.storage";
import "regenerator-runtime/runtime";

// QR code js library
var QR_CODE = new QRCode("qrcode", {
  width: 150,
  height: 150,
  colorDark: "#000000",
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.L,
});

// web3.storage API token
const token = process.env.API_TOKEN;
const client = new Web3Storage({ token });

function hideLoader(callback) {
  $(".loader").hide(function () {
    $("section.flex-center > svg").css("aria-disabled", false);
    if (callback && typeof callback === "function") callback();
  });
}

function showLoader() {
  $(".loader").show(900);
  $("section.flex-center > svg").css("aria-disabled", true);
  $("#qrcode img").css("display", "none");
  $(".output-label + div").text("");
}

function uploadCallback(cid, ipfsLink) {
  // IPFS hash (CID)
  document.getElementById("cid").textContent = cid;
  // IPFS gateway link
  document.getElementById("link").textContent = ipfsLink;
  $("#svg-link")
    .off()
    .on("click", function () {
      window.open(ipfsLink, "_blank").focus();
    });
  // Copy CID to clipboard when copy button is clicked
  $("#svg-cid")
    .off()
    .on("click", function () {
      navigator.clipboard.writeText(cid);
    });
  // Generate QR code
  QR_CODE.makeCode(ipfsLink);
  // Code to download qrcode
  $("#svg-download")
    .off()
    .on("click", function () {
      // gets the base64 source of the qr code image
      var qrCodeSrc = document.querySelector("#qrcode img").src;
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
}

// Generate decentralized QR code from file
$("#fileUpload").on("change", async function () {
  showLoader();
  var files = fileUpload.files;
  var name = files[0].name;
  var cid = await client.put(files);
  let ipfsLink = `https://ipfs.infura.io/ipfs/${cid}/${name}/`;
  hideLoader(function () {
    uploadCallback(cid, ipfsLink);
  });
});
QR_CODE.clear();

// Generate decentralized QR code from folder
$("#folderUpload").on("change", async function () {
  showLoader();
  var files = folderUpload.files;
  var cid = await client.put(files);
  let ipfsLink = `https://ipfs.infura.io/ipfs/${cid}/`;
  hideLoader(function () {
    uploadCallback(cid, ipfsLink);
  });
});
QR_CODE.clear();
