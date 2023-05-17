export enum ContentType {
  json = 'application/json',
  multipart = 'multipart/form-data',
}
export interface IDrawerPage {
  src: string;
  alt: string;
  pageName: string;
  route: string;
}
