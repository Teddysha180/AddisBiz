# Addisbiz 🇪🇹

### Universal Business Directory Extractor

**Addisbiz** is a high-performance, web-based business directory data extraction tool crafted with an Apple Pro glassy design. It extracts, normalizes, consolidates, and exports business intelligence from leading Ethiopian directories and international corporate databases into clean executive datasets.

<p align="center">
  <a href="https://addisbiz.onrender.com/">
    <strong>🚀 Launch Addisbiz Live</strong>
  </a>
</p>

---

## 🌐 Supported Directories

Addisbiz natively supports 5 leading business directory platforms:

| Directory | Website | Supported Link Types |
|---|---|---|
| **AddisBiz** | [addisbiz.com](https://addisbiz.com/) | Categories, City Filters & Direct Listings |
| **2merkato** | [2merkato.com](https://www.2merkato.com/directory/) | Category Indexes & Company Profiles |
| **Ezega Business Guide** | [businessguide.ezega.com](https://businessguide.ezega.com/) | Categories, Subcategories & Business Detail Pages |
| **Ethiopia Business Directory (EBD)** | [ethiopiabusinessdirectory.com](https://ethiopiabusinessdirectory.com/) | Category Directories & Company Pages |
| **Dun & Bradstreet (D&B)** | [dnb.com](https://www.dnb.com/) | Company Information, Industry Analysis & Profiles |

---

## ✨ Key Features

- **Apple Pro Glass Interface** – Fluid liquid progress indicator, clean badges, custom sleek scrollbars, and dark/light adaptive aesthetics.
- **Multi-Source Extraction** – Paste multiple category or company links from different directories simultaneously.
- **Deep Multi-Page Auto-Pagination** – Automatically scans through paginated categories (e.g. `1 2 3 4 5 6 7 8 9 10 >`) without manual intervention.
- **Smart Directory Normalization** – Graceful fallback from city-level to country-level directory indexes (e.g., D&B Ethiopia index fallback).
- **Rich Contact & Executive Harvester**:
  - Company / Business Name
  - Telephones & Mobile Numbers (with footer/ad phone blacklisting)
  - Direct Email Addresses
  - Physical Address & Geographic Location (City, Subcity, Country)
  - Official Website Links
  - **Key Principals & Executives**
  - **Number of Employees**
  - Industry & Category Classifications
- **Executive Styled Excel Export (`.xlsx`)**:
  - Styled with Apple Midnight Slate headers and subtle zebra striping.
  - Formatted text columns for numbers and phone lines.
  - Clickable `mailto:` email hyperlinks, clickable website links, and direct listing references.
  - Multi-tab workbook generation with a master "All Companies" tab and individual category tabs.
  - CSV export option for raw data pipelines.
- **Cloudflare & Anti-Bot Bypass** – Built-in resilient proxy engine with dynamic headers to reliably bypass anti-bot gates and CORS restrictions.
- **Zero External Dependencies** – Ultra-fast, zero-dependency Node.js HTTP server backend.

---

## 🛠️ Technology Stack

- **Frontend:** Vanilla JavaScript (ES2022), HTML5, CSS3 with backdrop filters, ExcelJS / SheetJS
- **Backend:** Native Node.js HTTP Server (`server.js`) — zero npm dependencies
- **Proxy Engine:** Dual-mode server-side stream proxy with automatic Cloudflare handling
- **Deployment:** Render (Cloud Native Web Service)

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or later
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Teddysha180/AddisBiz.git
cd AddisBiz
```

### 2. Start the Application

```bash
npm start
```

### 3. Open in Your Browser

Visit:
```text
http://localhost:3000
```

---

## 📁 Project Structure

```text
AddisBiz/
│
├── addisbiz_extractor.html  # Modern Apple Pro glass extraction application
├── index.html               # Production entry point
├── server.js                # Native Node.js HTTP server & Cloudflare bypass proxy
├── package.json             # Project metadata & npm start scripts
└── README.md                # Comprehensive documentation
```

---

## 🔌 API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/health` | GET | Returns server health, version (v2.4.0), and supported directories |
| `/api/proxy?url=` | GET | High-reliability server proxy routing directory queries |

### Health Check

```bash
curl http://localhost:3000/api/health
```

**Sample Response:**
```json
{
  "status": "ok",
  "server": "Addisbiz",
  "supported": [
    "addisbiz.com",
    "ethiopiabusinessdirectory.com",
    "businessguide.ezega.com",
    "2merkato.com",
    "dnb.com"
  ],
  "version": "2.4.0",
  "environment": "production",
  "url": "https://addisbiz.onrender.com"
}
```

---

## 🌍 Live Deployment

Try Addisbiz directly online:

**👉 [https://addisbiz.onrender.com/](https://addisbiz.onrender.com/)**

---

## ⚠️ Important Notes

- Extraction results depend on the availability and structure of the supported directories.
- Always verify collected business information before use.
- Use this tool responsibly and respect the terms of service, robots.txt, and privacy guidelines of source platforms.
- This project is an independent open-source tool and is not officially affiliated with the directory providers listed.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

**Developed by [Tewodros Seifu](https://github.com/Teddysha180)**

[GitHub Repository](https://github.com/Teddysha180/AddisBiz) · [Live Application](https://addisbiz.onrender.com/)
