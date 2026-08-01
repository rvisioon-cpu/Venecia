export interface AdviserData {
  id: string;
  name: string;
  role: string;
  gender: 'male' | 'female';
  phone: string;
  email?: string;
  whatsappMessage: string;
}

export const advisersData: AdviserData[] = [
  {
    id: 'asesor-1',
    name: "Asesor 1",
    role: "Asesor Comercial",
    gender: 'male',
    phone: "+51 932 916 121",
    whatsappMessage: "Hola, vengo de la página web de Venecia, me gustaría recibir más información."
  },
  {
    id: 'asesor-2',
    name: "Asesor 2",
    role: "Asesor Comercial",
    gender: 'male',
    phone: "+51 937 466 028",
    whatsappMessage: "Hola, vengo de la página web de Venecia, me gustaría recibir más información."
  }
];
