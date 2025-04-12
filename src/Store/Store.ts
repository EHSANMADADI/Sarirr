import { create } from "zustand";

interface Recording {
  name: string;
  audio: string;
  language: string;
}

interface RecordingState {
  audioURLs: Recording[]; // List of recordings
  addRecording: (recording: Recording) => void;
  removeRecording: (id: number) => void;
  clearRecordings: () => void;
  lang: string;
  changeLang: (val: string) => void;
  ////for Ocr
  showBTN: boolean;
  setShowBTN: (showbtn: boolean) => void;
  indexMultiple: number;
  ChangeIndexMultiple: (index: number) => void;
  // pdfFileUrl:string,
  // setPdfFileUrl:(value:string)=>void;
  /////////////
  keywords: string;
  setKeywords: (value: string) => void;
  type: string;
  setType: (value: string) => void;
  ///for Descriptor
  characterValue: String[];
  addCharacterValue: (value: string) => void;
  

  ///
  IsAdmin: boolean;
  setIsAdmin: (value: boolean) =>void
}

export const useStore = create<RecordingState>((set) => ({
  IsAdmin: false,
  setIsAdmin: (value: boolean) => set(() => ({ IsAdmin: value })),

  ///////////////
  audioURLs: [],
  addRecording: (recording) =>
    set((state) => ({
      audioURLs: [...state.audioURLs, recording],
    })),
  removeRecording: (id) =>
    set((state) => ({
      audioURLs: state.audioURLs.filter((_: any, i: number) => i !== id),
    })),
  clearRecordings: () => set(() => ({ audioURLs: [] })),
  lang: "persian",
  changeLang: (val) =>
    set((state) => ({
      ...state,
      lang: val,
    })),
  keywords: "",
  setKeywords: (value) =>
    set(() => ({
      keywords: value,
    })),

  type: "",
  setType: (value) =>
    set(() => ({
      type: value,
    })),

  indexMultiple: -1,
  ChangeIndexMultiple: (index: number) =>
    set((state) => ({ indexMultiple: index })),
  showBTN: true,
  setShowBTN: (showbtn: boolean) => set((state) => ({ showBTN: showbtn })),
  characterValue: [],
  addCharacterValue: (value: string) =>
    set((state) => ({
      characterValue: [...state.characterValue, value],
    })),
 
    // pdfFileUrl:'',
    // setPdfFileUrl:(value:string)=>set((state)=>({
    //     pdfFileUrl:value,
    // }))

}));
