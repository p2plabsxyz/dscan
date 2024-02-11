import * as Client from "@web3-storage/w3up-client";
// import { QR_CODE_DISPLAY } from "./qrHandler";
import {
  hideLoader,
  showLoader,
  uploadCallback,
  // getProgressUpdater,
} from "./utils";
import "regenerator-runtime/runtime";
import $ from "jquery";

let spaceDID;
chrome.storage.local.get(["spaceDID"], async function (result) {
  spaceDID = result.spaceDID;

  const client = await Client.create();

  // Generate decentralized QR code from file
  $("#fileUpload").on("change", async function () {
    const file = this.files[0];
    if (!file) return;

    showLoader();
    var cid = await client.uploadFile(file);
    let ipfsLink = `https://w3s.link/ipfs/${cid}/`;

    hideLoader(function () {
      uploadCallback(cid, ipfsLink);
    });
  });

  // Generate decentralized QR code from folder
  $("#folderUpload").on("change", async function () {
    const files = Array.from(folderUpload.files);
    if (files.length === 0) return;

    showLoader();
    // Assuming all files are from the same root directory
    const rootDirectoryName = files[0].webkitRelativePath.split("/")[0];

    const directory = Array.from(files).map((file) => {
      const relativePath = file.webkitRelativePath.replace(
        `${rootDirectoryName}/`,
        ""
      );
      return new File([file], relativePath);
    });
    var cid = await client.uploadDirectory(directory);
    let ipfsLink = `https://w3s.link/ipfs/${cid}/`;

    hideLoader(function () {
      uploadCallback(cid, ipfsLink);
    });
  });
});
