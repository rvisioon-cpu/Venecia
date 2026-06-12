export interface HomepageData {
  hero: {
    logo: string;
    button: string;
  };
  intro: {
    poster: string;
    video: string;
  };
  slides: {
    text: string;
    highlight?: string;
  }[];
}

import { getAssetUrl } from '../utils/assets';

export const homepageData: HomepageData = {
  hero: {
    logo: getAssetUrl("identity/logo_venecia_transparent.png"),
    button: "Entrar"
  },
  intro: {
    poster: getAssetUrl("identity/portada_venecia.png"),
    video: getAssetUrl("videos/walk.mp4")
  },
  slides: [
    {
      text: "{{highlight}} redefine la manera de vivir la ciudad con un diseño moderno y funcional.",
      highlight: "Venecia"
    },
    {
      text: "Vive en un entorno residencial con fácil acceso a avenidas principales, comercios y servicios."
    },
    {
      text: "Arquitectura con líneas limpias y balcones que abren el edificio a la ciudad. Aprovecha el espacio vertical sin sentirse encerrado."
    },
    {
      text: "Fachada de concreto y vidrio que resalta por simple y atemporal."
    },
    {
      text: "Líneas verticales, terrazas y amplias ventanas que darán iluminación natural a tu nuevo hogar."
    }
  ]
};