interface Project {
  title: string;
  description: string;
}

interface Translation {
  nav: {
    about: string;
    portfolio: string;
    contact: string;
  };
  hero: {
    greeting: string;
    typingText: string;
    description: string;
    cta: string;
  };
  portfolio: {
    title: string;
    projects: Project[];
  };
  contact: {
    title: string;
    description: string;
  };
  footer: {
    rights: string;
  };
  typingText: string;
}

interface Translations {
  [key: string]: Translation;
}

const translations: Translations = {
  pt: {
    nav: {
      about: 'Sobre',
      portfolio: 'Portfólio',
      contact: 'Contato'
    },
    hero: {
      greeting: 'Olá, eu sou',
      typingText: 'Desenvolvedor de Bots para Discord',
      description: 'Especializado em criar experiências únicas e interativas para comunidades no Discord.',
      cta: 'Ver Projetos'
    },
    portfolio: {
      title: 'Projetos em Destaque',
      projects: [
        {
          title: '🎫 Tickets',
          description: 'Sistema avançado de suporte com categorias, prioridades e métricas de atendimento. Ideal para grandes comunidades.'
        },
        {
          title: '📝 Forms',
          description: 'Formulários personalizáveis com diversos tipos de campos, validações e exportação de respostas em múltiplos formatos.'
        },
        {
          title: '🔓 Unban',
          description: 'Sistema inteligente de solicitações de desbanimento com análise automática de histórico e tempo de punição.'
        },
        {
          title: '🏆 Ranking',
          description: 'Sistema completo de níveis e classificações com recompensas automáticas, estatísticas e competições sazonais.'
        },
        {
          title: '💕 Metadinhas',
          description: 'Sistema único de pareamento de avatares para casais e amigos, com efeitos visuais e personalização avançada.'
        },
        {
          title: '🕵️ O Espião',
          description: 'Jogo social de dedução onde jogadores devem descobrir quem é o espião entre eles. Inclui mais de 100 cenários.'
        },
        {
          title: '🪑 Dança das Cadeiras',
          description: 'Versão digital do clássico jogo, com sistema de eliminação automática e integração com canais de voz.'
        }
      ]
    },
    contact: {
      title: 'Entre em Contato',
      description: 'Vamos transformar sua ideia em realidade! Entre em contato para discutirmos seu projeto.'
    },
    footer: {
      rights: 'Todos os direitos reservados'
    }
  },
  en: {
    nav: {
      about: 'About',
      portfolio: 'Portfolio',
      contact: 'Contact'
    },
    hero: {
      greeting: "Hi, I'm",
      typingText: 'Discord Bot Developer',
      description: 'Specialized in creating unique and interactive experiences for Discord communities.',
      cta: 'View Projects'
    },
    portfolio: {
      title: 'Featured Projects',
      projects: [
        {
          title: '🎫 Tickets',
          description: 'Advanced support system with categories, priorities, and service metrics. Perfect for large communities.'
        },
        {
          title: '📝 Forms',
          description: 'Customizable forms with various field types, validations, and response export in multiple formats.'
        },
        {
          title: '🔓 Unban',
          description: 'Smart unban request system with automatic history analysis and punishment time tracking.'
        },
        {
          title: '🏆 Ranking',
          description: 'Complete leveling and ranking system with automatic rewards, statistics, and seasonal competitions.'
        },
        {
          title: '💕 Matching',
          description: 'Unique avatar matching system for couples and friends, with visual effects and advanced customization.'
        },
        {
          title: '🕵️ The Spy',
          description: 'Social deduction game where players must discover who is the spy among them. Includes over 100 scenarios.'
        },
        {
          title: '🪑 Musical Chairs',
          description: 'Digital version of the classic game, with automatic elimination system and voice channel integration.'
        }
      ]
    },
    contact: {
      title: 'Get in Touch',
      description: "Let's turn your idea into reality! Get in touch to discuss your project."
    },
    footer: {
      rights: 'All rights reserved'
    }
  }
};

export type { Translation };
export default translations;