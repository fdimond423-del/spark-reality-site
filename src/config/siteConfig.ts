import { getAssetUrl } from '../utils/assetPath';

/**
 * Centralized Configuration for Spark Reality
 * Houses all business details, theme colors, project records, media paths, and copy.
 */

export interface ProjectRecord {
  id: string;
  name: string;
  location: string;
  localityBadge: string;
  propertyType: string;
  configuration: string;
  startingPrice: string;
  description: string;
  mainImage: string;
  galleryImages: string[];
  videoUrl?: string;
  officialProjectUrl?: string;
  isVerified: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  imageUrl: string;
  alt: string;
}

export const siteConfig = {
  brand: {
    name: 'Spark Reality',
    tagline: 'SPACES FOR A BRIGHTER TOMORROW',
    category: 'Real Estate Sales, Property Advisory, and Property Opportunities',
    logoPlaceholder: false, // Set to true if an external logo asset file is provided
    primaryLocations: 'Ahmedabad and Gandhinagar, Gujarat, India',
    phone: '+91 93137 02720',
    phoneRaw: '+919313702720',
    whatsappUrl: 'https://wa.me/919313702720?text=Hello%20Spark%20Reality,%20I%20would%20like%20to%20enquire%20about%20property%20opportunities%20in%20Ahmedabad%20and%20Gandhinagar.',
    address: {
      line1: 'A-407, KP Epitome',
      line2: 'Near DAV International School, Makarba',
      city: 'Ahmedabad',
      pincode: '380051',
      state: 'Gujarat',
      country: 'India',
      fullAddress: 'A-407, KP Epitome, Near DAV International School, Makarba, Ahmedabad – 380051, Gujarat, India.'
    },
    googleMapsDirectionsUrl: 'https://maps.google.com/?q=KP+Epitome+Makarba+Ahmedabad',
    officeHours: 'Monday–Saturday, 10:30 AM–6:30 PM',
    email: import.meta.env.VITE_BUSINESS_EMAIL || 'yashworkonly16@gmail.com', // Configurable
  },

  theme: {
    navy: '#0B1F30',
    navyDark: '#071521',
    navyLight: '#132B42',
    olive: '#52683B',
    oliveDark: '#3E502C',
    oliveLight: '#657F49',
    white: '#FFFFFF',
    lightGrey: '#F5F7F6',
    darkText: '#202A33',
    mutedText: '#68747D',
  },

  hero: {
    headline: 'MORE THAN A PROPERTY.\nA FUTURE TAKING SHAPE.',
    supportingText: 'Discover residential and commercial real estate opportunities across Ahmedabad and Gandhinagar.',
    primaryCta: 'EXPLORE PROJECTS',
    secondaryCta: 'ENQUIRE NOW',
    videoPath: getAssetUrl('video/spark-hero.mp4'),
    posterPath: getAssetUrl('images/ahmedabad-home.jpg'),
  },

  brandStatement: {
    headline: 'FIND YOUR SPACE.\nDEFINE YOUR FUTURE.',
    supportingText: 'Your next property journey begins with the right opportunity.',
  },

  ahmedabadShowcase: {
    sectionNumber: '01 / AHMEDABAD',
    headline: 'DISCOVER YOUR NEXT ADDRESS',
    description: 'Explore residential and commercial property opportunities across Ahmedabad, with options suited to your location preferences and property goals.',
    cta: 'EXPLORE PROJECT',
    projects: [
      {
        id: 'ahm-01',
        name: 'The Veridian Sky Residences',
        location: 'SG Highway & Bodakdev, Ahmedabad',
        localityBadge: 'Ahmedabad Prime Corridor',
        propertyType: 'Ultra-Luxury Residential',
        configuration: '3 & 4 BHK Sky Villas',
        startingPrice: '₹2.85 Cr onwards',
        description: 'Low-density, expansive residences offering seamless architectural continuity between serene interior volumes and private landscaped sky decks overlooking the Ahmedabad skyline.',
        mainImage: getAssetUrl('images/ahmedabad-home.jpg'),
        galleryImages: [
          getAssetUrl('images/ahmedabad-home.jpg'),
          getAssetUrl('images/residential-exterior.jpg'),
          getAssetUrl('images/residential-interior.jpg')
        ],
        videoUrl: getAssetUrl('video/spark-hero.mp4'),
        officialProjectUrl: '#enquire',
        isVerified: true
      },
      {
        id: 'ahm-02',
        name: 'KP Corporate Monolith Suites',
        location: 'Makarba, Ahmedabad (Nr. DAV School)',
        localityBadge: 'Makarba Corporate District',
        propertyType: 'Grade-A Commercial Office',
        configuration: '1,200 - 12,000 Sq.Ft Flexible Plates',
        startingPrice: '₹1.15 Cr onwards',
        description: 'Prime corporate suites engineered for high capital efficiency, international acoustic comfort, energy-optimized double glazing, and dedicated client valet parking.',
        mainImage: getAssetUrl('images/commercial-space.jpg'),
        galleryImages: [
          getAssetUrl('images/commercial-space.jpg'),
          getAssetUrl('images/commercial-space_2.jpg')
        ],
        officialProjectUrl: '#enquire',
        isVerified: true
      }
    ] as ProjectRecord[]
  },

  gandhinagarShowcase: {
    sectionNumber: '02 / GANDHINAGAR',
    headline: 'SPACE TO GROW.\nOPPORTUNITIES TO DISCOVER.',
    description: 'Discover residential developments and real estate opportunities across Gandhinagar.',
    cta: 'DISCOVER PROJECT',
    projects: [
      {
        id: 'gn-01',
        name: 'GIFT Horizon FinTech Towers',
        location: 'GIFT City IFSC, Gandhinagar',
        localityBadge: 'GIFT City IFSC Zone',
        propertyType: 'Pre-Leased Commercial & Residential',
        configuration: 'Executive Suites & 2/3 BHK Apartments',
        startingPrice: '₹1.65 Cr onwards',
        description: 'Future-ready properties within India’s premier operational International Financial Services Centre. Unmatched regulatory incentives, walk-to-work culture, and robust capital appreciation.',
        mainImage: getAssetUrl('images/ahmedabad-home_2.jpg'),
        galleryImages: [
          getAssetUrl('images/ahmedabad-home_2.jpg'),
          getAssetUrl('images/residential-exterior_2.jpg')
        ],
        videoUrl: getAssetUrl('video/spark-hero.mp4'),
        officialProjectUrl: '#enquire',
        isVerified: true
      },
      {
        id: 'gn-02',
        name: 'The Green Haven Sanctum',
        location: 'Kudasan & Infocity Belt, Gandhinagar',
        localityBadge: 'Gandhinagar Green Corridor',
        propertyType: 'Contemporary Residential',
        configuration: '3 & 4 BHK Garden Residences',
        startingPrice: '₹1.35 Cr onwards',
        description: 'Surrounded by Gandhinagar’s protected green tree canopy, these homes offer quiet sophistication, spacious open balconies, and direct high-speed connectivity to Ahmedabad.',
        mainImage: getAssetUrl('images/residential-exterior_2.jpg'),
        galleryImages: [
          getAssetUrl('images/residential-exterior_2.jpg'),
          getAssetUrl('images/residential-interior_2.jpg')
        ],
        officialProjectUrl: '#enquire',
        isVerified: true
      }
    ] as ProjectRecord[]
  },

  gallery: [
    {
      id: 'gal-1',
      title: 'Monolithic Facades',
      subtitle: 'Modern Residential Architecture in Ahmedabad',
      category: 'Exteriors',
      imageUrl: getAssetUrl('images/residential-exterior.jpg'),
      alt: 'Contemporary residential facade in Ahmedabad'
    },
    {
      id: 'gal-2',
      title: 'Corporate Precision',
      subtitle: 'Commercial Corridors along SG Highway',
      category: 'Commercial',
      imageUrl: getAssetUrl('images/commercial-space.jpg'),
      alt: 'Modern corporate architecture in Ahmedabad'
    },
    {
      id: 'gal-3',
      title: 'Warm Sandstone Enclaves',
      subtitle: 'Courtyards & Private Balconies',
      category: 'Courtyards',
      imageUrl: getAssetUrl('images/ahmedabad-home.jpg'),
      alt: 'Sandstone residence and courtyard in Ahmedabad'
    },
    {
      id: 'gal-4',
      title: 'Bespoke Interior Volumes',
      subtitle: 'Natural Light & High-Performance Materials',
      category: 'Interiors',
      imageUrl: getAssetUrl('images/residential-interior.jpg'),
      alt: 'Luxury residential interior in Ahmedabad'
    },
    {
      id: 'gal-5',
      title: 'High-Rise Panoramic Views',
      subtitle: 'GIFT City & Ahmedabad Skyline',
      category: 'Skyline',
      imageUrl: getAssetUrl('images/ahmedabad-home_2.jpg'),
      alt: 'Skyline residential view in Gujarat'
    },
    {
      id: 'gal-6',
      title: 'Architectural Landscaping',
      subtitle: 'Curated Open Spaces & Water Features',
      category: 'Landscaping',
      imageUrl: getAssetUrl('images/commercial-space_2.jpg'),
      alt: 'Architectural landscaped plaza in Gandhinagar'
    }
  ] as GalleryItem[],

  whySpark: {
    heading: 'REAL ESTATE.\nA MORE PERSONAL EXPERIENCE.',
    pillars: [
      {
        id: 'p-1',
        title: 'PROPERTIES ACROSS AHMEDABAD & GANDHINAGAR',
        description: 'Explore property opportunities across both locations.'
      },
      {
        id: 'p-2',
        title: 'PERSONALIZED PROPERTY ASSISTANCE',
        description: 'Get assistance exploring options that match your requirements.'
      },
      {
        id: 'p-3',
        title: 'RESIDENTIAL & COMMERCIAL OPPORTUNITIES',
        description: 'Explore different property categories according to your needs.'
      },
      {
        id: 'p-4',
        title: 'CUSTOMER-FOCUSED GUIDANCE',
        description: 'Receive assistance throughout your property search.'
      }
    ]
  },

  finalCta: {
    headline: 'SPACES FOR A\nBRIGHTER TOMORROW.',
    supportingText: "Let's find the right property for your next chapter.",
    buttonLabel: 'START YOUR PROPERTY JOURNEY',
  },

  leadForm: {
    heading: "LET'S FIND YOUR IDEAL PROPERTY",
    supportingText: 'Share your details, and our team will connect with you.',
    submitButton: 'GET DETAILS NOW',
    cityOptions: ['Ahmedabad', 'Gandhinagar'] as const,
    privacyNotice: 'Your contact details are strictly kept confidential and used solely by the Spark Reality advisory desk to coordinate your enquiry.'
  },

  contact: {
    heading: "LET'S CONNECT ABOUT YOUR NEXT PROPERTY",
  }
};
