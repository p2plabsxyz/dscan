<p align="center">
    <img align="center" src="/src/img/logo.png" width="150" height="150"></img>
</p>

<h1 align="center">DScan</h1>

<div align="center">
    <img src="https://img.shields.io/github/v/release/p2plabsxyz/dscan?color=green&style=flat-square" alt="Release" />
    <img src="https://img.shields.io/chrome-web-store/rating/idpfgkgogjjgklefnkjdpghkifbjenap?color=blue&label=chrome%20rating&style=flat-square" alt="Chrome web store rating" />
    <img src="https://img.shields.io/badge/license-MIT-silver.svg?style=flat-square" alt="License">
</div><br>

DScan is a decentralized storage and file sharing tool.
DScan allows you to quickly upload files as well as folders to [IPFS](https://ipfs.io/) by using [web3.storage](https://web3.storage/about/) and receive a "decentralized QR code" with IPFS CID. Later you can customize and share the QR code or hosted gateway link with everyone for easy and decentralized file sharing. Because of web3.storage, the content can be accessed over IPFS without the user installing and setting up a local instance of Kubo.<br>

For more information, you can read this 📝 [blog post](https://dev.to/akhileshthite/dscan-decentralized-qr-code-generator-use-web3-for-file-sharing-2lp8). If you have any queries, then follow this [discussion thread](https://github.com/filecoin-project/community/discussions/410).

## 💻 Extension

| <img src="https://unpkg.com/@browser-logos/chrome/chrome_16x16.png" width="16" height="16"> [Chrome](https://www.google.com/chrome/) \| <img src="https://unpkg.com/@browser-logos/brave/brave_16x16.png" width="16" height="16"> [Brave](https://brave.com/) \| <img src="https://unpkg.com/@browser-logos/opera/opera_16x16.png" width="16" height="16"> [Opera](https://www.opera.com/) \| <img src="https://unpkg.com/@browser-logos/edge/edge_16x16.png" width="16" height="16"> [Edge](https://www.microsoftedgeinsider.com/) |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![Install from Chrome Store](https://ipfs.io/ipfs/QmU4Qm5YEKy5yHmdAgU2fD7PjZLgrYTUUbxTydqG2QK3TT)<br>![](https://img.shields.io/chrome-web-store/users/idpfgkgogjjgklefnkjdpghkifbjenap?label=Chrome%20Web%20Store%20users&style=social)](https://chrome.google.com/webstore/detail/dscan-decentralized-qr-co/idpfgkgogjjgklefnkjdpghkifbjenap)                                                                                                                                                                                    |

## 📺 Demo

<div align="center">
  <img src="https://github.com/p2plabsxyz/dscan/blob/main/demo.gif" />
</div>

> In case of ⚠️ "504 Gateway Time-out" error, try again after some time. You can also use other [IPFS gateways](https://ipfs.github.io/public-gateway-checker/) with your CID.

## 🛠 Development

The extension's development code is placed in `/src` folder. manifest.json is in `/public` folder. For webpack settings, follow the `webpack.config.js` file.

1. Install dependencies.

```bash
npm install
```

First, generate the web3.storage API key:

- Go to [web3.storage](https://web3.storage/) and Sign In.
- Click on Accounts and select Create an API Token.
- Copy the API Token and paste it in the input field.

2. After development of the extension, run the following command. This will create a `production` build.

```bash
npm run build
```

3. Now, the `buidl` folder will appear in the root directory.

4. Select `Developer mode` in your browser extensions tab.

5. Select `Load unpacked extension` and open the `buidl` folder.

For more information, read the [Webpack docs](https://webpack.js.org/concepts/) and the [Chrome Extension docs](https://developer.chrome.com/docs/extensions/mv3/getstarted/).

## 📄 Contribute

- Thanks for your interest in contributing to DScan. There are many ways you can contribute to the project.
- To start, take a few minutes to read the "[contribution guide](https://github.com/buidltools/dscan/blob/main/.github/CONTRIBUTING.md)".
- We look forward to your [pull requests](https://github.com/buidltools/dscan/pulls) and / or involvement in our [issues page](https://github.com/buidltools/dscan/issues).

### 🙏 Thanks to all contributors!

<a href="https://github.com/p2plabsxyz/dscan/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=buidltools/dscan" />
</a>

## ⚖️ License

DScan is licensed under the [MIT License](https://github.com/p2plabsxyz/dscan/blob/main/LICENSE).

<hr>
Don't forget to leave a star ⭐️ ~ <a href="https://twitter.com/p2plabs_xyz" target="_blank"><img src="https://img.shields.io/twitter/follow/p2plabs_xyz?style=social" alt="twitter" /></a>
