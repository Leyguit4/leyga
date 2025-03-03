import { useState, useEffect } from 'react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm z-50 transform animate-slide-up">
      <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-white text-sm flex-1">
          <p className="mb-2">
            🍪 Este site usa cookies para melhorar sua experiência.
            <span className="text-purple-400"> Seus dados estão seguros e criptografados.</span>
          </p>
          <div className="flex gap-2 text-xs text-gray-400">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              SSL Criptografado
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              GDPR Compliant
            </span>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleAccept}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium 
            hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300
            animate-pulse-subtle shadow-lg shadow-purple-500/25"
          >
            Aceitar
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="px-6 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 
            transition-colors duration-300"
          >
            Recusar
          </button>
        </div>
      </div>
    </div>
  );
}
