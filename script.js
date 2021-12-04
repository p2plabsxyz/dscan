/*
DScan: Decentralized QR code generator extension
Created on Nov 6 2021
@author: Akhilesh Thite
*/

// QR code js library
var QR_CODE = new QRCode("qrcode", {
  width: 150,
  height: 150,
  colorDark: "#000000",
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.L,
});

$("#upload").on("change", function () {
  var reader = new FileReader();
  reader.onload = function () {
    var ipfs = window.IpfsHttpClient({
      host: "ipfs.infura.io",
      port: "5001",
      protocol: "https",
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
			$("#svg-download").on("click", function () {
				var qrCodeSrc = document.getElementById("qr-code-image").src;
				var a = document.createElement("a");
				a.href = qrCodeSrc;
				a.download = "qr-code.png";
				a.click();
			})
    });
  };
  reader.readAsArrayBuffer(this.files[0]);
});
QR_CODE.clear();
