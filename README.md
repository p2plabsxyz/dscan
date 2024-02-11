<p align="center">
    <img align="center" src="/src/assets/logo.png" width="150" height="150"></img>
</p>

<h1 align="center">DScan</h1>

<div align="center">
    <img src="https://img.shields.io/github/v/release/p2plabsxyz/dscan?color=green&style=flat-square" alt="Release" />
    <img src="https://img.shields.io/chrome-web-store/rating/idpfgkgogjjgklefnkjdpghkifbjenap?color=blue&label=chrome%20rating&style=flat-square" alt="Chrome web store rating" />
    <img src="https://img.shields.io/badge/license-MIT-silver.svg?style=flat-square" alt="License">
</div><br>

DScan enables you to quickly upload files and folders to [IPFS](https://ipfs.tech/) using [web3.storage](https://web3.storage/), and provides a "decentralized QR code" containing the IPFS CID. This QR code can later be customized and shared with anyone for easy and decentralized file sharing. Users can visit [console.web3.storage](https://console.web3.storage/) and log in to manage their accounts.

DScan, leveraging the [w3up-client](https://blog.web3.storage/posts/the-data-layer-is-here-with-the-new-web3-storage), incorporates [DIDs](https://www.w3.org/TR/did-core/) and [UCAN](https://ucan.xyz/) to establish a robust framework for decentralized authentication and authorization. The use of DIDs enhances security and promotes digital self-sovereignty, while UCAN facilitates permissioned access and the delegation of capabilities, enabling users to manage access to their content securely.

Thanks to web3.storage, the content can be accessed over IPFS without the user installing and setting up a local instance of Kubo.

<div align="center">
  <img src="https://github.com/p2plabsxyz/dscan/blob/main/demo.png" />
</div>

## 💻 Extension

| <img src="https://unpkg.com/@browser-logos/chrome/chrome_16x16.png" width="16" height="16"> [Chrome](https://www.google.com/chrome/) \| <img src="https://unpkg.com/@browser-logos/brave/brave_16x16.png" width="16" height="16"> [Brave](https://brave.com/) \| <img src="https://unpkg.com/@browser-logos/opera/opera_16x16.png" width="16" height="16"> [Opera](https://www.opera.com/) \| <img src="https://unpkg.com/@browser-logos/edge/edge_16x16.png" width="16" height="16"> [Edge](https://www.microsoftedgeinsider.com/) |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![Install from Chrome Store](https://ipfs.io/ipfs/QmU4Qm5YEKy5yHmdAgU2fD7PjZLgrYTUUbxTydqG2QK3TT)<br>![](https://img.shields.io/chrome-web-store/users/idpfgkgogjjgklefnkjdpghkifbjenap?label=Chrome%20Web%20Store%20users&style=social)](https://chrome.google.com/webstore/detail/dscan-decentralized-qr-co/idpfgkgogjjgklefnkjdpghkifbjenap)                                                                                                                                                                                    |

## 🛠 Development

The extension's development code is placed in `/src` folder. manifest.json is in `/public` folder. For webpack settings, follow the `webpack.config.js` file.

1. Install dependencies.

```bash
npm install
```

2. After development of the extension, run the following command. This will create a `production` build.

```bash
npm run build
```

3. Now, the `buidl` folder will appear in the root directory.

4. Select `Developer mode` in your browser extensions tab.

5. Select `Load unpacked extension` and open the `buidl` folder.

For more information, read the [web3.storage docs](https://web3.storage/docs/).

## 💫 Achievements

- Listed on [awesome ipfs](https://awesome.ipfs.tech/#tools)
- IPFS Community Impact Awards Q2’23 recipient
- 2nd prize winner at MARS Asia hackathon 2021

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
