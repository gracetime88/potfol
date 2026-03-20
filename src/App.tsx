/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ArrowUpRight, 
  Github, 
  Twitter, 
  Instagram, 
  Mail, 
  Menu, 
  X, 
  ChevronRight,
  ExternalLink,
  Layers,
  Zap,
  Palette,
  Code,
  BookOpen,
  ShoppingBag,
  Video,
  Home
} from 'lucide-react';

// --- Types ---
interface MediaItem {
  url: string;
  type: 'image' | 'video';
}

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  link: string;
  media: MediaItem[];
  htmlUrl?: string;
}

// --- Translations ---
const translations = {
  en: {
    nav: {
      works: "Works",
      about: "About",
      services: "Services",
      contact: "Contact"
    },
    hero: {
      subtitle: "AI Creator & Digital Artist",
      title: "REDEFINING VISUAL REALITY",
      desc: "Blending 11+ years of design expertise with cutting-edge AI to create immersive digital experiences that push the boundaries of imagination.",
      cta: "View Portfolio",
      about: "About Me",
      scroll: "Scroll"
    },
    works: {
      title: "SELECTED WORKS",
      subtitle: "Portfolio",
      viewAll: "View All Projects"
    },
    services: {
      title: "OUR EXPERTISE",
      subtitle: "Services",
      items: [
        { title: "AI Book Illustration", desc: "Creating deep visual worlds and characters for book publications. From concept art to final illustrations using Midjourney and Stable Diffusion." },
        { title: "Marketplace Visuals", desc: "Production of photo and video content for marketplaces. Photorealistic product generation that makes the brand stand out and increases conversion." },
        { title: "AI Motion Production", desc: "Creating next-generation dynamic video content. Using Google Veo and Kling AI to generate commercials indistinguishable from live-action shoots." },
        { title: "Real Estate Visualization", desc: "High-tech visual content for developers. Creating atmospheric exteriors and interiors that convey the scale and aesthetics of premium real estate." }
      ]
    },
    about: {
      title: "ANNA KROTOVA",
      subtitle: "AI Creator & Digital Artist",
      desc1: "Experienced AI Creator and Digital Artist with 11+ years in design. Specializing in unique visual content generation using cutting-edge neural networks.",
      desc2: "Expert in Midjourney, Stable Diffusion, and RunwayML, blending traditional design principles with innovative AI technologies. Based in Saint Petersburg, I create high-performance digital products that drive business growth through visual storytelling.",
      exp: "Years Experience",
      lang: "English Proficiency"
    },
    footer: {
      cta: "READY TO ELEVATE?",
      sub: "Let's collaborate on your next digital masterpiece. I'm always looking for bold ideas.",
      nav: "Navigation",
      social: "Social",
      rights: "ALL RIGHTS RESERVED.",
      privacy: "Privacy Policy",
      terms: "Terms of Service"
    },
    projects: [
      { title: "Theater Scenography", desc: "Atmospheric stage decorations and theatrical environment design." },
      { title: "REM Apparel", desc: "Modern streetwear brand identity and clothing design." },
      { title: "Ethno Gothic Eyewear", desc: "Avant-garde eyewear collection blending ethnic motifs with gothic aesthetics." },
      { title: "Trigexilon Visuals", desc: "Complex visual systems and abstract graphic explorations." },
      { title: "Quagga Fashion", desc: "Unique brand concept for the Quagga clothing line." },
      { title: "Vkusvill Campaign", desc: "Dynamic motion graphics and commercial video production." },
      { title: "Stradivarius Motion", desc: "Fashion cinematography and promotional video content." },
      { title: "Mice Illustrations", desc: "A series of character illustrations and digital drawings." },
      { title: "Mermaid Tale", desc: "Animated story about a mermaid with deep visual detail." },
      { title: "BMW Visuals", desc: "High-tech visual content for the automotive brand." }
    ]
  },
  ru: {
    nav: {
      works: "Работы",
      about: "Обо мне",
      services: "Услуги",
      contact: "Контакты"
    },
    hero: {
      subtitle: "AI-креатор и цифровой художник",
      title: "ПЕРЕОСМЫСЛЯЯ ВИЗУАЛЬНУЮ РЕАЛЬНОСТЬ",
      desc: "Объединяю 11-летний опыт в дизайне с передовым ИИ для создания иммерсивного цифрового опыта, раздвигающего границы воображения.",
      cta: "Смотреть портфолио",
      about: "Обо мне",
      scroll: "Листайте"
    },
    works: {
      title: "ИЗБРАННЫЕ РАБОТЫ",
      subtitle: "Портфолио",
      viewAll: "Все проекты"
    },
    services: {
      title: "МОИ КОМПЕТЕНЦИИ",
      subtitle: "Услуги",
      items: [
        { title: "AI Book Illustration", desc: "Создание глубоких визуальных миров и персонажей для книжных изданий. От концепт-артов до финальных иллюстраций с использованием Midjourney и Stable Diffusion." },
        { title: "Marketplace Visuals", desc: "Продакшн фото- и видеоконтента для маркетплейсов. Фотореалистичная генерация товаров, которая выделяет бренд среди конкурентов и повышает конверсию." },
        { title: "AI Motion Production", desc: "Создание динамичного видеоконтента нового поколения. Использование Google Veo и Kling AI для генерации рекламных роликов, которые невозможно отличить от съемочных." },
        { title: "Real Estate Visualization", desc: "Высокотехнологичный визуальный контент для застройщиков. Создание атмосферных экстерьеров и интерьеров, передающих масштаб и эстетику премиальной недвижимости." }
      ]
    },
    about: {
      title: "АННА КРОТОВА",
      subtitle: "AI-креатор и цифровой художник",
      desc1: "Опытный AI-креатор и цифровой художник с более чем 11-летним стажем в дизайне. Специализируюсь на генерации уникального визуального контента с использованием передовых нейросетей.",
      desc2: "Эксперт в Midjourney, Stable Diffusion и RunwayML. Сочетаю традиционные принципы дизайна с инновационными технологиями ИИ. Нахожусь в Санкт-Петербурге, создаю высокоэффективные цифровые продукты, которые способствуют росту бизнеса через визуальный сторителлинг.",
      exp: "Лет опыта",
      lang: "Уровень английского"
    },
    footer: {
      cta: "ГОТОВЫ К НОВЫМ ВЫСОТАМ?",
      sub: "Давайте создадим ваш следующий цифровой шедевр вместе. Я всегда открыта для смелых идей.",
      nav: "Навигация",
      social: "Соцсети",
      rights: "ВСЕ ПРАВА ЗАЩИЩЕНЫ.",
      privacy: "Политика конфиденциальности",
      terms: "Условия использования"
    },
    projects: [
      { title: "Театральная сценография", desc: "Атмосферные театральные декорации и дизайн сценического пространства." },
      { title: "Одежда REM", desc: "Айдентика современного бренда уличной одежды и дизайн коллекций." },
      { title: "Очки Этно-Готика", desc: "Авангардная коллекция очков, сочетающая этнические мотивы с готической эстетикой." },
      { title: "Визуалы Trigexilon", desc: "Сложные визуальные системы и абстрактные графические исследования." },
      { title: "Мода Quagga", desc: "Уникальная концепция бренда для линии одежды Quagga." },
      { title: "Кампания Вкусвилл", desc: "Динамичная моушн-графика и производство коммерческих видеороликов." },
      { title: "Stradivarius Motion", desc: "Фэшн-кинематография и рекламный видеоконтент." },
      { title: "Иллюстрации с мышками", desc: "Серия иллюстраций персонажей и цифровых рисунков." },
      { title: "Сказка о Русалочке", desc: "Анимационная история о русалочке с глубокой визуальной проработкой." },
      { title: "Визуалы BMW", desc: "Высокотехнологичный визуальный контент для автомобильного бренда." }
    ]
  }
};

// --- Mock Data ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Theater Scenography",
    category: "Set Design / theater",
    image: "/theater-main.jpg",
    description: "Атмосферные театральные декорации и дизайн сценического пространства.",
    link: "https://drive.google.com/drive/folders/132UzLMNg757mFJx4q6XzHlOxp6ZTL_5c?usp=sharing",
    htmlUrl: "/theater.html",
    media: [
      { url: "/theater_01.webp", type: 'image' },
      { url: "/theater_02.webp", type: 'image' },
      { url: "/theater_03.webp", type: 'image' },
      { url: "/theater_04.webp", type: 'image' },
      { url: "/theater_05.webp", type: 'image' },
      { url: "/theater_06.webp", type: 'image' },
      { url: "/theater_07.webp", type: 'image' },
      { url: "/theater_08.webp", type: 'image' },
      { url: "/theater_09.webp", type: 'image' },
      { url: "/theater_10.webp", type: 'image' },
      { url: "/theater_11.webp", type: 'image' },
      { url: "/theater_12.webp", type: 'image' }
    ]
  },
  {
    id: 2,
    title: "REM Apparel",
    category: "Fashion / brand REM",
    image: "/rem-main.jpg",
    description: "Айдентика современного бренда уличной одежды и дизайн коллекций.",
    link: "https://drive.google.com/drive/folders/132UzLMNg757mFJx4q6XzHlOxp6ZTL_5c?usp=sharing",
    htmlUrl: "/rem.html",
    media: [
      { url: "/brand_REM_01.webp", type: 'image' },
      { url: "/brand_REM_02.webp", type: 'image' },
      { url: "/brand_REM_03.webp", type: 'image' },
      { url: "/brand_REM_04.webp", type: 'image' },
      { url: "/brand_REM_05.webp", type: 'image' },
      { url: "/brand_REM_06.webp", type: 'image' },
      { url: "/brand_REM_07.webp", type: 'image' },
      { url: "/brand_REM_08.webp", type: 'image' },
      { url: "/brand_REM_09.webp", type: 'image' },
      { url: "/brand_REM_10.webp", type: 'image' }
    ]
  },
  {
    id: 3,
    title: "Ethno Gothic Eyewear",
    category: "Product / glasse etno gothic",
    image: "/glasses-main.jpg",
    description: "Авангардная коллекция очков, сочетающая этнические мотивы с готической эстетикой.",
    link: "https://drive.google.com/drive/folders/132UzLMNg757mFJx4q6XzHlOxp6ZTL_5c?usp=sharing",
    htmlUrl: "/gothic.html",
    media: [
      { url: "/glasses_etno_gothic_01.mp4", type: 'video' },
      { url: "/glasses_etno_gothic_02.mp4", type: 'video' },
      { url: "/glasses_etno_gothic_03.mp4", type: 'video' },
      { url: "/glasses_etno_gothic_04.mp4", type: 'video' }
    ]
  },
  {
    id: 4,
    title: "Trigexilon Visuals",
    category: "Graphic Design / trigexilon",
    image: "/trigexilon-main.jpg",
    description: "Сложные визуальные системы и абстрактные графические исследования.",
    link: "https://drive.google.com/drive/folders/132UzLMNg757mFJx4q6XzHlOxp6ZTL_5c?usp=sharing",
    htmlUrl: "/trihexylon.html",
    media: [
      { url: "/trigexilon_01.mp4", type: 'video' },
      { url: "/trigexilon_02.webp", type: 'image' },
      { url: "/trigexilon_03.webp", type: 'image' },
      { url: "/trigexilon_04.webp", type: 'image' }
    ]
  },
  {
    id: 5,
    title: "Quagga Fashion",
    category: "Brand Identity / brand_Qwagga",
    image: "/qwagga-main.jpg",
    description: "Уникальная концепция бренда для линии одежды Quagga.",
    link: "https://drive.google.com/drive/folders/132UzLMNg757mFJx4q6XzHlOxp6ZTL_5c?usp=sharing",
    htmlUrl: "/qwagga.html",
    media: [
      { url: "/brand_Qwagga_01.webp", type: 'image' },
      { url: "/brand_Qwagga_02.webp", type: 'image' },
      { url: "/brand_Qwagga_03.webp", type: 'image' },
      { url: "/brand_Qwagga_04.webp", type: 'image' },
      { url: "/brand_Qwagga_05.webp", type: 'image' }
    ]
  },
  {
    id: 6,
    title: "Vkusvill Campaign",
    category: "Motion / Vkusvill",
    image: "/vkusvill- main.jpg .jpg",
    description: "Динамичная моушн-графика и производство коммерческих видеороликов.",
    link: "https://drive.google.com/drive/folders/132UzLMNg757mFJx4q6XzHlOxp6ZTL_5c?usp=sharing",
    media: [
      { url: "/vkusvill.mp4", type: 'video' }
    ]
  },
  {
    id: 7,
    title: "Stradivarius Motion",
    category: "Video / Stradivarius",
    image: "/stradivarius-main.jpg",
    description: "Фэшн-кинематография и рекламный видеоконтент.",
    link: "https://drive.google.com/drive/folders/132UzLMNg757mFJx4q6XzHlOxp6ZTL_5c?usp=sharing",
    media: [
      { url: "/stradivarius.mp4", type: 'video' }
    ]
  },
  {
    id: 8,
    title: "Mice Illustrations",
    category: "Illustration / Character Design",
    image: "/mice-main.jpg",
    description: "Серия иллюстраций персонажей и цифровых рисунков.",
    link: "https://drive.google.com/drive/folders/132UzLMNg757mFJx4q6XzHlOxp6ZTL_5c?usp=sharing",
    htmlUrl: "/mice.html",
    media: [
      { url: "/mice-book_01.webp", type: 'image' },
      { url: "/mice-book_02.webp", type: 'image' },
      { url: "/mice-book_03.webp", type: 'image' },
      { url: "/mice-book_04.webp", type: 'image' },
      { url: "/mice-book_05.webp", type: 'image' },
      { url: "/mice-book_06.webp", type: 'image' }
    ]
  },
  {
    id: 9,
    title: "Mermaid Tale",
    category: "Motion / Mermaid",
    image: "/mermaid-main.jpg",
    description: "Анимационная история о русалочке с глубокой визуальной проработкой.",
    link: "https://drive.google.com/drive/folders/132UzLMNg757mFJx4q6XzHlOxp6ZTL_5c?usp=sharing",
    media: [
      { url: "/mermaid.mp4", type: 'video' }
    ]
  },
  {
    id: 10,
    title: "BMW Visuals",
    category: "Motion / BMW",
    image: "/bmw-main.jpg",
    description: "Высокотехнологичный визуальный контент для автомобильного бренда.",
    link: "https://drive.google.com/drive/folders/132UzLMNg757mFJx4q6XzHlOxp6ZTL_5c?usp=sharing",
    media: [
      { url: "/bwm2.mp4", type: 'video' }
    ]
  }
];

const SERVICES = [
  { icon: <BookOpen className="w-6 h-6" />, title: "AI Book Illustration", desc: "Creating deep visual worlds and characters for book publications." },
  { icon: <ShoppingBag className="w-6 h-6" />, title: "Marketplace Visuals", desc: "Production of photo and video content for marketplaces." },
  { icon: <Video className="w-6 h-6" />, title: "AI Motion Production", desc: "Creating next-generation dynamic video content." },
  { icon: <Home className="w-6 h-6" />, title: "Real Estate Visualization", desc: "High-tech visual content for developers." }
];

// --- Components ---

const Navbar = ({ lang, setLang, t }: { lang: 'en' | 'ru', setLang: (l: 'en' | 'ru') => void, t: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.works, href: '#works' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.contact, href: '#contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 glass' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#" 
          className="text-2xl font-display font-bold tracking-tighter"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          ANNA K<span className="text-brand-accent">.</span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="text-sm font-medium uppercase tracking-widest hover:text-brand-accent transition-colors"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {link.name}
            </motion.a>
          ))}
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}
              className="text-[10px] uppercase tracking-widest font-bold hover:text-brand-accent transition-colors border border-white/10 px-3 py-1 rounded-full"
            >
              {lang === 'en' ? 'RU' : 'EN'}
            </button>
            <motion.a 
              href="https://t.me/gracetime_A"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border border-white/20 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              Telegram
            </motion.a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}
            className="text-[10px] uppercase tracking-widest font-bold border border-white/10 px-3 py-1 rounded-full"
          >
            {lang === 'en' ? 'RU' : 'EN'}
          </button>
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-brand-black z-40 flex flex-col items-center justify-center space-y-8"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="absolute top-8 left-6 text-2xl font-display font-bold tracking-tighter">
              ANNA K<span className="text-brand-accent">.</span>
            </div>
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-4xl font-display font-bold hover:text-brand-accent"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ t }: { t: any }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden px-6">
      <motion.div 
        className="absolute inset-0 z-0 opacity-20"
        style={{ y: y1 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-accent/20 via-transparent to-transparent" />
      </motion.div>

      <div className="relative z-10 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ opacity }}
        >
          <span className="inline-block text-brand-accent font-mono text-sm uppercase tracking-[0.3em] mb-6">
            {t.hero.subtitle}
          </span>
          <h1 className="text-6xl md:text-9xl font-display font-bold leading-[0.9] tracking-tighter mb-8">
            {t.hero.title.split(' ').slice(0, -1).join(' ')} <br />
            <span className="italic font-serif font-light text-brand-accent">{t.hero.title.split(' ').pop()}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed mb-12">
            {t.hero.desc}
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="#works" className="group relative px-8 py-4 bg-white text-black rounded-full font-bold overflow-hidden transition-all">
              <span className="relative z-10 flex items-center gap-2">
                {t.hero.cta} <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <a href="#about" className="text-sm uppercase tracking-widest font-bold hover:text-brand-accent transition-colors">
              {t.hero.about}
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">{t.hero.scroll}</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
};

const ProjectCard = ({ project, index, onOpen }: { project: Project; index: number; onOpen: (p: Project) => void; key?: React.Key }) => {
  const CardContent = (
    <>
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
        referrerPolicy="no-referrer"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          const currentSrc = target.src;
          const fileName = currentSrc.split('/').pop() || '';
          
          if (fileName.endsWith('.jpg')) {
            target.src = currentSrc.replace('.jpg', '.webp');
            target.onerror = () => {
              target.src = currentSrc.replace('.jpg', '.png');
              target.onerror = null;
            };
          } else if (fileName.endsWith('.webp')) {
            target.src = currentSrc.replace('.webp', '.jpg');
            target.onerror = () => {
              target.src = currentSrc.replace('.webp', '.png');
              target.onerror = null;
            };
          } else if (!fileName.includes('.')) {
            target.src = currentSrc + '.jpg';
            target.onerror = () => {
              target.src = currentSrc + '.webp';
              target.onerror = () => {
                target.src = currentSrc + '.png';
                target.onerror = null;
              };
            };
          }
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
      
      <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-end">
        <div>
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-2 block">
            {project.category}
          </span>
          <h3 className="text-3xl font-display font-bold leading-tight">
            {project.title}
          </h3>
        </div>
        <motion.div 
          className="w-12 h-12 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ scale: 1.1 }}
        >
          <ArrowUpRight className="w-6 h-6" />
        </motion.div>
      </div>
    </>
  );

  if (project.htmlUrl) {
    return (
      <motion.a 
        href={project.htmlUrl}
        className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900 block cursor-pointer zoom"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
      >
        {CardContent}
      </motion.a>
    );
  }

  return (
    <motion.div 
      onClick={() => onOpen(project)}
      className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900 block cursor-pointer zoom"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      {CardContent}
    </motion.div>
  );
};

const Lightbox = ({ project, onClose }: { project: Project | null; onClose: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (project) {
      setCurrentIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, currentIndex]);

  if (!project) return null;

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % project.media.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + project.media.length) % project.media.length);
  };

  const currentMedia = project.media[currentIndex];

  return (
    <AnimatePresence>
      {project && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12"
          onClick={onClose}
        >
          <button 
            className="absolute top-8 right-8 text-white/50 hover:text-white z-50 p-2"
            onClick={onClose}
          >
            <X className="w-8 h-8" />
          </button>

          {project.media.length > 1 && (
            <>
              <button 
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white z-50 p-4 transition-colors"
                onClick={(e) => { e.stopPropagation(); prev(); }}
              >
                <ChevronRight className="w-10 h-10 rotate-180" />
              </button>
              <button 
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white z-50 p-4 transition-colors"
                onClick={(e) => { e.stopPropagation(); next(); }}
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            </>
          )}

          <div 
            className="relative w-full h-full flex flex-col items-center justify-center gap-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[70vh] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.95, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 1.05, x: -20 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {currentMedia.type === 'image' ? (
                    <img 
                      src={currentMedia.url} 
                      alt={project.title}
                      className="max-w-full max-h-full object-contain rounded-lg shadow-2xl zoom"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const currentSrc = target.src;
                        if (currentSrc.endsWith('.webp')) {
                          target.src = currentSrc.replace('.webp', '.jpg');
                          target.onerror = () => {
                            target.src = currentSrc.replace('.webp', '.png');
                            target.onerror = null;
                          };
                        } else if (currentSrc.endsWith('.jpg')) {
                          target.src = currentSrc.replace('.jpg', '.png');
                          target.onerror = null;
                        }
                      }}
                    />
                  ) : (
                    <video 
                      src={currentMedia.url} 
                      controls 
                      autoPlay
                      className="max-w-full max-h-full rounded-lg shadow-2xl"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="text-center max-w-2xl">
              <span className="text-brand-accent font-mono text-xs uppercase tracking-[0.3em] mb-2 block">
                {project.category}
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">{project.title}</h2>
              <p className="text-white/60 font-light leading-relaxed">{project.description}</p>
              
              {project.media.length > 1 && (
                <div className="mt-8 flex justify-center gap-2">
                  {project.media.map((_, i) => (
                    <div 
                      key={i}
                      className={`h-1 transition-all duration-300 rounded-full ${i === currentIndex ? 'w-8 bg-brand-accent' : 'w-2 bg-white/20'}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SectionHeader = ({ title, subtitle, align = 'left' }: { title: string; subtitle: string; align?: 'left' | 'center' }) => (
  <div className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <motion.span 
      className="text-brand-accent font-mono text-xs uppercase tracking-[0.3em] mb-4 block"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      className="text-4xl md:text-6xl font-display font-bold tracking-tighter"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
    >
      {title}
    </motion.h2>
  </div>
);

const Footer = ({ t }: { t: any }) => (
  <footer id="contact" className="bg-zinc-950 pt-24 pb-12 px-6 border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
        <div>
          <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-8">
            {t.footer.cta.split(' ').slice(0, -1).join(' ')} <br />
            <span className="text-brand-accent italic font-serif font-light">{t.footer.cta.split(' ').pop()}</span>
          </h2>
          <p className="text-xl text-white/50 max-w-md mb-12">
            {t.footer.sub}
          </p>
          <div className="space-y-6">
            <a 
              href="mailto:anntimo@gmail.com" 
              className="text-2xl md:text-4xl font-display font-bold hover:text-brand-accent transition-colors flex items-center gap-4"
            >
              anntimo@gmail.com <ArrowUpRight className="w-8 h-8" />
            </a>
            <a 
              href="https://t.me/gracetime_A" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl md:text-4xl font-display font-bold hover:text-brand-accent transition-colors flex items-center gap-4"
            >
              @gracetime_A <ArrowUpRight className="w-8 h-8" />
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/30 mb-6">{t.footer.nav}</h4>
            <ul className="space-y-4">
              {[t.nav.works, t.nav.about, t.nav.services, t.nav.contact].map((item, i) => (
                <li key={item}><a href={`#${['works', 'about', 'services', 'contact'][i]}`} className="text-sm hover:text-brand-accent transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/30 mb-6">{t.footer.social}</h4>
            <ul className="space-y-4">
              {[
                { icon: <Mail className="w-4 h-4" />, name: 'Email', href: 'mailto:anntimo@gmail.com' },
                { icon: <Zap className="w-4 h-4" />, name: 'Telegram', href: 'https://t.me/gracetime_A' },
                { icon: <Instagram className="w-4 h-4" />, name: 'Instagram', href: '#' }
              ].map(social => (
                <li key={social.name}>
                  <a href={social.href} className="text-sm flex items-center gap-2 hover:text-brand-accent transition-colors">
                    {social.icon} {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 text-[10px] uppercase tracking-widest text-white/20">
        <p>© 2026 ANNA KROTOVA. {t.footer.rights}</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
          <a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [lang, setLang] = useState<'en' | 'ru'>('ru');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const t = translations[lang];

  return (
    <div className="min-h-screen font-sans selection:bg-brand-accent selection:text-black">
      <Navbar lang={lang} setLang={setLang} t={t} />
      
      <main>
        {/* Hero Section */}
        <Hero t={t} />

        {/* Works Section */}
        <section id="works" className="py-24 px-6 max-w-7xl mx-auto">
          <SectionHeader 
            title={t.works.title} 
            subtitle={t.works.subtitle} 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project, i) => {
              const translatedProject: Project = {
                ...project,
                title: t.projects[i]?.title || project.title,
                description: t.projects[i]?.desc || project.description
              };
              return (
                <ProjectCard 
                  key={project.id} 
                  project={translatedProject} 
                  index={i}
                  onOpen={setSelectedProject}
                />
              );
            })}
          </div>
          <div className="mt-16 text-center">
            <button className="px-12 py-4 border border-white/10 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              {t.works.viewAll}
            </button>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 px-6 bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <SectionHeader 
              title={t.services.title} 
              subtitle={t.services.subtitle} 
              align="center"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {SERVICES.map((service, i) => (
                <motion.div 
                  key={t.services.items[i].title}
                  className="p-8 rounded-2xl glass hover:border-brand-accent/50 transition-colors group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-display font-bold mb-4">{t.services.items[i].title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {t.services.items[i].desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeader 
                title={t.about.title} 
                subtitle={t.about.subtitle} 
              />
              <p className="text-xl md:text-2xl text-white/60 leading-relaxed mb-8">
                {t.about.desc1}
              </p>
              <p className="text-lg text-white/40 leading-relaxed mb-12">
                {t.about.desc2}
              </p>
              <div className="flex gap-12">
                <div>
                  <span className="text-4xl font-display font-bold text-brand-accent block mb-2">11+</span>
                  <span className="text-xs uppercase tracking-widest text-white/30">{t.about.exp}</span>
                </div>
                <div>
                  <span className="text-4xl font-display font-bold text-brand-accent block mb-2">C1</span>
                  <span className="text-xs uppercase tracking-widest text-white/30">{t.about.lang}</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative aspect-square rounded-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <img 
                src="/background.jpg" 
                alt="Anna Krotova" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  const currentSrc = target.src;
                  const fileName = currentSrc.split('/').pop() || '';
                  
                  if (fileName.endsWith('.jpg')) {
                    target.src = currentSrc.replace('.jpg', '.webp');
                    target.onerror = () => {
                      target.src = currentSrc.replace('.jpg', '.png');
                      target.onerror = null;
                    };
                  } else if (fileName.endsWith('.webp')) {
                    target.src = currentSrc.replace('.webp', '.jpg');
                    target.onerror = () => {
                      target.src = currentSrc.replace('.webp', '.png');
                      target.onerror = null;
                    };
                  } else if (!fileName.includes('.')) {
                    target.src = currentSrc + '.jpg';
                    target.onerror = () => {
                      target.src = currentSrc + '.webp';
                      target.onerror = () => {
                        target.src = currentSrc + '.png';
                        target.onerror = null;
                      };
                    };
                  }
                }}
              />
              <div className="absolute inset-0 bg-brand-accent/10 mix-blend-overlay" />
            </motion.div>
          </div>
        </section>
      </main>

      <Footer t={t} />

      <Lightbox 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
}
