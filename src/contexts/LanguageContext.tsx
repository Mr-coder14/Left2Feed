import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    findFood: 'Find Food',
    listFood: 'List Food',
    dropPoints: 'Drop Points',
    dashboard: 'Dashboard',
    signIn: 'Sign In',
    getStarted: 'Get Started',
    
    // Common
    loading: 'Loading...',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    
    // Home page
    heroTitle: 'Turning Extra Meals into Extra Smiles',
    heroSubtitle: 'Join thousands of food heroes who are reducing waste and feeding communities.',
    startSharing: 'Start Sharing Food',
    findFoodToClaim: 'Find Food to Claim',
  },
  hi: {
    // Navigation
    home: 'होम',
    about: 'हमारे बारे में',
    findFood: 'खाना खोजें',
    listFood: 'खाना सूचीबद्ध करें',
    dropPoints: 'ड्रॉप पॉइंट्स',
    dashboard: 'डैशबोर्ड',
    signIn: 'साइन इन',
    getStarted: 'शुरू करें',
    
    // Common
    loading: 'लोड हो रहा है...',
    submit: 'जमा करें',
    cancel: 'रद्द करें',
    save: 'सेव करें',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    
    // Home page
    heroTitle: 'अतिरिक्त भोजन को अतिरिक्त मुस्कान में बदलना',
    heroSubtitle: 'हजारों खाद्य नायकों से जुड़ें जो बर्बादी कम कर रहे हैं और समुदायों को खिला रहे हैं।',
    startSharing: 'खाना साझा करना शुरू करें',
    findFoodToClaim: 'दावा करने के लिए खाना खोजें',
  },
  ta: {
    // Navigation
    home: 'முகப்பு',
    about: 'எங்களைப் பற்றி',
    findFood: 'உணவைக் கண்டறியவும்',
    listFood: 'உணவைப் பட்டியலிடவும்',
    dropPoints: 'டிராப் பாயிண்ட்ஸ்',
    dashboard: 'டாஷ்போர்டு',
    signIn: 'உள்நுழைக',
    getStarted: 'தொடங்குங்கள்',
    
    // Common
    loading: 'ஏற்றுகிறது...',
    submit: 'சமர்ப்பிக்கவும்',
    cancel: 'ரத்து செய்',
    save: 'சேமிக்கவும்',
    edit: 'திருத்து',
    delete: 'நீக்கு',
    
    // Home page
    heroTitle: 'கூடுதல் உணவை கூடுதல் புன்னகையாக மாற்றுதல்',
    heroSubtitle: 'கழிவுகளைக் குறைத்து சமூகங்களுக்கு உணவளிக்கும் ஆயிரக்கணக்கான உணவு வீரர்களுடன் சேருங்கள்।',
    startSharing: 'உணவைப் பகிர்ந்து கொள்ளத் தொடங்குங்கள்',
    findFoodToClaim: 'கோருவதற்கு உணவைக் கண்டறியவும்',
  },
  te: {
    // Navigation
    home: 'హోమ్',
    about: 'మా గురించి',
    findFood: 'ఆహారం కనుగొనండి',
    listFood: 'ఆహారం జాబితా చేయండి',
    dropPoints: 'డ్రాప్ పాయింట్లు',
    dashboard: 'డాష్‌బోర్డ్',
    signIn: 'సైన్ ఇన్',
    getStarted: 'ప్రారంభించండి',
    
    // Common
    loading: 'లోడ్ అవుతోంది...',
    submit: 'సమర్పించండి',
    cancel: 'రద్దు చేయండి',
    save: 'సేవ్ చేయండి',
    edit: 'సవరించండి',
    delete: 'తొలగించండి',
    
    // Home page
    heroTitle: 'అదనపు భోజనాన్ని అదనపు చిరునవ్వులుగా మార్చడం',
    heroSubtitle: 'వ్యర్థాలను తగ్గించి, కమ్యూనిటీలకు ఆహారం అందిస్తున్న వేలాది మంది ఆహార వీరులతో చేరండి।',
    startSharing: 'ఆహారం పంచుకోవడం ప్రారంభించండి',
    findFoodToClaim: 'క్లెయిమ్ చేయడానికి ఆహారం కనుగొనండి',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('left2feed_language');
    if (savedLanguage && translations[savedLanguage as keyof typeof translations]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const setLanguage = (language: string) => {
    setCurrentLanguage(language);
    localStorage.setItem('left2feed_language', language);
  };

  const t = (key: string): string => {
    const languageTranslations = translations[currentLanguage as keyof typeof translations];
    return languageTranslations?.[key as keyof typeof languageTranslations] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};