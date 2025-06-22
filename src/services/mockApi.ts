
export interface Company {
  id: string;
  name: string;
  description: string;
  category: string;
  phone: string;
  website: string;
  address: string;
  employees: string;
  founded: number;
  lat: number;
  lng: number;
  ownerId: string; // ID do usuário que é dono da empresa
}

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  lat: number;
  lng: number;
  ownerId: string; // ID do usuário que criou o evento
}

const mockCompanies: Company[] = [
  {
    id: '1',
    name: "TechJoinville Solutions",
    description: "Desenvolvimento de software e sistemas web",
    category: "Tecnologia",
    phone: "(47) 3422-1234",
    website: "www.techjoinville.com.br",
    address: "Rua das Palmeiras, 123 - Centro, Joinville - SC",
    employees: "50-100",
    founded: 2015,
    lat: -26.3044,
    lng: -48.8487,
    ownerId: '2'
  },
  {
    id: '2',
    name: "Metalúrgica Norte SC",
    description: "Fundição e usinagem de peças industriais",
    category: "Metalurgia",
    phone: "(47) 3435-5678",
    website: "www.metalurgicnorte.com.br",
    address: "Av. Industrial, 456 - Distrito Industrial, Joinville - SC",
    employees: "100-200",
    founded: 2010,
    lat: -26.2946,
    lng: -48.8397,
    ownerId: '3'
  }
];

const mockEvents: Event[] = [
  {
    id: '1',
    name: "Festival de Dança de Joinville",
    description: "O maior festival de dança do mundo",
    date: "2024-07-15",
    location: "Centreventos Cau Hansen",
    lat: -26.2985,
    lng: -48.8456,
    ownerId: '4'
  },
  {
    id: '2',
    name: "Feira do Empreendedor",
    description: "Networking e oportunidades de negócio",
    date: "2024-08-20",
    location: "Expoville",
    lat: -26.2757,
    lng: -48.8234,
    ownerId: '4'
  }
];

// Simulação de delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Companies API
export const companiesApi = {
  getAll: async (): Promise<Company[]> => {
    await delay(500);
    return [...mockCompanies];
  },

  getById: async (id: string): Promise<Company | null> => {
    await delay(300);
    return mockCompanies.find(c => c.id === id) || null;
  },

  create: async (company: Omit<Company, 'id'>): Promise<Company> => {
    await delay(800);
    const newCompany = { ...company, id: Date.now().toString() };
    mockCompanies.push(newCompany);
    return newCompany;
  },

  update: async (id: string, company: Partial<Company>): Promise<Company | null> => {
    await delay(800);
    const index = mockCompanies.findIndex(c => c.id === id);
    if (index !== -1) {
      mockCompanies[index] = { ...mockCompanies[index], ...company };
      return mockCompanies[index];
    }
    return null;
  },

  delete: async (id: string): Promise<boolean> => {
    await delay(500);
    const index = mockCompanies.findIndex(c => c.id === id);
    if (index !== -1) {
      mockCompanies.splice(index, 1);
      return true;
    }
    return false;
  }
};

// Events API
export const eventsApi = {
  getAll: async (): Promise<Event[]> => {
    await delay(500);
    return [...mockEvents];
  },

  getById: async (id: string): Promise<Event | null> => {
    await delay(300);
    return mockEvents.find(e => e.id === id) || null;
  },

  create: async (event: Omit<Event, 'id'>): Promise<Event> => {
    await delay(800);
    const newEvent = { ...event, id: Date.now().toString() };
    mockEvents.push(newEvent);
    return newEvent;
  },

  update: async (id: string, event: Partial<Event>): Promise<Event | null> => {
    await delay(800);
    const index = mockEvents.findIndex(e => e.id === id);
    if (index !== -1) {
      mockEvents[index] = { ...mockEvents[index], ...event };
      return mockEvents[index];
    }
    return null;
  },

  delete: async (id: string): Promise<boolean> => {
    await delay(500);
    const index = mockEvents.findIndex(e => e.id === id);
    if (index !== -1) {
      mockEvents.splice(index, 1);
      return true;
    }
    return false;
  }
};
