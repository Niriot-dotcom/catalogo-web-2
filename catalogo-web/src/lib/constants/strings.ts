export const URLS = {
  fotos: "https://storage.googleapis.com/catalogo-web/fotos/",
  videos: "https://storage.googleapis.com/catalogo-web/videos/",
  iconos: "https://storage.googleapis.com/catalogo-web/iconos/",
  landing: "https://catalogos.vianney.mx/",
  tienda:
    "https://storage.googleapis.com/imagenes-productos/Productos_Vianney/",
};
export const COLORS = {
  beige: "#fff7f2",
  bgVialifresh: "#e6f1f2",
  bgViafoam: "#FDF7EE",
  bgBasicPillow: "#d5cee2",
  bgTencel: "#77b9a1",
  bgNuit: "#1e3866",
  disabled: "#888",
  white: "#fff",
  black: "#000",
};
export const LEGALES_SVGS: Record<string, string[]> = {
  PLAYSTATION5: ["LEGALES_24_PS4_2.svg"],
  PLAYSTATION: ["LEGALES_24_PS4_2.svg"],
  PS4: ["LEGALES_24_PS4_2.svg"],
  PS5: ["LEGALES_24_PS4_2.svg"],
  XBOX: ["LEGALES_24_XBOX.svg"],
  HARRYPOTTER: [
    // "LEGALES_24_HP.svg",
    "LEGALES_24_HP_2.svg",
    // "LEGALES_24_HP_3.svg",
  ],
  BATMAN: [
    "LEGALES_24_BATMAN.svg",
    // "LEGALES_24_BATMAN_2.svg"
  ],
  // PLAYSTATION: ["LEGALES_24_PLAYSTATION.svg"],
};
export const EnumAmbienteConMiniambiente = {
  // mini ambiente
  DOBLE: "DOBLE",
  HORIZONTAL: "HORIZONTAL",
  VERTICAL: "VERTICAL",

  // last part
  COMPLEMENTOS: "COMPLEMENTOS",
  VARIANTES: "VARIANTES",
  NADA: "NADA",
};
export const EnumSublinea = {
  PRINCIPAL_Y_TEXTURA: "PRINCIPAL_Y_TEXTURA",
  INDIVIDUAL: "INDIVIDUAL",
  DOBLE: "DOBLE",
  DOBLE_VERTICAL: "DOBLE_VERTICAL",
  DOBLE_SLIDER: "DOBLE_SLIDER",
  CUATRO: "CUATRO",
};
export const EnumVariantesDeColor = {
  SIN_ACERCAMIENTO: "SIN_ACERCAMIENTO",
};
export const EnumEntradaInvierno = {
  FOTO_VIDEO: "FOTO_VIDEO",
  VIDEO_FOTO: "VIDEO_FOTO",
  SOLO_FOTO: "SOLO_FOTO",
  SOLO_VIDEO: "SOLO_VIDEO",
};
type CatalogDetail = {
  title: string;
  year: string;
  url: string;
  launchVideo: string;
  downloadLink: string;
  image: string;
  description: string;
  logo: string;
};
export const CATALOGS_NAMES = [
  "invierno",
  "biasi",
  "chavos",
  "vianney",
  "bebe",
];
export const CATALOGS_ROUTES = {
  INVIERNO: "invierno",
  BIASI: "biasi",
  CHAVOS: "chavos",
  VIANNEY: "vianney",
  BEBE: "bebe",
};
export const VIALIFRESH_ICONS = [
  "/images/icons/ICON-CONTROLA-BAC-MENTA.svg",
  "/images/icons/ICON-CONTROLA-HON-MENTA.svg",
  "/images/icons/ICON-CONTROLA-MOH-MENTA.svg",
  "/images/icons/ICON-CONTROLA-ACA-MENTA.svg",
];
export const CATALOGS_DESCRIPTIONS: Record<string, CatalogDetail> = {
  invierno: {
    title: "Invierno",
    year: "2024-2025",
    url: "/invierno",
    launchVideo: "",
    downloadLink: "",
    image: "/images/invierno/PORTADA_INVIERNO_24-25.jpg",
    description: "",
    logo: "/images/invierno/recursos/LOGOTIPO_INVIERNO.svg",
  },
  biasi: {
    title: "Biasi",
    year: "2023-2024",
    url: "/biasi",
    launchVideo: "https://youtu.be/JeH4yR02paI",
    downloadLink: "https://bit.ly/BIASI-24",
    image:
      "https://vianney.vtexassets.com/assets/vtex.file-manager-graphql/images/a4088526-d654-4c2a-89d1-0b32c8e4ac62___af699926a12561adc26e1db51b175351.jpg",
    description:
      "Con Biasi 2023-2024 Vive simple, vive en familia. En este catálogo encontrarás los artículos ideales para organizar, amueblar y decorar cada espacio de tu hogar.",
    logo: "",
  },
  chavos: {
    title: "Chavos",
    year: "2024",
    url: "/chavos",
    launchVideo: "https://youtu.be/RXd0uuv7hHs",
    downloadLink: "https://bit.ly/47BAd7g",
    image: "/images/chavos/portadas/PortadaChavos24.jpeg",
    description:
      "¡Disfruta de un increíble viaje donde la tendencia, la textura y la modernidad se fusionan para dar vida a la esencia del estilo juvenil en tus espacios favoritos! Inspirado en la inolvidable travesía de Valeria, su familia y sus amigos, quienes celebraron su graduación con un emocionante viaje a la playa. Descubre cómo los recuerdos de este increíble viaje te brindarán colecciones únicas de textiles que reflejan la frescura, la diversión y la modernidad que caracterizan tu vida juvenil.",
    logo: "",
  },
  vianney: {
    title: "Vianney",
    year: "2024-2025",
    url: "/vianney",
    launchVideo: "https://youtu.be/znq7_-vKjk0",
    downloadLink: "https://bit.ly/Vianney24_25MX",
    image: "/images/vianney/PortadaVianney24_25.jpg",
    description:
      "¡Recrea looks maravillosos con las exquisitas texturas, colores y confecciones diseñadas para cada rincón de tu hogar! Inspirado en un recuerdo entrañable: “La casa de los abuelos”, donde cada espacio nos transporta a momentos inolvidables. Desde la cocina, donde las recetas especiales se convierten en la herencia culinaria de la familia, hasta la sala, testigo de risas y juegos entre hijos, hermanos y nietos. La recámara de los abuelos, impregnada con un aroma que nos lleva a instantes de sabiduría, cuidado y cariño. Únete a nosotros en este fascinante recorrido por un hogar que ha florecido con el tiempo, transformándose en la pasión compartida de cada generación que lo habita.",
    logo: "",
  },
  bebe: {
    title: "Bebé",
    year: "2024-2025",
    url: "/bebe",
    launchVideo: "https://youtu.be/luM3dk5X_do",
    downloadLink: "https://bit.ly/BEBE_24_25_MX",
    image: "/images/bebe/PortadaBebe24_25.jpeg",
    description:
      "Imagina una habitación llena de amor y dulzura, donde cada rincón esté impregnado de colores y texturas inspiradas en la ternura e ilusión por la llegada de un bebé, un momento especial en que mamá está creando una nueva vida. Comparte con nosotros todas las emocionantes aventuras, las nuevas experiencias, el amor incondicional y la felicidad de la maravillosa etapa de convertirse en papás y crecer juntos de la mano.",
    logo: "",
  },
};
