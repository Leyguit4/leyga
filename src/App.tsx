import { useState, useEffect } from 'react';
import { Globe, Moon, Sun, ChevronDown } from 'lucide-react';
import translations from './translations';
import { VideoCard } from './components/VideoCard';
import { CookieConsent } from './components/CookieConsent';

function App() {
  const [language, setLanguage] = useState('pt');
  const [darkMode, setDarkMode] = useState(true); // Tema dark como padrão
  const [activeSection, setActiveSection] = useState('about');
  const [isTyping, setIsTyping] = useState(true);
  const [typedText, setTypedText] = useState('');
  
  const t = translations[language];
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  // Toggle language
  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };
  
  // Typing effect melhorado para evitar erros de digitação
  useEffect(() => {
    const text = t.hero.typingText;
    let i = 0;
    let currentText = '';
    setTypedText('');
    setIsTyping(true);
    
    const typing = setInterval(() => {
      if (i < text.length) {
        currentText += text[i];
        setTypedText(currentText);
        i++;
      } else {
        clearInterval(typing);
        setIsTyping(false);
        
        // Reset after 3 seconds
        setTimeout(() => {
          setIsTyping(true);
          setTypedText('');
          i = 0;
          currentText = '';
        }, 3000);
      }
    }, 100);
    
    return () => clearInterval(typing);
  }, [language, t.hero.typingText]);

  // Handle scroll to set active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute('id') || '';
        }
      });
      
      if (current) {
        setActiveSection(current);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    // Atualiza o favicon dinamicamente
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (link) {
      link.href = "/C:/Users/theuz/Music/Faviicon-leyga/leyga.ico";
    } else {
      const newLink = document.createElement('link');
      newLink.rel = 'shortcut icon';
      newLink.type = 'image/x-icon';
      newLink.href = "/C:/Users/theuz/Music/Faviicon-leyga/leyga.ico";
      document.head.appendChild(newLink);
    }
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
      {/* Favicon is added via useEffect */}
      
      {/* Header */}
      <header className={`fixed w-full z-50 ${
        darkMode 
          ? 'bg-gray-900/80 text-white' 
          : 'bg-white/80 text-gray-900'
      } backdrop-blur-sm shadow-md transition-colors duration-300`}>
        <div className="container mx-auto px-4 py-4">
          <div className={`text-2xl font-bold ${darkMode ? 'text-red-500' : 'bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-red-500 to-yellow-400'}`}>
            Contrate-já!
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('about')} 
              className={`${activeSection === 'about' ? 'text-cyan-400' : darkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-cyan-300 transition-colors`}
            >
              {t.nav.about}
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')} 
              className={`${activeSection === 'portfolio' ? 'text-cyan-400' : darkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-red-500 transition-colors`}
            >
              {t.nav.portfolio}
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className={`${activeSection === 'contact' ? 'text-cyan-400' : darkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-red-500 transition-colors`}
            >
              {t.nav.contact}
            </button>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleLanguage}
              className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-all duration-500 transform hover:scale-105 animate-pulse-subtle ${
                darkMode 
                  ? 'bg-gradient-to-r from-red-600 to-gray-900 hover:from-gray-900 hover:to-red-600 text-white' 
                  : 'bg-gradient-to-r from-purple-600 to-white hover:from-white hover:to-purple-600 text-white'
              }`}
            >
              <Globe size={16} />
              <span className="font-medium">
                {language === 'pt' ? 'PT-BR' : 'EN-US'}
              </span>
              <ChevronDown size={12} />
            </button>
            
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400'} transition-colors duration-300`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="about" className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="space-y-2">
                <h1 className={`text-xl md:text-2xl lg:text-3xl font-bold tracking-tight ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <span className={darkMode 
                    ? 'text-white' 
                    : 'bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent'
                  }>
                    {t.hero.greeting}
                  </span>
                  {' '}
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-600 to-yellow-400 bg-clip-text text-transparent inline-block">
                    Leyga
                  </span>
                </h1>
              </div>

              <div className="h-16 mt-4">
                <p className={`text-xl md:text-2xl relative ${
                  darkMode ? 'text-white' : 'text-black'
                }`}>
                  {typedText}
                  {isTyping && <span className="inline-block w-2 h-6 ml-1 bg-red-500 animate-pulse"></span>}
                </p>
              </div>
              <p className={`text-lg mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.hero.description}
              </p>
              <button 
                onClick={() => scrollToSection('portfolio')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-500 transform hover:scale-105 hover:shadow-lg animate-pulse-subtle ${
                  darkMode
                    ? 'bg-gradient-to-r from-red-600 to-gray-900 hover:from-gray-900 hover:to-red-600 text-white'
                    : 'bg-gradient-to-r from-purple-600 to-white hover:from-white hover:to-purple-600 text-white'
                }`}
              >
                {t.hero.cta}
                <ChevronDown className="inline ml-2" size={18} />
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <img 
                  src={darkMode 
                    ? "https://imgur.com/G9MFKWH.png" // Logo para tema escuro
                    : "https://imgur.com/Y3cUsrt.png" // Logo para tema claro - você precisa substituir este link pela versão clara do seu logo
                  }
                  alt="Leyga Logo"
                  className={`w-full h-full object-contain transform hover:scale-105 transition-transform duration-300 animate-float ${
                    darkMode 
                      ? 'drop-shadow-[0_0_25px_rgba(220,38,38,0.3)] filter hue-rotate-0' 
                      : 'drop-shadow-[0_0_25px_rgba(168,85,247,0.3)] filter hue-rotate-180'
                  }`}
                  style={{
                    filter: darkMode 
                      ? 'brightness(1) contrast(1.1)' 
                      : 'brightness(1.2) contrast(1.2) hue-rotate(45deg)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className={`py-20 ${
        darkMode 
          ? 'bg-gradient-to-b from-gray-900 to-purple-900/20' 
          : 'bg-gradient-to-b from-purple-50 to-purple-100/50'
      }`}>
        <div className="container mx-auto px-4">
          {/* Título com fonte ainda menor */}
          <h2 className="text-2xl md:text-2xl font-bold text-center mb-16 relative"> {/* Reduzido de text-3xl md:text-4xl */}
            <span className={`
              ${darkMode 
                ? 'bg-gradient-to-br from-white via-red-500 to-red-700' 
                : 'bg-gradient-to-br from-purple-600 via-yellow-400 to-purple-400'
              } 
              bg-clip-text text-transparent 
              relative z-10 
              hover:scale-105 
              transition-transform duration-300 
              inline-block
              font-display
            `}>
              {t.portfolio.title}
              <div className={`
                absolute -inset-2 
                blur-2xl opacity-75 
                bg-gradient-to-r 
                ${darkMode 
                  ? 'from-red-600 via-red-500 to-orange-500' 
                  : 'from-purple-500 via-yellow-400 to-purple-500'
                }
                animate-pulse-slow 
                -z-10
              `}/>
            </span>
          </h2>

          {/* Grid de VideoCards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.portfolio.projects.map((project, index) => (
              <VideoCard 
                key={index}
                title={project.title}
                description={project.description}
                darkMode={darkMode} // Passa o darkMode como prop
                videoId={[
                  "1XIsHPVP8EL16Lvy_tswZWC8vZviOMQcd",
                  "1A5CkeqkM-oTbRjdAOCT0vdAjTIhZQi44",
                  "1A5CkeqkM-oTbRjdAOCT0vdAjTIhZQi44",
                  "1qRRIKZJqi708UbOtjIQIPAj2JXBanxeu",
                  "1gc5CDP8SFH8Aw2ixM51I0gaMfTpqTd1m",
                  "1_UdS6xEjnFPtGwL87AMfVGVQNR--MLVq",
                  "10Z4-mCLEPQmC9XBPe4kD9Y9kx_t8w74r"
                ][index]}
              />
            ))}
          </div>

          {/* Texto promocional animado */}
          <div className="mt-16 text-center max-w-4xl mx-auto px-4">
            <p className={`text-lg md:text-xl leading-relaxed animate-float relative group ${
              darkMode ? 'text-gray-300' : 'text-gray-900'
            }`}>
              <span className="absolute -inset-2 blur-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-20 group-hover:opacity-30 transition-opacity duration-500"></span>
              {language === 'pt' ? (
                <span className={`relative ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                  Aproveite nossas diversas funcionalidades exclusivas, como{' '}
                  <strong className="text-red-500 animate-pulse">Temproles</strong>,{' '}
                  <strong className="text-blue-500 animate-bounce">Triggers</strong>{' '}
                  e muito mais. Não perca essa oportunidade! Estamos com promoções imperdíveis e preços acessíveis.{' '}
                  <strong className="text-green-500 animate-pulse">Dê um upgrade na sua comunidade agora mesmo!</strong>{' '}
                  Entre em contato e faça seu orçamento.
                </span>
              ) : (
                <span className={`relative ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                  Take advantage of our exclusive features, such as{' '}
                  <strong className="text-red-500 animate-pulse">Temproles</strong>,{' '}
                  <strong className="text-blue-500 animate-bounce">Triggers</strong>,{' '}
                  and much more. Don't miss this opportunity! We have amazing deals and affordable prices.{' '}
                  <strong className="text-green-500 animate-pulse">Upgrade your community now!</strong>{' '}
                  Contact us and get your quote.
                </span>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 ${!darkMode && 'bg-gradient-to-r from-purple-100 to-yellow-100 shadow-inner'}`}>
        {/* Título grande e animado */}
        <h2 className="text-6xl md:text-7xl font-bold text-center mb-16 relative">
          <span className={`
            ${darkMode 
              ? 'bg-gradient-to-br from-white via-red-500 to-red-700' 
              : 'bg-gradient-to-br from-purple-600 via-yellow-400 to-purple-400'
            } 
            bg-clip-text text-transparent 
            relative z-10 
            hover:scale-105 
            transition-transform duration-300 
            inline-block
            font-display
          `}>
            {language === 'pt' ? 'Entre em Contato' : 'Get in Touch'}
            <div className={`
              absolute -inset-2 
              blur-2xl opacity-75 
              bg-gradient-to-r 
              ${darkMode 
                ? 'from-red-600 via-red-500 to-orange-500' 
                : 'from-purple-500 via-yellow-400 to-purple-500'
              }
              animate-pulse-slow 
              -z-10
            `}/>
          </span>
        </h2>
      
        <div className={`max-w-2xl mx-auto rounded-xl shadow-lg p-8 ${
          darkMode 
            ? 'bg-gray-800 text-gray-300' 
            : 'bg-white shadow-2xl border-2 border-purple-200'
        }`}>
          <p className="text-center mb-8 relative group overflow-hidden">
            {language === 'pt' ? (
              <span className="inline-block relative">
                {/* Efeito de fundo animado */}
                <span className={`absolute inset-0 ${
                  darkMode
                    ? 'bg-gradient-to-r from-red-500/5 via-purple-500/5 to-blue-500/5'
                    : 'bg-gradient-to-r from-red-100 via-purple-100 to-blue-100'
                } transform group-hover:scale-110 transition-transform duration-700 rounded-lg`}></span>
                
                {/* Texto com animação */}
                <span className={`relative inline-block px-4 py-2 group-hover:scale-105 transition-all duration-500 ${
                  darkMode ? 'text-gray-300' : 'text-gray-800'
                }`}>
                  Vamos transformar sua{' '}
                  <span className={`font-bold relative inline-block transform hover:scale-110 transition-transform ${
                    darkMode 
                      ? 'text-red-400 hover:text-red-300' 
                      : 'text-purple-600 hover:text-purple-500'
                  } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-current after:transform after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300`}>
                    ideia em realidade
                  </span>!{' '}
                  Entre em contato para{' '}
                  <span className={`font-bold relative inline-block transform hover:scale-110 transition-transform ${
                    darkMode 
                      ? 'text-blue-400 hover:text-blue-300' 
                      : 'text-indigo-600 hover:text-indigo-500'
                  } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-current after:transform after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300`}>
                    discutirmos seu projeto
                  </span>.
                </span>
              </span>
            ) : (
              <span className="inline-block relative">
                {/* Efeito de fundo animado */}
                <span className={`absolute inset-0 ${
                  darkMode
                    ? 'bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-green-500/5'
                    : 'bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100'
                } transform group-hover:scale-110 transition-transform duration-700 rounded-lg`}></span>
                
                {/* Texto com animação */}
                <span className={`relative inline-block px-4 py-2 group-hover:scale-105 transition-all duration-500 ${
                  darkMode ? 'text-gray-300' : 'text-gray-800'
                }`}>
                  Let's turn your{' '}
                  <span className={`font-bold relative inline-block transform hover:scale-110 transition-transform ${
                    darkMode 
                      ? 'text-blue-400 hover:text-blue-300' 
                      : 'text-pink-600 hover:text-pink-500'
                  } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-current after:transform after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300`}>
                    idea into reality
                  </span>!{' '}
                  Get in touch to{' '}
                  <span className={`font-bold relative inline-block transform hover:scale-110 transition-transform ${
                    darkMode 
                      ? 'text-green-400 hover:text-green-300' 
                      : 'text-indigo-600 hover:text-indigo-500'
                  } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-current after:transform after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300`}>
                    discuss your project
                  </span>.
                </span>
              </span>
            )}
          </p>
          
          {/* Botões de contato */}
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
            <a 
              href="https://discord.com/users/573676927018336267" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium transition-colors duration-300 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Discord
            </a>
            <a 
              href="https://wa.me/5521990380143" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-[#25D366] hover:bg-[#20BD5B] text-white font-medium transition-colors duration-300 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 ${
        darkMode 
          ? 'bg-gray-900' 
          : 'bg-white shadow-2xl border-2 border-purple-200'
      } text-gray-400`}>
        <div className="container mx-auto px-4 text-center">
          <p className="opacity-75 hover:opacity-100 transition-opacity">
            © 2025 Leyga - {t.footer.rights}
          </p>
        </div>
      </footer>
      <CookieConsent language={language} darkMode={darkMode} />
    </div>
  );
}

export default App;