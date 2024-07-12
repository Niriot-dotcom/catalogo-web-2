import type { FooterCategory } from "./globalTypes";

export type ProductType = { id: string; name: string };

export const ChavosProductsTypes: ProductType[] = [
  { id: "novo", name: "Novo" },
  { id: "basic", name: "Basic" },
];

export const getChavosProducts = () => {
  const all = [
    ///////////////////////
    // para ellas
    ///////////////////////

    // juegos de edredon
    { name: "Jade", ref: "recamara#jade", image: "" },
    { name: "Cute", ref: "recamara#cute", image: "" },
    { name: "Harry Potter", ref: "recamara#harry-potter", image: "" },
    { name: "Unicornio", ref: "recamara#unicornio", image: "" },
    { name: "Thai", ref: "recamara#thai", image: "" },
    { name: "Pretty", ref: "recamara#pretty", image: "" },
    { name: "Duvet", ref: "recamara#duvet", image: "" },
    { name: "Cosmos", ref: "recamara#cosmos", image: "" },
    { name: "Roseta", ref: "recamara#roseta", image: "" },
    { name: "Lilac", ref: "recamara#lilac", image: "" },
    { name: "Pavia", ref: "recamara#pavia", image: "" },
    { name: "Aruba", ref: "recamara#aruba", image: "" },
    { name: "Verona", ref: "recamara#verona", image: "" },
    { name: "Stars", ref: "recamara#stars", image: "" },
    { name: "Art", ref: "recamara#art", image: "" },

    // fundas de duvet
    { name: "Deco", ref: "recamara#deco", image: "" },
    { name: "Marbella", ref: "recamara#marbella", image: "" },

    // edredon novo
    { name: "Cooper", ref: "recamara#cooper", image: "" },
    { name: "Corazones", ref: "recamara#corazones", image: "" },
    { name: "Marsalla", ref: "recamara#marsalla", image: "" },
    { name: "Olivo", ref: "recamara#olivo", image: "" },
    { name: "Malva", ref: "recamara#malva", image: "" },
    { name: "Abstract", ref: "recamara#abstract", image: "" },
    { name: "Cuarzo", ref: "recamara#cuarzo", image: "" },
    { name: "Deep Rose", ref: "recamara#deep-rose", image: "" },
    { name: "Malibú", ref: "recamara#malibu", image: "" },
    { name: "Creta", ref: "recamara#creta", image: "" },
    { name: "Milán", ref: "recamara#milan", image: "" },
    { name: "Mostaza", ref: "recamara#mostaza", image: "" },

    // cobertor ligero
    { name: "Frazadas", ref: "recamara#frazadas", image: "" },
    { name: "Colors", ref: "recamara#colors", image: "" },
    { name: "Harry Potter", ref: "recamara#harry-potter", image: "" },
    { name: "Rosa", ref: "recamara#rosa", image: "" },
    { name: "Dreams", ref: "recamara#dreams", image: "" },
    { name: "Glaciar", ref: "recamara#glaciar", image: "" },
    { name: "Art", ref: "recamara#art", image: "" },
    { name: "Sweet unicorn", ref: "recamara#sweet-unicorn", image: "" },

    // edredon basic
    { name: "Ocre", ref: "recamara#ocre", image: "" },
    { name: "Menta", ref: "recamara#menta", image: "" },
    { name: "Art", ref: "recamara#art", image: "" },

    ///////////////////////
    // para ellos
    ///////////////////////

    // juego de edredon
    { name: "Gales", ref: "recamara#gales", image: "" },
    { name: "Dinamarca", ref: "recamara#dinamarca", image: "" },
    { name: "Batman", ref: "recamara#batman", image: "" },
    { name: "Harry Potter", ref: "recamara#harry-potter", image: "" },
    { name: "Deportes", ref: "recamara#deportes", image: "" },
    { name: "PS5", ref: "recamara#ps5", image: "" },
    { name: "Atlanta", ref: "recamara#atlanta", image: "" },
    { name: "Racing", ref: "recamara#racing", image: "" },
    { name: "Rex", ref: "recamara#rex", image: "" },
    { name: "Chicago", ref: "recamara#chicago", image: "" },
    { name: "X Box", ref: "recamara#xbox", image: "" },

    // edredon novo
    { name: "Marsala", ref: "recamara#marsala", image: "" },
    { name: "Dinos", ref: "recamara#dinos", image: "" },
    { name: "Olivo", ref: "recamara#olivo", image: "" },
    { name: "Mostaza", ref: "recamara#mostaza", image: "" },
    { name: "Ultramar", ref: "recamara#ultramar", image: "" },
    { name: "Cobalto", ref: "recamara#cobalto", image: "" },
    { name: "Boston", ref: "recamara#boston", image: "" },

    // edredon basic
    { name: "Ocre", ref: "recamara#ocre", image: "" },

    // funda de duvet
    { name: "Londres", ref: "recamara#londres", image: "" },

    // cobertor ligero
    { name: "Harry Potter", ref: "recamara#harry-potter", image: "" },
    { name: "Rex", ref: "recamara#rex", image: "" },
    { name: "Video Game", ref: "recamara#videogame", image: "" },
    { name: "X Box", ref: "recamara#xbox", image: "" },
    { name: "Dinosaurios", ref: "recamara#dinosaurios", image: "" },

    // otros
    { name: "Complementos", ref: "complementos", image: "" },
    { name: "Almohadas", ref: "almohadas", image: "" },
    { name: "Protectores", ref: "protectores-de-colchon", image: "" },
    { name: "Sábanas", ref: "sabanas", image: "" },
    { name: "Cortinas", ref: "cortinas", image: "" },
    // { name: "Toallas", ref: "toallas", image: "" },
  ];

  const allCategorized = {
    paraEllas: {
      edredones: [
        { name: "Jade", ref: "", image: "" },
        { name: "Cute", ref: "", image: "" },
        { name: "Harry Potter", ref: "", image: "" },
        { name: "Unicornio", ref: "", image: "" },
        { name: "Thai", ref: "", image: "" },
        { name: "Pretty", ref: "", image: "" },
        { name: "Duvet", ref: "", image: "" },
        { name: "Cosmos", ref: "", image: "" },
        { name: "Roseta", ref: "", image: "" },
        { name: "Lilac", ref: "", image: "" },
        { name: "Pavia", ref: "", image: "" },
        { name: "Aruba", ref: "", image: "" },
        { name: "Verona", ref: "", image: "" },
        { name: "Stars", ref: "", image: "" },
        { name: "Art", ref: "", image: "" },
      ],

      fundasDeDuvet: [
        { name: "Deco", ref: "", image: "" },
        { name: "Marbella", ref: "", image: "" },
      ],

      edredonNovo: [
        { name: "Cooper", ref: "", image: "" },
        { name: "Corazones", ref: "", image: "" },
        { name: "Marsalla", ref: "", image: "" },
        { name: "Olivo", ref: "", image: "" },
        { name: "Malva", ref: "", image: "" },
        { name: "Abstract", ref: "", image: "" },
        { name: "Cuarzo", ref: "", image: "" },
        { name: "Deep Rose", ref: "", image: "" },
        { name: "Malibú", ref: "", image: "" },
        { name: "Creta", ref: "", image: "" },
        { name: "Milán", ref: "", image: "" },
        { name: "Mostaza", ref: "", image: "" },
      ],

      cobertorLigero: [
        { name: "Frazadas", ref: "", image: "" },
        { name: "Colors", ref: "", image: "" },
        { name: "Harry Potter", ref: "", image: "" },
        { name: "Rosa", ref: "", image: "" },
        { name: "Dreams", ref: "", image: "" },
        { name: "Glaciar", ref: "", image: "" },
        { name: "Art", ref: "", image: "" },
        { name: "Sweet unicorn", ref: "", image: "" },
      ],

      edredonBasic: [
        { name: "Ocre", ref: "", image: "" },
        { name: "Menta", ref: "", image: "" },
        { name: "Art", ref: "", image: "" },
      ],
    },

    paraEllos: {
      juegosDeEdredon: [
        { name: "Gales", ref: "", image: "" },
        { name: "Dinamarca", ref: "", image: "" },
        { name: "Batman", ref: "", image: "" },
        { name: "Harry Potter", ref: "", image: "" },
        { name: "Deportes", ref: "", image: "" },
        { name: "PS5", ref: "", image: "" },
        { name: "Atlanta", ref: "", image: "" },
        { name: "Racing", ref: "", image: "" },
        { name: "Rex", ref: "", image: "" },
        { name: "Chicago", ref: "", image: "" },
        { name: "X Box", ref: "", image: "" },
      ],

      edredonNovo: [
        { name: "Marsala", ref: "", image: "" },
        { name: "Dinos", ref: "", image: "" },
        { name: "Olivo", ref: "", image: "" },
        { name: "Mostaza", ref: "", image: "" },
        { name: "Ultramar", ref: "", image: "" },
        { name: "Cobalto", ref: "", image: "" },
        { name: "Boston", ref: "", image: "" },
      ],

      edredonBasic: [{ name: "Ocre", ref: "", image: "" }],

      fundasDeDuvet: [{ name: "Londres", ref: "", image: "" }],

      cobertorLigero: [
        { name: "Harry Potter", ref: "", image: "" },
        { name: "Rex", ref: "", image: "" },
        { name: "Video Game", ref: "", image: "" },
        { name: "X Box", ref: "", image: "" },
        { name: "Dinosaurios", ref: "", image: "" },
      ],

      otros: [
        { name: "Complementos", ref: "", image: "" },
        { name: "Almohadas", ref: "", image: "" },
        { name: "Protectores", ref: "", image: "" },
        { name: "Sábanas", ref: "", image: "" },
        { name: "Cortinas", ref: "", image: "" },
        { name: "Toallas", ref: "", image: "" },
      ],
    },
  };

  return all;
};

export const ChavosGeneralFilters = {
  recamara: {
    sizes: ["individual", "matrimonial"],
    prices: [
      [0, 300],
      [301, 500],
      [501, 900],
    ],
    colors: ["rojo", "pink", "green"],
  },
  sabanas: {
    sizes: ["individual", "matrimonial"],
    prices: [
      [0, 300],
      [301, 500],
      [501, 900],
    ],
    colors: ["rojo", "pink", "green"],
  },
  cortinas: {
    sizes: ["chica", "grande"],
    prices: [
      [0, 300],
      [301, 500],
      [501, 900],
    ],
    colors: ["beige", "pink", "green"],
  },
  almohadas: {
    sizes: ["individual", "matrimonial"],
    prices: [
      [0, 300],
      [301, 500],
      [501, 900],
    ],
    colors: ["rojo", "pink", "green"],
  },
  protectoresDeColchon: {
    sizes: ["individual", "matrimonial"],
    prices: [
      [0, 300],
      [301, 500],
      [501, 900],
    ],
    colors: ["rojo", "pink", "green"],
  },
  complementos: {
    sizes: ["individual", "matrimonial"],
    prices: [
      [0, 300],
      [301, 500],
      [501, 900],
    ],
    colors: ["rojo", "pink", "green"],
  },
  decoracion: {
    sizes: ["individual", "matrimonial"],
    prices: [
      [0, 300],
      [301, 500],
      [501, 900],
    ],
    colors: ["rojo", "pink", "green"],
  },
  bano: {
    sizes: ["individual", "matrimonial"],
    prices: [
      [0, 300],
      [301, 500],
      [501, 900],
    ],
    colors: ["rojo", "pink", "green"],
  },
  vialite: {
    sizes: ["individual", "matrimonial"],
    prices: [
      [0, 300],
      [301, 500],
      [501, 900],
    ],
    colors: ["rojo", "pink", "green"],
  },
};

export const ChavosSections = {
  recamara: {
    name: "Recámara",
    ref: "recamara",
    icon: "",
    subcategories: [
      { id: "novo", name: "edredon novo" },
      { id: "nuut", name: "edredon nuut" },
      { id: "edredon", name: "juego de edredon" },
      { id: "duvet", name: "duvet" },
      { id: "funda-de-duvet", name: "funda de duvet" },
      { id: "ligero", name: "cobertor ligero" },
      { id: "frazada", name: "frazadas" },
      { id: "tendencia", name: "tendencia" },
      { id: "textura", name: "textura" },
      { id: "ellas", name: "ellas" },
      { id: "ellos", name: "ellos" },
      { id: "brilla-oscuridad", name: "brilla en la oscuridad" },
      { id: "licencia", name: "colaboraciones" },
    ],
  },
  sabanas: {
    name: "Sábanas",
    ref: "sabanas",
    icon: "",
    subcategories: [
      { id: "camiseta", name: "camiseta" },
      { id: "cabos", name: "cabos" },
      { id: "viasoft-washed", name: "viasoft washed" },
      { id: "algodon", name: "algodón" },
      { id: "viasoft", name: "microfibra / viasoft" },
      { id: "licencia", name: "colaboraciones" },
    ],
  },
  cortinas: {
    name: "Cortinas",
    ref: "cortinas",
    icon: "",
    subcategories: [
      { id: "blackout", name: "blackout" },
      { id: "viasoft", name: "viasoft / luz media" },
      { id: "translucida", name: "translúcidas" },
      { id: "duo", name: "dúo" },
      { id: "textura", name: "texturas" },
      { id: "cortinero", name: "cortineros" },
    ],
  },
  almohadas: {
    name: "Almohadas",
    ref: "almohadas",
    icon: "",
    subcategories: [
      { id: "viafoam", name: "almohadas viafoam" },
      { id: "almohada", name: "almohadas" },
      { id: "cojin-viafoam", name: "cojines viafoam" },
      { id: "soporte-firme", name: "soporte firme" },
      { id: "soporte-medio", name: "soporte medio" },
      { id: "soporte-suave", name: "soporte suave" },
    ],
  },
  protectoresDeColchon: {
    name: "Protectores de Colchón",
    ref: "protectores-de-colchon",
    icon: "",
    subcategories: [],
  },
  complementos: {
    name: "Complementos",
    ref: "complementos",
    icon: "",
    subcategories: [
      { id: "almohada-abrazable", name: "almohadas abrazables" },
      { id: "tapete", name: "tapetes" },
      { id: "cesto", name: "cestos" },
      { id: "puff", name: "puffs" },
      { id: "rodapie", name: "rodapiés" },
      { id: "licencia", name: "licencias / colaboraciones" },
      { id: "textura", name: "texturas" },
    ],
  },
  decoracion: {
    name: "Decoración",
    ref: "decoracion",
    icon: "",
    subcategories: [
      { id: "cojin", name: "cojines y fundas de cojín" },
      { id: "cojin-xl", name: "cojines xl" },
      { id: "funda-almohada", name: "fundas de almohada" },
      { id: "adorno-luminoso", name: "adornos luminosos" },
      { id: "adorno-religioso", name: "adornos religiosos" },
      { id: "repisa", name: "repisas" },
      { id: "adorno-pared", name: "adornos de pared" },
      { id: "licencia", name: "licencias / colaboraciones" },
      { id: "tendencia", name: "tendencia" },
    ],
  },
  bano: {
    name: "Baño",
    ref: "bano",
    icon: "",
    subcategories: [
      { id: "toalla-bali", name: "toallas bali" },
      { id: "toalla-microsport", name: "toallas microsport" },
      { id: "toalla-tulum", name: "toallas tulum" },
      { id: "toalla-caribe", name: "toallas caribe" },
      { id: "toalla-mawi", name: "toallas mawi" },
      { id: "bata", name: "batas" },
      { id: "salida", name: "salidas de baño" },
      { id: "algodon", name: "algodón" },
      { id: "microfibra", name: "microfibra" },
      { id: "licencia", name: "licencias / colaboraciones" },
      { id: "estampado", name: "estampado" },
      { id: "liso", name: "liso" },
    ],
  },
  vialite: {
    name: "Vialité",
    ref: "vialite",
    icon: "",
    subcategories: [],
  },
};

const ChavosCategories: FooterCategory[] = [
  {
    id: "",
    name: "Ellas",
    link: "recamara-1",
    mainCategory: "Recámara",
    image: "/images/chavos/secciones/Ellas.webp",
    isActive: true,
  },
  {
    id: "",
    name: "Ellos",
    link: "recamara-2",
    mainCategory: "Recámara",
    image: "/images/chavos/secciones/Ellos.webp",
    isActive: true,
  },
  {
    id: "",
    name: "Cobertores y Básicos",
    link: "recamara-3",
    mainCategory: "Recámara",
    image: "/images/chavos/secciones/CobertoresYBasicos.webp",
    isActive: true,
  },
  {
    id: "",
    name: "Complementos 1",
    link: "complementos-1",
    mainCategory: "Complementos 1",
    image: "/images/chavos/secciones/Complementos1.webp",
    isActive: true,
  },
  {
    id: "",
    name: "Toallas 1",
    link: "toallas-1",
    mainCategory: "Toallas 1",
    image: "/images/chavos/secciones/Toallas1.webp",
    isActive: true,
  },
  {
    id: "",
    name: "Toallas 2",
    link: "toallas-2",
    mainCategory: "Toallas 2",
    image: "/images/chavos/secciones/Toallas2.webp",
    isActive: true,
  },
  {
    id: "",
    name: "Complementos 2",
    link: "complementos-2",
    mainCategory: "Complementos 2",
    image: "/images/chavos/secciones/Complementos2.webp",
    isActive: true,
  },
  {
    id: "",
    name: "Decoración",
    link: "decoracion",
    mainCategory: "Decoración",
    image: "/images/chavos/secciones/Decoracion.webp",
    isActive: true,
  },
];

export default ChavosCategories;
