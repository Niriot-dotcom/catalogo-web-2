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
  CAROUSEL_HORIZONTAL: "CAROUSEL_HORIZONTAL",
};
export const EnumVariantesDeColor = {
  SIN_ACERCAMIENTO: "SIN_ACERCAMIENTO",
  HORIZONTAL: "HORIZONTAL",
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
    launchVideo: "https://www.youtube.com/watch?v=cQ9SO630Pes",
    downloadLink: "https://bit.ly/INVIERNO_24_25_MX",
    image: "/images/invierno/PORTADA_INVIERNO_24-25.jpg",
    description:
      "Una de las temporadas más esperadas del año, ¡El invierno! Los días comienzan a ser más fríos y es momento de transformar nuestro hogar en un lugar más cálido y acogedor en familia. Desde la habitación, con texturas súper suaves y calientitas, hasta la sala y la cocina, creando ambientes llenos de magia en donde se disfrutan momentos de alegría junto a nuestros seres queridos por la llegada de la Navidad. Vive con nosotros esta época de compartir tradiciones juntos, alimentar el espíritu de la fé y fortalecer la armonía y el amor en el hogar.",
    logo: "/images/invierno/recursos/LOGOTIPO_INVIERNO.svg",
  },
  biasi: {
    title: "Biasi",
    year: "2025",
    url: "/biasi",
    launchVideo: "",
    downloadLink: "",
    image: "/images/biasi/PortadaBiasi25.jpg",
    description:
      "Hemos reunido una selección exclusiva de artículos que brindarán soluciones prácticas y con estilo para cada habitación de tu hogar, desde la cocina hasta el cuarto de lavado. Descubre con nosotros las últimas tendencias en decoración, ideas innovadoras y prácticas para aprovechar cada rincón de tu hogar y hacerlo un lugar aún más especial.",
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
