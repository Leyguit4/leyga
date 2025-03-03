import { useState } from 'react';

export function CookieConsent({ language, darkMode }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);

  // Prevenir renderização se já foi aceito
  if (!isVisible || localStorage.getItem('cookieConsent')) {
    return null;
  }

  // Textos traduzidos
  const texts = {
    pt: {
      message: 'Utilizamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa política.',
      accept: 'Aceitar',
      deny: 'Recusar'
    },
    en: {
      message: 'We use cookies to improve your experience. By continuing to browse, you agree to our policies.',
      accept: 'Accept',
      deny: 'Deny'
    }
  };

  // Seleciona o texto baseado no idioma
  const currentText = texts[language] || texts.pt;

  return (
    <div className={`
      fixed bottom-4 left-4 right-4 md:max-w-md md:left-4 p-6
      rounded-lg shadow-lg z-50 transform hover:scale-[1.02] transition-all duration-300
      ${darkMode 
        ? 'bg-gray-800/90 border border-gray-700 backdrop-blur-sm' 
        : 'bg-white/90 border border-purple-200 backdrop-blur-sm'} 
    `}>
      <div className="flex items-center gap-4">
        <div className={`
          p-3 rounded-full cursor-pointer group
          ${darkMode 
            ? 'bg-gradient-to-br from-red-500/20 via-purple-500/20 to-orange-500/20' 
            : 'bg-gradient-to-br from-purple-300 via-pink-300 to-purple-300'} 
          hover:bg-gradient-to-tl transition-all duration-500
        `}>
          <span 
            className={`
              text-2xl inline-block
              animate-bounce hover:animate-none
              transform hover:scale-110 hover:rotate-12
              transition-all duration-300
              ${isSpinning ? 'animate-spin' : ''}
            `}
            onClick={() => {
              setIsSpinning(true);
              setTimeout(() => setIsSpinning(false), 1000);
            }}
            onMouseEnter={() => setIsSpinning(true)}
            onMouseLeave={() => setIsSpinning(false)}
          >
            🍪
          </span>
        </div>
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {currentText.message}
        </p>
      </div>

      <div className="mt-4 flex justify-end gap-4">
        <button
          onClick={() => {
            setIsVisible(false);
            localStorage.setItem('cookieConsent', 'true');
          }}
          className={`
            px-6 py-2 rounded-md text-sm font-medium
            transform hover:scale-105 active:scale-95
            transition-all duration-300
            ${darkMode 
              ? 'bg-gradient-to-r from-red-500 to-gray-900 hover:from-gray-900 hover:to-red-500 text-white shadow-lg shadow-red-500/20' 
              : 'bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 hover:from-purple-400 hover:via-purple-500 hover:to-purple-600 text-white shadow-lg shadow-purple-500/20'
            }
          `}
        >
          {currentText.accept}
        </button>
        <button
          onClick={() => setIsVisible(false)}
          className={`
            px-6 py-2 rounded-md text-sm font-medium
            transform hover:scale-105 active:scale-95
            transition-all duration-300
            ${darkMode
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }
          `}
        >
          {currentText.deny}
        </button>
      </div>
    </div>
  );
}
