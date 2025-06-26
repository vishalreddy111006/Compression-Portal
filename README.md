# 📦 ByteSqueeze - File Compression & Decompression Portal

A powerful, user-friendly web application that allows users to compress and decompress files using classic algorithms like **Huffman Coding**, **Run-Length Encoding (RLE)**, and **LZ77**. Developed as part of the **MARS Open Projects 2025** under the Web Development Problem Statements.

---

## 🔍 Project Description

ByteSqueeze is a web-based tool that enables users to upload any file, apply different **lossless compression** techniques, and download the processed output. It provides insightful **compression statistics** and showcases the effectiveness of various algorithms through an interactive and responsive UI.

---

## 🚀 Features

- 📁 **File Upload** (Supports all file types)  
- 🧠 **Multiple Compression Algorithms**  
  - Huffman Coding  
  - Run-Length Encoding (RLE)  
  - LZ77  
- 🔄 **Compression & Decompression**  
- 📊 **Compression Statistics**  
  - Original size, Compressed size, Time taken, Compression ratio  
- ⬇️ **Download Processed Files**  
- 📘 **Algorithm Descriptions & Pop-up Explanations**  
- ❌ **Clear Error Feedback**  
- 📱 **Fully Responsive UI**  
- 🌱 **Optional Future Enhancements**  
  - Chart visualizations, Algorithm comparisons

---

## 🛠️ Tech Stack

### Frontend:
- React.js  
- Tailwind CSS  
- Lucide React Icons  

### Backend (if applicable):
- Node.js / Express.js

### Algorithms:
- Custom JS implementations of:
  - Huffman Coding  
  - RLE  
  - LZ77

### Hosting:
- Vercel
---

## 🧠 Compression Algorithms Overview

Each algorithm includes a brief description and popup modal UI:

- **Huffman Coding**: Prefix-based binary encoding using frequency trees  
- **Run-Length Encoding**: Replaces runs with count + symbol  
- **LZ77**: Dictionary-based compression using sliding window  

> Full explanation available upon selecting each algorithm in the UI.

---


## 📁 Folder Structure

```
src/
├── components/
│   ├── FileUploader.jsx
│   ├── AlgorithmSelector.jsx
│   ├── StatsDisplay.jsx
│   ├── FileDownloader.jsx
│   └── AlgorithmDescription.jsx
├── utils/
│   ├── huffman.js
│   ├── rle.js
│   └── lz77.js
├── hooks/
│   └── use-toast.js
└── pages/
    └── Index.jsx
```

---

## 🧑‍💻 Setup Instructions

### 1. Clone the repository:
```bash
git clone https://github.com/vishalreddy111006/Compression-Portal.git
cd Compression-Portal
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Run the app:
```bash
npm run dev
# or
npm start
```

### 4. Open in browser:
```bash
http://localhost:3000
```

---

## 🌐 Live Demo

🔗 [Website link](https://byte-squeeze-blue.vercel.app/)(#)

---

## 🎥 Demo Video

▶️ [Watch the walkthrough](https://drive.google.com/file/d/1oAeUtfGG90l_Wh0hqtm_9WLk91F2nENA/view?usp=sharing)
---


## 🙌 Acknowledgements

Developed for **MARS Open Projects 2025** — Web Development Track.
