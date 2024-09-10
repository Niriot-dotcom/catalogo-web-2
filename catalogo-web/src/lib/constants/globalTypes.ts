export const ScreenGrids = {
  mobile: { cols: 8, rows: 36 },
  desktop: { cols: 24, rows: 16 },
};

export type CellProps = {
  begin: number[];
  cols: number;
  rows: number;
  component: string;
  renderComponent: string;
};

export type CatalogSection = {
  name: string;
};

export type CatalogFilter = {
  seeAll: boolean;
  section: string;
  productTypes: string[];
  color: string;
};

export enum Catalogs {
  BIASI = "BIASI",
  CHAVOS = "CHAVOS",
  INVIERNO = "INVIERNO",
  VIANNEY = "VIANNEY",
  BEBE = "BEBE",
}

export enum Templates {
  twoSides = "twoSides",
  portadilla = "portadilla",
  videoAndGrid = "videoAndGrid",
  imagesAndGrid = "imagesAndGrid",
  floatingImages = "floatingImages",
  mainAndElements = "mainAndElements",
}

export type SectionCategory = {
  link: string;
  title: string;
  subtitle: string;
  image: string;
  position: string;
  isActive: boolean;
};

export type DatabasePage = {
  // pageTemplate: string;
  // pageTitle: string;
  // pageSubtitle?: string;
  // pageCategory?: string;
  // pageMainImage?: string;
  // pageCopys?: string;
  // pageImages?: string;

  // pageResources?: string;
  // pageMainVideo?: string;

  // pageType?: string;
  // pageProducts?: string;
  // pageIcons?: string;
  // pageVideos?: string;
  // pageRelatedProducts?: string;
  // pageComplementProducts?: string;
  // pageDescriptions?: string;
  // pageProductsInImage?: string;
  // pageProductsImages?: string;
  // pageProductsImagesPosition?: string;
  // pageSeoTitle?: string;
  // pageKeywords?: string;
  // pageSeoDescription?: string;
  // pageStatus?: string;
  // storageFoto?: string;
  // storageVideo?: string;
  // ID?: string;

  SKU: string;
  productType: string;
  productName: string;
  status: string;
  productSection: string;
  productOrder: number;
  pageTemplate: string;
  pageTitle: string;
  pageResources: string;
  complSheets: string[];
  complCurtains: string[];
  complPillowCovers: string[];
  complCushions: string[];
  complDecoration: string[];
  pageCopys: string[];
  pageKeywords: string[];
  pageVideos: string[];
  pageStatus: string;
  pageRelatedProducts: string[];
  pageIcons: string[];
  pageSubtitle: string;
  pageSeoTitle: string;
  pageSeoDescription: string;
};
