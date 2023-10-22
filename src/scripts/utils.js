import { QR_CODE_DOWNLOAD } from './qrHandler';
import { QR_CODE_DISPLAY } from './qrHandler';
import $ from "jquery";

let isTooltipVisible = false;

export function hideLoader(callback) {
    $(".loader-container").hide(function () {
        $("section.flex-center > svg").css("aria-disabled", false);
        if (callback && typeof callback === "function") callback();
    });
}

export function showLoader() {
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

export function uploadCallback(cid, ipfsLink) {
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
    QR_CODE_DOWNLOAD.update({
        data: ipfsLink,
        type: "canvas"
    });
    QR_CODE_DISPLAY.update({
        data: ipfsLink,
        type: "canvas"
    });
    QR_CODE_DISPLAY.append(document.getElementById("qrcode"));
    QR_CODE_DOWNLOAD.append(document.getElementById("qrcode-download"));
    $("#qrcode").show();
    // show #colorPickerContainer
    $("#colorPickerContainer").show();
    // show #stylePickerContainer
    $('#stylePickerContainer').show();
    // show #logoPickerContainer
    $('#logoPickerContainer').show();
    // Code to download qrcode
    $("#svg-download")
        .off()
        .on("click", function () {
            QR_CODE_DOWNLOAD.download({ name: "dscan_QR", extension: "png" });
        });
}

function getTotalBytes(files) {
    return files.map((file) => file.size).reduce((a, b) => a + b, 0);
}

function updateProgress(percent) {
    $(".loader-progress").html(`${percent.toFixed()}%`);
}

export function getProgressUpdater(files) {
    var files = files ? Array.from(files) : [];
    var totalBytes = getTotalBytes(files);
    var uploadedBytes = 0;

    updateProgress(0);

    // returns a function that will update the progress at each call
    return (bytes) => {
        uploadedBytes += bytes;
        var percent = totalBytes ? (100 * uploadedBytes) / totalBytes : 100;
        updateProgress(Math.min(percent, 100));
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
        if (colorPropName === "colorDark") {
            QR_CODE_DISPLAY._options.dotsOptions.color = hexCode;
            QR_CODE_DOWNLOAD._options.dotsOptions.color = hexCode;
        } else if (colorPropName === "colorLight") {
            QR_CODE_DISPLAY._options.backgroundOptions.color = hexCode;
            QR_CODE_DOWNLOAD._options.backgroundOptions.color = hexCode;
        }
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
    if (!$("#qrcode>canvas").is(":visible")) return;
    const ipfsLink = document.getElementById("link").textContent;
    // do nothing if ipfsLink is null or empty
    if (ipfsLink === null || !ipfsLink?.length) return;
    // clear, set the colour value and re-draw
    try {
        if (colorPropName === "colorDark") {
            QR_CODE_DISPLAY._options.dotsOptions.color = hexCode;
            QR_CODE_DOWNLOAD._options.dotsOptions.color = hexCode;
        } else {
            QR_CODE_DISPLAY._options.backgroundOptions.color = hexCode;
            QR_CODE_DOWNLOAD._options.backgroundOptions.color = hexCode;
        }
        QR_CODE_DISPLAY.update({
            data: ipfsLink,
            type: "canvas"
        });
        QR_CODE_DOWNLOAD.update({
            data: ipfsLink,
            type: "canvas"
        });
    } catch (error) {
        console.error("Exception while updating colour. Error...", error);
    }
}
// on color change event
$("#colorPickerDark").on("change", function (event) {
    updateQRColor("colorDark", event.target.value);
});

$("#colorPickerLight").on("change", function (event) {
    updateQRColor("colorLight", event.target.value);
});

/**
 *
 * @param {'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded'} selectedStyle
 * @returns
 */
function updateQRStyle(selectedStyle = 'classy') {
    // do nothing if qrcode not visible
    if (!$("#qrcode>canvas").is(":visible")) return;
    const ipfsLink = document.getElementById("link").textContent;
    // do nothing if ipfsLink is null or empty
    if (ipfsLink === null || !ipfsLink?.length) return;
    // set the style and redraw
    try {
        QR_CODE_DISPLAY._options.dotsOptions.type = selectedStyle;
        QR_CODE_DOWNLOAD._options.dotsOptions.type = selectedStyle;

        QR_CODE_DISPLAY.update({
            data: ipfsLink,
            type: "canvas"
        });
        QR_CODE_DOWNLOAD.update({
            data: ipfsLink,
            type: "canvas"
        });
    } catch (error) {
        console.error("Exception while updating style. Error...", error);
    }
}
// on dot style change event
$("#qrStyle").on("change", function (event) {
    const selectedStyle = event.target.value;
    updateQRStyle(selectedStyle);
});


/**
 *
 * @param {string} selectedLogo
 * @returns
 */
function updateQRLogo(selectedLogo = 'https://raw.githubusercontent.com/p2plabsxyz/dscan/main/public/logo.png') {
    // do nothing if qrcode not visible
    if (!$("#qrcode>canvas").is(":visible")) return;
    const ipfsLink = document.getElementById("link").textContent;
    // do nothing if ipfsLink is null or empty
    if (ipfsLink === null || !ipfsLink?.length) return;
    // set the logo and redraw
    try {
        QR_CODE_DISPLAY._options.image = selectedLogo;
        QR_CODE_DOWNLOAD._options.image = selectedLogo;

        QR_CODE_DISPLAY.update({
            data: ipfsLink,
            type: "canvas"
        });
        QR_CODE_DOWNLOAD.update({
            data: ipfsLink,
            type: "canvas"
        });
    } catch (error) {
        console.error("Exception while updating logo. Error...", error);
    }
}

// on logo change
$("#uploadLogoButton").on("click", function () {
    $("#logoInput").trigger("click");
});

$("#logoInput").on("change", function () {
    const file = $("#logoInput")[0].files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const logoDataUri = e.target.result;
            // Create the QR code with the selected logo.
            updateQRLogo(logoDataUri);
        };
        reader.readAsDataURL(file);
    }
});