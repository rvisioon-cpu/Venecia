export interface ConfigProps {
  appName: string;
  appDescription: string;
  domainName: string;
  resend: {
    fromNoReply: string;
    fromAdmin: string;
    supportEmail: string;
  };
  colors: {
    theme: "light" | "dark";
    main: string;
  };
  auth: {
    loginUrl: string;
    callbackUrl: string;
  };
  company: {
    name: string;
    address: string;
    buildingName: string;
    buildingAddress: string;
    email: string;
    website: string;
    // Provincia/departamento donde opera la inmobiliaria. Aparece en el
    // encabezado de las páginas legales ("ubicada en ..., Lima, Perú"): no
    // todos los proyectos están en Lima, así que no se puede fijar en el texto.
    city: string;
    country: string;
    // Teléfono de la inmobiliaria para las páginas legales. Si queda vacío, la
    // fila del teléfono no se pinta en lugar de mostrar un campo hueco.
    phone?: string;
    maquetaUrl?: string;
    buildingSocials: {
      facebook: string;
      instagram: string;
      tiktok: string;
    };
    realStateName: string;
    realStateSlogan: string;
    realStateSocials: {
      facebook: string;
      instagram: string;
      tiktok: string;
    };
    developer: string;
    developerSlogan: string;
    developerSocials: {
      facebook: string;
      instagram: string;
      tiktok: string;
    };
  };
}

const config: ConfigProps = {
  appName: "Venecia",
  appDescription: "Showroom Virtual Venecia",
  domainName: "venecia-showroom.com",
  resend: {
    fromNoReply: `Venecia <noreply@venecia.cimaprince.com>`,
    fromAdmin: `Admin at Venecia <admin@venecia.cimaprince.com>`,
    supportEmail: "support@venecia.cimaprince.com",
  },
  colors: {
    theme: "light",
    main: "#0c5a5b", // Brand main color
  },
  auth: {
    loginUrl: "/api/auth/signin",
    callbackUrl: "/dashboard",
  },
  company: {
    name: "Cima Prince",
    address: "Calle Pablo Olavide 151, San Isidro, Perú",
    buildingName: "Venecia",
    buildingAddress: "CALLE VIRREY MANUEL DE GUIRIOR N°705",
    email: "ventas@cimaprince.com",
    website: "https://venecia.cimaprince.com/",
    city: "Lima",
    country: "Perú",
    phone: "",
    maquetaUrl: "https://rvisioon.shapespark.com/edificio_santa_fe/",
    buildingSocials: {
      facebook: "https://www.facebook.com/Cimaprince.SAC",
      instagram: "https://www.instagram.com/cimaprince/",
      tiktok: "https://www.tiktok.com/@grupo.cima.prince"
    },
    realStateName: "Cima Prince",
    realStateSlogan: "Profesionales en la gestión y desarrollo de proyectos",
    realStateSocials: {
      facebook: "https://www.facebook.com/Cimaprince.SAC",
      instagram: "https://www.instagram.com/cimaprince/",
      tiktok: "https://www.tiktok.com/@grupo.cima.prince"
    },
    developer: "RVSIOON",
    developerSlogan: "Imagina, diseña y visualiza tu proyecto",
    developerSocials: {
      facebook: "https://facebook.com/developer",
      instagram: "https://instagram.com/developer",
      tiktok: "https://tiktok.com/@developer"
    }
  }
};

export default config;
