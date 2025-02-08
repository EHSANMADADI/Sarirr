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
import SignIn from "./Page/SignIn";
import AdminPanel from "./Page/AdminPanel";
import AddUser from "./Componnent/AdminPanel/AddUser";
import ListUser from "./Componnent/AdminPanel/ListUser";
import Gitinam from "./Page/Gitinam";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/signIn" element={<SignIn />} />
        <Route path="/" element={<FerstPage />} />
        <Route path="/gitinama" element={<Gitinam />} />
        <Route path="/ASR" element={<ASRPage />} />
        <Route path="/VAD" element={<VADPage />} />
        <Route path="/SpeechEnhancement" element={<SpeechEnhancementPage />} />
        <Route path="/OCR" element={<OCRPage />} />
        <Route path="/translate" element={<TranslatorPage />} />
        <Route path="/LLMUI" element={<LLMUIPage />} />
        <Route path="/SuperResolution" element={<SuperResolutionPage />} />
        <Route path="/Decryptor" element={<DecryptorPage />} />
        <Route path="/keywordSpotting" element={<KeywordSpotting/>} />
        <Route path='/AdminPanel' element={<AdminPanel/>}>
        <Route index element={<h1>صفحه اصلی</h1>} />
        <Route path="adduser" element={<AddUser />} />
        <Route path="listuser" element={<ListUser />} />
       
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
