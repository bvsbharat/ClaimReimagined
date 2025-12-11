
import { Claim, ClaimStatus, IncidentType } from './types';
import { CloudRain, Sun, CloudLightning, Cloud, Snowflake } from 'lucide-react';
import React from 'react';

export const MOCK_CLAIMS: Claim[] = [
  {
    id: 'CLM-8921',
    policyNumber: 'OK 3980',
    holder: {
      id: 'p1',
      name: 'Valery Shevchenko',
      role: 'Policy Holder',
      avatarUrl: 'https://picsum.photos/seed/valery/200',
    },
    date: 'May 24, 2024',
    time: '8:35 PM',
    location: 'Central Garage, Level 3',
    coordinates: { lat: 52.3676, lng: 4.9041 },
    type: IncidentType.Collision,
    status: ClaimStatus.Review,
    description: 'Vehicle backed into a concrete pillar in a multi-story parking garage. Rear bumper and taillight damage.',
    damageEstimate: 2450.00,
    weatherCondition: 'Rainy',
    temperature: 19,
    involvedParties: [
      { id: 'p2', name: 'Jeremy Peresse', role: 'Witness', avatarUrl: 'https://picsum.photos/seed/jeremy/200' },
      { id: 'p3', name: 'Olga Murina', role: 'Driver', avatarUrl: 'https://picsum.photos/seed/olga/200' }
    ],
    carDetails: {
      make: 'Toyota',
      model: 'Camry',
      year: 2022,
      color: 'Silver',
      plateNumber: 'K29-FLA',
      vin: '4T1B11HK4MU9921',
      trim: 'XSE V6',
      drivetrain: 'FWD',
      mileage: 24500
    },
    coverage: {
      policyType: 'Comprehensive Plus',
      deductible: 500,
      coverageLimit: 50000,
      monthlyPremium: 145.50,
      startDate: 'Jan 10, 2024',
      endDate: 'Jan 10, 2025'
    },
    scenePrompt: 'Isometric 3D render of a modern silver Toyota Camry crashed into a concrete pillar in a parking garage, shattered tail light, moody lighting, rainy atmosphere outside the garage window, claymorphism style, pastel colors.',
    rawFnolData: "FNOL-RECORD-8921 // AUTO-TRANSCRIPT\nCALLER: Valery Shevchenko (Insured)\n\n\"I was attempting to park on Level 3 of the Central Garage. Visibility was poor due to heavy rain and dim lighting. As I reversed into the spot near the south pillar, my rear camera was obscured by water droplets. I misjudged the proximity and the rear passenger side bumper impacted the concrete pillar. There was a loud crunch. The tail light is completely shattered and the bumper is detached on the right side. Speed was approx 5mph. No injuries. Jeremy (witness) saw it happen from his car nearby.\"",
    adjusterNotes: "",
    evidencePhotos: [
        'https://picsum.photos/seed/damage1/400/300',
        'https://picsum.photos/seed/damage2/400/300',
        'https://picsum.photos/seed/damage3/400/300',
        'https://picsum.photos/seed/damage4/400/300'
    ]
  },
  {
    id: 'CLM-4432',
    policyNumber: 'TX 1120',
    holder: {
      id: 'p4',
      name: 'Marcus Thorne',
      role: 'Policy Holder',
      avatarUrl: 'https://picsum.photos/seed/marcus/200',
    },
    date: 'June 12, 2024',
    time: '2:15 PM',
    location: 'Highway 101, Exit 42',
    coordinates: { lat: 34.0522, lng: -118.2437 },
    type: IncidentType.Collision,
    status: ClaimStatus.Pending,
    description: 'Multi-car pileup on the highway during heavy traffic. Front-end collision with an SUV.',
    damageEstimate: 15200.00,
    weatherCondition: 'Sunny',
    temperature: 28,
    involvedParties: [
        { id: 'p5', name: 'Sarah Connor', role: 'Third Party', avatarUrl: 'https://picsum.photos/seed/sarah/200' }
    ],
    carDetails: {
      make: 'Ford',
      model: 'F-150',
      year: 2023,
      color: 'Blue',
      plateNumber: 'TRK-998',
      vin: '1FTEW1CP4KF0092',
      trim: 'Lariat 4x4',
      drivetrain: 'AWD',
      mileage: 12000
    },
    coverage: {
      policyType: 'Standard Auto',
      deductible: 1000,
      coverageLimit: 100000,
      monthlyPremium: 195.00,
      startDate: 'Mar 15, 2024',
      endDate: 'Mar 15, 2025'
    },
    scenePrompt: 'Isometric 3D render of a highway accident scene, blue Ford F-150 collided with SUV, sunny day, asphalt road texture, traffic cones, claymorphism style, pastel colors, high detail.',
    rawFnolData: "FNOL-RECORD-4432 // OFFICER REPORT INPUT\nSOURCE: Highway Patrol Report #4921\n\nTraffic on HWY 101 N came to a sudden halt near Exit 42. Vehicle 1 (Insured) was traveling in the center lane and failed to brake in time, colliding with the rear of Vehicle 2 (Toyota SUV). Impact caused significant front-end damage to V1: crumpled hood, smashed grille, leaking radiator fluid. Airbags deployed. Driver of V1 reports sore neck. Driver of V2 (Sarah C.) uninjured. Traffic flow restricted for 45 mins. Road conditions dry and clear.\"",
    adjusterNotes: "",
    evidencePhotos: [
        'https://picsum.photos/seed/hwy1/400/300',
        'https://picsum.photos/seed/hwy2/400/300',
        'https://picsum.photos/seed/hwy3/400/300'
    ]
  },
  {
    id: 'CLM-1290',
    policyNumber: 'NY 5599',
    holder: {
      id: 'p6',
      name: 'Elara Vance',
      role: 'Policy Holder',
      avatarUrl: 'https://picsum.photos/seed/elara/200',
    },
    date: 'April 05, 2024',
    time: '04:00 AM',
    location: 'Residential Driveway',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    type: IncidentType.Theft,
    status: ClaimStatus.Approved,
    description: 'Car window smashed and stereo system stolen while parked in driveway.',
    damageEstimate: 850.00,
    weatherCondition: 'Cloudy',
    temperature: 12,
    involvedParties: [],
    carDetails: {
      make: 'Honda',
      model: 'Civic',
      year: 2021,
      color: 'Black',
      plateNumber: 'HND-552',
      vin: '2HGFC1E01MH4432',
      trim: 'Sport',
      drivetrain: 'FWD',
      mileage: 35000
    },
    coverage: {
      policyType: 'Comprehensive',
      deductible: 250,
      coverageLimit: 30000,
      monthlyPremium: 110.00,
      startDate: 'Aug 01, 2023',
      endDate: 'Aug 01, 2024'
    },
    scenePrompt: 'Isometric 3D render of a black Honda Civic parked in a suburban driveway at night, broken window glass on ground, street lamp lighting, claymorphism style, pastel colors.',
    rawFnolData: "FNOL-RECORD-1290 // CLAIMANT STATEMENT\n\n\"I came out to my car this morning at 7 AM to go to work and found the front passenger window smashed. There is glass all over the seat and the driveway. My aftermarket stereo system has been ripped out of the dashboard. They also took my iPad which was in the glove box. The car was locked and parked in my driveway. I didn't hear anything last night. I've filed a police report online.\"",
    adjusterNotes: "",
    evidencePhotos: [
        'https://picsum.photos/seed/theft1/400/300',
        'https://picsum.photos/seed/theft2/400/300'
    ]
  },
  {
    id: 'CLM-9981',
    policyNumber: 'FL 3321',
    holder: {
      id: 'p7',
      name: 'John Doe',
      role: 'Policy Holder',
      avatarUrl: 'https://picsum.photos/seed/john/200',
    },
    date: 'July 20, 2024',
    time: '5:45 PM',
    location: 'Coastal Road',
    coordinates: { lat: 25.7617, lng: -80.1918 },
    type: IncidentType.Weather,
    status: ClaimStatus.Review,
    description: 'Tree branch fell on the hood of the car during a tropical storm.',
    damageEstimate: 3100.00,
    weatherCondition: 'Stormy',
    temperature: 24,
    involvedParties: [],
    carDetails: {
      make: 'Chevrolet',
      model: 'Malibu',
      year: 2019,
      color: 'Red',
      plateNumber: 'BCH-110',
      vin: '1G1ZC5ST4KF1234',
      trim: 'LT',
      drivetrain: 'FWD',
      mileage: 58000
    },
    coverage: {
      policyType: 'Full Coverage',
      deductible: 500,
      coverageLimit: 40000,
      monthlyPremium: 130.00,
      startDate: 'May 20, 2024',
      endDate: 'May 20, 2025'
    },
    scenePrompt: 'Isometric 3D render of a red Chevrolet Malibu on a coastal road with a large tree branch on the hood, stormy weather, rain effects, wind, claymorphism style, pastel colors.',
    rawFnolData: "FNOL-RECORD-9981 // APP SUBMISSION\n\nDuring the tropical storm yesterday evening, a large oak branch snapped and fell directly onto the hood of my car. I was parked on the street. The hood is crushed in, and the windshield is shattered on the driver's side. The A-pillar also looks bent. I couldn't move the car because the branch is too heavy. Wind speed was reported at 60mph gusts.\"",
    adjusterNotes: "",
    evidencePhotos: [
        'https://picsum.photos/seed/storm1/400/300',
        'https://picsum.photos/seed/storm2/400/300',
        'https://picsum.photos/seed/storm3/400/300',
        'https://picsum.photos/seed/storm4/400/300'
    ]
  },
  {
    id: 'CLM-5566',
    policyNumber: 'WA 8877',
    holder: {
      id: 'p8',
      name: 'Alice Chen',
      role: 'Policy Holder',
      avatarUrl: 'https://picsum.photos/seed/alice/200',
    },
    date: 'Aug 15, 2024',
    time: '11:30 AM',
    location: 'Downtown Intersection',
    coordinates: { lat: 47.6062, lng: -122.3321 },
    type: IncidentType.Collision,
    status: ClaimStatus.Rejected,
    description: 'Side-swiped by a bus while turning left at a busy intersection.',
    damageEstimate: 5500.00,
    weatherCondition: 'Cloudy',
    temperature: 18,
    involvedParties: [
        { id: 'p9', name: 'Bus Driver', role: 'Third Party', avatarUrl: 'https://picsum.photos/seed/bus/200' }
    ],
    carDetails: {
      make: 'Tesla',
      model: 'Model 3',
      year: 2024,
      color: 'White',
      plateNumber: 'EV-8821',
      vin: '5YJ3E1EA5KF1122',
      trim: 'Long Range',
      drivetrain: 'AWD',
      mileage: 8000
    },
    coverage: {
      policyType: 'Electric Plus',
      deductible: 1000,
      coverageLimit: 80000,
      monthlyPremium: 210.00,
      startDate: 'Jan 01, 2024',
      endDate: 'Jan 01, 2025'
    },
    scenePrompt: 'Isometric 3D render of a city intersection, a white Tesla Model 3 and a bus close to each other, skid marks, traffic lights, city buildings in background, claymorphism style, pastel colors.',
    rawFnolData: "FNOL-RECORD-5566 // TRANSCRIPT\n\n\"I was turning left at the intersection on a green arrow. The city bus came through the intersection and side-swiped the right side of my vehicle. The bus driver claims he had the yellow light. The entire passenger side doors are scraped and dented. The side mirror is torn off. There were passengers on the bus but no injuries reported. I have photos of the skid marks.\"",
    adjusterNotes: "",
    evidencePhotos: [
        'https://picsum.photos/seed/bus1/400/300',
        'https://picsum.photos/seed/bus2/400/300'
    ]
  }
];

export const getWeatherIcon = (condition: string, className: string = "w-6 h-6") => {
  const c = condition.toLowerCase();
  if (c.includes('rain')) return <CloudRain className={className} />;
  if (c.includes('storm')) return <CloudLightning className={className} />;
  if (c.includes('snow')) return <Snowflake className={className} />;
  if (c.includes('cloud')) return <Cloud className={className} />;
  return <Sun className={className} />;
};
