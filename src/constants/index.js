export const navLinks = [
    { id: "home", name: "Home", href: "#home" },
    { id: "about", name: "About", href: "#about" },
    { id: "work", name: "Work", href: "#work" },
    { id: "contact", name: "Contact", href: "#contact" }
];

export const professionalRecommendations = [
    {
        id: 1,
        name: 'Peter Westley',
        position: 'Engineering Manager at Advatek Lighting',
        img: 'assets/review1.jpg',
        review:
            'Mark\'s technical acumen, collaborative approach, and problem-solving mindset made him an invaluable asset to our team at Advatek Lighting.',
    },
    {
        id: 2,
        name: 'Brandon Gobey',
        position: 'Senior Designer (formerly at DNEG)',
        img: 'assets/review2.png',
        review:
            'I can absolutely vouch for Mark\'s excellent work and great character/work ethic. Always eager to learn and implement cutting-edge techniques and software to better the team around him.',
    },
    {
        id: 3,
        name: 'Yuyi Zhao',
        position: 'Portfolio Specialist at IDEA (formerly at CPG Corporation)  ',
        img: 'assets/review3.jpg',
        review:
            'During his two-month internship at Futurepolis, Mark demonstrated an exceptional ability to integrate academic knowledge with real-world projects. His innovative ideas, strong teamwork, and willingness to extend his internship showcased his dedication and significantly advanced our projects.',
    },
    {
        id: 4,
        name: 'Coming soon',
        position: 'CEO of Something',
        img: 'assets/review20.png',
        review:
            'Coming soon.',
    },
];

export const myProjects = [
    {
        title: 'EASiMAC: Full-Stack Cloud Manufacturing Traceability System',
        desc: 'Engineered a sophisticated web-based platform that streamlines electronic manufacturing traceability through comprehensive serial number management, MAC address coordination, and test result capture. Built on a modern microservices architecture, EASiMAC delivers real-time production tracking with robust security protocols and seamless API integration capabilities.',
        subdesc:
            'Implemented a hybrid front-end using Vue.js as the primary framework with select React components for specialized functionality\n' +
            'Developed a Flask-based RESTful API using OpenAPI specification with Connexion middleware for request validation and routing\n' +
            'Architected a modular backend with dedicated handlers and utility functions for business logic separation\n' +
            'Designed SQLAlchemy ORM models for efficient database interactions with MySQL on Amazon RDS\n' +
            'Created comprehensive test suites using pytest with fixtures, mocking, and parameterized testing for unit and integration testing\n' +
            'Deployed containerized application components on Amazon Lightsail with CI/CD pipelines\n' +
            'Collaborated with cross-functional development teams to implement secure API endpoints with advanced authorization mechanisms',
        href: 'https://drive.google.com/file/d/1NjMsJNw-8Jn-8uMPRM6BRnN9EmS-9dad/view?usp=sharing',
        texture: '/textures/project/project1.mp4',
        logo: '/assets/project-logo1.png',
        logoStyle: {
            backgroundColor: '#2A1816',
            border: '0.2px solid #36201D',
            boxShadow: '0px 0px 60px 0px #AA3C304D',
        },
        spotlight: '/assets/spotlight1.png',
        tags: [
            {
                id: 1,
                name: 'Vue.js',
                path: '/assets/vue.svg',
            },
            {
                id: 2,
                name: 'React',
                path: 'assets/react.svg',
            },
            {
                id: 3,
                name: 'Flask',
                path: 'assets/flask.svg',
            },
            {
                id: 4,
                name: 'SQLAlchemy',
                path: '/assets/sqlalchemy.svg',
            },
            {
                id: 5,
                name: 'MySQL',
                path: '/assets/mysql.svg',
            },
            {
                id: 6,
                name: 'AWS',
                path: '/assets/aws.svg',
            },
            {
                id: 7,
                name: 'OpenAPI',
                path: '/assets/openapi.svg',
            },
            {
                id: 8,
                name: 'Swagger',
                path: '/assets/swagger.svg',
            },
        ],
    },
    {
        title: 'DACS: Blockchain Attestation Platform with KYC Integration',
        desc: 'Developed a comprehensive crypto attestation platform that enables secure digital asset verification with integrated Know Your Customer (KYC) compliance. This full-stack application streamlines the attestation process while maintaining regulatory requirements through a seamless user experience with enterprise-grade security features.',
        subdesc:
            'Engineered a responsive front-end using React, TypeScript, and Tailwind CSS with AWS Amplify Gen2\n' +
            'Implemented secure cryptocurrency wallet integration with MetaMask and Ledger hardware wallets\n' +
            'Integrated Stripe API for seamless payment processing and subscription management\n' +
            'Built robust backend services using AWS Cognito for authentication, DynamoDB for data persistence, and S3 for document storage\n' +
            'Created a comprehensive admin dashboard for efficient KYC management and compliance monitoring\n' +
            'Achieved 100% Jest test coverage through rigorous unit and integration testing methodologies\n' +
            'Delivered detailed technical documentation for all system components in Confluence',
        href: 'https://drive.google.com/file/d/1CZVzPEzjobz32Z99wlGfDHxudP32rFpr/view?usp=sharing',
        texture: '/textures/project/project2.mp4',
        logo: '/assets/project-logo2.png',
        logoStyle: {
            backgroundColor: '#13202F',
            border: '0.2px solid #17293E',
            boxShadow: '0px 0px 60px 0px #2F6DB54D',
        },
        spotlight: '/assets/spotlight2.png',
        tags: [
            {
                id: 1,
                name: 'React',
                path: '/assets/react.svg',
            },
            {
                id: 2,
                name: 'TypeScript',
                path: '/assets/typescript.png',
            },
            {
                id: 3,
                name: 'AWS Amplify',
                path: '/assets/aws.svg',
            },
            {
                id: 4,
                name: 'TailwindCSS',
                path: '/assets/tailwindcss.png',
            },
            {
                id: 5,
                name: 'Jest',
                path: '/assets/jest.svg',
            },
            {
                id: 6,
                name: 'Stripe',
                path: '/assets/stripe.svg',
            },
        ],
    },
    {
        title: 'StudyRacer: Award-Winning Gamified Homework Management Platform',
        desc: 'Designed and developed an innovative web application that transforms academic task management into an engaging competitive experience. This 3rd Prize-winning hackathon project combines gamification elements with productivity tools to help students improve time management and academic performance through friendly competition and immediate feedback.',
        subdesc:
            'Built a responsive, interactive frontend using Next.js, TypeScript, and Tailwind CSS in just 30 hours\n' +
            'Implemented a comprehensive gamification system with leaderboards, badges, and visual rewards to drive student engagement\n' +
            'Integrated OpenAI GPT-4o for intelligent task verification, ensuring completed work meets academic standards\n' +
            'Created a streamlined Git workflow to resolve team collaboration challenges and accelerate development\n' +
            'Designed and developed RESTful API endpoints for efficient data management using Next.js server components\n' +
            'Structured a SQLite database system to track user progress, task completion, and competitive metrics\n' +
            'Onboarded team members to Next.js framework, enhancing collective productivity during the time-constrained hackathon',
        href: 'https://www.youtube.com/watch?v=_Bulh_exZsA',
        texture: '/textures/project/project4.mp4',
        logo: '/assets/project-logo4.png',
        logoStyle: {
            backgroundColor: '#0E1F38',
            border: '0.2px solid #0E2D58',
            boxShadow: '0px 0px 60px 0px #2F67B64D',
        },
        spotlight: '/assets/spotlight4.png',
        tags: [
            {
                id: 1,
                name: 'Next.js',
                path: '/assets/next.svg',
            },
            {
                id: 2,
                name: 'TypeScript',
                path: '/assets/typescript.png',
            },
            {
                id: 3,
                name: 'Tailwind CSS',
                path: '/assets/tailwindcss.png',
            },
            {
                id: 4,
                name: 'OpenAI',
                path: '/assets/openai.svg',
            },
            {
                id: 5,
                name: 'Hackathon',
                path: '/assets/third.svg',
            },
        ],
    },
    {
        title: 'Massimo\'s Bakery: Mobile Group Ordering App (GUXD Capstone)',
        desc: 'Designed and prototyped a user-focused mobile application that streamlines workplace food ordering for busy professionals. Through comprehensive user research and iterative design, the Massimo\'s Bakery app achieved a 25% improvement in user satisfaction by addressing key pain points of time-constrained workers seeking high-quality food options without waiting in lines.',
        subdesc:
            'Conducted in-depth user interviews and created empathy maps to identify core needs of busy professionals\n' +
            'Developed detailed user personas and journey maps to guide the design process\n' +
            'Created paper wireframes and digital low-fidelity prototypes to test initial concepts\n' +
            'Designed high-fidelity prototypes in Figma with a focus on intuitive group ordering functionality\n' +
            'Implemented accessibility features to ensure the app was usable by all potential customers\n' +
            'Conducted multiple rounds of usability testing and incorporated feedback through iterative design\n' +
            'Presented final designs with measurable improvements in user satisfaction metrics',
        href: 'https://docs.google.com/presentation/d/1YxHMnQpaSlVKc0dMdizpAqdI0t2-vQuEYS4Zh0fjk14/edit?usp=sharing',
        texture: '/textures/project/project3.mp4',
        logo: '/assets/project-logo3.png',
        logoStyle: {
            backgroundColor: '#60f5a1',
            background:
                'linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)',
            border: '0.2px solid rgba(208, 213, 221, 1)',
            boxShadow: '0px 0px 60px 0px rgba(35, 131, 96, 0.3)',
        },
        spotlight: '/assets/spotlight3.png',
        tags: [
            {
                id: 1,
                name: 'Figma',
                path: '/assets/figma.svg',
            },
            {
                id: 2,
                name: 'UX Research',
                path: '/assets/user.png',
            },
            {
                id: 3,
                name: 'Prototyping',
                path: '/assets/prototype.png',
            },
            {
                id: 4,
                name: 'GUXD',
                path: '/assets/google.svg',
            },
        ],
    },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
    return {
        deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
        deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
        cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
        reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
        ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
        targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
    };
};

export const workExperiences = [
    {
        id: 1,
        name: 'Advatek Lighting',
        pos: 'Software Engineer',
        duration: 'Dec 2023 - Jul 2024',
        title: "Built a full-stack web application for managing lighting pixel controllers using React/Vue, Python, and MySQL. Designed microservices with Docker and RESTful APIs, and established CI/CD pipelines that reduced deployment time by 35%.",
        icon: '/assets/code.png',
        animation: 'victory',
    },
    {
        id: 2,
        name: 'Wilder World',
        pos: '3D Artist',
        duration: 'Nov 2021 - Nov 2022',
        title: "Produced over 100 high-quality 3D assets and environments for AAA game development using Blender and Unreal Engine 5. Collaborated with international teams to create immersive environments inspired by Blade Runner and Dune.",
        icon: '/assets/blender.png',
        animation: 'clapping',
    },
    {
        id: 3,
        name: 'PF Exterior & Interior',
        pos: '3D Designer and Architectural Visualiser',
        duration: 'Feb 2020 - Nov 2021',
        title: "Created high-quality buildings and 3D environments for residential and hospitality projects using Rhinoceros, Grasshopper, Corona, V-Ray, and Blender. Delivered renders meeting precise client specifications.",
        icon: '/assets/house.png',
        animation: 'salute',
    },
    {
        id: 4,
        name: 'BCCI Design',
        pos: 'Architect Intern',
        duration: 'Nov 2019 - Feb 2020',
        title: "Contributed to the Wenzhou Museum project, developing 2D plans and 3D renders using AutoCAD, Rhino, and SketchUp. Participated in team design discussions and client presentations.",
        icon: '/assets/house.png',
        animation: 'sitting',
    },
    {
        id: 5,
        name: 'Futurepolis',
        pos: 'Urban Planner Intern',
        duration: 'Jul 2018 - Aug 2018',
        title: "Developed 3D visualisations for the Duke University Kunshan Phase II master plan using AutoCAD and SketchUp. Collaborated with Perkins & Will on urban design projects.",
        icon: '/assets/city.png',
        animation: 'laying',
    },
];