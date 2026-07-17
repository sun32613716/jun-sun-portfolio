import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDownRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Crosshair,
  Layers3,
  Palette,
  PenTool,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";

import BorderGlow from "./BorderGlow";
import TiltedCard from "./TiltedCard";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const asset = (path) => {
  if (!path || /^(https?:|data:|blob:)/.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
};

const navItems = [
  ["个人作品", "#works"],
  ["个人优势", "#strengths"],
  ["工作经历", "#about"],
  ["联系我", "#contact"],
];

const stats = [
  { value: "16+", label: "年商业美术经验" },
  { value: "2010-2026", label: "原画设计组经历" },
  { value: "2", label: "写实 / Q版方向" },
  { value: "全流程", label: "设定图到拆解输出" },
];

const projects = [
  {
    title: "realistic design works",
    meta: "角色三视图 / 服装结构 / 角色设定",
    image: "/assets/realistic%20design%20works/1.png",
    fullImage: "/assets/realistic%20design%20works/1.png",
    gallery: [
      "/assets/realistic%20design%20works/1.png",
      "/assets/realistic%20design%20works/2.png",
      "/assets/realistic%20design%20works/3.png",
      "/assets/realistic%20design%20works/4.png",
      "/assets/realistic%20design%20works/5.png",
      "/assets/realistic%20design%20works/6.png",
    ],
    tags: ["Turnaround", "Outfit", "Game Ready"],
  },
  {
    title: "chibi design works",
    meta: "Q版设定 / Q版原画",
    image: "/assets/chibi%20design%20work/project-Little%20Mage-thumb.webp",
    fullImage: "/assets/chibi%20design%20work/project-Little%20Mage.webp",
    gallery: [
      "/assets/chibi%20design%20work/project-dog.webp",
      "/assets/chibi%20design%20work/project-Little%20Mage.webp",
      "/assets/chibi%20design%20work/project-mario.webp",
      "/assets/chibi%20design%20work/project-rabbit.webp",
    ],
    galleryThumbs: [
      "/assets/chibi%20design%20work/project-dog-thumb.webp",
      "/assets/chibi%20design%20work/project-Little%20Mage-thumb.webp",
      "/assets/chibi%20design%20work/project-mario-thumb.webp",
      "/assets/chibi%20design%20work/project-rabbit-thumb.webp",
    ],
    tags: ["Design Sheet", "Gear", "Material"],
  },
  {
    title: "event banner design works",
    meta: "banner活动设计页面",
    image: "/assets/event%20banner%20design%20work/project-2.webp",
    fullImage: "/assets/event%20banner%20design%20work/project-2.webp",
    gallery: [
      "/assets/event%20banner%20design%20work/project-2.webp",
      "/assets/event%20banner%20design%20work/project-4.webp",
      "/assets/event%20banner%20design%20work/project-5.webp",
      "/assets/event%20banner%20design%20work/project-6.webp",
      "/assets/event%20banner%20design%20work/project-7.webp",
      "/assets/event%20banner%20design%20work/project-8.webp",
      "/assets/event%20banner%20design%20work/project-9.webp",
      "/assets/event%20banner%20design%20work/project-10.webp",
      "/assets/event%20banner%20design%20work/project-11.webp",
      "/assets/event%20banner%20design%20work/project-12.webp",
      "/assets/event%20banner%20design%20work/project-13.webp",
      "/assets/event%20banner%20design%20work/project-14.webp",
    ],
    galleryThumbs: [
      "/assets/event%20banner%20design%20work/project-2.webp",
      "/assets/event%20banner%20design%20work/project-4.webp",
      "/assets/event%20banner%20design%20work/project-5.webp",
      "/assets/event%20banner%20design%20work/project-6.webp",
      "/assets/event%20banner%20design%20work/project-7.webp",
      "/assets/event%20banner%20design%20work/project-8.webp",
      "/assets/event%20banner%20design%20work/project-9.webp",
      "/assets/event%20banner%20design%20work/project-10.webp",
      "/assets/event%20banner%20design%20work/project-11.webp",
      "/assets/event%20banner%20design%20work/project-12.webp",
      "/assets/event%20banner%20design%20work/project-13.webp",
      "/assets/event%20banner%20design%20work/project-14.webp",
    ],
    tags: ["In Game", "Banner", "Presentation"],
  },
  {
    title: "Pixel art works",
    meta: "像素设定 / 像素换装 / 像素场景",
    image: "/assets/pixel%20art%20works/pixel-01.gif",
    fullImage: "/assets/pixel%20art%20works/pixel-01.gif",
    gallery: [
      "/assets/pixel%20art%20works/pixel-01.gif",
      "/assets/pixel%20art%20works/pixel-02.png",
      "/assets/pixel%20art%20works/pixel-03.png",
      "/assets/pixel%20art%20works/pixel-04.png",
      "/assets/pixel%20art%20works/pixel-05.png",
      "/assets/pixel%20art%20works/pixel-06.png",
      "/assets/pixel%20art%20works/pixel-07.gif",
    ],
    tags: ["Pixel", "Costume", "Scene"],
  },
];

const getHeroReelItems = () =>
  projects.flatMap((project, projectIndex) => {
    const gallery = project.gallery ?? [project.fullImage];
    const galleryThumbs = project.galleryThumbs ?? gallery;

    return gallery.map((image, imageIndex) => ({
      image: galleryThumbs[imageIndex] ?? image,
      title: project.title,
      projectIndex,
      imageIndex,
    }));
  });

const strengths = [
  {
    icon: PenTool,
    title: "角色概念设计",
    text: "能从世界观、职业定位和阵营风格出发，建立清晰的角色方案。",
  },
  {
    icon: Crosshair,
    title: "服装与装备逻辑",
    text: "熟悉战术背心、腰带挂载、枪套、护甲、耳机与背包装置等结构。",
  },
  {
    icon: Palette,
    title: "色彩与材质表现",
    text: "关注金属、皮革、尼龙布料、战术织带、发光件与半透明材质。",
  },
  {
    icon: Layers3,
    title: "完整设定图输出",
    text: "可完成立绘、背面、三视图、武器装备拆解和多配色皮肤方案。",
  },
  {
    icon: Workflow,
    title: "商业美术意识",
    text: "重视角色卖点、识别度、游戏实装逻辑和作品集展示完整度。",
  },
  {
    icon: Sparkles,
    title: "AI 辅助探索",
    text: "掌握 GPT 与 ComfyUI 辅助概念探索，并以 Photoshop 完成设计收束。",
  },
];

function Header() {
  return (
    <header className="site-header">
      <nav className="nav-links" aria-label="主导航">
        {navItems.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function ProjectLightbox({ activeIndex, activeImageIndex, onClose, onNext, onPrev, onSelectImage }) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ pointerId: null, startX: 0, startY: 0, originX: 0, originY: 0 });
  const activeThumbRef = useRef(null);

  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setIsDragging(false);
  }, [activeIndex, activeImageIndex]);

  useEffect(() => {
    activeThumbRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex, activeImageIndex]);

  if (activeIndex === null) return null;

  const project = projects[activeIndex];
  const gallery = project.gallery ?? [project.fullImage];
  const galleryThumbs = project.galleryThumbs ?? gallery;
  const activeImage = gallery[activeImageIndex] ?? gallery[0];
  const handleImageWheel = (event) => {
    event.preventDefault();
    const direction = event.deltaY > 0 ? -1 : 1;
    setZoom((current) => {
      const next = current + direction * 0.12;
      return Math.min(3, Math.max(0.5, Number(next.toFixed(2))));
    });
  };
  const resetImageView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setIsDragging(false);
  };
  const handlePointerDown = (event) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: pan.x,
      originY: pan.y,
    };
    setIsDragging(true);
  };
  const handlePointerMove = (event) => {
    if (!isDragging || dragRef.current.pointerId !== event.pointerId) return;
    event.preventDefault();
    setPan({
      x: dragRef.current.originX + event.clientX - dragRef.current.startX,
      y: dragRef.current.originY + event.clientY - dragRef.current.startY,
    });
  };
  const handlePointerUp = (event) => {
    if (dragRef.current.pointerId === event.pointerId) {
      dragRef.current.pointerId = null;
      setIsDragging(false);
    }
  };

  return (
    <div
      className="project-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="作品全图查看"
    >
      <button className="lightbox-close" type="button" onClick={onClose} aria-label="关闭作品查看">
        <X size={22} />
      </button>
      <button className="lightbox-nav lightbox-prev" type="button" onClick={onPrev} aria-label="上一张作品">
        <ChevronLeft size={28} />
      </button>
      <figure className="lightbox-stage">
        <div
          className={`lightbox-image-viewport${isDragging ? " is-dragging" : ""}`}
          style={{ "--lightbox-zoom": zoom, "--lightbox-pan-x": `${pan.x}px`, "--lightbox-pan-y": `${pan.y}px` }}
          onWheel={handleImageWheel}
          onDoubleClick={resetImageView}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
        <img src={asset(activeImage)} alt={`${project.title} 全图`} decoding="async" />
        </div>
        <figcaption>
          <span>
            {String(activeImageIndex + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
          </span>
          <strong>{project.title}</strong>
          <small>{project.meta}</small>
        </figcaption>
      </figure>
      <button className="lightbox-nav lightbox-next" type="button" onClick={onNext} aria-label="下一张作品">
        <ChevronRight size={28} />
      </button>
      <div className="lightbox-strip" aria-label="作品顺序">
        {gallery.map((image, index) => (
          <button
            className={index === activeImageIndex ? "is-active" : ""}
            ref={index === activeImageIndex ? activeThumbRef : null}
            key={image}
            type="button"
            onClick={() => onSelectImage(index)}
            aria-label={`查看 ${project.title} ${index + 1}`}
          >
            <img src={asset(galleryThumbs[index] ?? image)} alt="" loading="lazy" decoding="async" />
          </button>
        ))}
      </div>
    </div>
  );
}

function Hero({ onOpenProject }) {
  const heroReel = getHeroReelItems();
  const heroReelLoop = heroReel;

  return (
    <section className="hero section-dark" id="home">
      <video
        className="hero-video"
        src={asset("/assets/donghua.mp4")}
        poster={asset("/assets/hero-poster.webp")}
        preload="metadata"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="hero-shade" />
      <Header />
      <div className="container hero-content">
        <div className="eyebrow">
          <span>GAME CHARACTER CONCEPT ARTIST</span>
          <span>DALIAN</span>
        </div>
        <h1>
          <span className="hero-title-main">SUN JUN</span>
          <span className="hero-title-sub">
            PORTFOLIO
            <Sparkles size={46} strokeWidth={1.6} />
          </span>
          <span className="hero-title-script">角色原画 / 概念设计</span>
        </h1>
        <p>
          专注写实与 Q 版游戏角色设计，覆盖设定草图、服装剪影、装备拆解、
          材质表现、配色变体与完整角色设定图输出。
        </p>
      </div>
      <div className="hero-reel" aria-label="精选作品预览">
        <div className="hero-reel-track">
          {[0, 1].map((group) => (
            <div className="hero-reel-group" key={group} aria-hidden={group === 1}>
              {heroReelLoop.map((item, index) => (
                <button
                  className="hero-reel-card"
                  type="button"
                  key={`${item.title}-${item.projectIndex}-${item.imageIndex}-${group}-${index}`}
                  onClick={() => onOpenProject(item.projectIndex, item.imageIndex)}
                >
                  <img src={asset(item.image)} alt="" loading={group === 0 && index < 8 ? "eager" : "lazy"} decoding="async" />
                  <strong>{item.title}</strong>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="hero-footer">
        <span>AVAILABLE MID JULY 2026</span>
        <span>PS / GPT / COMFYUI</span>
      </div>
    </section>
  );
}

function About() {
  const profileFields = [
    { label: "当前身份", value: "游戏角色原画师 / 角色概念设计师" },
    { label: "创作方向", value: "写实角色 / Q 版角色" },
    { label: "所在地", value: "大连" },
    { label: "到岗时间", value: "2026 年 8 月中旬" },
  ];

  const buildingTags = ["角色设定", "装备拆解", "配色变体", "皮肤方案", "游戏 Banner"];

  const careerPath = [
    {
      time: "2017.02 - 2026.04",
      company: "大连慧搜科技有限公司",
      role: "原画设计组",
      text: "参与角色像素原画、皮肤像素设计、道具像素设计绘制；根据主美反馈修改角色方案；参与游戏 Banner 设计，并输出角色设定图、拆解图与配色方案。",
    },
    {
      time: "2014.04 - 2015.12",
      company: "明宇科技",
      role: "原画设计组",
      text: "参与角色原画、皮肤设计、道具设计绘制；根据主美反馈修改角色设计；输出角色设定图、拆解图与配色方案。",
    },
    {
      time: "2013.02 - 2014.04",
      company: "北京掌趣科技",
      role: "原画设计组",
      text: "参与《天天英雄》角色原画、皮肤设计、道具设计绘制；根据主美反馈修改角色设计；输出角色设定图、拆解图与配色方案。",
    },
    {
      time: "2012.01 - 2012.12",
      company: "北京博荣无限有限公司",
      role: "原画设计组",
      text: "参与角色像素原画、像素皮肤设计、像素道具设计绘制，并根据主美反馈修改角色设计。",
    },
  ];

  return (
    <section className="about experience-showcase section-panel" id="about">
      <div className="container experience-shell">
        <div className="experience-titlebar">
          <div>
            <h2>
              WORK EXPERIENCE
              <ArrowDownRight size={34} strokeWidth={2.4} />
            </h2>
            <span>工作经历</span>
          </div>
        </div>

        <div className="experience-overview">
          <div className="experience-portrait-card">
            <TiltedCard
              imageSrc={asset("/assets/profile-character.webp")}
              altText="角色人物图"
              captionText="Character Concept Design"
              containerHeight="520px"
              containerWidth="100%"
              imageHeight="520px"
              imageWidth="100%"
              rotateAmplitude={8}
              scaleOnHover={1.035}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent
              overlayContent={<span className="experience-portrait-badge">Character Concept Design</span>}
            />
            <img src={asset("/assets/profile-character.webp")} alt="角色人物图" loading="lazy" decoding="async" />
            <span>Character Concept Design</span>
          </div>

          <div className="experience-profile">
            <div className="section-kicker">ABOUT ME</div>
            <h3>Hi, I am Sun Jun!</h3>
            <p>
              我是一名游戏角色原画师 / 角色概念设计师，熟悉商业游戏角色从设定草图、
              服装剪影、配色方案、装备拆解到完整角色立绘的设计流程。创作时会从角色定位、
              玩法职业、阵营风格、材质表现和玩家审美出发。
            </p>
            <div className="profile-field-grid">
              {profileFields.map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
            <div className="experience-stats">
              {stats.map((item) => (
                <div key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="building-row">
              <span>NOW BUILDING</span>
              <div>
                {buildingTags.map((tag) => (
                  <small key={tag}>{tag}</small>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="career-path">
          <div className="career-path-heading">
            <span>CAREER PATH</span>
            <strong>工作经历</strong>
          </div>
          <div className="career-timeline">
            {careerPath.map((item) => (
              <article key={item.company}>
                <span className="timeline-dot" aria-hidden="true">✦</span>
                <time>{item.time}</time>
                <h3>{item.company}</h3>
                <small>{item.role}</small>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Works({ onOpenProject }) {
  return (
    <section className="works section-dark" id="works">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="section-kicker">SELECTED WORKS</div>
            <h2>个人作品</h2>
          </div>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <BorderGlow
              className={`project-glow-card project-${index + 1}`}
              key={project.title}
              edgeSensitivity={24}
              glowRadius={38}
              glowIntensity={0.85}
            >
              <button
                className="project-card"
                type="button"
                onClick={() => onOpenProject(index)}
              >
                <img src={asset(project.image)} alt={project.title} loading="lazy" decoding="async" />
                <div className="project-overlay">
                  <h3>{project.title}</h3>
                  <p>{project.meta}</p>
                  <div className="tag-row">
                    {project.tags.map((tag) => (
                      <small key={tag}>{tag}</small>
                    ))}
                  </div>
                </div>
              </button>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}

function Strengths() {
  return (
    <section className="strengths section-panel" id="strengths">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="section-kicker">CAPABILITY</div>
            <h2>个人优势</h2>
          </div>
          <p>从角色设计思维到商业项目交付，保持完整、清晰、可执行。</p>
        </div>
        <div className="strength-grid">
          {strengths.map(({ icon: Icon, title, text }) => (
            <BorderGlow className="strength-card" key={title} edgeSensitivity={26} glowRadius={34} glowIntensity={0.85}>
              <Icon size={25} strokeWidth={1.6} />
              <h3>{title}</h3>
              <p>{text}</p>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section section-dark" id="contact">
      <div className="container contact-content">
        <div className="section-kicker">CONTACT</div>
        <h2>
          <span>期待参与更完整、</span>
          <span>更有辨识度的游戏角色设计项目。</span>
        </h2>
        <p>
          期望岗位：游戏角色原画师 / 角色概念设计师。到岗时间：2026 年 8 月中旬。
        </p>
        <div className="contact-info">
          <p>邮件：32613716@qq.com</p>
          <p>电话联系：13052709522</p>
        </div>
        <div className="footer-line">
          <span>Sun Jun Portfolio</span>
          <span>
            <ShieldCheck size={16} />
            Character Concept / Game Art
          </span>
          <span>
            <BadgeCheck size={16} />
            Photoshop / GPT / ComfyUI
          </span>
        </div>
      </div>
    </section>
  );
}

function usePortfolioMotion() {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return undefined;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return undefined;

    const ctx = gsap.context(() => {
      gsap.defaults({ ease: "power4.out" });

      const opening = gsap.timeline({
        defaults: { ease: "expo.out" },
        delay: 0.12,
      });

      gsap.set(
        [
          ".site-header",
          ".hero .eyebrow",
          ".hero h1 span",
          ".hero p",
          ".hero-reel-group:first-child .hero-reel-card",
          ".hero-footer",
          ".section-kicker",
          ".section-heading h2",
          ".section-heading p",
          ".experience-titlebar h2",
          ".experience-titlebar span",
          ".contact-content h2",
          ".contact-content p",
        ],
        { willChange: "transform, opacity, clip-path" },
      );

      opening
        .fromTo(
          ".hero-video",
          { scale: 1.14, filter: "brightness(0.62) saturate(0.74)" },
          { scale: 1, filter: "brightness(1) saturate(1)", duration: 2.4 },
          0,
        )
        .fromTo(
          ".site-header",
          { autoAlpha: 0, y: -42, scaleX: 0.82, transformOrigin: "50% 50%" },
          { autoAlpha: 1, y: 0, scaleX: 1, duration: 1.35 },
          0.16,
        )
        .fromTo(
          ".hero .eyebrow",
          { autoAlpha: 0, y: 34, clipPath: "inset(0 100% 0 0)" },
          { autoAlpha: 1, y: 0, clipPath: "inset(0 0% 0 0)", duration: 1.15 },
          0.34,
        )
        .fromTo(
          ".hero h1 span",
          {
            autoAlpha: 0,
            y: 112,
            scaleY: 0.58,
            clipPath: "inset(0 0 100% 0)",
            transformOrigin: "50% 100%",
          },
          {
            autoAlpha: 1,
            y: 0,
            scaleY: 1,
            clipPath: "inset(0 0 0% 0)",
            duration: 1.58,
            stagger: 0.16,
          },
          0.52,
        )
        .fromTo(
          ".hero p",
          { autoAlpha: 0, y: 42, clipPath: "inset(0 0 100% 0)" },
          { autoAlpha: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 1.15 },
          1.18,
        )
        .fromTo(
          ".hero-reel-group:first-child .hero-reel-card",
          { autoAlpha: 0, y: 86, scale: 0.92, clipPath: "inset(100% 0 0 0)" },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            clipPath: "inset(0% 0 0 0)",
            duration: 1.25,
            stagger: 0.075,
          },
          1.34,
        )
        .fromTo(
          ".hero-footer",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 1 },
          1.82,
        );

      const sections = gsap.utils.toArray(".works, .strengths, .experience-showcase, .contact-section");

      sections.forEach((section) => {
        const englishLead = section.querySelectorAll(
          ".section-kicker, .experience-titlebar h2",
        );
        const headingRest = section.querySelectorAll(
          ".section-heading h2, .section-heading p, .experience-titlebar span, .contact-content h2, .contact-content p",
        );
        const cards = section.querySelectorAll(
          ".project-glow-card, .strength-card, .experience-portrait-card, .profile-field-grid > div, .experience-stats > div, .career-timeline article, .contact-info p, .footer-line span",
        );

        gsap.fromTo(
          englishLead,
          {
            autoAlpha: 0,
            y: 126,
            scale: 1.42,
            scaleX: 0.62,
            clipPath: "inset(0 100% 0 0)",
            transformOrigin: "0% 50%",
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            scaleX: 1,
            clipPath: "inset(0 0% 0 0)",
            duration: 1.55,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: section,
              start: "top 74%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          headingRest,
          {
            autoAlpha: 0,
            y: 72,
            scaleX: 0.82,
            clipPath: "inset(0 100% 0 0)",
            transformOrigin: "0% 50%",
          },
          {
            autoAlpha: 1,
            y: 0,
            scaleX: 1,
            clipPath: "inset(0 0% 0 0)",
            duration: 1.28,
            stagger: 0.12,
            ease: "expo.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          cards,
          {
            autoAlpha: 0,
            y: 84,
            scale: 0.94,
            clipPath: "inset(18% 0 18% 0)",
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            clipPath: "inset(0% 0 0% 0)",
            duration: 1.18,
            stagger: { each: 0.085, from: "start" },
            ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top 64%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray(".project-card img, .experience-portrait-card img").forEach((image) => {
        gsap.fromTo(
          image,
          { yPercent: 8, scale: 1.14, clipPath: "inset(12% 0 12% 0)" },
          {
            yPercent: -6,
            scale: 1.02,
            clipPath: "inset(0% 0 0% 0)",
            ease: "none",
            scrollTrigger: {
              trigger: image.closest("section") || image,
              start: "top 82%",
              end: "bottom top",
              scrub: 0.85,
            },
          },
        );
      });

      window.addEventListener("load", ScrollTrigger.refresh);
    });

    return () => {
      window.removeEventListener("load", ScrollTrigger.refresh);
      ctx.revert();
    };
  }, []);
}

export default function App() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  usePortfolioMotion();

  const openProject = (index, imageIndex = 0) => {
    setActiveProjectIndex(index);
    setActiveImageIndex(imageIndex);
  };
  const closeProject = () => setActiveProjectIndex(null);
  const showPrevProject = () => {
    if (activeProjectIndex === null) return;
    const gallery = projects[activeProjectIndex].gallery ?? [projects[activeProjectIndex].fullImage];
    setActiveImageIndex((current) => (current - 1 + gallery.length) % gallery.length);
  };
  const showNextProject = () => {
    if (activeProjectIndex === null) return;
    const gallery = projects[activeProjectIndex].gallery ?? [projects[activeProjectIndex].fullImage];
    setActiveImageIndex((current) => (current + 1) % gallery.length);
  };

  useEffect(() => {
    const scrollToHash = () => {
      const target = window.location.hash;
      if (!target) return;
      const element = document.querySelector(target);
      if (!element) return;
      const root = document.documentElement;
      const previousBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo(0, element.getBoundingClientRect().top + window.scrollY);
      root.style.scrollBehavior = previousBehavior;
    };

    const timer = window.setTimeout(scrollToHash, 80);
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  useEffect(() => {
    if (activeProjectIndex === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeProject();
      if (event.key === "ArrowLeft") showPrevProject();
      if (event.key === "ArrowRight") showNextProject();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProjectIndex]);

  return (
    <>
      <Hero onOpenProject={openProject} />
      <div className="grainient-backed">
        <div className="grainient-stage" aria-hidden="true" />
        <Works onOpenProject={openProject} />
        <Strengths />
        <About />
        <Contact />
      </div>
      <ProjectLightbox
        activeIndex={activeProjectIndex}
        activeImageIndex={activeImageIndex}
        onClose={closeProject}
        onNext={showNextProject}
        onPrev={showPrevProject}
        onSelectImage={setActiveImageIndex}
      />
    </>
  );
}
