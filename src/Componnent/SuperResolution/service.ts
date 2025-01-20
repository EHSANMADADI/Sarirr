import api from "../../Config/api";

type ImageReq = { fidelity: number; image: File };

export type SRImagesAddresses = {
  zipFile: string;
  final: string;
  parts: string[];
};



function canParseUrl(url: string): boolean {
  if ('canParse' in URL) {
    return (URL.canParse as typeof canParseUrl)(url);
  }

  try {
    new URL(url)
    return true;
  } catch {
    return false;
  }
}


function mapToServerAddress(path: string): string {

  if (!path || path.trim().length === 0)
    throw new Error('Invalid path to map')

  let result: string;

  if (canParseUrl(path)) {
    let url = new URL(path);
    result = api.defaults.baseURL + url.pathname + url.search;
  }
  else {
    let splitor = path.startsWith('/') || api.defaults.baseURL?.endsWith('/') ? '' : '/';

    result = api.defaults.baseURL + splitor + path;
  }

  return result
}

async function getFile(url: string, name?: string) {
  let response = await fetch(url);
  let data = await response.blob();

  name ??= 'unititled.' + data.type.split('/').slice(-1);

  let options = {
    type: data.type //'image/jpeg'
  }

  let file = new File([data], name, options)

  return file
}


function mapSrResponseToSrImages(res: any): SRImagesAddresses | null {
  let list = res?.output_images as string[];

  if (!res || !list) return null;

  list = list.map(u => mapToServerAddress(u));

  let final = list.find((p) => p.split("/").slice(-1)?.[0]?.includes("final"))!;
  let zipFile = mapToServerAddress(res.zip_file)

  let result: SRImagesAddresses = {
    zipFile,
    final,
    parts: list.filter((l) => l !== final),
  };

  return result;
}

export async function getSRFaces({
  fidelity,
  image,
}: ImageReq): Promise<SRImagesAddresses | null> {
  let data = new FormData();

  console.log("image", image);
  data.append("image", image);
  data.append("fidelity_weight", fidelity.toString());

  let response = await api.post("/restore", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  let res = await response?.data

  return mapSrResponseToSrImages(res);
}

export async function getSRFacesWithNature(image: File): Promise<SRImagesAddresses | null> {
  let data = new FormData();

  console.log("image", image);
  data.append("image", image);

  let response = await api.post("/restore", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  let res = await response?.data

  return mapSrResponseToSrImages(res);
}

export async function getSRNature(image: File): Promise<string | null> {

  let data = new FormData();

  console.log("image", image);
  data.append("image", image);

  let response = await api.post("/swinir", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  let res = await response?.data

  if (!res) return null;

  let result = mapToServerAddress(res?.folder_name);
  return result;
}

export async function download(url: string,
  options: { name?: string, internalDownload?: boolean }) {

  options ??= {
    internalDownload: false
  }

  let { name, internalDownload } = options;

  const link = document.createElement("a");
  link.target = '_blank';
  link.download = name ?? '';

  if (internalDownload) {
    let file = await getFile(url, name)
    link.href = URL.createObjectURL(file);
  }
  else {
    link.href = url;
  }


  // document.body.appendChild(link);
  link.click();
  // document.body.removeChild(link);
}

