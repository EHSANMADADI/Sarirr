import React from "react";
import logo from "./logo.svg";
import "./App.css";
import FerstPage from "./Page/FerstPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ASRPage from "./Page/ASRPage";
import VADPage from "./Page/VADPage";
import SpeechEnhancementPage from "./Page/SpeechEnhancementPage";
import OCRPage from "./Page/OCRPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FerstPage />} />
        <Route path="/ASR" element={<ASRPage />} />
        <Route path="/VAD" element={<VADPage />} />
        <Route path="/SpeechEnhancement" element={<SpeechEnhancementPage />} />
        <Route path="/OCR" element={<OCRPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
