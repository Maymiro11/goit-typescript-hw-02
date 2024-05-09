export type Image = {
    id: string;
    webformatURL: string;
  }
  
  export type ModalImage = {
    id: string;
    largeImageURL: string;
  }
  
  export type ResponseData = {
    results: Image[];
    total: number;
  }
  
  