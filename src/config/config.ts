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
    fromNoReply: `Venecia <noreply@venecia-showroom.com>`,
    fromAdmin: `Admin at Venecia <admin@venecia-showroom.com>`,
    supportEmail: "support@venecia-showroom.com",
  },
  colors: {
    theme: "light",
    main: "#F59C1D", // Brand main color
  },
  auth: {
    loginUrl: "/api/auth/signin",
    callbackUrl: "/dashboard",
  },
  company: {
    name: "Cima Prince",
    address: "Company Address",
    buildingName: "Venecia",
    buildingAddress: "CALLE VIRREY MANUEL DE GUIRIOR N°705",
    email: "ventas@cimaprince.com",
    website: "https://venecia-showroom.com/",
    maquetaUrl: "https://rvisioon.shapespark.com/edificio_santa_fe/",
    buildingSocials: {
      facebook: "https://www.facebook.com/Cimaprince.SAC",
      instagram: "https://www.instagram.com/cimaprince/",
      tiktok: "https://www.tiktok.com/@grupo.cima.prince"
    },
    realStateName: "Cima Prince",
    realStateSlogan: "Slogan of Prince",
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
