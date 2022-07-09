export interface Movie {
  id: any;
  title: string;
  description: string;
  imageUrl: string;
  subImages:string[];
  isPopular: boolean;
  datePublished: number;
  categoryId:number;
}
