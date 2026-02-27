// Commission data for UK Universities
// Commission criteria based on number of students placed

export interface CommissionInfo {
  university: string;
  remarks: string | null;
  commissionType: "Amount" | "Percent of Tution Fees" | null;
  currency: string | null;
  commissionMoreThan20: number | null; // Commission for >20 students (82%)
  commissionLessThan20: number | null; // Commission for ≤20 students (75%)
  tier: "PRIMARY" | "SECONDARY" | "TERTIARY";
}

export const commissionData: CommissionInfo[] = [
  // PRIMARY TIER (High Commission)
  {
    university: "University of Leicester",
    remarks: "UG&PGR-3000 GBP / PGT-4000 GBP [1 LAKH INR EXTRA FOR 10 STUDENTS]",
    commissionType: "Amount",
    currency: "GBP",
    commissionMoreThan20: 4000,
    commissionLessThan20: 3000,
    tier: "PRIMARY"
  },
  {
    university: "Anglia Ruskin University -London Campus",
    remarks: "1 LAKH INR EXTRA FOR 10 STUDENTS",
    commissionType: "Amount",
    currency: "GBP",
    commissionMoreThan20: 3200,
    commissionLessThan20: 2800,
    tier: "PRIMARY"
  },
  {
    university: "University of Huddersfield -London",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 19,
    commissionLessThan20: 17.5,
    tier: "PRIMARY"
  },
  {
    university: "De MontFort University, Leicester, England",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 18,
    commissionLessThan20: 16.5,
    tier: "PRIMARY"
  },
  {
    university: "Coventry University",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 18,
    commissionLessThan20: 16.5,
    tier: "PRIMARY"
  },
  {
    university: "Regent College London",
    remarks: "50K INR EXTRA FOR 10 STUDENTS",
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 18,
    commissionLessThan20: 16.5,
    tier: "PRIMARY"
  },
  {
    university: "University of Worcester",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 18,
    commissionLessThan20: 16.5,
    tier: "PRIMARY"
  },
  {
    university: "University of Sunderland",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 18,
    commissionLessThan20: 16.5,
    tier: "PRIMARY"
  },
  {
    university: "University of Law",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 18,
    commissionLessThan20: 16.5,
    tier: "PRIMARY"
  },
  {
    university: "University of Hull -London",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 18,
    commissionLessThan20: 16.5,
    tier: "PRIMARY"
  },
  {
    university: "University of Greenwich",
    remarks: "50K INR EXTRA FOR 10 STUDENTS",
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 18,
    commissionLessThan20: 16.5,
    tier: "PRIMARY"
  },
  {
    university: "University of Brighton",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 18,
    commissionLessThan20: 16.5,
    tier: "PRIMARY"
  },
  {
    university: "Liverpool John Moores University",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 18,
    commissionLessThan20: 16.5,
    tier: "PRIMARY"
  },
  {
    university: "Aston University -London Campus",
    remarks: "1 LAKH INR EXTRA FOR 10 STUDENTS",
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 18,
    commissionLessThan20: 16.5,
    tier: "PRIMARY"
  },
  {
    university: "University of East London",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 14.4,
    commissionLessThan20: 13.5,
    tier: "PRIMARY"
  },
  {
    university: "University of Lincoln",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 14,
    commissionLessThan20: 13.12,
    tier: "PRIMARY"
  },
  {
    university: "University of Sussex",
    remarks: "NO INTERVIEW",
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 14,
    commissionLessThan20: 12.5,
    tier: "PRIMARY"
  },
  {
    university: "University of West London",
    remarks: "1 LAKH EXTRA FOR 10 STUDENTS",
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 14,
    commissionLessThan20: 12.5,
    tier: "PRIMARY"
  },

  // SECONDARY TIER
  {
    university: "University of Stirling",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 12.8,
    commissionLessThan20: 12,
    tier: "SECONDARY"
  },
  {
    university: "University of Hertfordshire",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 12.8,
    commissionLessThan20: 12,
    tier: "SECONDARY"
  },
  {
    university: "University of Dundee",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 12.8,
    commissionLessThan20: 12,
    tier: "SECONDARY"
  },
  {
    university: "University of Chester",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 12.8,
    commissionLessThan20: 12,
    tier: "SECONDARY"
  },
  {
    university: "University College Birmingham",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 12.8,
    commissionLessThan20: 12,
    tier: "SECONDARY"
  },
  {
    university: "Ulster University",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 12.8,
    commissionLessThan20: 12,
    tier: "SECONDARY"
  },
  {
    university: "Nottingham Trent University",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 12.8,
    commissionLessThan20: 12,
    tier: "SECONDARY"
  },
  {
    university: "Northumbria University London Campus",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 12.8,
    commissionLessThan20: 12,
    tier: "SECONDARY"
  },
  {
    university: "London Metropolitan University",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 12.8,
    commissionLessThan20: 12,
    tier: "SECONDARY"
  },
  {
    university: "Leeds Beckett University",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 12.8,
    commissionLessThan20: 12,
    tier: "SECONDARY"
  },
  {
    university: "Birmingham City University",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 12.8,
    commissionLessThan20: 12,
    tier: "SECONDARY"
  },
  {
    university: "University of Wolverhampton",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 12,
    commissionLessThan20: 11.25,
    tier: "SECONDARY"
  },
  {
    university: "University of the West of Scotland",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 12,
    commissionLessThan20: 11.25,
    tier: "SECONDARY"
  },
  {
    university: "University of Wales Trinity Saint David",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 12,
    commissionLessThan20: 11.25,
    tier: "SECONDARY"
  },
  {
    university: "University of Surrey",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 12,
    commissionLessThan20: 11.25,
    tier: "SECONDARY"
  },
  {
    university: "University of South Wales",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 12,
    commissionLessThan20: 11.25,
    tier: "SECONDARY"
  },
  {
    university: "University of Regina",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 12,
    commissionLessThan20: 11.25,
    tier: "SECONDARY"
  },
  {
    university: "University of Northampton",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 12,
    commissionLessThan20: 11.25,
    tier: "SECONDARY"
  },
  {
    university: "University of Niagara Falls Canada",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 12,
    commissionLessThan20: 11.25,
    tier: "SECONDARY"
  },
  {
    university: "University of East Anglia",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 12,
    commissionLessThan20: 11.25,
    tier: "SECONDARY"
  },
  {
    university: "University of Derby",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 12,
    commissionLessThan20: 11.25,
    tier: "SECONDARY"
  },
  {
    university: "University of Central Lancashire",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 12,
    commissionLessThan20: 11.25,
    tier: "SECONDARY"
  },
  {
    university: "University of Bradford",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 12,
    commissionLessThan20: 11.25,
    tier: "SECONDARY"
  },
  {
    university: "University of Bedfordshire",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 12,
    commissionLessThan20: 11.25,
    tier: "SECONDARY"
  },
  {
    university: "University Centre Leeds",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 12,
    commissionLessThan20: 11.25,
    tier: "SECONDARY"
  },
  {
    university: "Oxford Brookes University",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 12,
    commissionLessThan20: 11.25,
    tier: "SECONDARY"
  },
  {
    university: "Brunel University London",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 12,
    commissionLessThan20: 11.25,
    tier: "SECONDARY"
  },
  {
    university: "University of Lethbridge",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 11.2,
    commissionLessThan20: 10.5,
    tier: "SECONDARY"
  },
  {
    university: "Sheffield Hallam University",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 11.2,
    commissionLessThan20: 10.5,
    tier: "SECONDARY"
  },
  {
    university: "University of Glasgow",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 10,
    commissionLessThan20: 9.5,
    tier: "SECONDARY"
  },
  {
    university: "University of York",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 10,
    commissionLessThan20: 9.38,
    tier: "SECONDARY"
  },
  {
    university: "University of Salford",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 10,
    commissionLessThan20: 9.38,
    tier: "SECONDARY"
  },
  {
    university: "University of Portsmouth",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 10,
    commissionLessThan20: 9.38,
    tier: "SECONDARY"
  },
  {
    university: "University of Essex",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 10,
    commissionLessThan20: 9.38,
    tier: "SECONDARY"
  },
  {
    university: "York St John University -London Campus",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 9.6,
    commissionLessThan20: 9,
    tier: "SECONDARY"
  },
  {
    university: "University of Westminster",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 9.6,
    commissionLessThan20: 9,
    tier: "SECONDARY"
  },
  {
    university: "University of Northern British Columbia",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 9.6,
    commissionLessThan20: 9,
    tier: "SECONDARY"
  },
  {
    university: "University of Liverpool",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 9.6,
    commissionLessThan20: 9,
    tier: "SECONDARY"
  },
  {
    university: "University of Kent",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 9.6,
    commissionLessThan20: 9,
    tier: "SECONDARY"
  },
  {
    university: "Royal Holloway University of London",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 9.6,
    commissionLessThan20: 9,
    tier: "SECONDARY"
  },

  // TERTIARY TIER (Lower Commission)
  {
    university: "University of Oklahoma",
    remarks: "UG",
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 9,
    commissionLessThan20: 8.44,
    tier: "TERTIARY"
  },
  {
    university: "University of Alabama at Birmingham",
    remarks: "UG",
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 9,
    commissionLessThan20: 8.44,
    tier: "TERTIARY"
  },
  {
    university: "University of Maryland, Baltimore County",
    remarks: "PG",
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 8.64,
    commissionLessThan20: 8.1,
    tier: "TERTIARY"
  },
  {
    university: "University of West of England",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 8,
    commissionLessThan20: 7.5,
    tier: "TERTIARY"
  },
  {
    university: "University of Waikato",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 8,
    commissionLessThan20: 7.5,
    tier: "TERTIARY"
  },
  {
    university: "University of Strathclyde",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 8,
    commissionLessThan20: 7.5,
    tier: "TERTIARY"
  },
  {
    university: "University of Staffordshire",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 8,
    commissionLessThan20: 7.5,
    tier: "TERTIARY"
  },
  {
    university: "University of Sheffield",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 8,
    commissionLessThan20: 7.5,
    tier: "TERTIARY"
  },
  {
    university: "University of Nottingham",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 8,
    commissionLessThan20: 7.5,
    tier: "TERTIARY"
  },
  {
    university: "University of Gloucestershire",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 8,
    commissionLessThan20: 7.5,
    tier: "TERTIARY"
  },
  {
    university: "University of Exeter",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 8,
    commissionLessThan20: 7.5,
    tier: "TERTIARY"
  },
  {
    university: "University of Canterbury",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 8,
    commissionLessThan20: 7.5,
    tier: "TERTIARY"
  },
  {
    university: "University of Birmingham",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 8,
    commissionLessThan20: 7.5,
    tier: "TERTIARY"
  },
  {
    university: "Oxford International Education Group",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 8,
    commissionLessThan20: 7.5,
    tier: "TERTIARY"
  },
  {
    university: "Northeastern University London",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 8,
    commissionLessThan20: 7.5,
    tier: "TERTIARY"
  },
  {
    university: "City University of London",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 8,
    commissionLessThan20: 7.5,
    tier: "TERTIARY"
  },
  {
    university: "University of Southampton",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 6.4,
    commissionLessThan20: 6,
    tier: "TERTIARY"
  },
  {
    university: "University of Reading",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 6.4,
    commissionLessThan20: 6,
    tier: "TERTIARY"
  },
  {
    university: "University of Leeds",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 6.4,
    commissionLessThan20: 6,
    tier: "TERTIARY"
  },
  {
    university: "University of Bristol",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 6.4,
    commissionLessThan20: 6,
    tier: "TERTIARY"
  },
  {
    university: "University of Bath",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 6.4,
    commissionLessThan20: 6,
    tier: "TERTIARY"
  },
  {
    university: "SOAS University of London",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 6.4,
    commissionLessThan20: 6,
    tier: "TERTIARY"
  },
  {
    university: "Queen Mary University London",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 6.4,
    commissionLessThan20: 6,
    tier: "TERTIARY"
  },
  {
    university: "Leeds Trinity University",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 6.4,
    commissionLessThan20: 6,
    tier: "TERTIARY"
  },
  {
    university: "Lancaster University",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 6.4,
    commissionLessThan20: 6,
    tier: "TERTIARY"
  },
  {
    university: "Goldsmiths University of London",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 6.4,
    commissionLessThan20: 6,
    tier: "TERTIARY"
  },
  {
    university: "University of Manchester",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 5.6,
    commissionLessThan20: 5.25,
    tier: "TERTIARY"
  },
  {
    university: "Kings College London",
    remarks: null,
    commissionType: "Percent of Tution Fees",
    currency: null,
    commissionMoreThan20: 5.6,
    commissionLessThan20: 5.25,
    tier: "TERTIARY"
  }
];

// Helper function to find commission info for a university
export const findCommissionInfo = (universityName: string): CommissionInfo | null => {
  if (!universityName) return null;
  
  const normalizedSearch = universityName.toLowerCase().trim()
    .replace(/\s+/g, ' ')  // normalize multiple spaces
    .replace(/[,.-]/g, ' '); // remove punctuation
  
  // First try exact match
  let match = commissionData.find(c => {
    const normalizedUniversity = c.university.toLowerCase().trim()
      .replace(/\s+/g, ' ')
      .replace(/[,.-]/g, ' ');
    return normalizedSearch === normalizedUniversity;
  });
  
  if (match) return match;
  
  // Try matching with "the" removed (e.g., "University of the West of Scotland" vs "University of West of Scotland")
  const searchWithoutThe = normalizedSearch.replace(/\bthe\b/g, '').replace(/\s+/g, ' ').trim();
  match = commissionData.find(c => {
    const uniWithoutThe = c.university.toLowerCase()
      .replace(/\bthe\b/g, '').replace(/\s+/g, ' ').trim();
    return searchWithoutThe === uniWithoutThe;
  });
  
  if (match) return match;
  
  // Score-based matching - find best match by counting matching significant words
  // Exclude common words like "university", "of", "the", "and", "college"
  const commonWords = new Set(['university', 'of', 'the', 'and', 'college', 'campus', 'london', 'uk', 'england']);
  const searchWords = normalizedSearch.split(/\s+/).filter(w => w.length > 2 && !commonWords.has(w));
  
  let bestMatch: CommissionInfo | null = null;
  let bestScore = 0;
  
  for (const c of commissionData) {
    const uniWords = c.university.toLowerCase().split(/\s+/).filter(w => w.length > 2 && !commonWords.has(w));
    
    // Count exact word matches
    let score = 0;
    for (const sw of searchWords) {
      if (uniWords.some(uw => uw === sw)) {
        score += 10; // exact word match
      } else if (uniWords.some(uw => uw.includes(sw) || sw.includes(uw))) {
        score += 3; // partial word match
      }
    }
    
    // Penalize if search has more unique words than commission entry (prevents partial matches)
    const uniqueSearchWords = searchWords.filter(sw => !uniWords.some(uw => uw === sw || uw.includes(sw) || sw.includes(uw)));
    score -= uniqueSearchWords.length * 5;
    
    // Bonus for similar word count
    if (Math.abs(searchWords.length - uniWords.length) <= 1) {
      score += 5;
    }
    
    if (score > bestScore && score >= 10) { // minimum threshold
      bestScore = score;
      bestMatch = c;
    }
  }
  
  return bestMatch;
};

// Format commission display string
export const formatCommission = (info: CommissionInfo): string => {
  if (!info) return "N/A";
  
  if (info.commissionType === "Amount") {
    return `${info.currency} ${info.commissionMoreThan20?.toLocaleString()} (>20 students) / ${info.currency} ${info.commissionLessThan20?.toLocaleString()} (≤20 students)`;
  }
  
  return `${info.commissionMoreThan20}% (>20 students) / ${info.commissionLessThan20}% (≤20 students)`;
};

// Get tier badge color
export const getTierColor = (tier: string): { bg: string; text: string } => {
  switch (tier) {
    case "PRIMARY":
      return { bg: "#dcfce7", text: "#166534" }; // Green
    case "SECONDARY":
      return { bg: "#fef3c7", text: "#92400e" }; // Yellow/Amber
    case "TERTIARY":
      return { bg: "#fee2e2", text: "#991b1b" }; // Red
    default:
      return { bg: "#f1f5f9", text: "#475569" }; // Gray
  }
};
