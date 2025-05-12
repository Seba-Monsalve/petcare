export interface Pet {
  id: string;
  name: string;
  species: string;
  sex: string;
  weight: string | number;
  sterilized: boolean;
  breed: string;
  urlImage?: string;
  dob: Date;
  isActive: boolean;
  owner: {
    username: string;
    email: string;
    phone: string;
    address: string;
  };
  vaccinationHistory: VaccinationRecord[];
  medicalRecord: MedicalRecord[];
  notes: string[];
  microchip: string | null;
}

interface VaccinationRecord {
  id: string;
  type: string;
  date: Date;
  nextDate: Date;
  status: boolean;
}

interface MedicalRecord {
  id: 1;
  type: string;
  date: Date;
  description: string;
}
