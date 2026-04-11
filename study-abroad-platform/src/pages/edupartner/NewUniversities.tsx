import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, Filter, GraduationCap, Users, Home, FileText, 
  Building2, CreditCard, BookOpen, MessageSquare, Shield,
  ExternalLink, Heart, MapPin, Clock, DollarSign, Award,
  Globe, Zap, CheckCircle, ChevronDown, ChevronUp, X,
  Gift, FileCheck, Languages, BarChart3, Flame, Calendar, UserPlus, Menu, ChevronRight
} from "lucide-react";
import { findCommissionInfo, getTierColor } from "../../data/commissionData";
import "./newuniversities.css";

interface University {
  id: number;
  University: string;
  Course: string;
  Program_Name?: string;
  Country: string;
  Campus: string;
  Duration: string;
  Study_Level: string;
  Commission: string;
  Open_Intakes: string;
  Scholarship_Available?: string;
  Application_Fee?: string | number;
  English_Proficiency_Exam_Waiver?: string;
  Backlog_Range?: string;
  IELTS_Score?: string;
  University_Ranking?: string;
  Website_URL?: string;
  Intake_Year?: string;
  Application_Deadline?: string;
  Yearly_Tuition_Fees?: string;
  Entry_Requirements?: string;
  IELTS_No_Band_Less_Than?: string;
  TOEFL_Score?: string;
  TOEFL_No_Band_Less_Than?: string;
  PTE_Score?: string;
  PTE_No_Band_Less_Than?: string;
  DET_Score?: string;
  Scholarship_Detail?: string;
  Application_Mode?: string;
  Remarks?: string;
  logo?: string;
}

/** University name → website domain mapping for logo fetching */
const UNIVERSITY_DOMAINS: Record<string, string> = {
  // PRIMARY TIER - UK
  'university of leicester': 'le.ac.uk',
  'anglia ruskin university': 'aru.ac.uk',
  'anglia ruskin university -london campus': 'aru.ac.uk',
  'university of huddersfield': 'hud.ac.uk',
  'university of huddersfield -london': 'hud.ac.uk',
  'de montfort university': 'dmu.ac.uk',
  'de montfort university, leicester, england': 'dmu.ac.uk',
  'coventry university': 'coventry.ac.uk',
  'regent college london': 'rcl.ac.uk',
  'university of worcester': 'worcester.ac.uk',
  'university of sunderland': 'sunderland.ac.uk',
  'university of law': 'law.ac.uk',
  'university of hull': 'hull.ac.uk',
  'university of hull -london': 'hull.ac.uk',
  'university of greenwich': 'greenwich.ac.uk',
  'university of brighton': 'brighton.ac.uk',
  'liverpool john moores university': 'ljmu.ac.uk',
  'aston university': 'aston.ac.uk',
  'aston university -london campus': 'aston.ac.uk',
  'university of east london': 'uel.ac.uk',
  'university of lincoln': 'lincoln.ac.uk',
  'university of sussex': 'sussex.ac.uk',
  'university of west london': 'uwl.ac.uk',
  // SECONDARY TIER - UK
  'university of stirling': 'stir.ac.uk',
  'university of hertfordshire': 'herts.ac.uk',
  'university of dundee': 'dundee.ac.uk',
  'university of chester': 'chester.ac.uk',
  'university college birmingham': 'ucb.ac.uk',
  'ulster university': 'ulster.ac.uk',
  'nottingham trent university': 'ntu.ac.uk',
  'northumbria university': 'northumbria.ac.uk',
  'northumbria university london campus': 'northumbria.ac.uk',
  'london metropolitan university': 'londonmet.ac.uk',
  'leeds beckett university': 'leedsbeckett.ac.uk',
  'birmingham city university': 'bcu.ac.uk',
  'university of wolverhampton': 'wlv.ac.uk',
  'university of the west of scotland': 'uws.ac.uk',
  'university of wales trinity saint david': 'uwtsd.ac.uk',
  'university of surrey': 'surrey.ac.uk',
  'university of south wales': 'southwales.ac.uk',
  'university of northampton': 'northampton.ac.uk',
  'university of east anglia': 'uea.ac.uk',
  'university of derby': 'derby.ac.uk',
  'university of central lancashire': 'uclan.ac.uk',
  'university of bradford': 'bradford.ac.uk',
  'university of bedfordshire': 'beds.ac.uk',
  'university centre leeds': 'ucleeds.ac.uk',
  'oxford brookes university': 'brookes.ac.uk',
  'brunel university london': 'brunel.ac.uk',
  'sheffield hallam university': 'shu.ac.uk',
  'university of glasgow': 'gla.ac.uk',
  'university of york': 'york.ac.uk',
  'university of salford': 'salford.ac.uk',
  'university of portsmouth': 'port.ac.uk',
  'university of essex': 'essex.ac.uk',
  'york st john university': 'yorksj.ac.uk',
  'york st john university -london campus': 'yorksj.ac.uk',
  'university of westminster': 'westminster.ac.uk',
  'university of liverpool': 'liverpool.ac.uk',
  'university of kent': 'kent.ac.uk',
  'royal holloway university of london': 'royalholloway.ac.uk',
  // TERTIARY TIER
  'university of west of england': 'uwe.ac.uk',
  'university of strathclyde': 'strath.ac.uk',
  'university of staffordshire': 'staffs.ac.uk',
  'university of sheffield': 'sheffield.ac.uk',
  'university of nottingham': 'nottingham.ac.uk',
  'university of gloucestershire': 'glos.ac.uk',
  'university of exeter': 'exeter.ac.uk',
  'university of birmingham': 'birmingham.ac.uk',
  'oxford international education group': 'oxfordinternational.com',
  'northeastern university london': 'nulondon.ac.uk',
  'city university of london': 'city.ac.uk',
  'university of southampton': 'southampton.ac.uk',
  'university of reading': 'reading.ac.uk',
  'university of leeds': 'leeds.ac.uk',
  'university of bristol': 'bristol.ac.uk',
  'university of bath': 'bath.ac.uk',
  'soas university of london': 'soas.ac.uk',
  'queen mary university london': 'qmul.ac.uk',
  'queen mary university of london': 'qmul.ac.uk',
  'leeds trinity university': 'leedstrinity.ac.uk',
  'lancaster university': 'lancaster.ac.uk',
  'goldsmiths university of london': 'gold.ac.uk',
  'university of manchester': 'manchester.ac.uk',
  'kings college london': 'kcl.ac.uk',
  "king's college london": 'kcl.ac.uk',
  // TOP UK
  'university of oxford': 'ox.ac.uk',
  'university of cambridge': 'cam.ac.uk',
  'imperial college london': 'imperial.ac.uk',
  'university college london': 'ucl.ac.uk',
  'london school of economics': 'lse.ac.uk',
  'university of edinburgh': 'ed.ac.uk',
  'durham university': 'durham.ac.uk',
  'newcastle university': 'ncl.ac.uk',
  'cardiff university': 'cardiff.ac.uk',
  "queen's university belfast": 'qub.ac.uk',
  'loughborough university': 'lboro.ac.uk',
  'university of warwick': 'warwick.ac.uk',
  'keele university': 'keele.ac.uk',
  'middlesex university': 'mdx.ac.uk',
  'manchester metropolitan university': 'mmu.ac.uk',
  'swansea university': 'swansea.ac.uk',
  'bpp university': 'bpp.com',
  'heriot-watt university': 'hw.ac.uk',
  'university of st andrews': 'st-andrews.ac.uk',
  'university of aberdeen': 'abdn.ac.uk',
  'arden university': 'arden.ac.uk',
  // US
  'university of oklahoma': 'ou.edu',
  'university of alabama at birmingham': 'uab.edu',
  'university of maryland, baltimore county': 'umbc.edu',
  'harvard university': 'harvard.edu',
  'stanford university': 'stanford.edu',
  'massachusetts institute of technology': 'mit.edu',
  'columbia university': 'columbia.edu',
  'yale university': 'yale.edu',
  'princeton university': 'princeton.edu',
  'cornell university': 'cornell.edu',
  'university of pennsylvania': 'upenn.edu',
  'university of chicago': 'uchicago.edu',
  'northwestern university': 'northwestern.edu',
  'duke university': 'duke.edu',
  'new york university': 'nyu.edu',
  'university of california, berkeley': 'berkeley.edu',
  'university of california, los angeles': 'ucla.edu',
  'university of michigan': 'umich.edu',
  'georgia institute of technology': 'gatech.edu',
  'carnegie mellon university': 'cmu.edu',
  // Canada
  'university of regina': 'uregina.ca',
  'university of niagara falls canada': 'unfc.ca',
  'university of lethbridge': 'uleth.ca',
  'university of northern british columbia': 'unbc.ca',
  'university of toronto': 'utoronto.ca',
  'university of british columbia': 'ubc.ca',
  'mcgill university': 'mcgill.ca',
  'mcmaster university': 'mcmaster.ca',
  'university of alberta': 'ualberta.ca',
  'university of waterloo': 'uwaterloo.ca',
  "queen's university": 'queensu.ca',
  'university of calgary': 'ucalgary.ca',
  'simon fraser university': 'sfu.ca',
  'university of ottawa': 'uottawa.ca',
  // Australia
  'university of waikato': 'waikato.ac.nz',
  'university of canterbury': 'canterbury.ac.nz',
  'university of melbourne': 'unimelb.edu.au',
  'university of sydney': 'sydney.edu.au',
  'australian national university': 'anu.edu.au',
  'university of queensland': 'uq.edu.au',
  'monash university': 'monash.edu',
  'university of new south wales': 'unsw.edu.au',
  'university of western australia': 'uwa.edu.au',
  'university of adelaide': 'adelaide.edu.au',
  // Ireland
  'trinity college dublin': 'tcd.ie',
  'university college dublin': 'ucd.ie',
  'national university of ireland galway': 'nuigalway.ie',
  // Europe
  'eth zurich': 'ethz.ch',
  'technical university of munich': 'tum.de',
  'heidelberg university': 'uni-heidelberg.de',
  'ludwig maximilian university': 'lmu.de',
  'freie university of berlin': 'fu-berlin.de',
  'humboldt university of berlin': 'hu-berlin.de',
  'rwth aachen university': 'rwth-aachen.de',
  // Dubai
  'heriot-watt university dubai': 'hw.ac.uk',
  'middlesex university dubai': 'mdx.ac.ae',
  'university of wollongong in dubai': 'uowdubai.ac.ae',
  'manipal academy dubai': 'manipaldubai.com',
  'american university in dubai': 'aud.edu',
};

/** Get domain for a university from its name or Website_URL */
const getUniversityDomain = (uni: { University?: string; Website_URL?: string }): string | null => {
  // 1. Try Website_URL first
  if (uni.Website_URL) {
    try {
      let url = uni.Website_URL.trim();
      if (!url.startsWith('http')) url = 'https://' + url;
      const domain = new URL(url).hostname.replace('www.', '');
      if (domain && domain.includes('.')) return domain;
    } catch { /* ignore */ }
  }

  // 2. Try name mapping (exact match)
  if (uni.University) {
    const key = uni.University.toLowerCase().trim();
    if (UNIVERSITY_DOMAINS[key]) return UNIVERSITY_DOMAINS[key];

    // 3. Try fuzzy match - strip suffixes like " -London Campus", " London", etc.
    const cleaned = key
      .replace(/\s*-\s*london\s*campus/i, '')
      .replace(/\s*london\s*campus/i, '')
      .replace(/,\s*[^,]+$/i, '')
      .trim();
    if (UNIVERSITY_DOMAINS[cleaned]) return UNIVERSITY_DOMAINS[cleaned];
  }

  return null;
};

/** Build logo URL using Clearbit */
const getClearbitLogo = (domain: string): string =>
  `https://logo.clearbit.com/${domain}`;

/** Build fallback logo URL using Google Favicon service */
const getGoogleFavicon = (domain: string): string =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

/** Get country flag emoji */
const getCountryFlag = (country: string): string => {
  const flags: Record<string, string> = {
    'United Kingdom': '🇬🇧', 'UK': '🇬🇧', 'Canada': '🇨🇦', 'Australia': '🇦🇺',
    'United States': '🇺🇸', 'USA': '🇺🇸', 'Germany': '🇩🇪', 'France': '🇫🇷',
    'Ireland': '🇮🇪', 'New Zealand': '🇳🇿', 'Netherlands': '🇳🇱', 'Sweden': '🇸🇪',
    'Switzerland': '🇨🇭', 'Italy': '🇮🇹', 'Spain': '🇪🇸', 'Japan': '🇯🇵',
    'South Korea': '🇰🇷', 'Singapore': '🇸🇬', 'Malaysia': '🇲🇾', 'India': '🇮🇳',
    'UAE': '🇦🇪', 'United Arab Emirates': '🇦🇪', 'Dubai': '🇦🇪',
  };
  return flags[country] || '🌍';
};

/** Format currency for tuition */
const formatTuition = (tuition?: string): string => {
  if (!tuition || tuition === 'N/A' || tuition === '0') return 'Contact university';
  return tuition;
};

/** Determine if application is free */
const isAppFree = (fee?: string | number): boolean => {
  if (!fee) return false;
  return fee === 0 || fee === '0' || fee === '0.00' || parseFloat(String(fee)) === 0;
};

/** Parse open intakes into array */
const parseIntakes = (intakes?: string): string[] => {
  if (!intakes) return [];
  return intakes.split(/[,;]/).map(s => s.trim()).filter(Boolean);
};

const NewUniversities = () => {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState<University[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(true); // Always open by default
  const [filterCountry, setFilterCountry] = useState("");
  const [filterStudyLevel, setFilterStudyLevel] = useState("");
  const [filterScholarship, setFilterScholarship] = useState("");
  const [filterAppFee, setFilterAppFee] = useState("");
  const [filterWaiver, setFilterWaiver] = useState("");
  const [filterTuitionRange, setFilterTuitionRange] = useState("");
  const [filterIntake, setFilterIntake] = useState("");
  const [filterPunjabHaryana, setFilterPunjabHaryana] = useState("");
  const [showEligibilityModal, setShowEligibilityModal] = useState(false);
  const [eligibilityFilters, setEligibilityFilters] = useState({
    nationality: "",
    educationCountry: "",
    lastLevelOfStudy: "",
    gradingScheme: "",
    englishExamStatus: ""
  });
  const [appliedEligibilityFilters, setAppliedEligibilityFilters] = useState({
    nationality: "",
    educationCountry: "",
    lastLevelOfStudy: "",
    gradingScheme: "",
    englishExamStatus: ""
  });
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  // Track logo loading stage per uni: 0=clearbit, 1=google-favicon, 2=fallback
  const [logoStage, setLogoStage] = useState<Record<number, number>>({});
  const [visibleCount, setVisibleCount] = useState(20);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Get user info
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user.user_name || "";
  const userRole = user.role;
  const userId = user.id;
  const companyName = user.company_name || "";
  const avatarLetter = userName ? userName.charAt(0).toUpperCase() : "U";

  // Check if Super Admin (parent_admin_id is null, 0, or undefined)
  // AND email must be the Super Admin email for extra security
  const isSuperAdmin = (user.parent_admin_id === null || 
                       user.parent_admin_id === 0 || 
                       user.parent_admin_id === undefined ||
                       user.parent_admin_id === '0') &&
                       user.email === 'info@codescholaroverseas.com';


  // Application count for sidebar badge
  const [applicationCount, setApplicationCount] = useState(0);

  useEffect(() => {
    fetchUniversities();
    // Fetch application count for sidebar badge
    const fetchAppCount = async () => {
      try {
        const API_BASE = window.location.hostname === 'localhost'
          ? 'http://localhost/studyabroadplatform-api'
          : '/studyabroadplatform-api';
        const res = await fetch(`${API_BASE}/edupartner/get_applications_v2.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: user.id, role: user.role }),
        });
        const data = await res.json();
        if (data.success) setApplicationCount(data.applications?.length || 0);
      } catch (e) { /* silent */ }
    };
    fetchAppCount();
  }, []);

  useEffect(() => {
    filterUniversities();
  }, [searchTerm, filterCountry, filterStudyLevel, filterScholarship, filterAppFee, filterWaiver, filterTuitionRange, filterIntake, filterPunjabHaryana, appliedEligibilityFilters, universities]);

  const fetchUniversities = async () => {
    try {
      const API_BASE = window.location.hostname === 'localhost'
        ? 'http://localhost/studyabroadplatform-api'
        : '/studyabroadplatform-api';

      const response = await fetch(`${API_BASE}/edupartner/get_universities.php`);
      const data = await response.json();

      if (data.success) {
        // Log first university to see all available fields
        if (data.universities.length > 0) {
          console.log('First university data:', data.universities[0]);
          console.log('All field names:', Object.keys(data.universities[0]));
          console.log('StudyLevel value:', data.universities[0].StudyLevel);
          console.log('Study_Level value:', data.universities[0].Study_Level);
        }
        setUniversities(data.universities);
        setFilteredUniversities(data.universities);
      }
    } catch (error) {
      console.error("Error fetching universities:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterUniversities = () => {
    try {
      let filtered = universities;

      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(uni =>
          (uni.University || '').toLowerCase().includes(term) ||
          (uni.Program_Name || '').toLowerCase().includes(term) ||
          (uni.Course || '').toLowerCase().includes(term) ||
          (uni.Country || '').toLowerCase().includes(term) ||
          (uni.Campus || '').toLowerCase().includes(term)
        );
      }

    if (filterCountry) {
      filtered = filtered.filter(uni => uni.Country === filterCountry);
    }

    if (filterStudyLevel) {
      filtered = filtered.filter(uni => uni.Study_Level === filterStudyLevel);
    }

    if (filterScholarship === 'yes') {
      filtered = filtered.filter(uni => uni.Scholarship_Available?.toLowerCase() === 'yes');
    }

    if (filterAppFee === 'free') {
      filtered = filtered.filter(uni => isAppFree(uni.Application_Fee));
    }

    if (filterWaiver === 'yes') {
      filtered = filtered.filter(uni => {
        const waiver = uni.English_Proficiency_Exam_Waiver;
        if (!waiver || waiver === 'N/A' || waiver.toLowerCase() === 'no' || waiver.toLowerCase() === 'not available') {
          return false;
        }
        // Check if waiver text contains meaningful content (more than just whitespace)
        const cleanWaiver = waiver.trim();
        return cleanWaiver.length > 3; // Must have actual waiver information
      });
    }

    if (filterTuitionRange) {
      filtered = filtered.filter(uni => {
        const fee = parseFloat(uni.Yearly_Tuition_Fees || '0');
        switch(filterTuitionRange) {
          case 'low': return fee > 0 && fee <= 10000;
          case 'medium': return fee > 10000 && fee <= 20000;
          case 'high': return fee > 20000;
          default: return true;
        }
      });
    }

    if (filterIntake) {
      filtered = filtered.filter(uni => {
        if (filterIntake === 'No Open Intakes') {
          return !uni.Open_Intakes || uni.Open_Intakes.toLowerCase() === 'no open intakes';
        }
        return uni.Open_Intakes && uni.Open_Intakes.includes(filterIntake);
      });
    }

    if (filterPunjabHaryana === 'exclude') {
      filtered = filtered.filter(uni => 
        !uni.Remarks || 
        (!uni.Remarks.toLowerCase().includes('punjab') && !uni.Remarks.toLowerCase().includes('haryana'))
      );
    }

    // Apply Eligibility Filters
    if (appliedEligibilityFilters.lastLevelOfStudy) {
      // Map lastLevelOfStudy to Study_Level
      const levelMapping: Record<string, string[]> = {
        "12th Grade": ["Foundation", "Diploma", "Undergraduate"],
        "Diploma": ["Undergraduate", "Postgraduate"],
        "Graduation/Bachelor's": ["Postgraduate", "Masters", "MBA", "MSc"],
        "Post Graduation/Master's": ["Doctorate", "PhD", "Research"]
      };
      
      const allowedLevels = levelMapping[appliedEligibilityFilters.lastLevelOfStudy] || [];
      if (allowedLevels.length > 0) {
        filtered = filtered.filter(uni => 
          allowedLevels.some(level => 
            uni.Study_Level?.toLowerCase().includes(level.toLowerCase())
          )
        );
      }
    }

    if (appliedEligibilityFilters.englishExamStatus === 'No Test') {
      // Show only programs with English Exam Waiver
      filtered = filtered.filter(uni => {
        const waiver = uni.English_Proficiency_Exam_Waiver;
        if (!waiver || waiver === 'N/A' || waiver.toLowerCase() === 'no' || waiver.toLowerCase() === 'not available') {
          return false;
        }
        // Check if waiver text contains meaningful content (more than just whitespace)
        const cleanWaiver = waiver.trim();
        return cleanWaiver.length > 3; // Must have actual waiver information
      });
    }

    setFilteredUniversities(filtered);
    } catch (error) {
      console.error('Error filtering universities:', error);
      setFilteredUniversities(universities);
    }
  };

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleLogoError = useCallback((id: number) => {
    setLogoStage(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }, []);

  const handleCardClick = (uni: University) => {
    setSelectedUniversity(uni);
  };

  const handleCloseDetails = () => {
    setSelectedUniversity(null);
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 20);
  };

  /** Get badges for a university */
  const getBadges = (uni: University) => {
    const badges: { label: string; icon: React.ReactNode; variant: string }[] = [];
    
    // Commission Bonus badge (LAKH / 50K)
    const commInfo = findCommissionInfo(uni.University);
    if (commInfo?.remarks?.includes('LAKH')) {
      badges.push({ label: commInfo.remarks, icon: <Gift size={12} />, variant: 'amber' });
    } else if (commInfo?.remarks?.includes('50K')) {
      badges.push({ label: commInfo.remarks, icon: <Gift size={12} />, variant: 'green' });
    }

    // No Interview badge
    if (commInfo?.remarks?.toLowerCase().includes('no interview')) {
      badges.push({ label: 'No Interview Required', icon: <CheckCircle size={12} />, variant: 'purple' });
    }

    // Scholarship badge
    if (uni.Scholarship_Available?.toLowerCase() === 'yes') {
      badges.push({ label: 'Scholarship Available', icon: <Award size={12} />, variant: 'blue' });
    }

    // Free Application badge
    if (isAppFree(uni.Application_Fee)) {
      badges.push({ label: 'Free Application', icon: <Zap size={12} />, variant: 'pink' });
    }

    // English Exam Waiver badge
    if (uni.English_Proficiency_Exam_Waiver && uni.English_Proficiency_Exam_Waiver !== 'N/A' && 
        uni.English_Proficiency_Exam_Waiver !== 'No' && uni.English_Proficiency_Exam_Waiver.length > 3) {
      badges.push({ label: 'English Exam Waiver', icon: <FileCheck size={12} />, variant: 'teal' });
    }

    // Backlog Friendly badge
    if (uni.Backlog_Range) {
      const backlogMatch = uni.Backlog_Range.match(/(\d+)\s*-\s*(\d+)/);
      if (backlogMatch && parseInt(backlogMatch[2]) >= 10) {
        badges.push({ label: `Up to ${backlogMatch[2]} Backlogs`, icon: <BarChart3 size={12} />, variant: 'orange' });
      }
    }

    // Low IELTS badge
    if (uni.IELTS_Score && parseFloat(uni.IELTS_Score) <= 5.5 && parseFloat(uni.IELTS_Score) > 0) {
      badges.push({ label: `Low IELTS (${uni.IELTS_Score})`, icon: <Languages size={12} />, variant: 'indigo' });
    }

    // High Commission badge
    if (commInfo && commInfo.tier === 'PRIMARY' && commInfo.commissionMoreThan20 && commInfo.commissionMoreThan20 >= 18) {
      badges.push({ label: `High Commission (${commInfo.commissionMoreThan20}%)`, icon: <Flame size={12} />, variant: 'green' });
    }
    
    return badges;
  };

  /** Get success chance */
  const getSuccessChance = (uni: University) => {
    if (isAppFree(uni.Application_Fee) || uni.Scholarship_Available?.toLowerCase() === 'yes') {
      return { label: 'High', color: '#10b981' };
    }
    return { label: 'Medium', color: '#f59e0b' };
  };

  /** Render university logo with multi-source fallback:
   *  Stage 0: Clearbit logo (best quality)
   *  Stage 1: Google Favicon (reliable fallback)
   *  Stage 2+: Styled initial letter */
  const renderLogo = (uni: University, size: number = 44) => {
    const domain = getUniversityDomain(uni);
    const stage = logoStage[uni.id] || 0;
    const initial = uni.University?.charAt(0)?.toUpperCase() || 'U';

    if (domain && stage === 0) {
      return (
        <img
          src={getClearbitLogo(domain)}
          alt={uni.University}
          className="uni-logo-img"
          style={{ width: size, height: size }}
          onError={() => handleLogoError(uni.id)}
          loading="lazy"
        />
      );
    }

    if (domain && stage === 1) {
      return (
        <img
          src={getGoogleFavicon(domain)}
          alt={uni.University}
          className="uni-logo-img"
          style={{ width: size, height: size }}
          onError={() => handleLogoError(uni.id)}
          loading="lazy"
        />
      );
    }

    return (
      <div className="uni-logo-fallback" style={{ width: size, height: size, fontSize: size * 0.4 }}>
        {initial}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="nu-loading-screen">
          <div className="nu-loading-spinner" />
          <p>Loading programs...</p>
        </div>
      </div>
    );
  }

  // ---------- SIDEBAR (same as Dashboard) ----------
  const Sidebar = () => (
    <>
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-icon">
            <GraduationCap size={24} />
          </div>
          <div className="brand-text-wrapper">
            <span className="brand-name">EduPartner</span>
            <span className="brand-tagline">{userRole}</span>
          </div>
          <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="menu-group">
          <div className="menu-group-title">Overview</div>
          <ul className="menu">
            <li onClick={() => { navigate("/edupartner/dashboard?section=dashboard"); setSidebarOpen(false); }}>
              <Home size={18} className="menu-icon" />
              <span className="menu-text">Dashboard</span>
              <ChevronRight size={14} className="menu-chevron" />
            </li>
          </ul>
        </div>

        <div className="menu-group">
          <div className="menu-group-title">Management</div>
          <ul className="menu">
            <li className="active" onClick={() => setSidebarOpen(false)}>
              <GraduationCap size={18} className="menu-icon" />
              <span className="menu-text">Universities</span>
            </li>

            <li onClick={() => { navigate("/edupartner/students"); setSidebarOpen(false); }}>
              <Users size={18} className="menu-icon" />
              <span className="menu-text">Students</span>
            </li>

            {(userRole === "Admin" || isSuperAdmin) && (
              <li onClick={() => { navigate("/edupartner/dashboard?section=agents"); setSidebarOpen(false); }}>
                <UserPlus size={18} className="menu-icon" />
                <span className="menu-text">Agents</span>
              </li>
            )}

            {isSuperAdmin && (
              <li onClick={() => { navigate("/edupartner/dashboard?section=admins"); setSidebarOpen(false); }}>
                <Shield size={18} className="menu-icon" />
                <span className="menu-text">Admins</span>
              </li>
            )}

            {(userRole === "Agent" || userRole === "Admin" || isSuperAdmin) && (
              <li onClick={() => { navigate("/edupartner/dashboard?section=counselors"); setSidebarOpen(false); }}>
                <BookOpen size={18} className="menu-icon" />
                <span className="menu-text">Counselors</span>
              </li>
            )}
          </ul>
        </div>

        <div className="menu-group">
          <div className="menu-group-title">Operations</div>
          <ul className="menu">
            <li onClick={() => { navigate("/edupartner/dashboard?section=applications"); setSidebarOpen(false); }}>
              <FileText size={18} className="menu-icon" />
              <span className="menu-text">Applications</span>
              {applicationCount > 0 && <span className="menu-badge">{applicationCount}</span>}
            </li>

            {userRole !== "Counselor" && (
              <li onClick={() => { navigate("/edupartner/dashboard?section=commissions"); setSidebarOpen(false); }}>
                <DollarSign size={18} className="menu-icon" />
                <span className="menu-text">Commissions</span>
              </li>
            )}

            <li onClick={() => { navigate("/edupartner/dashboard?section=accommodation"); setSidebarOpen(false); }}>
              <Building2 size={18} className="menu-icon" />
              <span className="menu-text">Accommodation</span>
            </li>

            <li onClick={() => { navigate("/edupartner/dashboard?section=loan"); setSidebarOpen(false); }}>
              <CreditCard size={18} className="menu-icon" />
              <span className="menu-text">Loan Services</span>
            </li>
          </ul>
        </div>

        <div className="menu-group">
          <div className="menu-group-title">Resources</div>
          <ul className="menu">
            <li onClick={() => { navigate("/edupartner/dashboard?section=testprep"); setSidebarOpen(false); }}>
              <BookOpen size={18} className="menu-icon" />
              <span className="menu-text">Test Prep</span>
            </li>

            <li onClick={() => { navigate("/edupartner/dashboard?section=teamchat"); setSidebarOpen(false); }}>
              <MessageSquare size={18} className="menu-icon" />
              <span className="menu-text">Team Chat</span>
            </li>

            {userRole === "Admin" && (
              <li onClick={() => { navigate("/edupartner/dashboard?section=permissions"); setSidebarOpen(false); }}>
                <Shield size={18} className="menu-icon" />
                <span className="menu-text">Permissions</span>
              </li>
            )}
          </ul>
        </div>

        <div className="sidebar-footer">
          <div className="footer-avatar">{avatarLetter}</div>
          <div className="footer-info">
            <div className="footer-name">{userName}</div>
            <div className="footer-role">{companyName}</div>
          </div>
          <ChevronRight size={14} className="footer-chevron" />
        </div>
      </aside>
    </>
  );



  // ---------- DETAIL VIEW ----------
  if (selectedUniversity) {
    const uni = selectedUniversity;
    const badges = getBadges(uni);
    const success = getSuccessChance(uni);
    const intakes = parseIntakes(uni.Open_Intakes);

    return (
      <div className="dashboard-container">
        <Sidebar />
        <main className="main-content">
          <div className="nu-detail-wrapper">
            <button className="nu-back-btn" onClick={handleCloseDetails}>
              ← Back to Programs
            </button>

            {/* Header Card */}
            <div className="nu-detail-header-card">
              <div className="nu-detail-header-content">
                <div className="nu-detail-logo-section">
                  {renderLogo(uni, 80)}
                  <div className="nu-detail-title-section">
                    <h1 className="nu-detail-uni-title">{uni.University}</h1>
                    <p className="nu-detail-program-subtitle">{uni.Program_Name || uni.Course}</p>
                    <div className="nu-detail-meta-tags">
                      <span className="nu-meta-tag"><MapPin size={14} /> {uni.Campus}, {uni.Country}</span>
                      <span className="nu-meta-tag"><Clock size={14} /> {uni.Duration}</span>
                      <span className="nu-meta-tag"><GraduationCap size={14} /> {uni.Study_Level}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <button 
                    className="nu-create-app-btn"
                    onClick={() => {
                      const intakes = parseIntakes(uni.Open_Intakes);
                      const intakeParam = intakes.length > 0 ? `&intakes=${encodeURIComponent(intakes.join(','))}` : '';
                      navigate(`/edupartner/dashboard?section=applications&university=${encodeURIComponent(uni.University)}&course=${encodeURIComponent(uni.Program_Name || uni.Course)}${intakeParam}`);
                    }}
                    style={{
                      padding: '12px 24px',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                      color: 'white',
                      border: '2px solid #2563eb',
                      borderRadius: '8px',
                      fontSize: '15px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s',
                      boxShadow: '0 2px 8px rgba(37, 99, 235, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(37, 99, 235, 0.4)';
                      e.currentTarget.style.borderColor = '#1d4ed8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(37, 99, 235, 0.2)';
                      e.currentTarget.style.borderColor = '#2563eb';
                    }}
                  >
                    <FileText size={16} />
                    Create Application
                  </button>
                  {uni.Website_URL && (
                    <a href={uni.Website_URL.startsWith('http') ? uni.Website_URL : `https://${uni.Website_URL}`} target="_blank" rel="noopener noreferrer" className="nu-visit-website-btn">
                      Visit Website <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
              
              {/* Badges */}
              {badges.length > 0 && (
                <div className="nu-detail-badges-row">
                  {badges.map((b, i) => (
                    <span key={i} className={`nu-detail-badge nu-detail-badge-${b.variant}`}>
                      {b.icon} {b.label}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Main Content Grid */}
            <div className="nu-detail-content-grid">
              
              {/* Left Column */}
              <div className="nu-detail-left-column">
                
                {/* Program Intakes */}
                {intakes.length > 0 && (
                  <div className="nu-detail-section-card">
                    <h3 className="nu-section-title">
                      <Calendar size={20} className="nu-section-icon-lucide" />
                      Program Intakes
                    </h3>
                    <div className="nu-intakes-grid">
                      {intakes.map((intake, i) => (
                        <div key={i} className="nu-intake-item">
                          <span className="nu-intake-status">Open</span>
                          <span className="nu-intake-month">{intake}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Admission Requirements */}
                <div className="nu-detail-section-card">
                  <h3 className="nu-section-title">
                    <FileText size={20} className="nu-section-icon-lucide" />
                    Admission Requirements
                  </h3>
                  
                  <div className="nu-subsection">
                    <h4 className="nu-subsection-title">Academic Background</h4>
                    <div className="nu-requirement-row">
                      <span className="nu-req-label">Minimum Level of Education</span>
                      <span className="nu-req-value">{uni.Entry_Requirements || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="nu-subsection">
                    <h4 className="nu-subsection-title">Minimum Language Test Scores</h4>
                    {uni.IELTS_Score && (
                      <div className="nu-test-score-box">
                        <div className="nu-test-name">IELTS</div>
                        <div className="nu-test-score">{uni.IELTS_Score}</div>
                        {uni.IELTS_No_Band_Less_Than && (
                          <div className="nu-test-detail">No band less than {uni.IELTS_No_Band_Less_Than}</div>
                        )}
                      </div>
                    )}
                    {uni.TOEFL_Score && (
                      <div className="nu-test-score-box">
                        <div className="nu-test-name">TOEFL</div>
                        <div className="nu-test-score">{uni.TOEFL_Score}</div>
                        {uni.TOEFL_No_Band_Less_Than && (
                          <div className="nu-test-detail">No band less than {uni.TOEFL_No_Band_Less_Than}</div>
                        )}
                      </div>
                    )}
                    {uni.PTE_Score && (
                      <div className="nu-test-score-box">
                        <div className="nu-test-name">PTE</div>
                        <div className="nu-test-score">{uni.PTE_Score}</div>
                        {uni.PTE_No_Band_Less_Than && (
                          <div className="nu-test-detail">No band less than {uni.PTE_No_Band_Less_Than}</div>
                        )}
                      </div>
                    )}
                    {uni.DET_Score && (
                      <div className="nu-test-score-box">
                        <div className="nu-test-name">DET</div>
                        <div className="nu-test-score">{uni.DET_Score}</div>
                      </div>
                    )}
                    {uni.English_Proficiency_Exam_Waiver && uni.English_Proficiency_Exam_Waiver !== 'N/A' && (
                      <div className="nu-waiver-note">
                        <CheckCircle size={16} color="#10b981" />
                        <span>English Exam Waiver: {uni.English_Proficiency_Exam_Waiver}</span>
                      </div>
                    )}
                  </div>

                  {uni.Backlog_Range && uni.Backlog_Range !== 'N/A' && (
                    <div className="nu-subsection">
                      <h4 className="nu-subsection-title">Backlogs Accepted</h4>
                      <div className="nu-requirement-row">
                        <span className="nu-req-value">{uni.Backlog_Range}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Important Remarks - Moved from Right Column */}
                {uni.Remarks && uni.Remarks !== 'N/A' && (
                  <div className="nu-detail-section-card" style={{ 
                    background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                    border: '2px solid #fde68a'
                  }}>
                    <h3 className="nu-section-title" style={{ color: '#92400e' }}>
                      ⚠️ Important Remarks
                    </h3>
                    <div style={{ 
                      color: '#78350f', 
                      fontWeight: 500,
                      fontSize: '15px',
                      lineHeight: '1.6'
                    }}>
                      {uni.Remarks}
                    </div>
                  </div>
                )}

                {/* Commission Information */}
                {(() => {
                  const commInfo = findCommissionInfo(uni.University);
                  if (!commInfo) return null;
                  const tierColors = getTierColor(commInfo.tier);
                  return (
                    <div className="nu-detail-section-card nu-commission-section" style={{ marginBottom: 0 }}>
                      <h3 className="nu-section-title">
                        <DollarSign size={20} className="nu-section-icon-lucide" />
                        Commission Information
                        <span className="nu-tier-badge" style={{ background: tierColors.bg, color: tierColors.text }}>
                          {commInfo.tier}
                        </span>
                      </h3>
                      <div className="nu-commission-grid">
                        <div className="nu-commission-item">
                          <span className="nu-commission-label">Type</span>
                          <span className="nu-commission-value">{commInfo.commissionType || 'N/A'}</span>
                        </div>
                        <div className="nu-commission-item">
                          <span className="nu-commission-label">&gt;20 Students</span>
                          <span className="nu-commission-value nu-commission-highlight">
                            {commInfo.commissionType === "Amount"
                              ? `${commInfo.currency} ${commInfo.commissionMoreThan20?.toLocaleString()}`
                              : `${commInfo.commissionMoreThan20}%`
                            }
                          </span>
                        </div>
                        <div className="nu-commission-item">
                          <span className="nu-commission-label">≤20 Students</span>
                          <span className="nu-commission-value nu-commission-highlight">
                            {commInfo.commissionType === "Amount"
                              ? `${commInfo.currency} ${commInfo.commissionLessThan20?.toLocaleString()}`
                              : `${commInfo.commissionLessThan20}%`
                            }
                          </span>
                        </div>
                      </div>
                      {commInfo.remarks && commInfo.remarks !== "N/A" && (
                        <div className="nu-commission-remarks">
                          <strong>Remarks:</strong> {commInfo.remarks}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Right Column */}
              <div className="nu-detail-right-column">
                
                {/* Program Details */}
                <div className="nu-detail-section-card">
                  <h3 className="nu-section-title">Program Details</h3>
                  <div className="nu-info-grid">
                    <div className="nu-info-item">
                      <span className="nu-info-label">Duration</span>
                      <span className="nu-info-value">{uni.Duration || 'N/A'}</span>
                    </div>
                    <div className="nu-info-item">
                      <span className="nu-info-label">Study Level</span>
                      <span className="nu-info-value">{uni.Study_Level || 'N/A'}</span>
                    </div>
                    <div className="nu-info-item">
                      <span className="nu-info-label">Campus</span>
                      <span className="nu-info-value">{uni.Campus || 'N/A'}</span>
                    </div>
                    <div className="nu-info-item">
                      <span className="nu-info-label">Country</span>
                      <span className="nu-info-value">{uni.Country} {getCountryFlag(uni.Country)}</span>
                    </div>
                    <div className="nu-info-item">
                      <span className="nu-info-label">University Ranking</span>
                      <span className="nu-info-value">{uni.University_Ranking || 'N/A'}</span>
                    </div>
                    <div className="nu-info-item">
                      <span className="nu-info-label">Application Deadline</span>
                      <span className="nu-info-value">{uni.Application_Deadline || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Fees */}
                <div className="nu-detail-section-card">
                  <h3 className="nu-section-title">Fees</h3>
                  <div className="nu-fee-grid">
                    <div className="nu-fee-item">
                      <span className="nu-fee-label">Tuition (1st year)</span>
                      <span className="nu-fee-value">{formatTuition(uni.Yearly_Tuition_Fees)}</span>
                    </div>
                    <div className="nu-fee-item">
                      <span className="nu-fee-label">Application Fee</span>
                      <span className="nu-fee-value">{isAppFree(uni.Application_Fee) ? 'Free' : (uni.Application_Fee || 'N/A')}</span>
                    </div>
                  </div>
                </div>

                {/* Application Info */}
                <div className="nu-detail-section-card">
                  <h3 className="nu-section-title">Application Info</h3>
                  <div className="nu-info-grid">
                    <div className="nu-info-item">
                      <span className="nu-info-label">Application Mode</span>
                      <span className="nu-info-value">{uni.Application_Mode || 'N/A'}</span>
                    </div>
                    <div className="nu-info-item">
                      <span className="nu-info-label">Success Chance</span>
                      <span className="nu-info-value" style={{ color: success.color, fontWeight: 700 }}>{success.label}</span>
                    </div>
                    <div className="nu-info-item">
                      <span className="nu-info-label">Intake Year</span>
                      <span className="nu-info-value">{uni.Intake_Year || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Scholarships - Moved from Left Column */}
                {uni.Scholarship_Available?.toLowerCase() === 'yes' && (
                  <div className="nu-detail-section-card nu-scholarship-card" style={{ marginBottom: 0 }}>
                    <h3 className="nu-section-title">
                      <Award size={20} className="nu-section-icon-lucide" />
                      Scholarships
                    </h3>
                    <div className="nu-scholarship-content">
                      <div className="nu-scholarship-item">
                        <div className="nu-scholarship-name">{uni.Scholarship_Detail || 'Scholarship Available'}</div>
                        <div className="nu-scholarship-meta">
                          <span>Amount: {uni.Scholarship_Detail || 'Contact for details'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ---------- MAIN LIST VIEW ----------
  const uniqueCountries = [...new Set(universities.map(u => u.Country).filter(Boolean))].sort();
  const uniqueLevels = [...new Set(universities.map(u => u.Study_Level).filter(Boolean))].sort();
  const displayedUniversities = (filteredUniversities || []).slice(0, visibleCount);

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content">
        {/* Mobile menu button */}
        <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
          <Menu size={24} />
        </button>

        <div className="nu-content">
          {/* Header - Single Line with Search on Right */}
          <div className="nu-header-row" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '20px',
            gap: '20px'
          }}>
            {/* Left: Programs Title with Count */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', minWidth: 'fit-content' }}>
              <h1 className="nu-page-title" style={{ margin: 0 }}>Programs</h1>
              <p className="nu-page-subtitle" style={{ margin: 0 }}>{filteredUniversities.length.toLocaleString()}+ programs found</p>
            </div>

            {/* Right: Search Bar with Button and Hide Filters */}
            <div style={{ 
              display: 'flex', 
              gap: '12px', 
              alignItems: 'center'
            }}>
              <div className="nu-search-wrapper" style={{ position: 'relative', width: '400px' }}>
                <Search size={18} className="nu-search-icon" />
                <input
                  type="text"
                  placeholder="Search by university, course, or country..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setVisibleCount(20); }}
                  className="nu-search-input"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      setVisibleCount(20);
                    }
                  }}
                />
                {searchTerm && (
                  <button className="nu-search-clear" onClick={() => setSearchTerm("")}>
                    <X size={16} />
                  </button>
                )}
              </div>
              <button 
                className="nu-search-button"
                onClick={() => setVisibleCount(20)}
                style={{
                  padding: '12px 28px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.3)';
                }}
              >
                <Search size={16} />
                Search
              </button>
              <button className="nu-filter-toggle" onClick={() => setShowFilters(!showFilters)} style={{ minWidth: 'fit-content' }}>
                <Filter size={16} /> {showFilters ? 'Hide Filters' : 'Show Filters'} {showFilters ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="nu-filters-panel-premium">
              <div className="nu-filters-header">
                <h3>Advanced Filters</h3>
                <button className="nu-clear-all-btn" onClick={() => { 
                  setFilterCountry(""); 
                  setFilterStudyLevel(""); 
                  setFilterScholarship("");
                  setFilterAppFee("");
                  setFilterWaiver("");
                  setFilterTuitionRange("");
                  setFilterIntake("");
                  setFilterPunjabHaryana("");
                  setAppliedEligibilityFilters({
                    nationality: "",
                    educationCountry: "",
                    lastLevelOfStudy: "",
                    gradingScheme: "",
                    englishExamStatus: ""
                  });
                  setEligibilityFilters({
                    nationality: "",
                    educationCountry: "",
                    lastLevelOfStudy: "",
                    gradingScheme: "",
                    englishExamStatus: ""
                  });
                  setSearchTerm(""); 
                  setVisibleCount(20); 
                }}>
                  Clear All Filters
                </button>
              </div>
              
              <div className="nu-filters-grid">
                {/* Country Filter */}
                <div className="nu-filter-card">
                  <label className="nu-filter-label">
                    <Globe size={16} />
                    Destination Country
                  </label>
                  <select 
                    className="nu-filter-select" 
                    value={filterCountry} 
                    onChange={(e) => { setFilterCountry(e.target.value); setVisibleCount(20); }}
                  >
                    <option value="">All Countries</option>
                    {uniqueCountries.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Study Level Filter */}
                <div className="nu-filter-card">
                  <label className="nu-filter-label">
                    <GraduationCap size={16} />
                    Study Level
                  </label>
                  <select 
                    className="nu-filter-select" 
                    value={filterStudyLevel} 
                    onChange={(e) => { 
                      setFilterStudyLevel(e.target.value); 
                      setVisibleCount(20);
                      // Sync with eligibility filters
                      if (e.target.value) {
                        const levelToEligibilityMapping: Record<string, string> = {
                          "Foundation": "12th Grade",
                          "Diploma": "12th Grade",
                          "Undergraduate": "12th Grade",
                          "Postgraduate": "Graduation/Bachelor's",
                          "Masters": "Graduation/Bachelor's",
                          "MBA": "Graduation/Bachelor's",
                          "MSc": "Graduation/Bachelor's",
                          "Doctorate": "Post Graduation/Master's",
                          "PhD": "Post Graduation/Master's"
                        };
                        const eligibilityLevel = levelToEligibilityMapping[e.target.value];
                        if (eligibilityLevel) {
                          setAppliedEligibilityFilters({...appliedEligibilityFilters, lastLevelOfStudy: eligibilityLevel});
                          setEligibilityFilters({...eligibilityFilters, lastLevelOfStudy: eligibilityLevel});
                        }
                      }
                    }}
                  >
                    <option value="">All Levels</option>
                    {uniqueLevels.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>

                {/* Intake Month Filter */}
                <div className="nu-filter-card">
                  <label className="nu-filter-label">
                    <Calendar size={16} />
                    Intake Month
                  </label>
                  <select 
                    className="nu-filter-select" 
                    value={filterIntake} 
                    onChange={(e) => { setFilterIntake(e.target.value); setVisibleCount(20); }}
                  >
                    <option value="">All Intakes</option>
                    <option value="Jan">Jan</option>
                    <option value="Feb">Feb</option>
                    <option value="Mar">Mar</option>
                    <option value="Apr">Apr</option>
                    <option value="May">May</option>
                    <option value="Jun">Jun</option>
                    <option value="Jul">Jul</option>
                    <option value="Aug">Aug</option>
                    <option value="Sep">Sep</option>
                    <option value="Oct">Oct</option>
                    <option value="Nov">Nov</option>
                    <option value="Dec">Dec</option>
                    <option value="No Open Intakes">No Open Intakes</option>
                  </select>
                </div>

                {/* Scholarship Filter */}
                <div className="nu-filter-card">
                  <label className="nu-filter-label">
                    <Award size={16} />
                    Scholarship Available
                  </label>
                  <select 
                    className="nu-filter-select" 
                    value={filterScholarship} 
                    onChange={(e) => { setFilterScholarship(e.target.value); setVisibleCount(20); }}
                  >
                    <option value="">All Programs</option>
                    <option value="yes">With Scholarship</option>
                  </select>
                </div>

                {/* Application Fee Filter */}
                <div className="nu-filter-card">
                  <label className="nu-filter-label">
                    <Zap size={16} />
                    Application Fee
                  </label>
                  <select 
                    className="nu-filter-select" 
                    value={filterAppFee} 
                    onChange={(e) => { setFilterAppFee(e.target.value); setVisibleCount(20); }}
                  >
                    <option value="">All Programs</option>
                    <option value="free">Free Application</option>
                  </select>
                </div>

                {/* English Waiver Filter */}
                <div className="nu-filter-card">
                  <label className="nu-filter-label">
                    <FileCheck size={16} />
                    English Exam Waiver
                  </label>
                  <select 
                    className="nu-filter-select" 
                    value={filterWaiver} 
                    onChange={(e) => { 
                      setFilterWaiver(e.target.value); 
                      setVisibleCount(20);
                      // Sync with eligibility filters
                      if (e.target.value === 'yes') {
                        setAppliedEligibilityFilters({...appliedEligibilityFilters, englishExamStatus: "No Test"});
                        setEligibilityFilters({...eligibilityFilters, englishExamStatus: "No Test"});
                      }
                    }}
                  >
                    <option value="">All Programs</option>
                    <option value="yes">Waiver Available</option>
                  </select>
                </div>

                {/* Tuition Range Filter */}
                <div className="nu-filter-card">
                  <label className="nu-filter-label">
                    <DollarSign size={16} />
                    Tuition Fee Range
                  </label>
                  <select 
                    className="nu-filter-select" 
                    value={filterTuitionRange} 
                    onChange={(e) => { setFilterTuitionRange(e.target.value); setVisibleCount(20); }}
                  >
                    <option value="">All Ranges</option>
                    <option value="low">Under $10,000</option>
                    <option value="medium">$10,000 - $20,000</option>
                    <option value="high">Above $20,000</option>
                  </select>
                </div>

                {/* Punjab/Haryana Restriction Filter */}
                <div className="nu-filter-card">
                  <label className="nu-filter-label">
                    <MapPin size={16} />
                    Punjab/Haryana Restriction
                  </label>
                  <select 
                    className="nu-filter-select" 
                    value={filterPunjabHaryana} 
                    onChange={(e) => { setFilterPunjabHaryana(e.target.value); setVisibleCount(20); }}
                  >
                    <option value="">All</option>
                    <option value="exclude">Exclude Punjab/Haryana Restrictions</option>
                  </select>
                </div>
              </div>

              <div className="nu-active-filters">
                {(filterCountry || filterStudyLevel || filterScholarship || filterAppFee || filterWaiver || filterTuitionRange || filterIntake || filterPunjabHaryana || appliedEligibilityFilters.lastLevelOfStudy || appliedEligibilityFilters.englishExamStatus) && (
                  <div className="nu-active-filters-list">
                    <span className="nu-active-label">Active Filters:</span>
                    {/* Advanced Filters - Blue color */}
                    {filterCountry && <span className="nu-filter-chip nu-filter-chip-advanced">{filterCountry} <X size={14} onClick={() => setFilterCountry("")} /></span>}
                    {filterStudyLevel && <span className="nu-filter-chip nu-filter-chip-advanced">{filterStudyLevel} <X size={14} onClick={() => setFilterStudyLevel("")} /></span>}
                    {filterIntake && <span className="nu-filter-chip nu-filter-chip-advanced">{filterIntake} <X size={14} onClick={() => setFilterIntake("")} /></span>}
                    {filterScholarship && <span className="nu-filter-chip nu-filter-chip-advanced">Scholarship <X size={14} onClick={() => setFilterScholarship("")} /></span>}
                    {filterAppFee && <span className="nu-filter-chip nu-filter-chip-advanced">Free App <X size={14} onClick={() => setFilterAppFee("")} /></span>}
                    {filterWaiver && <span className="nu-filter-chip nu-filter-chip-advanced">Waiver <X size={14} onClick={() => setFilterWaiver("")} /></span>}
                    {filterTuitionRange && <span className="nu-filter-chip nu-filter-chip-advanced">
                      {filterTuitionRange === 'low' ? 'Under $10K' : filterTuitionRange === 'medium' ? '$10K-$20K' : 'Above $20K'}
                      <X size={14} onClick={() => setFilterTuitionRange("")} />
                    </span>}
                    {filterPunjabHaryana && <span className="nu-filter-chip nu-filter-chip-advanced">No Punjab/Haryana <X size={14} onClick={() => setFilterPunjabHaryana("")} /></span>}
                    
                    {/* Eligibility Filters - Purple/Violet color */}
                    {appliedEligibilityFilters.lastLevelOfStudy && <span className="nu-filter-chip nu-filter-chip-eligibility">{appliedEligibilityFilters.lastLevelOfStudy} <X size={14} onClick={() => setAppliedEligibilityFilters({...appliedEligibilityFilters, lastLevelOfStudy: ""})} /></span>}
                    {appliedEligibilityFilters.englishExamStatus && <span className="nu-filter-chip nu-filter-chip-eligibility">{appliedEligibilityFilters.englishExamStatus} <X size={14} onClick={() => setAppliedEligibilityFilters({...appliedEligibilityFilters, englishExamStatus: ""})} /></span>}
                    {appliedEligibilityFilters.nationality && <span className="nu-filter-chip nu-filter-chip-eligibility">Nationality: {appliedEligibilityFilters.nationality} <X size={14} onClick={() => setAppliedEligibilityFilters({...appliedEligibilityFilters, nationality: ""})} /></span>}
                    {appliedEligibilityFilters.educationCountry && <span className="nu-filter-chip nu-filter-chip-eligibility">Education: {appliedEligibilityFilters.educationCountry} <X size={14} onClick={() => setAppliedEligibilityFilters({...appliedEligibilityFilters, educationCountry: ""})} /></span>}
                    {appliedEligibilityFilters.gradingScheme && <span className="nu-filter-chip nu-filter-chip-eligibility">{appliedEligibilityFilters.gradingScheme} <X size={14} onClick={() => setAppliedEligibilityFilters({...appliedEligibilityFilters, gradingScheme: ""})} /></span>}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Results */}
          {filteredUniversities.length === 0 ? (
            <div className="nu-empty-state">
              <Search size={48} />
              <h3>No programs found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              {/* Candidate Eligibility Filters Button */}
              <div className="nu-eligibility-section">
                <button className="nu-eligibility-btn" onClick={() => setShowEligibilityModal(true)}>
                  <UserPlus size={18} />
                  Candidate Eligibility Filters
                  {(() => {
                    const eligibilityCount = [
                      appliedEligibilityFilters.nationality,
                      appliedEligibilityFilters.educationCountry,
                      appliedEligibilityFilters.lastLevelOfStudy,
                      appliedEligibilityFilters.gradingScheme,
                      appliedEligibilityFilters.englishExamStatus
                    ].filter(Boolean).length;
                    
                    return eligibilityCount > 0 ? (
                      <span className="nu-eligibility-count-badge">{eligibilityCount}</span>
                    ) : null;
                  })()}
                </button>
              </div>

              <div className="nu-cards-grid">
                {displayedUniversities.map((uni) => {
                  if (!uni) return null;
                  const badges = getBadges(uni);
                  const success = getSuccessChance(uni);
                  const intakes = parseIntakes(uni.Open_Intakes);
                  const isFav = favorites.has(uni.id);

                  return (
                    <div key={uni.id} className="nu-card">
                      {/* Top tag */}
                      {uni.Scholarship_Available?.toLowerCase() === 'yes' && (
                        <div className="nu-card-top-tag nu-card-top-tag-green">Scholarship Available</div>
                      )}
                      {isAppFree(uni.Application_Fee) && !uni.Scholarship_Available?.toLowerCase().includes('yes') && (
                        <div className="nu-card-top-tag nu-card-top-tag-blue">Free Application</div>
                      )}

                      <div className="nu-card-body">
                        {/* University header - Clickable */}
                        <div className="nu-card-uni-header">
                          {renderLogo(uni)}
                          {uni.Website_URL ? (
                            <a 
                              href={uni.Website_URL.startsWith('http') ? uni.Website_URL : `https://${uni.Website_URL}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="nu-card-uni-name nu-card-uni-link"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {uni.University}
                            </a>
                          ) : (
                            <span className="nu-card-uni-name">{uni.University}</span>
                          )}
                        </div>

                        {/* Study level - Above Program/Course */}
                        {uni.Study_Level && (
                          <p className="nu-card-study-level">{uni.Study_Level}</p>
                        )}

                        {/* Program Name - Clickable */}
                        {uni.Program_Name && (
                          <p 
                            className="nu-card-program-name"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCardClick(uni);
                            }}
                          >
                            {uni.Program_Name}
                          </p>
                        )}

                        {/* Course */}
                        <h3 className="nu-card-course">{uni.Course}</h3>

                        {/* Tags */}
                        {badges.length > 0 && (
                          <div className="nu-card-tags">
                            {badges.map((b, i) => (
                              <span key={i} className={`nu-tag nu-tag-${b.variant}`}>{b.icon} {b.label}</span>
                            ))}
                          </div>
                        )}

                        {/* Details table */}
                        <div className="nu-card-details">
                          <div className="nu-card-detail-row">
                            <span className="nu-card-detail-label">Location</span>
                            <span className="nu-card-detail-value">{uni.Country} {getCountryFlag(uni.Country)}</span>
                          </div>
                          <div className="nu-card-detail-row">
                            <span className="nu-card-detail-label">Campus city</span>
                            <span className="nu-card-detail-value">{uni.Campus || 'N/A'}</span>
                          </div>
                          <div className="nu-card-detail-row">
                            <span className="nu-card-detail-label">Tuition (1st year)</span>
                            <span className="nu-card-detail-value">{formatTuition(uni.Yearly_Tuition_Fees)}</span>
                          </div>
                          <div className="nu-card-detail-row">
                            <span className="nu-card-detail-label">Application fee</span>
                            <span className="nu-card-detail-value">{isAppFree(uni.Application_Fee) ? 'Free' : (uni.Application_Fee || 'N/A')}</span>
                          </div>
                          <div className="nu-card-detail-row">
                            <span className="nu-card-detail-label">Duration</span>
                            <span className="nu-card-detail-value">{uni.Duration || 'N/A'}</span>
                          </div>
                        </div>

                        {/* Success chance */}
                        <div className="nu-card-success">
                          <span className="nu-card-detail-label">Success chance</span>
                          <span className="nu-card-success-value">
                            <span className="nu-dot" style={{ background: success.color }} />
                            {success.label}
                          </span>
                        </div>

                        {/* Intakes */}
                        {intakes.length > 0 && (
                          <div className="nu-card-intakes">
                            <span className="nu-card-intakes-label">Available intakes</span>
                            <div className="nu-card-intakes-list">
                              {intakes.slice(0, 3).map((intake, i) => (
                                <span key={i} className="nu-intake-chip-sm">{intake}</span>
                              ))}
                              {intakes.length > 3 && <span className="nu-intake-more">+{intakes.length - 3}</span>}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="nu-card-footer">
                        <button className="nu-apply-btn" onClick={(e) => { 
                          e.stopPropagation();
                          const intakes = parseIntakes(uni.Open_Intakes);
                          const intakeParam = intakes.length > 0 ? `&intakes=${encodeURIComponent(intakes.join(','))}` : '';
                          navigate(`/edupartner/dashboard?section=applications&university=${encodeURIComponent(uni.University)}&course=${encodeURIComponent(uni.Program_Name || uni.Course)}${intakeParam}`);
                        }}>
                          Create Application <ExternalLink size={14} />
                        </button>
                        <button
                          className={`nu-fav-btn ${isFav ? 'nu-fav-active' : ''}`}
                          onClick={(e) => toggleFavorite(e, uni.id)}
                        >
                          <Heart size={18} fill={isFav ? '#ef4444' : 'none'} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Load More */}
              {visibleCount < filteredUniversities.length && (
                <div className="nu-load-more">
                  <button onClick={loadMore} className="nu-load-more-btn">
                    Show more programs ({filteredUniversities.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Candidate Eligibility Filters Modal */}
      {showEligibilityModal && (
        <div className="nu-eligibility-modal-overlay" onClick={() => setShowEligibilityModal(false)}>
          <div className="nu-eligibility-modal" onClick={(e) => e.stopPropagation()}>
            <div className="nu-eligibility-modal-header">
              <h2>Candidate Eligibility Filters</h2>
              <button className="nu-modal-close" onClick={() => setShowEligibilityModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="nu-eligibility-modal-body">
              <p className="nu-eligibility-subtitle">
                I'd like to apply eligibility filters for a candidate
              </p>

              {/* Nationality */}
              <div className="nu-eligibility-field">
                <label>Nationality <span className="nu-required">*</span></label>
                <select 
                  value={eligibilityFilters.nationality}
                  onChange={(e) => setEligibilityFilters({...eligibilityFilters, nationality: e.target.value})}
                >
                  <option value="">Select</option>
                  <option value="Australia">Australia</option>
                  <option value="Canada">Canada</option>
                  <option value="France">France</option>
                  <option value="Germany">Germany</option>
                  <option value="India">India</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Singapore">Singapore</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                </select>
              </div>

              {/* Education Country */}
              <div className="nu-eligibility-field">
                <label>Education Country <span className="nu-required">*</span></label>
                <select 
                  value={eligibilityFilters.educationCountry}
                  onChange={(e) => setEligibilityFilters({...eligibilityFilters, educationCountry: e.target.value})}
                >
                  <option value="">Select</option>
                  <option value="Australia">Australia</option>
                  <option value="Canada">Canada</option>
                  <option value="France">France</option>
                  <option value="Germany">Germany</option>
                  <option value="India">India</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Singapore">Singapore</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                </select>
              </div>

              {/* Last Level Of Study */}
              <div className="nu-eligibility-field">
                <label>Last Level Of Study <span className="nu-required">*</span></label>
                <select 
                  value={eligibilityFilters.lastLevelOfStudy}
                  onChange={(e) => {
                    setEligibilityFilters({...eligibilityFilters, lastLevelOfStudy: e.target.value});
                    // Sync with advanced filters - map to first matching study level
                    const eligibilityToLevelMapping: Record<string, string> = {
                      "12th Grade": "Undergraduate",
                      "Diploma": "Undergraduate",
                      "Graduation/Bachelor's": "Postgraduate",
                      "Post Graduation/Master's": "Doctorate"
                    };
                    const studyLevel = eligibilityToLevelMapping[e.target.value];
                    if (studyLevel) {
                      setFilterStudyLevel(studyLevel);
                    }
                  }}
                >
                  <option value="">Select</option>
                  <option value="12th Grade">12th Grade</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Graduation/Bachelor's">Graduation/Bachelor's</option>
                  <option value="Post Graduation/Master's">Post Graduation/Master's</option>
                </select>
              </div>

              {/* Grading Scheme */}
              <div className="nu-eligibility-field">
                <label>Grading Scheme <span className="nu-required">*</span></label>
                <select 
                  value={eligibilityFilters.gradingScheme}
                  onChange={(e) => setEligibilityFilters({...eligibilityFilters, gradingScheme: e.target.value})}
                >
                  <option value="">Select</option>
                  <option value="Percentage">Percentage</option>
                  <option value="GPA">GPA</option>
                  <option value="CGPA">CGPA</option>
                </select>
              </div>

              <div className="nu-eligibility-info">
                <span className="nu-info-icon">ℹ️</span>
                You should first select both 'Education Country' and 'Last Level Of Study'.
              </div>

              {/* English Exam Status */}
              <div className="nu-eligibility-field">
                <label>English Exam Status <span className="nu-required">*</span></label>
                <select 
                  value={eligibilityFilters.englishExamStatus}
                  onChange={(e) => {
                    setEligibilityFilters({...eligibilityFilters, englishExamStatus: e.target.value});
                    // Sync with advanced filters
                    if (e.target.value === 'No Test') {
                      setFilterWaiver('yes');
                    }
                  }}
                >
                  <option value="">I have valid proof of English language proficiency</option>
                  <option value="IELTS">IELTS</option>
                  <option value="TOEFL">TOEFL</option>
                  <option value="PTE">PTE</option>
                  <option value="Duolingo">Duolingo</option>
                  <option value="No Test">No English Test</option>
                </select>
              </div>
            </div>

            <div className="nu-eligibility-modal-footer">
              <button className="nu-modal-btn-secondary" onClick={() => setShowEligibilityModal(false)}>
                Close
              </button>
              <button className="nu-modal-btn-primary" onClick={() => {
                // Apply eligibility filters
                setAppliedEligibilityFilters({...eligibilityFilters});
                setShowEligibilityModal(false);
                setVisibleCount(20);
              }}>
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewUniversities;
