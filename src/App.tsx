import React from "react";
// import 'bootstrap/dist/css/bootstrap-grid.rtl.min.css'
import "./App.css";
import FerstPage from "./Page/FerstPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ASRPage from "./Page/ASRPage";
import VADPage from "./Page/VADPage";
import SpeechEnhancementPage from "./Page/SpeechEnhancementPage";
import OCRPage from "./Page/OCRPage";
import TranslatorPage from "./Page/TranslatorPage";
import LLMUIPage from "./Page/LLMUIPage";
import SuperResolutionPage from "./Page/SuperResolutionPage";
import DecryptorPage from "./Page/DecryptorPage";
import KeywordSpotting from "./Page/KeywordSpotting";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FerstPage />} />
        <Route path="/ASR" element={<ASRPage />} />
        <Route path="/VAD" element={<VADPage />} />
        <Route path="/SpeechEnhancement" element={<SpeechEnhancementPage />} />
        <Route path="/OCR" element={<OCRPage />} />
        <Route path="/translate" element={<TranslatorPage />} />
        <Route path="/LLMUI" element={<LLMUIPage />} />
        <Route path="/SuperResolution" element={<SuperResolutionPage />} />
        <Route path="/Decryptor" element={<DecryptorPage />} />
        <Route path="/keywordSpotting" element={<KeywordSpotting/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
