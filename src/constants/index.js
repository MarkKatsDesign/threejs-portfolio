export const navLinks = [
    {
        id: 1,
        name: 'Home',
        href: '#home',
    },
    {
        id: 2,
        name: 'About',
        href: '#about',
    },
    {
        id: 3,
        name: 'Work',
        href: '#work',
    },
    {
        id: 4,
        name: 'Contact',
        href: '#contact',
    },
];

export const clientReviews = [
    {
        id: 1,
        name: 'Emily Johnson',
        position: 'Marketing Director at GreenLeaf',
        img: 'assets/review1.png',
        review:
            'Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.',
    },
    {
        id: 2,
        name: 'Mark Rogers',
        position: 'Founder of TechGear Shop',
        img: 'assets/review2.png',
        review:
            'Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional! Fantastic work.',
    },
    {
        id: 3,
        name: 'John Dohsas',
        position: 'Project Manager at UrbanTech ',
        img: 'assets/review3.png',
        review:
            'I can’t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.',
    },
    {
        id: 4,
        name: 'Ether Smith',
        position: 'CEO of BrightStar Enterprises',
        img: 'assets/review4.png',
        review:
            'Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend backend dev are top-notch.',
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
        spotlight: '/assets/spotlight1.png', // You'll want to update this with an image related to EASiMAC
        tags: [
            {
                id: 1,
                name: 'Vue.js',
                path: '/assets/vue.svg', // Update with your Vue.js logo path
            },
            {
                id: 2,
                name: 'Flask',
                path: 'assets/flask.png', // Update with your Flask logo path
            },
            {
                id: 3,
                name: 'SQLAlchemy',
                path: '/assets/sqlalchemy.png', // Update with your SQLAlchemy logo path
            },
            {
                id: 4,
                name: 'MySQL',
                path: '/assets/mysql.png', // Update with your MySQL logo path
            },
            {
                id: 5,
                name: 'AWS',
                path: '/assets/aws.png', // Update with your AWS logo path
            },
            {
                id: 6,
                name: 'OpenAPI',
                path: '/assets/openapi.png', // Update with your OpenAPI logo path
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
                path: '/assets/aws-amplify.png',
            },
            {
                id: 4,
                name: 'TailwindCSS',
                path: '/assets/tailwindcss.png',
            },
            {
                id: 5,
                name: 'Jest',
                path: '/assets/jest.png',
            },
            {
                id: 6,
                name: 'Stripe',
                path: '/assets/stripe.png',
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
                path: '/assets/nextjs.svg',
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
                path: '/assets/openai.png',
            },
            {
                id: 5,
                name: 'Hackathon',
                path: '/assets/hackathon.png',
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
                path: '/assets/ux-research.png',
            },
            {
                id: 3,
                name: 'Prototyping',
                path: '/assets/prototype.png',
            },
            {
                id: 4,
                name: 'User Testing',
                path: '/assets/user-testing.png',
            },
            {
                id: 5,
                name: 'GUXD',
                path: '/assets/google-ux.png',
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
        name: 'Framer',
        pos: 'Lead Web Developer',
        duration: '2022 - Present',
        title: "Framer serves as my go-to tool for creating interactive prototypes. I use it to bring designs to  life, allowing stakeholders to experience the user flow and interactions before development.",
        icon: '/assets/framer.svg',
        animation: 'victory',
    },
    {
        id: 2,
        name: 'Figma',
        pos: 'Web Developer',
        duration: '2020 - 2022',
        title: "Figma is my collaborative design platform of choice. I utilize it to work seamlessly with team members and clients, facilitating real-time feedback and design iterations. Its cloud-based.",
        icon: '/assets/figma.svg',
        animation: 'clapping',
    },
    {
        id: 3,
        name: 'Notion',
        pos: 'Junior Web Developer',
        duration: '2019 - 2020',
        title: "Notion helps me keep my projects organized. I use it for project management, task tracking, and as a central hub for documentation, ensuring that everything from design notes to.",
        icon: '/assets/notion.svg',
        animation: 'salute',
    },
];