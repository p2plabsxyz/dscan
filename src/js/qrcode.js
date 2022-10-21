import "../css/popup.css";
import QRCode from "davidshimjs-qrcodejs";
import $ from "jquery";
import { Web3Storage } from "web3.storage";
import "regenerator-runtime/runtime";

// QR code js library
const createQRCodeFor = (identifier, dimension) => {
  return new QRCode(identifier, {
    width: dimension,
    height: dimension,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.L,
  });
};

var QR_CODE_DOWNLOAD = createQRCodeFor("qrcode-download", 400);
var QR_CODE_DISPLAY = createQRCodeFor("qrcode", 150);

// web3.storage API token
const token = process.env.API_TOKEN;
const client = new Web3Storage({ token });
let isTooltipVisible = false;

function hideLoader(callback) {
  $(".loader-container").hide(function () {
    $("section.flex-center > svg").css("aria-disabled", false);
    if (callback && typeof callback === "function") callback();
  });
}

function showLoader() {
  $(".loader-container").show(900);
  $("section.flex-center > svg").css("aria-disabled", true);
  $("#qrcode").hide();
  $(".output-label + div").text("");
  $("#colorPickerContainer").hide();
  clearQRColor("colorDark", "#000000");
  clearQRColor("colorLight", "#ffffff");
}

function showCopiedTooltip() {
  if (!isTooltipVisible) {
    $("#tooltip").css("display", "block");
    $("#tooltip-pointer").css("display", "block");
    isTooltipVisible = true;
    setTimeout(function () {
      $("#tooltip").css("display", "none");
      $("#tooltip-pointer").css("display", "none");
      isTooltipVisible = false;
    }, 1000);
  }
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
      showCopiedTooltip();
      navigator.clipboard.writeText(cid);
    });
  // Generate QR code
  QR_CODE_DOWNLOAD.makeCode(ipfsLink);
  QR_CODE_DISPLAY.makeCode(ipfsLink);
  $("#qrcode").show();
  // show #colorPickerContainer
  $("#colorPickerContainer").show();
  // Code to download qrcode
  $("#svg-download")
    .off()
    .on("click", function () {
      // gets the base64 source of the qr code image
      var qrCodeSrc = document.querySelector("#qrcode-download img").src;
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

function getTotalBytes(files) {
  return files.map((file) => file.size).reduce((a, b) => a + b, 0);
}

function updateProgress(percent) {
  $(".loader-progress").html(`${percent.toFixed()}%`);
}

function getProgressUpdater(files) {
  var files = files ? Array.from(files) : [];
  var totalBytes = getTotalBytes(files);
  var uploadedBytes = 0;

  updateProgress(0);

  // returns a function that will update the progress at each call
  return (bytes) => {
    uploadedBytes += bytes;
    var percent = totalBytes ? (100 * uploadedBytes) / totalBytes : 100;
    updateProgress(percent);
  };
}

/**
 *
 * @param {"colorDark" | "colorLight"} colorPropName
 * @param {string} hexCode
 * @returns
 */
function clearQRColor(colorPropName, hexCode) {
  if (colorPropName === "colorDark") {
    $(`#colorPickerDark`).val(hexCode);
  } else {
    $(`#colorPickerLight`).val(hexCode);
  }

  try {
    QR_CODE_DISPLAY._htOption[colorPropName] = hexCode;
    QR_CODE_DOWNLOAD._htOption[colorPropName] = hexCode;
  } catch (error) {
    console.error("Exception while clearing colour. Error...", error);
  }
}
/**
 *
 * @param {"colorDark" | "colorLight"} colorPropName
 * @param {string} hexCode
 * @returns
 */
function updateQRColor(colorPropName, hexCode = "#000000") {
  // do nothing if qrcode not visible
  if (!$("#qrcode>img").is(":visible")) return;
  const ipfsLink = document.getElementById("link").textContent;
  // do nothing if ipfsLink is null or empty
  if (ipfsLink === null || !ipfsLink?.length) return;
  // clear, set the colour value and re-draw
  try {
    QR_CODE_DISPLAY.clear();
    QR_CODE_DOWNLOAD.clear();
    QR_CODE_DISPLAY._htOption[colorPropName] = hexCode;
    QR_CODE_DOWNLOAD._htOption[colorPropName] = hexCode;
    QR_CODE_DISPLAY.makeCode(ipfsLink);
    QR_CODE_DOWNLOAD.makeCode(ipfsLink);
  } catch (error) {
    console.error("Exception while updating colour. Error...", error);
  }
}

// Generate decentralized QR code from file
$("#fileUpload").on("change", async function () {
  var files = fileUpload.files;
  if (files.length === 0) return;

  showLoader();
  var cid = await client.put(files, {
    onStoredChunk: getProgressUpdater(files),
    wrapWithDirectory: false,
  });
  let ipfsLink = `https://dweb.link/ipfs/${cid}/`;
  hideLoader(function () {
    uploadCallback(cid, ipfsLink);
  });
});
QR_CODE_DISPLAY.clear();

// Generate decentralized QR code from folder
$("#folderUpload").on("change", async function () {
  var files = folderUpload.files;
  if (files.length === 0) return;

  showLoader();
  var cid = await client.put(files, {
    onStoredChunk: getProgressUpdater(files),
  });
  let ipfsLink = `https://dweb.link/ipfs/${cid}/`;
  hideLoader(function () {
    uploadCallback(cid, ipfsLink);
  });
});
QR_CODE_DISPLAY.clear();

// on color change event
$("#colorPickerDark").on("change", function (event) {
  updateQRColor("colorDark", event.target.value);
});

$("#colorPickerLight").on("change", function (event) {
  updateQRColor("colorLight", event.target.value);
});
