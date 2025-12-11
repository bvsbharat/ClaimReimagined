
export enum ClaimStatus {
  Review = 'In Review',
  Approved = 'Approved',
  Pending = 'Pending Info',
  Rejected = 'Rejected',
}

export enum IncidentType {
  Collision = 'Collision',
  Theft = 'Theft',
  Weather = 'Weather Damage',
  Vandalism = 'Vandalism',
  Fire = 'Fire',
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Person {
  id: string;
  name: string;
  role: 'Policy Holder' | 'Witness' | 'Driver' | 'Third Party';
  avatarUrl: string;
}

export interface Coverage {
  policyType: string;
  deductible: number;
  coverageLimit: number;
  monthlyPremium: number;
  startDate: string;
  endDate: string;
}

export interface CarDetails {
  make: string;
  model: string;
  year: number;
  color: string;
  plateNumber: string;
  vin: string;
  trim: string;
  drivetrain: string;
  mileage: number;
}

export interface BoundingBox {
  ymin: number;
  xmin: number;
  ymax: number;
  xmax: number;
}

export interface DamageRegion {
  id: string;
  label: string;
  box: BoundingBox;
  confidence: number;
  description?: string;
}

export interface Claim {
  id: string;
  policyNumber: string;
  holder: Person;
  date: string;
  time: string;
  location: string;
  coordinates: Coordinates;
  type: IncidentType;
  status: ClaimStatus;
  description: string;
  damageEstimate: number;
  weatherCondition: string;
  temperature: number;
  involvedParties: Person[];
  carDetails: CarDetails;
  coverage: Coverage;
  scenePrompt: string; // The prompt used to generate the scene
  generatedImage?: string; // Cache for the generated image
  rawFnolData: string; // Raw FNOL transcript data (Read Only)
  adjusterNotes: string; // Additional context added by the adjuster
  evidencePhotos: string[]; // URLs of user uploaded damage photos
}

export interface WeatherData {
  condition: string;
  temp: number;
  humidity: number;
  windSpeed: number;
}
