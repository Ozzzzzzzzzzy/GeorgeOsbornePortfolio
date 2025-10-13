// Fallback data (lorem ipsum - if you see this, the JSON loading failed)
const fallbackProjects = [
    {
        title: "Lorem Ipsum Project",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. This means the JSON file failed to load!",
        link: "",
        technologies: [
            { name: "Lorem", icon: "❌" },
            { name: "Ipsum", icon: "❌" },
            { name: "Failed", icon: "❌" }
        ]
    },
    {
        title: "Dolor Sit Amet", 
        description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. If you're seeing this, check your projects.json file!",
        link: "",
        technologies: [
            { name: "JSON", icon: "❌" },
            { name: "Loading", icon: "❌" },
            { name: "Failed", icon: "❌" }
        ]
    }
];

const skills = [
    { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "HTML/CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "Unity", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" },
    { name: "Unreal Engine", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg" },
    { name: "Visual Studio", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg" },
    { name: "Git/GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" }
];

// Variable to store loaded projects
let projects = fallbackProjects;

// Cursor trail variables
let cursorTrail = [];
const trailLength = 8;

// Function to load projects from JSON file
async function loadProjects() {
    try {
        console.log('Attempting to load projects.json...');
        const response = await fetch('./projects.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const loadedProjects = await response.json();
        console.log('Successfully loaded projects:', loadedProjects);
        
        if (Array.isArray(loadedProjects) && loadedProjects.length > 0) {
            projects = loadedProjects;
            console.log('Projects updated successfully');
        } else {
            console.warn('Loaded projects is not a valid array, using fallback');
            projects = fallbackProjects;
        }
    } catch (error) {
        console.error('Failed to load projects.json:', error);
        console.log('Using fallback lorem ipsum projects');
        projects = fallbackProjects;
    }
}

// Function to render projects
function renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    
    // Clear existing projects
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        // Add clickable functionality if link exists
        if (project.link && project.link.trim() !== '') {
            projectCard.classList.add('clickable');
            projectCard.setAttribute('data-link', project.link);
            projectCard.addEventListener('click', () => {
                window.open(project.link, '_blank');
            });
        }
        
        const techTags = project.technologies.map(tech => {
            const isImageIcon = tech.icon.startsWith('http');
            const iconContent = isImageIcon 
                ? `<img src="${tech.icon}" alt="${tech.name}" class="tech-icon" onerror="this.style.display='none'">` 
                : `<span class="tech-icon">${tech.icon}</span>`;
                
            return `<span class="tech-tag">
                ${iconContent}
                ${tech.name}
            </span>`;
        }).join('');
        
        // Remove the link indicator - just make the card clickable
        projectCard.innerHTML = `
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">${techTags}</div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
    
    console.log(`Rendered ${projects.length} projects`);
}

// Function to render skills in main section
function renderSkills() {
    const skillsGrid = document.getElementById('skills-grid');
    
    skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        
        const isImageIcon = skill.icon.startsWith('http');
        const iconContent = isImageIcon 
            ? `<img src="${skill.icon}" alt="${skill.name}" class="skill-icon" onerror="this.style.display='none'">` 
            : `<div class="skill-icon">${skill.icon}</div>`;
        
        skillItem.innerHTML = `
            ${iconContent}
            <span class="skill-name">${skill.name}</span>
        `;
        
        skillsGrid.appendChild(skillItem);
    });
}

// Cursor trail effect
function initCursorTrail() {
    // Create trail elements
    for (let i = 0; i < trailLength; i++) {
        const trailDot = document.createElement('div');
        trailDot.className = 'cursor-trail';
        trailDot.style.setProperty('--index', i);
        document.body.appendChild(trailDot);
        cursorTrail.push(trailDot);
    }
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        cursorTrail.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.left = e.clientX + 'px';
                dot.style.top = e.clientY + 'px';
            }, index * 20);
        });
    });
}

// Click ripple effect
function initClickEffect() {
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        
        document.body.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    });
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Check for saved theme preference or default to 'dark'
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize the portfolio
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Portfolio initializing...');
    
    // Load projects first, then render everything
    await loadProjects();
    
    renderProjects();
    renderSkills();
    initThemeToggle();
    initSmoothScroll();
    initCursorTrail();
    initClickEffect();
    
    console.log('Portfolio initialization complete');
});