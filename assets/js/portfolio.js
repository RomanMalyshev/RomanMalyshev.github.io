/**
 * Modern Portfolio Manager
 * Handles loading and rendering of portfolio data with localization support
 * Following the GamerDesign dark theme system
 */

class ModernPortfolioManager {
    constructor() {
        this.data = null;
        this.socialData = null; // Separate social data (same for all languages)
        this.currentLanguage = 'en'; // Default to English
        this.supportedLanguages = ['en', 'ru'];
        this.projectImages = [];
        this.currentImageIndex = 0;
        this.scrollPosition = 0; // Store scroll position when modal opens
        
        console.log('🚀 Initializing Modern Portfolio Manager...');
        this.init();
    }

    /**
     * Initialize the portfolio manager
     */
    async init() {
        try {
            // Show loading indicator
            this.showLoading();
            
            // Initialize language
            this.initializeLanguage();
            
            // Load portfolio data
            await this.loadData();
            
            // Initialize UI
            this.initializeUI();
            
            // Hide loading indicator
            this.hideLoading();
            
            console.log('✅ Portfolio initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize portfolio:', error);
            this.hideLoading();
        }
    }

    /**
     * Initialize language settings
     */
    initializeLanguage() {
        // Check URL parameter first
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        
        if (langParam && this.supportedLanguages.includes(langParam)) {
            this.currentLanguage = langParam;
            console.log(`🌐 Language set from URL: ${this.currentLanguage}`);
        } else {
            // Default to English
            this.currentLanguage = 'en';
            console.log(`🌐 Using default language: ${this.currentLanguage}`);
        }
    }

    /**
     * Load portfolio data for current language
     */
    async loadData() {
        try {
            const dataFile = this.currentLanguage === 'ru' ? 'data/portfolio_ru.json' : 'data/portfolio.json';
            console.log(`📂 Loading data from: ${dataFile}`);
            
            // Load portfolio data and social data in parallel
            const [portfolioResponse, socialResponse] = await Promise.all([
                fetch(dataFile),
                this.socialData ? Promise.resolve(null) : fetch('data/social.json')
            ]);
            
            if (!portfolioResponse.ok) {
                throw new Error(`Failed to load ${dataFile}: ${portfolioResponse.status}`);
            }
            
            this.data = await portfolioResponse.json();
            console.log(`✅ Successfully loaded ${this.currentLanguage} data`);
            
            // Load social data only once (it's the same for all languages)
            if (socialResponse && socialResponse.ok) {
                this.socialData = await socialResponse.json();
                console.log('✅ Successfully loaded social data');
            }
            
            // Initialize project images array
            this.projectImages = this.data.projects.map(project => {
                const ext = project.imageExtension || 'jpg';
                const thumbImage = project.imageThumb || project.image;
                const fullImage = project.imageFull || project.image;
                
                return {
                    full: `images/fulls/${fullImage}.${ext}`,
                    thumb: `images/thumbs/${thumbImage}.${ext}`,
                    title: project.title,
                    description: project.description
                };
            });
            
            console.log('📚 Project images initialized:', this.projectImages);
            
        } catch (error) {
            console.error('❌ Error loading data:', error);
            // Fallback to English if Russian fails
            if (this.currentLanguage === 'ru') {
                console.log('🔄 Falling back to English...');
                this.currentLanguage = 'en';
                return this.loadData();
            }
            throw error;
        }
    }

    /**
     * Initialize UI components and event listeners
     */
    initializeUI() {
        // Render all sections
        this.renderAllSections();
        
        // Initialize event listeners
        this.initializeEventListeners();
        
        // Initialize image modal
        this.initializeImageModal();
        
        // Initialize mobile navigation
        this.initializeMobileNav();
    }

    /**
     * Render all portfolio sections
     */
    renderAllSections() {
        this.renderHeroSection();
        this.renderSocialLinks();
        this.renderAboutSection();
        this.renderProjectsSection();
        this.renderJamsSection();
        this.renderPrototypesSection();
        this.renderExperienceSection();
        this.renderSkillsSection();
        this.renderEducationSection();
    }

    /**
     * Render hero section
     */
    renderHeroSection() {
        const heroName = document.getElementById('hero-name');
        const heroTitle = document.getElementById('hero-title');
        const heroLocation = document.getElementById('hero-location');
        const navTitle = document.getElementById('nav-title');
        
        if (heroName) heroName.textContent = this.data.intro.name;
        if (heroTitle) heroTitle.textContent = this.data.intro.title;
        if (heroLocation) heroLocation.textContent = this.data.intro.location;
        
        // Update navigation title
        if (navTitle) {
            const portfolioText = this.currentLanguage === 'ru' ? 'Портфолио' : 'Portfolio';
            navTitle.textContent = `${this.data.intro.name} - ${portfolioText}`;
        }
        
        // Update page title
        document.title = this.data.meta.title;
    }

    /**
     * Render social links
     */
    renderSocialLinks() {
        const contactTitle = document.getElementById('contact-title');
        const socialContainer = document.getElementById('social-links');
        
        if (contactTitle) {
            contactTitle.textContent = this.currentLanguage === 'ru' ? 'Контакты' : 'Contact';
        }
        
        if (!socialContainer || !this.socialData?.social) return;
        
        const socialHTML = this.socialData.social.map(social => {
            // Support language-specific URLs (e.g., for CV)
            const url = social.urls?.[this.currentLanguage] || social.url;
            return `
            <a href="${url}" target="_blank" rel="noopener noreferrer" class="social-link">
                <div class="social-icon">${this.getSocialIcon(social.icon)}</div>
                <div class="social-name">${social.name}</div>
            </a>
        `;
        }).join('');
        
        socialContainer.innerHTML = socialHTML;
    }

    /**
     * Get social media icon
     */
    getSocialIcon(iconName) {
        const icons = {
            'fa-linkedin': '<i class="fab fa-linkedin"></i>',
            'fa-github': '<i class="fab fa-github"></i>',
            'fa-gamepad': '<i class="fas fa-gamepad"></i>',
            'fa-app-store': '<i class="fab fa-app-store"></i>',
            'fa-google-play': '<i class="fab fa-google-play"></i>',
            'fa-itch-io': '<i class="fab fa-itch-io"></i>',
            'fa-file-code': '<i class="fas fa-file-code"></i>',
            'fa-envelope': '<i class="fas fa-envelope"></i>',
            'fa-file-pdf': '<i class="fas fa-file-alt"></i>'
        };
        return icons[iconName] || '<i class="fas fa-link"></i>';
    }

    /**
     * Render about section
     */
    renderAboutSection() {
        const aboutTitle = document.getElementById('about-title');
        const aboutContent = document.getElementById('about-content');
        
        if (aboutTitle) aboutTitle.textContent = this.data.about.title;
        if (aboutContent) {
            // Convert newlines to <br> tags for proper formatting
            const formattedContent = this.data.about.content
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/\n/g, '<br>');
            aboutContent.innerHTML = formattedContent;
        }
    }

    /**
     * Render projects section
     */
    renderProjectsSection() {
        const projectsTitle = document.getElementById('projects-title');
        const projectsGrid = document.getElementById('projects-grid');
        
        if (projectsTitle) {
            projectsTitle.textContent = this.currentLanguage === 'ru' ? 'Портфолио игр' : 'Games Portfolio';
        }
        
        if (!projectsGrid) return;
        
        const projectsHTML = this.data.projects.map((project, index) => {
            const ext = project.imageExtension || 'jpg';
            const thumbImage = project.imageThumb || project.image;
            const featuredClass = project.featured ? ' featured' : '';
            
            const contributionLabel = this.currentLanguage === 'ru' ? 'мой вклад:' : 'my contribution:';
            
            return `
                <div class="project-card${featuredClass}">
                    <img 
                        src="images/thumbs/${thumbImage}.${ext}" 
                        alt="${project.title}"
                        class="project-image"
                        data-index="${index}"
                    >
                    <div class="project-content">
                        <div class="project-header">
                            <h3 class="project-title">${project.title}</h3>
                            ${project.genre ? `<span class="project-genre">${project.genre}</span>` : ''}
                        </div>
                        ${project.role ? `<div class="project-role">${project.role}</div>` : ''}
                        ${project.techTags && project.techTags.length > 0 ? `
                            <div class="project-tech-tags">
                                ${project.techTags.map(tag => `<span class="tech-tag">[${tag}]</span>`).join('')}
                            </div>
                        ` : ''}
                        <p class="project-description">${project.description}</p>
                        ${project.contribution && (Array.isArray(project.contribution) ? project.contribution.length > 0 : project.contribution) ? `
                            <div class="project-contribution">
                                <span class="contribution-label">${contributionLabel}</span>
                                ${Array.isArray(project.contribution) ? `
                                    <ul class="contribution-list">
                                        ${project.contribution.map(item => `<li>${item}</li>`).join('')}
                                    </ul>
                                ` : `<p class="contribution-text">${project.contribution}</p>`}
                            </div>
                        ` : ''}
                        <div class="project-links">
                            ${project.links.map(link => `
                                <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="project-link">
                                    <span class="project-link-icon">${this.getLinkIcon(link.icon || link.text)}</span>
                                    <span>${link.text}</span>
                                </a>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        projectsGrid.innerHTML = projectsHTML;
    }

    /**
     * Render jams section
     */
    renderJamsSection() {
        const jamsTitle = document.getElementById('jams-title');
        const jamsGrid = document.getElementById('jams-grid');
        
        if (jamsTitle) {
            jamsTitle.textContent = this.currentLanguage === 'ru' ? 'Джемы' : 'Jams';
        }
        
        if (!jamsGrid || !this.data.jams) return;
        
        const contributionLabel = this.currentLanguage === 'ru' ? 'мой вклад:' : 'my contribution:';
        
        const jamsHTML = this.data.jams.map((jam) => {
            const ext = jam.imageExtension || 'png';
            const thumbImage = jam.imageThumb || jam.image;
            
            return `
                <div class="jam-card">
                    <img 
                        src="images/thumbs/${thumbImage}.${ext}" 
                        alt="${jam.title}"
                        class="jam-image"
                    >
                    <div class="jam-content">
                        <div class="jam-header">
                            <h3 class="jam-title">${jam.title}</h3>
                            ${jam.genre ? `<span class="jam-genre">${jam.genre}</span>` : ''}
                        </div>
                        ${jam.event ? `<div class="jam-event">${jam.event}</div>` : ''}
                        ${jam.techTags && jam.techTags.length > 0 ? `
                            <div class="jam-tech-tags">
                                ${jam.techTags.map(tag => `<span class="tech-tag">[${tag}]</span>`).join('')}
                            </div>
                        ` : ''}
                        <p class="jam-description">${jam.description}</p>
                        ${jam.contribution && (Array.isArray(jam.contribution) ? jam.contribution.length > 0 : jam.contribution) ? `
                            <div class="jam-contribution">
                                <span class="contribution-label">${contributionLabel}</span>
                                ${Array.isArray(jam.contribution) ? `
                                    <ul class="contribution-list">
                                        ${jam.contribution.map(item => `<li>${item}</li>`).join('')}
                                    </ul>
                                ` : `<p class="contribution-text">${jam.contribution}</p>`}
                            </div>
                        ` : ''}
                        <div class="jam-links">
                            ${jam.links.map(link => `
                                <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="project-link">
                                    <span class="project-link-icon">${this.getLinkIcon(link.icon || link.text)}</span>
                                    <span>${link.text}</span>
                                </a>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        jamsGrid.innerHTML = jamsHTML;
    }

    /**
     * Render prototypes section
     */
    renderPrototypesSection() {
        const prototypesTitle = document.getElementById('prototypes-title');
        const prototypesGrid = document.getElementById('prototypes-grid');
        
        if (prototypesTitle) {
            prototypesTitle.textContent = this.currentLanguage === 'ru' ? 'Прототипы' : 'Prototypes';
        }
        
        if (!prototypesGrid || !this.data.prototypes) return;
        
        // Hide section if no prototypes
        const prototypesSection = document.getElementById('prototypes');
        if (this.data.prototypes.length === 0) {
            if (prototypesSection) prototypesSection.style.display = 'none';
            return;
        } else {
            if (prototypesSection) prototypesSection.style.display = '';
        }
        
        const contributionLabel = this.currentLanguage === 'ru' ? 'мой вклад:' : 'my contribution:';
        
        const prototypesHTML = this.data.prototypes.map((prototype) => {
            const hasImage = prototype.image || prototype.imageThumb;
            const ext = prototype.imageExtension || 'png';
            const thumbImage = prototype.imageThumb || prototype.image;
            
            return `
                <div class="prototype-card ${hasImage ? '' : 'no-image'}">
                    ${hasImage ? `
                        <img 
                            src="images/thumbs/${thumbImage}.${ext}" 
                            alt="${prototype.title}"
                            class="prototype-image"
                        >
                    ` : ''}
                    <div class="prototype-content">
                        <div class="prototype-header">
                            <h3 class="prototype-title">${prototype.title}</h3>
                            ${prototype.genre ? `<span class="prototype-genre">${prototype.genre}</span>` : ''}
                        </div>
                        ${prototype.status ? `<div class="prototype-status">${prototype.status}</div>` : ''}
                        ${prototype.techTags && prototype.techTags.length > 0 ? `
                            <div class="prototype-tech-tags">
                                ${prototype.techTags.map(tag => `<span class="tech-tag">[${tag}]</span>`).join('')}
                            </div>
                        ` : ''}
                        <p class="prototype-description">${prototype.description}</p>
                        ${prototype.contribution && (Array.isArray(prototype.contribution) ? prototype.contribution.length > 0 : prototype.contribution) ? `
                            <div class="prototype-contribution">
                                <span class="contribution-label">${contributionLabel}</span>
                                ${Array.isArray(prototype.contribution) ? `
                                    <ul class="contribution-list">
                                        ${prototype.contribution.map(item => `<li>${item}</li>`).join('')}
                                    </ul>
                                ` : `<p class="contribution-text">${prototype.contribution}</p>`}
                            </div>
                        ` : ''}
                        ${prototype.links && prototype.links.length > 0 ? `
                            <div class="prototype-links">
                                ${prototype.links.map(link => `
                                    <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="project-link">
                                        <span class="project-link-icon">${this.getLinkIcon(link.icon || link.text)}</span>
                                        <span>${link.text}</span>
                                    </a>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
        
        prototypesGrid.innerHTML = prototypesHTML;
    }

    /**
     * Get link icon based on type
     */
    getLinkIcon(iconType) {
        const iconName = iconType.toLowerCase();
        
        const icons = {
            'steam': '<i class="fab fa-steam"></i>',
            'youtube': '<i class="fab fa-youtube"></i>',
            'globe': '<i class="fas fa-globe"></i>',
            'website': '<i class="fas fa-globe"></i>',
            'официальный сайт': '<i class="fas fa-globe"></i>',
            'official site': '<i class="fas fa-globe"></i>',
            'official website': '<i class="fas fa-globe"></i>',
            'github': '<i class="fab fa-github"></i>',
            'play store': '<i class="fab fa-google-play"></i>',
            'google play': '<i class="fab fa-google-play"></i>',
            'google-play': '<i class="fab fa-google-play"></i>',
            'app store': '<i class="fab fa-apple"></i>',
            'apple': '<i class="fab fa-apple"></i>',
            'itch.io': '<i class="fab fa-itch-io"></i>',
            'discord': '<i class="fab fa-discord"></i>'
        };
        
        return icons[iconName] || '<i class="fas fa-external-link-alt"></i>';
    }

    /**
     * Render experience section
     */
    renderExperienceSection() {
        const experienceTitle = document.getElementById('experience-title');
        const experienceList = document.getElementById('experience-list');
        
        if (experienceTitle) {
            experienceTitle.textContent = this.currentLanguage === 'ru' ? 'Опыт работы' : 'Experience';
        }
        
        if (!experienceList || !this.data.experience) return;
        
        const experienceHTML = this.data.experience.map(exp => `
            <div class="experience-item">
                <div class="experience-header">
                    <div class="experience-company">
                        ${exp.url ? `<a href="${exp.url}" target="_blank" rel="noopener noreferrer">${exp.company}</a>` : exp.company}
                    </div>
                    <div class="experience-title">${exp.title}</div>
                    <div class="experience-meta">
                        <span class="experience-period">${exp.period}</span>
                        ${exp.location ? `<span class="experience-location">${exp.location}</span>` : ''}
                    </div>
                </div>
                <div class="experience-description">${exp.description}</div>
                ${exp.achievements && exp.achievements.length > 0 ? `
                    <ul class="experience-achievements">
                        ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>
        `).join('');
        
        experienceList.innerHTML = experienceHTML;
    }

    /**
     * Render skills section
     */
    renderSkillsSection() {
        const skillsTitle = document.getElementById('skills-title');
        const skillsGrid = document.getElementById('skills-grid');
        
        if (skillsTitle) {
            skillsTitle.textContent = this.currentLanguage === 'ru' ? 'Навыки' : 'Skills';
        }
        
        if (!skillsGrid || !this.data.skills) return;
        
        const skillsHTML = this.data.skills.map(skill => {
            const category = skill.category || this.getSkillCategory(skill.name);
            return `
                <div class="skill-item" data-category="${category}">
                    <div class="skill-name">${skill.name}</div>
                </div>
            `;
        }).join('');
        
        skillsGrid.innerHTML = skillsHTML;
    }
    
    /**
     * Get skill category based on skill name
     */
    getSkillCategory(skillName) {
        const categories = {
            // Engine/Core
            'Unity': 'engine',
            'Unreal Engine': 'engine',
            'C#': 'engine',
            'C++': 'engine',
            'DOTS': 'engine',
            'ECS': 'engine',
            'ECS (Entities)': 'engine',
            'Addressables': 'engine',
            
            // Async/Reactive
            'UniTask': 'async',
            'R3 (UniRx)': 'async',
            'Extenject': 'async',
            'Zenject': 'async',
            
            // Architecture
            'MVC/MVP/MVVM': 'architecture',
            'CPU/GPU/RAM optimisation': 'architecture',
            'AI-Enhanced Workflow Cursor + MCP': 'architecture',
            
            // Network
            'TypeScript': 'network',
            'Multiplayer': 'network',
            'Client Networking': 'network',
            'Netcode optimisation': 'network',
            'Networking': 'network',
            'Firebase': 'network',
            
            // Tools/DevOps
            'CI/CD': 'tools',
            'Git': 'tools',
            'JavaScript': 'tools',
            'Python': 'tools'
        };
        
        return categories[skillName] || 'engine';
    }

    /**
     * Get skill icon
     */
    getSkillIcon(skillName) {
        const icons = {
            'Unity': '🎮',
            'Unreal Engine': '🚀',
            'C#': '💻',
            'C++': '⚡',
            'JavaScript': '🌐',
            'Python': '🐍',
            'Git': '📦',
            'Firebase': '🔥',
            'Networking': '🌐',
            'AI': '🤖',
            'Mobile': '📱',
            'PC': '🖥️',
            'Console': '🎮'
        };
        return icons[skillName] || '⚙️';
    }

    /**
     * Render education section
     */
    renderEducationSection() {
        const educationTitle = document.getElementById('education-title');
        const educationList = document.getElementById('education-list');
        
        if (educationTitle) {
            educationTitle.textContent = this.currentLanguage === 'ru' ? 'Образование' : 'Education';
        }
        
        if (!educationList || !this.data.education) return;
        
        const educationHTML = this.data.education.map(edu => `
            <div class="education-item">
                <div class="education-school">
                    ${edu.url ? `<a href="${edu.url}" target="_blank" rel="noopener noreferrer">${edu.institution}</a>` : edu.institution}
                </div>
                <div class="education-degree">${edu.degree}</div>
                <div class="education-meta">
                    <span class="education-period">${edu.period}</span>
                    ${edu.location ? `<span class="education-location">${edu.location}</span>` : ''}
                </div>
            </div>
        `).join('');
        
        educationList.innerHTML = educationHTML;
    }

    /**
     * Initialize event listeners
     */
    initializeEventListeners() {
        // Language toggle
        const languageToggle = document.getElementById('language-toggle');
        if (languageToggle) {
            languageToggle.addEventListener('click', () => this.toggleLanguage());
        }
        
        // Project image clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('project-image')) {
                const index = parseInt(e.target.dataset.index);
                console.log(`🖼️ Opening image modal for project ${index}:`, this.projectImages[index]);
                this.openImageModal(index);
            }
        });
        
        // Smooth scroll for internal links
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(e.target.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    /**
     * Initialize image modal
     */
    initializeImageModal() {
        const modal = document.getElementById('image-modal');
        const modalOverlay = document.getElementById('modal-overlay');
        const modalClose = document.getElementById('modal-close');
        const modalPrev = document.getElementById('modal-prev');
        const modalNext = document.getElementById('modal-next');
        
        if (modalOverlay) {
            modalOverlay.addEventListener('click', () => this.closeImageModal());
        }
        
        if (modalClose) {
            modalClose.addEventListener('click', () => this.closeImageModal());
        }
        
        if (modalPrev) {
            modalPrev.addEventListener('click', () => this.previousImage());
        }
        
        if (modalNext) {
            modalNext.addEventListener('click', () => this.nextImage());
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (modal?.classList.contains('active')) {
                switch (e.key) {
                    case 'Escape':
                        this.closeImageModal();
                        break;
                    case 'ArrowLeft':
                        this.previousImage();
                        break;
                    case 'ArrowRight':
                        this.nextImage();
                        break;
                }
            }
        });
    }

    /**
     * Open image modal
     */
    openImageModal(index) {
        const modal = document.getElementById('image-modal');
        const modalImage = document.getElementById('modal-image');
        
        if (!modal || !modalImage) {
            console.error('❌ Modal elements not found');
            return;
        }
        
        this.currentImageIndex = index;
        const image = this.projectImages[index];
        
        console.log(`📸 Loading full image: ${image.full}`);
        
        // Show loading state
        modalImage.style.opacity = '0';
        
        // Load image
        const img = new Image();
        img.onload = () => {
            console.log('✅ Image loaded successfully');
            modalImage.src = img.src;
            modalImage.alt = image.title;
            modalImage.style.opacity = '1';
        };
        img.onerror = () => {
            console.error(`❌ Failed to load image: ${image.full}`);
        };
        img.src = image.full;
        
        modal.classList.add('active');
        
        // Save current scroll position
        this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        // Prevent page scrolling on mobile and maintain scroll position
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${this.scrollPosition}px`;
        document.body.style.width = '100%';
    }

    /**
     * Close image modal
     */
    closeImageModal() {
        const modal = document.getElementById('image-modal');
        if (modal) {
            modal.classList.remove('active');
            
            // Save scroll position before removing fixed positioning
            const scrollY = this.scrollPosition;
            
            // Restore body styles
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            
            // Restore scroll position instantly without animation
            window.scrollTo({
                top: scrollY,
                left: 0,
                behavior: 'instant'
            });
        }
    }

    /**
     * Navigate to previous image
     */
    previousImage() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.projectImages.length) % this.projectImages.length;
        this.updateModalImage();
    }

    /**
     * Navigate to next image
     */
    nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.projectImages.length;
        this.updateModalImage();
    }

    /**
     * Update modal image
     */
    updateModalImage() {
        const modalImage = document.getElementById('modal-image');
        if (modalImage) {
            const image = this.projectImages[this.currentImageIndex];
            
            // Smooth loading transition
            modalImage.style.opacity = '0.5';
            
            const img = new Image();
            img.onload = () => {
                modalImage.src = img.src;
                modalImage.alt = image.title;
                modalImage.style.opacity = '1';
            };
            img.src = image.full;
        }
    }

    /**
     * Toggle language
     */
    async toggleLanguage() {
        const newLanguage = this.currentLanguage === 'en' ? 'ru' : 'en';
        
        try {
            this.showLoading();
            
            // Update URL without refreshing page
            const url = new URL(window.location);
            url.searchParams.set('lang', newLanguage);
            window.history.pushState({}, '', url);
            
            // Update current language
            this.currentLanguage = newLanguage;
            
            // Reload data and re-render
            await this.loadData();
            this.renderAllSections();
            
            // Update mobile nav labels
            this.updateMobileNavLabels();
            
            this.hideLoading();
            
            console.log(`🌐 Language switched to: ${newLanguage}`);
        } catch (error) {
            console.error('❌ Failed to switch language:', error);
            this.hideLoading();
        }
    }

    /**
     * Show loading indicator
     */
    showLoading() {
        const loadingIndicator = document.getElementById('loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.classList.add('active');
        }
    }

    /**
     * Hide loading indicator
     */
    hideLoading() {
        const loadingIndicator = document.getElementById('loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.classList.remove('active');
        }
    }

    /**
     * Initialize mobile navigation
     */
    initializeMobileNav() {
        const menuToggle = document.getElementById('menu-toggle');
        const mobileNav = document.getElementById('mobile-nav');
        const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
        const mobileNavClose = document.getElementById('mobile-nav-close');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        
        // Update nav labels based on language
        this.updateMobileNavLabels();
        
        // Open menu
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('active');
                mobileNav?.classList.toggle('active');
                document.body.style.overflow = mobileNav?.classList.contains('active') ? 'hidden' : '';
            });
        }
        
        // Close menu on overlay click
        if (mobileNavOverlay) {
            mobileNavOverlay.addEventListener('click', () => {
                this.closeMobileNav();
            });
        }
        
        // Close menu on close button click
        if (mobileNavClose) {
            mobileNavClose.addEventListener('click', () => {
                this.closeMobileNav();
            });
        }
        
        // Close menu and scroll to section on link click
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                this.closeMobileNav();
                
                // Wait for menu animation to complete, then scroll
                // Using requestAnimationFrame to ensure layout is stable
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        if (targetSection) {
                            // Use scrollIntoView which works better with CSS scroll-behavior
                            targetSection.scrollIntoView();
                        }
                    });
                }, 350);
            });
        });
        
        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileNav?.classList.contains('active')) {
                this.closeMobileNav();
            }
        });
    }

    /**
     * Close mobile navigation
     */
    closeMobileNav() {
        const menuToggle = document.getElementById('menu-toggle');
        const mobileNav = document.getElementById('mobile-nav');
        
        menuToggle?.classList.remove('active');
        mobileNav?.classList.remove('active');
        document.body.style.overflow = '';
    }

    /**
     * Update mobile navigation labels based on language
     */
    updateMobileNavLabels() {
        const labels = {
            en: {
                navTitle: 'Navigation',
                about: 'About',
                projects: 'Projects',
                jams: 'Jams',
                prototypes: 'Prototypes',
                experience: 'Experience',
                skills: 'Skills',
                education: 'Education',
                contact: 'Contact'
            },
            ru: {
                navTitle: 'Навигация',
                about: 'Обо мне',
                projects: 'Проекты',
                jams: 'Джемы',
                prototypes: 'Прототипы',
                experience: 'Опыт',
                skills: 'Навыки',
                education: 'Образование',
                contact: 'Контакты'
            }
        };
        
        const lang = this.currentLanguage;
        const currentLabels = labels[lang] || labels.en;
        
        // Update navigation title
        const navTitle = document.getElementById('mobile-nav-title');
        if (navTitle) navTitle.textContent = currentLabels.navTitle;
        
        // Update navigation links
        const navAbout = document.getElementById('nav-about');
        const navProjects = document.getElementById('nav-projects');
        const navJams = document.getElementById('nav-jams');
        const navPrototypes = document.getElementById('nav-prototypes');
        const navExperience = document.getElementById('nav-experience');
        const navSkills = document.getElementById('nav-skills');
        const navEducation = document.getElementById('nav-education');
        const navContact = document.getElementById('nav-contact');
        
        if (navAbout) navAbout.textContent = currentLabels.about;
        if (navProjects) navProjects.textContent = currentLabels.projects;
        if (navJams) navJams.textContent = currentLabels.jams;
        if (navPrototypes) navPrototypes.textContent = currentLabels.prototypes;
        if (navExperience) navExperience.textContent = currentLabels.experience;
        if (navSkills) navSkills.textContent = currentLabels.skills;
        if (navEducation) navEducation.textContent = currentLabels.education;
        if (navContact) navContact.textContent = currentLabels.contact;
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioManager = new ModernPortfolioManager();
});

// Handle page visibility for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('📱 Page hidden - pausing animations');
        // Pause any heavy animations or processes
    } else {
        console.log('📱 Page visible - resuming animations');
        // Resume animations or refresh data if needed
    }
});

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('🌐 Back online');
    // Could refresh data or show notification
});

window.addEventListener('offline', () => {
    console.log('📴 Gone offline');
    // Could show offline notification
});

// Add touch gesture support for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    const modal = document.getElementById('image-modal');
    if (!modal?.classList.contains('active')) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Horizontal swipe detection
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
            // Swipe right - previous image
            const portfolioManager = window.portfolioManager;
            if (portfolioManager) portfolioManager.previousImage();
        } else {
            // Swipe left - next image
            const portfolioManager = window.portfolioManager;
            if (portfolioManager) portfolioManager.nextImage();
        }
    }
});

// Performance monitoring
const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
            console.log(`⚡ Page loaded in ${entry.loadEventEnd - entry.loadEventStart}ms`);
        }
    }
});

observer.observe({ entryTypes: ['navigation'] }); 