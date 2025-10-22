/**
 * Google Developer Groups Decorative Elements
 * Official brand decorative SVGs
 */

export const DecorativeStarburst = ({ className = "", color = "#4285f4" }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 0L100 200M0 100L200 100M30 30L170 170M170 30L30 170M50 100L150 100M100 50L100 150" 
      stroke={color} 
      strokeWidth="3" 
      strokeLinecap="round"
    />
  </svg>
);

export const DecorativeArrow = ({ className = "", color = "#34a853" }) => (
  <svg className={className} viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 50 Q100 20, 200 50 T400 50 L380 35 M400 50 L380 65" 
      stroke={color} 
      strokeWidth="3" 
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const DecorativeGlobe = ({ className = "", color = "#4285f4" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="2"/>
    <ellipse cx="50" cy="50" rx="20" ry="45" stroke={color} strokeWidth="2"/>
    <ellipse cx="50" cy="50" rx="45" ry="20" stroke={color} strokeWidth="2"/>
    <line x1="10" y1="50" x2="90" y2="50" stroke={color} strokeWidth="2"/>
    <line x1="50" y1="10" x2="50" y2="90" stroke={color} strokeWidth="2"/>
  </svg>
);

export const DecorativeWave = ({ className = "", color = "#f9ab00" }) => (
  <svg className={className} viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 50 Q50 20, 100 50 T200 50 T300 50 T400 50" 
      stroke={color} 
      strokeWidth="3" 
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const GoogleChevronGreen = ({ className = "", size = 60 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 15 C 30 15, 15 15, 15 30 L 15 50 C 15 65, 30 80, 45 80 L 50 80 L 50 50 L 45 50 C 35 50, 30 45, 30 35 L 30 15 Z" 
      fill="#34a853"
    />
    <path d="M70 85 C 70 85, 85 85, 85 70 L 85 50 C 85 35, 70 20, 55 20 L 50 20 L 50 50 L 55 50 C 65 50, 70 55, 70 65 L 70 85 Z" 
      fill="#f9ab00"
    />
  </svg>
);

export const GoogleChevronBlue = ({ className = "", size = 60 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 15 C 30 15, 15 15, 15 30 L 15 50 C 15 65, 30 80, 45 80 L 50 80 L 50 50 L 45 50 C 35 50, 30 45, 30 35 L 30 15 Z" 
      fill="#4285f4"
    />
    <path d="M70 85 C 70 85, 85 85, 85 70 L 85 50 C 85 35, 70 20, 55 20 L 50 20 L 50 50 L 55 50 C 65 50, 70 55, 70 65 L 70 85 Z" 
      fill="#ea4335"
    />
  </svg>
);

export const GoogleLogoMinimal = ({ className = "", size = 40 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 50 L 50 25 L 50 50 L 25 50 Z" fill="#4285f4"/>
    <path d="M50 25 L 75 25 L 50 50 L 50 25 Z" fill="#ea4335"/>
    <path d="M50 50 L 75 75 L 50 75 L 50 50 Z" fill="#f9ab00"/>
    <path d="M25 50 L 50 75 L 25 75 L 25 50 Z" fill="#34a853"/>
  </svg>
);

export const GDGBanner = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 1600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left decorative slashes */}
    <g opacity="0.3">
      <rect x="30" y="40" width="120" height="320" fill="none" stroke="#4285f4" strokeWidth="3" transform="skewY(-15)"/>
      <rect x="180" y="40" width="120" height="320" fill="none" stroke="#4285f4" strokeWidth="3" transform="skewY(-15)"/>
    </g>
    
    {/* Center logo and text */}
    <g transform="translate(400, 150)">
      {/* Google chevron icon */}
      <path d="M0 20 C 0 20, -10 20, -10 30 L -10 50 C -10 60, 0 70, 10 70 L 15 70 L 15 50 L 10 50 C 5 50, 0 47, 0 42 L 0 20 Z" 
        fill="#57caff"
      />
      <path d="M30 80 C 30 80, 40 80, 40 70 L 40 50 C 40 40, 30 30, 20 30 L 15 30 L 15 50 L 20 50 C 25 50, 30 53, 30 58 L 30 80 Z" 
        fill="#4285f4"
      />
      
      {/* Text */}
      <text x="80" y="65" fontFamily="Product Sans, Google Sans, sans-serif" fontSize="48" fill="white" fontWeight="400">
        Google Developer Group
      </text>
    </g>
    
    {/* Right decorative elements */}
    <g transform="translate(1200, 100)">
      {/* Wavy lines */}
      <path d="M0 50 Q25 30, 50 50 T100 50 T150 50 T200 50" 
        stroke="#4285f4" 
        strokeWidth="2" 
        fill="none"
        opacity="0.3"
      />
      <path d="M0 80 Q25 60, 50 80 T100 80 T150 80 T200 80" 
        stroke="#4285f4" 
        strokeWidth="2" 
        fill="none"
        opacity="0.3"
      />
      <path d="M0 110 Q25 90, 50 110 T100 110 T150 110 T200 110" 
        stroke="#4285f4" 
        strokeWidth="2" 
        fill="none"
        opacity="0.3"
      />
      <path d="M0 140 Q25 120, 50 140 T100 140 T150 140 T200 140" 
        stroke="#4285f4" 
        strokeWidth="2" 
        fill="none"
        opacity="0.3"
      />
    </g>
    
    {/* Globe icon */}
    <g transform="translate(1450, 100)">
      <circle cx="50" cy="50" r="45" stroke="#4285f4" strokeWidth="2" fill="none" opacity="0.3"/>
      <ellipse cx="50" cy="50" rx="20" ry="45" stroke="#4285f4" strokeWidth="2" fill="none" opacity="0.3"/>
    </g>
  </svg>
);

export default {
  DecorativeStarburst,
  DecorativeArrow,
  DecorativeGlobe,
  DecorativeWave,
  GoogleChevronGreen,
  GoogleChevronBlue,
  GoogleLogoMinimal,
  GDGBanner,
};
