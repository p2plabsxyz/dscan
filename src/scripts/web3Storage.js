import { Web3Storage } from "web3.storage";
import { QR_CODE_DISPLAY } from './qrHandler';
import { hideLoader, showLoader, uploadCallback, getProgressUpdater } from './utils';
import "regenerator-runtime/runtime";
import $ from "jquery";

let savedKey;
chrome.storage.local.get(["web3storageKey"], function (result) {
    savedKey = result.web3storageKey;
    const client = new Web3Storage({ token: savedKey });

    // Generate decentralized QR code from file
    $("#fileUpload").on("change", async function () {
        var files = fileUpload.files;
        var name = files[0].name;
        if (files.length === 0) return;

        showLoader();
        var cid = await client.put(files, {
            onStoredChunk: getProgressUpdater(files),
        });
        if (!cid || cid.length === 0) {
            alert("Invalid web3.storage key format. Please enter a valid key.");
            return;
        }
        let ipfsLink = `https://w3s.link/ipfs/${cid}/${name}/`;
        hideLoader(function () {
            uploadCallback(cid, ipfsLink);
        });
    });

    // Generate decentralized QR code from folder
    $("#folderUpload").on("change", async function () {
        var files = folderUpload.files;
        if (files.length === 0) return;

        showLoader();
        // Create a new array to store the file objects with updated webkitRelativePath
        var updatedFiles = [];

        // Traverse through each file in the files array
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const relativePath = file.webkitRelativePath;
            const updatedFolder = new File([file], relativePath); // Create a new file object with updated webkitRelativePath
            updatedFiles.push(updatedFolder); // Add the updated file object to the updatedFiles array
        }

        var cid = await client.put(updatedFiles, {
            onStoredChunk: getProgressUpdater(updatedFiles),
            wrapWithDirectory: false,
        });

        if (!cid || cid.length === 0) {
            alert("Invalid web3.storage key format. Please enter a valid key.");
            return;
        }
        let ipfsLink = `https://w3s.link/ipfs/${cid}/`;
        hideLoader(function () {
            uploadCallback(cid, ipfsLink);
        });
    });
});
