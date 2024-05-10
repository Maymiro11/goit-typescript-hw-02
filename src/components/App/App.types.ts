export type ImageType = {
    id: string;
    webformatURL?: string;
  }
  
  export type ModalImage = {
    id: string;
    largeImageURL: string;
  }
  
  export type ResponseData = {
    results: ImageType[];
    total: number;
  }
  
  