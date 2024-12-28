import api from "../../Config/api";

type ImageReq = { fidelity: number; image: File };

export type SRImages = {
  final: string;
  parts: string[];
};

export async function getSRImages({
  fidelity,
  image,
}: ImageReq): Promise<SRImages | null> {
  let data = new FormData();

  console.log("image", image);
  data.append("image", image);
  data.append("fidelity_weight", fidelity.toString());

  let response = await api.post("/restore", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  let list = (await response?.data?.output_images) as string[];

  if (!list) return null;

  list = list.map((path) => {
    let url = new URL(path);

    return api.defaults.baseURL + url.pathname + url.search;
  });

  let final = list.find((p) => p.split("/").slice(-1)?.[0]?.includes("final"))!;

  let result: SRImages = {
    final,
    parts: list.filter((l) => l !== final),
  };

  return result;
}

export function download(url: string, name?: string) {
  const link = document.createElement("a");
  link.href = url;
  if (name) link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
