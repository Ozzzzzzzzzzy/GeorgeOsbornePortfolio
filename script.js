// Configuration files for easy updates
const projects = [
    {
        title: "Example Game Project 1",
        description: "A brief description of your game project. Explain what it does, what makes it interesting, and your role in development.",
        technologies: [
            { name: "Unity", icon: "🎮" },
            { name: "C#", icon: "💻" },
            { name: "Visual Studio", icon: "🔧" }
        ]
    },
    {
        title: "Example Game Project 2", 
        description: "Another game project description. Focus on the technical challenges you solved and what you learned.",
        technologies: [
            { name: "Unreal Engine", icon: "🎮" },
            { name: "C++", icon: "💻" },
            { name: "Blueprint", icon: "🔗" }
        ]
    }
    // Add more projects here
];

const skills = [
    { name: "Unity", icon: "🎮" },
    { name: "C#", icon: "💻" },
    { name: "C++", icon: "🔧" },
    { name: "Visual Studio", icon: "🛠️" },
    { name: "Git", icon: "📚" },
    { name: "JavaScript", icon: "🌐" }
    // Add more skills here
];

// Function to render projects
function renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        const techTags = project.technologies.map(tech => 
            `<span class="tech-tag">
                <span class="tech-icon">${tech.icon}</span>
                ${tech.name}
            </span>`
        ).join('');
        
        projectCard.innerHTML = `
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">${techTags}</div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Function to render skills
function renderSkills() {
    const skillsGrid = document.getElementById('skills-grid');
    
    skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        
        skillItem.innerHTML = `
            <div class="skill-icon">${skill.icon}</div>
            <span class="skill-name">${skill.name}</span>
        `;
        
        skillsGrid.appendChild(skillItem);
    });
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
document.addEventListener('DOMContentLoaded', function() {
    renderProjects();
    renderSkills();
    initSmoothScroll();
});