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
  };
}
