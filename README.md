<p align="center">
  <img src="./frontend/public/logo.png" alt="PawGuardians Logo" width="150" />
</p>

# 🐾 PawGuardians – Skill Sharing DApp on Stellar Soroban

**PawGuardians** is a decentralized skill-sharing application built using **Stellar Soroban**. Users can offer or learn skills (such as language, coding, or music) in exchange for **XLM** or through mutual skill exchange. It aims to create a decentralized, community-driven platform for global learning.

## 🚀 Features

- ✨ Decentralized skill exchange platform  
- 💻 Built with **Next.js** frontend and **Tailwind CSS**  
- 🔒 **Freighter Wallet** integration  
- ⚙️ Smart contracts developed using **Rust and Soroban**  
- 🔁 Users can teach skills for XLM or learn in return  
- 🌍 Global, open-source, and community-focused  

## 📂 Project Structure

```bash
/contract                   # Rust/Soroban smart contract codes
/frontend                   # Next.js frontend application
/frontend/app               # Pages and components
/frontend/public            # Static files (logo, icons)
/frontend/types             # TypeScript types
tailwind.config.js          # Tailwind configuration
next.config.ts              # Next.js configuration
README.md                   # This document!
```

## 🛠️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Gamagu08/PawGuardians.git
cd PawGuardians
```

### 2️⃣ Install frontend dependencies

```bash
cd frontend
npm install
```

### 3️⃣ Start the development server

```bash
npm run dev
```

### 4️⃣ Build the Soroban smart contract

```bash
cd contract
cargo build --target wasm32-unknown-unknown --release
```

## ⚙️ Usage

- Open the app and connect your **Freighter Wallet**  
- Choose a skill you want to learn or teach  
- Submit your offer or request through the UI  
- Transactions are recorded on the **Stellar blockchain**  

## 📸 Screenshots

> _You can place a screenshot in the `/screenshots/` folder and update the path below._

![App Screenshot](./screenshots/pawguardians-preview.png)

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## ✨ Contributions

We welcome all contributors!

- Submit a **Pull Request** for new features or bug fixes  
- Open an **Issue** for bug reports, improvements, or ideas  

## 🔗 Useful Links

- 🌐 [Stellar Developer Docs](https://developers.stellar.org/docs/)
- 🔧 [Soroban Documentation](https://soroban.stellar.org/docs)
- 💼 [Freighter Wallet](https://freighter.app/)

> 📌 **Note:** Make sure you build your Soroban smart contracts inside the `contract/` folder before running the application.
