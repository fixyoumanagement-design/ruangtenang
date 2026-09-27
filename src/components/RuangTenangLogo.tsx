import React from 'react';

interface RuangTenangLogoProps {
  variant?: 'horizontal' | 'vertical' | 'icon';
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  showSubtitle?: boolean;
}

export const RuangTenangLogo: React.FC<RuangTenangLogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  size = 'md',
  className = '',
  showSubtitle = false
}) => {
  const isDark = theme === 'dark';

  // Palette matching the official user uploaded logo
  const strokeColor = isDark ? '#D8E8DA' : '#1C3524';
  const moonGradStart = isDark ? '#2E4C36' : '#C4DDC7';
  const moonGradEnd = isDark ? '#1C3123' : '#EBF4EC';
  const hairFill = isDark ? '#3D6147' : '#648870';
  const skinFill = isDark ? '#EFE9DD' : '#F9F4EB';
  const dressFill = isDark ? '#4D7559' : '#8EAE96';
  const legsFill = isDark ? '#3A5B44' : '#6A8C74';
  const textColor = isDark ? '#E8F2E9' : '#1A3322';

  // Pixel sizing mapping
  const getIconDimensions = () => {
    if (typeof size === 'number') return { width: size, height: size };
    switch (size) {
      case 'sm': return { width: 28, height: 28 };
      case 'lg': return { width: 48, height: 48 };
      case 'xl': return { width: 72, height: 72 };
      case 'md':
      default: return { width: 36, height: 36 };
    }
  };

  const { width: iconWidth, height: iconHeight } = getIconDimensions();

  // Emblem Vector Artwork (Lotus Meditating Figure nestled in Crescent Moon)
  const renderEmblem = () => (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300"
      style={{ width: iconWidth, height: iconHeight }}
    >
      <defs>
        <linearGradient id="moonGrad" x1="60" y1="260" x2="240" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={moonGradStart} />
          <stop offset="100%" stopColor={moonGradEnd} />
        </linearGradient>
        <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.12" floodColor="#000" />
        </filter>
      </defs>

      {/* Crescent Moon */}
      <path
        d="M 188 32 C 122 36 68 88 64 162 C 60 236 120 286 208 276 C 242 272 268 256 278 248 C 218 274 138 252 108 198 C 82 152 98 88 188 32 Z"
        fill="url(#moonGrad)"
        stroke={strokeColor}
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Moon Crater Dots */}
      <circle cx="108" cy="180" r="4.5" fill={strokeColor} />
      <circle cx="120" cy="208" r="5.5" fill={strokeColor} />

      {/* Sparkle 4-point Star (Upper Right) */}
      <path
        d="M 246 88 Q 246 106 264 106 Q 246 106 246 124 Q 246 106 228 106 Q 246 106 246 88 Z"
        fill={strokeColor}
      />
      {/* Sparkle Ambient Dots */}
      <circle cx="218" cy="80" r="4.5" fill={strokeColor} />
      <circle cx="254" cy="185" r="4.5" fill={strokeColor} />

      {/* Meditating Character: Seated in Lotus on the Moon */}
      {/* 1. Hair Bun on Top */}
      <ellipse
        cx="195"
        cy="105"
        rx="16"
        ry="17"
        fill={hairFill}
        stroke={strokeColor}
        strokeWidth="9"
      />
      {/* Bun Hair Tie Ring */}
      <ellipse
        cx="195"
        cy="120"
        rx="10"
        ry="4"
        fill={moonGradStart}
        stroke={strokeColor}
        strokeWidth="7"
      />

      {/* 2. Hair Framing Silhouette */}
      <path
        d="M 195 120 C 180 128 162 148 165 174 C 168 195 186 195 186 186 C 186 166 182 152 195 142 C 208 152 204 166 204 186 C 204 195 222 195 225 174 C 228 148 210 128 195 120 Z"
        fill={hairFill}
        stroke={strokeColor}
        strokeWidth="9"
        strokeLinejoin="round"
      />

      {/* 3. Serene Minimal Face */}
      <path
        d="M 183 148 C 183 172 188 184 195 184 C 202 184 207 172 207 148 C 202 142 188 142 183 148 Z"
        fill={skinFill}
        stroke={strokeColor}
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* 4. Torso / Meditative Robe */}
      <path
        d="M 188 186 C 182 194 172 204 170 220 L 220 220 C 218 204 208 194 202 186 Z"
        fill={dressFill}
        stroke={strokeColor}
        strokeWidth="9"
        strokeLinejoin="round"
      />

      {/* 5. Arms & Hands in Gyan Mudra (Palm Resting on Knees) */}
      {/* Left Arm */}
      <path
        d="M 172 198 L 152 226 C 146 235 138 234 136 226 C 134 218 142 216 150 222"
        fill={skinFill}
        stroke={strokeColor}
        strokeWidth="8.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right Arm */}
      <path
        d="M 218 198 L 238 226 C 244 235 252 234 254 226 C 256 218 248 216 240 222"
        fill={skinFill}
        stroke={strokeColor}
        strokeWidth="8.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 6. Folded Legs (Lotus / Sukhasana Pose) */}
      {/* Left Folded Knee */}
      <ellipse
        cx="160"
        cy="234"
        rx="26"
        ry="15"
        transform="rotate(-8 160 234)"
        fill={legsFill}
        stroke={strokeColor}
        strokeWidth="9"
      />
      {/* Right Folded Knee */}
      <ellipse
        cx="230"
        cy="234"
        rx="26"
        ry="15"
        transform="rotate(8 230 234)"
        fill={legsFill}
        stroke={strokeColor}
        strokeWidth="9"
      />
      {/* Center Foot Fold */}
      <path
        d="M 184 238 Q 195 248 206 238"
        fill={skinFill}
        stroke={strokeColor}
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{renderEmblem()}</div>;
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {renderEmblem()}
        <div className="mt-3">
          <span 
            className="font-comfortaa font-bold tracking-tight block"
            style={{ 
              color: textColor,
              fontSize: typeof size === 'number' ? `${size * 0.42}px` : size === 'lg' ? '1.75rem' : size === 'xl' ? '2.25rem' : '1.25rem'
            }}
          >
            RuangTenang
          </span>
          {showSubtitle && (
            <p className="text-xs text-[#5A7A64] font-medium mt-0.5">
              Tempat Mahasiswa Rehat & Bernapas
            </p>
          )}
        </div>
      </div>
    );
  }

  // Horizontal variant (default for Navbar, headers)
  return (
    <div className={`flex items-center space-x-2.5 ${className}`}>
      {renderEmblem()}
      <div className="flex flex-col">
        <span 
          className="font-comfortaa font-bold tracking-tight leading-none"
          style={{ 
            color: textColor,
            fontSize: typeof size === 'number' ? `${size * 0.46}px` : size === 'sm' ? '1rem' : size === 'lg' ? '1.5rem' : '1.18rem'
          }}
        >
          RuangTenang
        </span>
        {showSubtitle && (
          <span className="text-[10px] text-[#5A7A64] font-medium leading-tight mt-0.5">
            Dukungan Mental Mahasiswa
          </span>
        )}
      </div>
    </div>
  );
};
