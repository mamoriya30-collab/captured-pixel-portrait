# Captured Pixel Portrait

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c320b57f-89ab-49f6-a4e8-998ed7bd53ec).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Run it on your local network

Any device on the same Wi-Fi (phone, tablet, another laptop) can open the site
once you start it with one of these.

Quick way — the live dev server:

```sh
npm run dev:lan
```

Prints a `Network:` address such as `http://192.168.1.20:5173/`. Open that on
any device on the network.

Steadier way — the built site, no hot reload:

```sh
npm run build:node
npm run start:lan
```

`start:lan` listens on every interface at port 3000, so other devices open
`http://<your-computer's IP>:3000/`. Find your computer's IP with `ipconfig`
(Windows), `ip get ifaddr` (macOS), or `hostname -I` (Linux). Set a different
port with `PORT=8080 npm run start:lan` (`set PORT=8080&& npm run start:lan` on
Windows).

If a device can't connect, allow the port through the firewall, and note that
some Wi-Fi networks (hotels, offices, guest networks) block device-to-device
traffic.
