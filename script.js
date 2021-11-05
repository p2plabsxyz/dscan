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
      const cid = result[0].hash
      let ipfsLink = `https://ipfs.infura.io/ipfs/${result[0].hash}`;
      // IPFS hash (CID)
      document.getElementById("cid").innerHTML = cid;
      // IPFS Infura link
      document.getElementById("link").innerHTML = ipfsLink;
      $('#svg-link').on('click', function() {
        window.open(ipfsLink, '_blank').focus();
      });
      // Generate QR code
      QR_CODE.makeCode(ipfsLink);
    });
  };
  reader.readAsArrayBuffer(this.files[0]);
});
QR_CODE.clear();
