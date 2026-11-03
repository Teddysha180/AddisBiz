
# AddisBiz 🇪🇹

### Ethiopian Business Directory Extractor

**AddisBiz** is a web-based business directory data extraction tool designed to collect and consolidate business information from multiple Ethiopian online business directories into one centralized workspace.

Instead of navigating each directory individually, AddisBiz provides a unified interface to extract, organize, filter, and export business contact information.

<p align="center">
  <a href="https://addisbiz.onrender.com/">
    <strong>🚀 Launch AddisBiz</strong>
  </a>
</p>

---

## 🌐 Supported Directories

AddisBiz currently supports four Ethiopian business directory platforms:

| Directory | Website |
|---|---|
| AddisBiz | [addisbiz.com](https://addisbiz.com/) |
| Ethiopia Business Directory | [ethiopiabusinessdirectory.com](https://ethiopiabusinessdirectory.com/) |
| Ezega Business Guide | [businessguide.ezega.com](https://businessguide.ezega.com/) |
| 2Merkato | [2merkato.com](https://www.2merkato.com/directory/) |

## ✨ Key Features

- **Multi-Source Extraction** – Collect business information from multiple supported directories.
- **Centralized Workspace** – Manage extracted information through one interface.
- **Parallel Processing** – Configure multiple extraction tasks.
- **Data Filtering** – Search, filter, and organize collected records.
- **Export Options** – Export collected data to CSV and Excel-compatible formats.
- **Extraction Logs** – Monitor extraction activity and progress.
- **Retry Support** – Retry extraction tasks when necessary.
- **Built-in Proxy** – Server-side proxy support for handling cross-origin restrictions and certain access challenges.

## 🛠️ Technology Stack

- Node.js
- JavaScript
- HTML5
- CSS3
- Native Node.js HTTP Server

The backend uses native Node.js modules and does not require external npm dependencies.

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or later
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Teddysha180/AddisBiz.git
```

### 2. Navigate to the Project

```bash
cd AddisBiz
```

### 3. Start the Application

```bash
npm start
```

### 4. Open in Your Browser

Visit:

```text
http://localhost:3000
```

The application will start using the default port 3000, or the port specified by your environment.

## 📁 Project Structure

```text
AddisBiz/
│
├── addisbiz_extractor.html  # Main application interface
├── index.html               # HTML entry point
├── server.js                # Node.js server and proxy
├── package.json             # Project configuration
└── README.md                # Project documentation
```

## 🔌 API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/health` | GET | Returns server health and supported sources |
| `/api/proxy?url=` | GET | Server-side proxy for directory requests |

### Health Check

```text
http://localhost:3000/api/health
```

### Proxy Example

```text
http://localhost:3000/api/proxy?url=https://addisbiz.com/
```

## 🌍 Live Demo

Try AddisBiz directly:

**https://addisbiz.onrender.com/**

## ⚠️ Important Notes

- Extraction results depend on the availability and structure of the supported directories.
- Website updates, access restrictions, or anti-bot protections may affect extraction performance.
- Always verify collected business information before using it.
- Use this tool responsibly and respect the terms of service, copyright, privacy requirements, and applicable laws of each source website.
- This project is an independent tool and is not officially affiliated with the directory platforms listed above.

## 📄 License

This project is licensed under the MIT License.

---

**Built for Ethiopian business data collection.**

Developed by **Tewodros Seifu**

[GitHub Repository](https://github.com/Teddysha180/AddisBiz) · [Live Application](https://addisbiz.onrender.com/)
