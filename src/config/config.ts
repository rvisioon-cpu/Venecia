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
    name: "Prince",
    address: "Company Address",
    buildingName: "Venecia",
    buildingAddress: "Building Address",
    email: "sales@venecia-showroom.com",
    website: "https://venecia-showroom.com/",
    maquetaUrl: "https://rvisioon.shapespark.com/edificio_santa_fe/",
    buildingSocials: {
      facebook: "https://facebook.com/venecia",
      instagram: "https://instagram.com/venecia",
      tiktok: "https://tiktok.com/@venecia"
    },
    realStateName: "Prince",
    realStateSlogan: "Slogan of Prince",
    realStateSocials: {
      facebook: "https://facebook.com/prince",
      instagram: "https://instagram.com/prince",
      tiktok: "https://tiktok.com/@prince"
    },
    developer: "Developer Name",
    developerSlogan: "Slogan of the developer",
    developerSocials: {
      facebook: "https://facebook.com/developer",
      instagram: "https://instagram.com/developer",
      tiktok: "https://tiktok.com/@developer"
    }
  }
};

export default config;
