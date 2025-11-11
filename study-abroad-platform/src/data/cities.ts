export interface CityData {
  slug: string;
  name: string;
  state: string;
  population: string;
  description: string;
  localKeywords: string[];
  nearbyAreas: string[];
  universities: string[];
  popularCourses: string[];
  seoTitle: string;
  metaDescription: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  testimonials?: {
    name: string;
    course: string;
    university: string;
    country: string;
    review: string;
  }[];
}

export const cities: CityData[] = [
  {
    slug: "kolkata",
    name: "Kolkata",
    state: "West Bengal",
    population: "14.1 million",
    description: "The cultural capital of India, known for its rich heritage and educational institutions.",
    localKeywords: [
      "Study Abroad Consultants in Kolkata",
      "Best Study Abroad Consultants in Kolkata",
      "Overseas Education Consultants in Kolkata",
      "Study Abroad Agencies in Kolkata",
      "International Education Consultants Kolkata",
      "IELTS Coaching Kolkata",
      "Study Visa Consultants Kolkata"
    ],
    nearbyAreas: [
      "Salt Lake", "Park Street", "Ballygunge", "Jadavpur", "New Town", 
      "Rajarhat", "Howrah", "Birati", "Barasat", "Dum Dum"
    ],
    universities: [
      "University of Calcutta", "Jadavpur University", "West Bengal University of Technology",
      "Presidency University", "Indian Institute of Management Calcutta"
    ],
    popularCourses: [
      "Engineering & Technology", "Business Management", "Computer Science", 
      "Medicine", "Arts & Humanities", "Data Science"
    ],
    seoTitle: "Best Study Abroad Consultants in Kolkata | Codescholar Overseas",
    metaDescription: "Looking for trusted study abroad consultants in Kolkata? Codescholar Overseas helps students from Kolkata get admission to top universities worldwide. Free consultation available.",
    coordinates: { lat: 22.5726, lng: 88.3639 },
    testimonials: [
      {
        name: "Priya Sharma",
        course: "Computer Science",
        university: "University of Toronto",
        country: "Canada",
        review: "Codescholar helped me secure admission to my dream university. Their Kolkata office provided excellent guidance throughout the process."
      }
    ]
  },
  {
    slug: "delhi",
    name: "Delhi",
    state: "Delhi NCR",
    population: "32.9 million",
    description: "India's capital territory, a major hub for education and international opportunities.",
    localKeywords: [
      "Study Abroad Consultants in Delhi",
      "Best Study Abroad Consultants in Delhi NCR",
      "Overseas Education Consultants in Delhi",
      "Study Abroad Agencies in Delhi",
      "International Education Consultants Delhi",
      "IELTS Coaching Delhi",
      "Study Visa Consultants Delhi"
    ],
    nearbyAreas: [
      "Connaught Place", "Karol Bagh", "Lajpat Nagar", "South Delhi", "Gurgaon",
      "Noida", "Faridabad", "Ghaziabad", "Dwarka", "Rohini"
    ],
    universities: [
      "Delhi University", "Jawaharlal Nehru University", "Indian Institute of Technology Delhi",
      "All India Institute of Medical Sciences", "Indian School of Business"
    ],
    popularCourses: [
      "MBA", "Engineering", "Medicine", "Law", "International Relations", 
      "Public Policy", "Computer Science"
    ],
    seoTitle: "Top Study Abroad Consultants in Delhi NCR | Codescholar Overseas",
    metaDescription: "Find the best study abroad consultants in Delhi NCR. Codescholar Overseas offers comprehensive guidance for students seeking international education opportunities.",
    coordinates: { lat: 28.7041, lng: 77.1025 }
  },
  {
    slug: "mumbai",
    name: "Mumbai", 
    state: "Maharashtra",
    population: "20.4 million",
    description: "India's financial capital and commercial hub with excellent international connectivity.",
    localKeywords: [
      "Study Abroad Consultants in Mumbai",
      "Best Study Abroad Consultants in Mumbai",
      "Overseas Education Consultants in Mumbai",
      "Study Abroad Agencies in Mumbai",
      "International Education Consultants Mumbai",
      "IELTS Coaching Mumbai",
      "Study Visa Consultants Mumbai"
    ],
    nearbyAreas: [
      "Bandra", "Andheri", "Powai", "Borivali", "Thane", "Navi Mumbai",
      "Pune", "Kalyan", "Vasai", "Malad"
    ],
    universities: [
      "University of Mumbai", "Indian Institute of Technology Bombay", "Tata Institute of Social Sciences",
      "SNDT Women's University", "SP Jain School of Global Management"
    ],
    popularCourses: [
      "Finance & Banking", "Film & Media Studies", "Business Management",
      "Information Technology", "Fashion Design", "Marketing"
    ],
    seoTitle: "Best Study Abroad Consultants in Mumbai | Codescholar Overseas",
    metaDescription: "Top-rated study abroad consultants in Mumbai. Get expert guidance for studying overseas from Mumbai's leading education consultancy - Codescholar Overseas.",
    coordinates: { lat: 19.0760, lng: 72.8777 }
  },
  {
    slug: "bangalore",
    name: "Bangalore",
    state: "Karnataka", 
    population: "12.3 million",
    description: "India's Silicon Valley, known for IT and innovation with strong international education culture.",
    localKeywords: [
      "Study Abroad Consultants in Bangalore",
      "Best Study Abroad Consultants in Bangalore",
      "Overseas Education Consultants in Bangalore",
      "Study Abroad Agencies in Bangalore",
      "International Education Consultants Bangalore",
      "IELTS Coaching Bangalore",
      "Study Visa Consultants Bangalore"
    ],
    nearbyAreas: [
      "Koramangala", "Indiranagar", "Whitefield", "Electronic City", "Marathahalli",
      "JP Nagar", "BTM Layout", "HSR Layout", "Hebbal", "Yelahanka"
    ],
    universities: [
      "Indian Institute of Science", "Indian Institute of Management Bangalore",
      "Bangalore University", "Christ University", "PES University"
    ],
    popularCourses: [
      "Computer Science & IT", "Data Science", "Artificial Intelligence", 
      "Biotechnology", "Aerospace Engineering", "Entrepreneurship"
    ],
    seoTitle: "Top Study Abroad Consultants in Bangalore | Codescholar Overseas",
    metaDescription: "Leading study abroad consultants in Bangalore. Codescholar Overseas helps IT professionals and students from Bangalore pursue international education.",
    coordinates: { lat: 12.9716, lng: 77.5946 }
  },
  {
    slug: "pune",
    name: "Pune",
    state: "Maharashtra",
    population: "7.4 million", 
    description: "Oxford of the East, famous for its educational institutions and student-friendly environment.",
    localKeywords: [
      "Study Abroad Consultants in Pune",
      "Best Study Abroad Consultants in Pune",
      "Overseas Education Consultants in Pune", 
      "Study Abroad Agencies in Pune",
      "International Education Consultants Pune",
      "IELTS Coaching Pune",
      "Study Visa Consultants Pune"
    ],
    nearbyAreas: [
      "Koregaon Park", "Viman Nagar", "Baner", "Wakad", "Kothrud",
      "Hadapsar", "Magarpatta", "Aundh", "Pimpri Chinchwad", "Hinjewadi"
    ],
    universities: [
      "University of Pune", "Symbiosis International University", "Bharati Vidyapeeth",
      "MIT World Peace University", "Flame University"
    ],
    popularCourses: [
      "Engineering", "MBA", "Hotel Management", "Design",
      "Information Technology", "Automobile Engineering"
    ],
    seoTitle: "Best Study Abroad Consultants in Pune | Codescholar Overseas",
    metaDescription: "Expert study abroad consultants in Pune. Codescholar Overseas provides comprehensive guidance for students from Pune seeking international education opportunities.",
    coordinates: { lat: 18.5204, lng: 73.8567 }
  },
  {
    slug: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    population: "10.9 million",
    description: "Detroit of India, known for automotive industry and strong educational heritage.",
    localKeywords: [
      "Study Abroad Consultants in Chennai",
      "Best Study Abroad Consultants in Chennai",
      "Overseas Education Consultants in Chennai",
      "Study Abroad Agencies in Chennai", 
      "International Education Consultants Chennai",
      "IELTS Coaching Chennai",
      "Study Visa Consultants Chennai"
    ],
    nearbyAreas: [
      "T Nagar", "Anna Nagar", "Velachery", "OMR", "Adyar",
      "Tambaram", "Chromepet", "Porur", "Guindy", "Mylapore"
    ],
    universities: [
      "Indian Institute of Technology Madras", "Anna University", "University of Madras",
      "Loyola College", "Stella Maris College"
    ],
    popularCourses: [
      "Automobile Engineering", "Aerospace Engineering", "Marine Engineering",
      "Software Engineering", "Business Administration", "Medicine"
    ],
    seoTitle: "Top Study Abroad Consultants in Chennai | Codescholar Overseas", 
    metaDescription: "Trusted study abroad consultants in Chennai. Get expert guidance from Codescholar Overseas for pursuing international education from Chennai.",
    coordinates: { lat: 13.0827, lng: 80.2707 }
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    population: "10.0 million",
    description: "Cyberabad - India's major IT and pharmaceutical hub with growing international education sector.",
    localKeywords: [
      "Study Abroad Consultants in Hyderabad",
      "Best Study Abroad Consultants in Hyderabad", 
      "Overseas Education Consultants in Hyderabad",
      "Study Abroad Agencies in Hyderabad",
      "International Education Consultants Hyderabad",
      "IELTS Coaching Hyderabad",
      "Study Visa Consultants Hyderabad"
    ],
    nearbyAreas: [
      "HITECH City", "Gachibowli", "Kondapur", "Madhapur", "Banjara Hills",
      "Jubilee Hills", "Secunderabad", "Kukatpally", "Miyapur", "Kompally"
    ],
    universities: [
      "University of Hyderabad", "International Institute of Information Technology",
      "Indian School of Business", "Osmania University", "BITS Pilani Hyderabad"
    ],
    popularCourses: [
      "Information Technology", "Pharmaceutical Sciences", "Biotechnology",
      "Data Analytics", "Business Analytics", "Cybersecurity"
    ],
    seoTitle: "Best Study Abroad Consultants in Hyderabad | Codescholar Overseas",
    metaDescription: "Leading study abroad consultants in Hyderabad. Codescholar Overseas helps IT and pharma professionals from Hyderabad pursue global education opportunities.",
    coordinates: { lat: 17.3850, lng: 78.4867 }
  },
  {
    slug: "ahmedabad", 
    name: "Ahmedabad",
    state: "Gujarat",
    population: "8.4 million",
    description: "Commercial capital of Gujarat, known for business education and entrepreneurship culture.",
    localKeywords: [
      "Study Abroad Consultants in Ahmedabad",
      "Best Study Abroad Consultants in Ahmedabad",
      "Overseas Education Consultants in Ahmedabad",
      "Study Abroad Agencies in Ahmedabad",
      "International Education Consultants Ahmedabad", 
      "IELTS Coaching Ahmedabad",
      "Study Visa Consultants Ahmedabad"
    ],
    nearbyAreas: [
      "Vastrapur", "Satellite", "Prahlad Nagar", "Bopal", "SG Highway",
      "Navrangpura", "CG Road", "Maninagar", "Gandhinagar", "Surat"
    ],
    universities: [
      "Indian Institute of Management Ahmedabad", "Gujarat University", 
      "Nirma University", "Pandit Deendayal Energy University", "CEPT University"
    ],
    popularCourses: [
      "Business Management", "Entrepreneurship", "Chemical Engineering",
      "Textile Engineering", "Architecture", "Energy Studies"
    ],
    seoTitle: "Top Study Abroad Consultants in Ahmedabad | Codescholar Overseas",
    metaDescription: "Expert study abroad consultants in Ahmedabad. Codescholar Overseas provides comprehensive guidance for students and professionals from Ahmedabad seeking international education.",
    coordinates: { lat: 23.0225, lng: 72.5714 }
  },
  {
    slug: "chandigarh",
    name: "Chandigarh", 
    state: "Punjab/Haryana",
    population: "1.6 million",
    description: "The City Beautiful, planned city serving as capital for Punjab and Haryana with excellent educational infrastructure.",
    localKeywords: [
      "Study Abroad Consultants in Chandigarh",
      "Best Study Abroad Consultants in Chandigarh",
      "Overseas Education Consultants in Chandigarh",
      "Study Abroad Agencies in Chandigarh",
      "International Education Consultants Chandigarh",
      "IELTS Coaching Chandigarh", 
      "Study Visa Consultants Chandigarh"
    ],
    nearbyAreas: [
      "Sector 17", "Sector 22", "Sector 35", "Mohali", "Panchkula", 
      "Zirakpur", "Kharar", "Ludhiana", "Amritsar", "Jalandhar"
    ],
    universities: [
      "Panjab University", "Punjab Engineering College", "Chandigarh University",
      "Thapar Institute of Engineering & Technology", "Lovely Professional University"
    ],
    popularCourses: [
      "Engineering", "Agriculture", "Hotel Management", "Fashion Design",
      "Sports Management", "Architecture"
    ],
    seoTitle: "Best Study Abroad Consultants in Chandigarh | Codescholar Overseas",
    metaDescription: "Trusted study abroad consultants in Chandigarh. Get expert guidance from Codescholar Overseas for international education opportunities from Punjab and Haryana.",
    coordinates: { lat: 30.7333, lng: 76.7794 }
  },
  {
    slug: "jaipur",
    name: "Jaipur",
    state: "Rajasthan", 
    population: "3.9 million",
    description: "The Pink City, known for its heritage, culture, and growing educational sector.",
    localKeywords: [
      "Study Abroad Consultants in Jaipur",
      "Best Study Abroad Consultants in Jaipur",
      "Overseas Education Consultants in Jaipur",
      "Study Abroad Agencies in Jaipur",
      "International Education Consultants Jaipur",
      "IELTS Coaching Jaipur",
      "Study Visa Consultants Jaipur"
    ],
    nearbyAreas: [
      "Malviya Nagar", "Vaishali Nagar", "Mansarovar", "C-Scheme", "Bapu Nagar",
      "Tonk Road", "Ajmer Road", "Sikar Road", "Jodhpur", "Udaipur"
    ],
    universities: [
      "University of Rajasthan", "Manipal University Jaipur", "Amity University Rajasthan",
      "Rajasthan Technical University", "Banasthali Vidyapith"
    ],
    popularCourses: [
      "Tourism & Hospitality", "Jewelry Design", "Textile Design", 
      "Engineering", "Business Management", "Arts & Crafts"
    ],
    seoTitle: "Top Study Abroad Consultants in Jaipur | Codescholar Overseas",
    metaDescription: "Leading study abroad consultants in Jaipur. Codescholar Overseas helps students from Rajasthan pursue international education with expert guidance and support.",
    coordinates: { lat: 26.9124, lng: 75.7873 }
  }
];

// Helper function to get city by slug
export const getCityBySlug = (slug: string): CityData | undefined => {
  return cities.find(city => city.slug === slug);
};

// Helper function to get all city slugs for routing
export const getAllCitySlugs = (): string[] => {
  return cities.map(city => city.slug);
};