export const portfolioData = {
  personal: {
    name: "Daksh Tyagi",
    title: "Full Stack Developer & Creative Engineer",
    tagline: "Building immersive digital experiences with code and creativity",
    bio: "I'm a passionate full-stack developer who loves creating beautiful, interactive web experiences. With expertise in modern web technologies and 3D graphics, I transform ideas into stunning digital realities. I specialize in React, Three.js, and creative coding, always pushing the boundaries of what's possible on the web.",
    email: "daksh.tyagi@example.com",
    location: "India",
    resumeUrl: "/resume.pdf",
    social: {
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername",
      twitter: "https://twitter.com/yourusername"
    }
  },

  skills: {
    frontend: [
      { name: "React", level: 95, category: "frontend" },
      { name: "JavaScript", level: 90, category: "frontend" },
      { name: "Three.js", level: 85, category: "frontend" },
      { name: "HTML/CSS", level: 95, category: "frontend" },
      { name: "Tailwind CSS", level: 90, category: "frontend" },
      { name: "GSAP", level: 85, category: "frontend" }
    ],
    backend: [
      { name: "Node.js", level: 85, category: "backend" },
      { name: "Express", level: 80, category: "backend" },
      { name: "MongoDB", level: 75, category: "backend" },
      { name: "REST APIs", level: 85, category: "backend" },
      { name: "GraphQL", level: 70, category: "backend" }
    ],
    tools: [
      { name: "Git", level: 90, category: "tools" },
      { name: "VS Code", level: 95, category: "tools" },
      { name: "Figma", level: 80, category: "tools" },
      { name: "Webpack", level: 75, category: "tools" },
      { name: "Docker", level: 70, category: "tools" }
    ]
  },

  projects: [
    {
      id: 1,
      title: "3D Portfolio Website",
      description: "An immersive portfolio experience built with React, Three.js, and GSAP. Features interactive 3D elements, smooth animations, and a modern design.",
      image: "/projects/portfolio.jpg",
      technologies: ["React", "Three.js", "GSAP", "Tailwind CSS"],
      github: "https://github.com/yourusername/portfolio",
      demo: "https://your-portfolio.vercel.app",
      featured: true
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with real-time inventory, payment integration, and an intuitive admin dashboard.",
      image: "/projects/ecommerce.jpg",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com/yourusername/ecommerce",
      demo: "https://your-ecommerce.vercel.app",
      featured: true
    },
    {
      id: 3,
      title: "AI Chat Application",
      description: "Real-time chat application with AI-powered responses, built using WebSockets and OpenAI API.",
      image: "/projects/chat.jpg",
      technologies: ["React", "Socket.io", "Node.js", "OpenAI"],
      github: "https://github.com/yourusername/ai-chat",
      demo: "https://your-chat.vercel.app",
      featured: true
    },
    {
      id: 4,
      title: "Task Management System",
      description: "Collaborative task management tool with drag-and-drop functionality, real-time updates, and team features.",
      image: "/projects/tasks.jpg",
      technologies: ["React", "Firebase", "Material-UI"],
      github: "https://github.com/yourusername/tasks",
      demo: "https://your-tasks.vercel.app",
      featured: false
    },
    {
      id: 5,
      title: "Weather Dashboard",
      description: "Beautiful weather application with real-time data, forecasts, and interactive maps.",
      image: "/projects/weather.jpg",
      technologies: ["React", "OpenWeather API", "Chart.js"],
      github: "https://github.com/yourusername/weather",
      demo: "https://your-weather.vercel.app",
      featured: false
    },
    {
      id: 6,
      title: "Social Media Platform",
      description: "A modern social network with posts, likes, comments, and real-time notifications.",
      image: "/projects/social.jpg",
      technologies: ["React", "Node.js", "PostgreSQL", "Redis"],
      github: "https://github.com/yourusername/social",
      demo: "https://your-social.vercel.app",
      featured: false
    }
  ],

  experience: [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Tech Innovators Inc.",
      location: "Remote",
      period: "2022 - Present",
      description: [
        "Led the development of multiple client-facing applications using React and Three.js",
        "Implemented complex 3D visualizations and animations, improving user engagement by 45%",
        "Mentored junior developers and established best practices for the frontend team",
        "Optimized application performance, reducing load times by 60%"
      ],
      technologies: ["React", "Three.js", "TypeScript", "GSAP", "Node.js"]
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "Digital Solutions Ltd.",
      location: "Hybrid",
      period: "2020 - 2022",
      description: [
        "Built and maintained full-stack web applications using MERN stack",
        "Developed RESTful APIs serving 10,000+ daily active users",
        "Integrated third-party services and payment gateways",
        "Collaborated with design team to implement pixel-perfect UI components"
      ],
      technologies: ["React", "Node.js", "MongoDB", "Express", "AWS"]
    },
    {
      id: 3,
      title: "Junior Web Developer",
      company: "Creative Agency Co.",
      location: "On-site",
      period: "2019 - 2020",
      description: [
        "Developed responsive websites for various clients using modern web technologies",
        "Created interactive animations and micro-interactions using GSAP",
        "Maintained and updated existing client websites",
        "Participated in code reviews and team discussions"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "jQuery", "WordPress"]
    }
  ],

  achievements: [
    {
      id: 1,
      title: "Best Innovation Award",
      description: "Won first place in college hackathon for innovative web application",
      year: "2023",
      icon: "trophy"
    },
    {
      id: 2,
      title: "Open Source Contributor",
      description: "Active contributor to popular React and Three.js libraries",
      year: "2022",
      icon: "code"
    },
    {
      id: 3,
      title: "Technical Speaker",
      description: "Delivered talks on modern web development at tech conferences",
      year: "2023",
      icon: "book"
    },
    {
      id: 4,
      title: "Certified Developer",
      description: "AWS Certified Developer - Associate",
      year: "2021",
      icon: "award"
    }
  ]
};