import React, { useState, useEffect } from 'react';
import { Globe, Moon, Sun, ChevronDown } from 'lucide-react';
import translations from './translations';
import { VideoCard } from './components/VideoCard';

function App() {
  const [language, setLanguage] = useState('pt');
  const [darkMode, setDarkMode] = useState(false);
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
  
  // Typing effect
  useEffect(() => {
    const text = t.typingText;
    let i = 0;
    setTypedText('');
    setIsTyping(true);
    
    const typing = setInterval(() => {
      if (i < text.length) {
        setTypedText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typing);
        setIsTyping(false);
        
        // Reset after 3 seconds
        setTimeout(() => {
          setIsTyping(true);
          setTypedText('');
          i = 0;
        }, 3000);
      }
    }, 100);
    
    return () => clearInterval(typing);
  }, [language, t.typingText]);
  
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

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
      {/* Header */}
      <header className={`fixed w-full z-50 ${darkMode ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-sm shadow-md transition-colors duration-300`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-red-500">
              Leyga
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('about')} 
              className={`${activeSection === 'about' ? 'text-purple-600' : darkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-purple-500 transition-colors`}
            >
              {t.nav.about}
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')} 
              className={`${activeSection === 'portfolio' ? 'text-purple-600' : darkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-purple-500 transition-colors`}
            >
              {t.nav.portfolio}
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className={`${activeSection === 'contact' ? 'text-purple-600' : darkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-purple-500 transition-colors`}
            >
              {t.nav.contact}
            </button>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {t.hero.greeting} <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-red-500">Leyga</span>
              </h1>
              <div className="h-16">
                <p className="text-xl md:text-2xl mb-8 relative">
                  {typedText}
                  {isTyping && <span className="inline-block w-2 h-6 ml-1 bg-purple-500 animate-pulse"></span>}
                </p>
              </div>
              <p className={`text-lg mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.hero.description}
              </p>
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-red-500 text-white font-medium hover:from-purple-700 hover:to-red-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                {t.hero.cta}
                <ChevronDown className="inline ml-2" size={18} />
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-red-500 rounded-full animate-pulse-slow opacity-30"></div>
                <div className="absolute inset-2 bg-gradient-to-r from-purple-600 to-red-600 rounded-full flex items-center justify-center">
                  <div className={`text-6xl md:text-7xl font-bold ${darkMode ? 'text-gray-900' : 'text-white'}`}>L</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gradient-to-b from-transparent to-purple-50 dark:to-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-red-500">{t.portfolio.title}</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.portfolio.projects.map((project, index) => (
              <VideoCard 
                key={index}
                title={project.title}
                description={project.description}
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
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-red-500">{t.contact.title}</span>
          </h2>
          
          <div className={`max-w-2xl mx-auto rounded-xl shadow-lg p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <p className={`text-center mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {t.contact.description}
            </p>
            
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
              <a 
                href="https://discord.com/users/573676927018336267" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors duration-300 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Discord
              </a>
              <a 
                href="mailto:contact@leyga.com" 
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-red-500 text-white font-medium hover:from-purple-700 hover:to-red-600 transition-colors duration-300 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 ${darkMode ? 'bg-gray-900 text-gray-400' : 'bg-gray-100 text-gray-600'} transition-colors duration-300`}>
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Leyga - {t.footer.rights}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;