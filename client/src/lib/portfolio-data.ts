/* Charte aqua/noir : les données restent séparées de l’interface pour faciliter la personnalisation du portfolio. */
export const profile = {
  name: "LOKO-DADE M. Merveille Elise",
  shortName: "Merveille Elise LOKO-DADE",
  role: "Full-Stack Developer",
  email: "mervylokodade50@gmail.com",
  github: "https://github.com/mervy50",
  linkedin: "https://www.linkedin.com/in/merveille-loko-dade-8728b1352/",
  bio: "Je suis Merveille Elise LOKO-DADE, développeuse web Full Stack passionnée par la création de solutions numériques utiles, accessibles et adaptées aux besoins réels. Je travaille principalement avec Laravel, PHP, JavaScript, Python et Django, avec un intérêt particulier pour la conception d'applications web, la résolution de problèmes et l'expérience utilisateur. À travers mes projets et engagements, je cherche à mettre la technologie au service de projets ayant un impact concret.",
};

export const skills = {
  Frontend: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "React.js"],
  Backend: ["PHP", "Laravel", "Python", "Django"],
  "Bases de données": ["MySQL", "PostgreSQL"],
  "Outils & environnement": ["Git / GitHub", "VS Code", "XAMPP / WAMP", "Composer", "npm", "REST API"],
};

export const projects = [
  { slug: "pitchlab", title: "Pitchlab", type: "Plateforme web", year: "2024", description: "Une plateforme pensée pour structurer, présenter et faire évoluer des idées avec une expérience web claire.", stack: ["Laravel", "PHP", "MySQL"], status: "Projet sélectionné" },
  { slug: "adjonou", title: "ADJONOU", type: "Gestion de tontine", year: "2024", description: "Une application de gestion qui rend le suivi des contributions, des membres et des opérations plus simple.", stack: ["Laravel", "JavaScript", "MySQL"], status: "Application web" },
  { slug: "elicall", title: "EliCall / AllôBénin", type: "CRM / Télémarketing", year: "2023", description: "Un projet orienté relation client pour centraliser les informations et améliorer le suivi des échanges.", stack: ["PHP", "Laravel", "REST API"], status: "CRM" },
  { slug: "benin-mirror", title: "Bénin Mirror", type: "Tourisme", year: "2023", description: "Une expérience numérique dédiée à la découverte du Bénin et à la mise en valeur de ses destinations.", stack: ["JavaScript", "Bootstrap", "PHP"], status: "Expérience web" },
  { slug: "lksboost", title: "LksBoost", type: "Plateforme web", year: "2023", description: "Une plateforme Laravel conçue pour accompagner un besoin métier avec une interface accessible.", stack: ["Laravel", "PHP", "MySQL"], status: "Projet web" },
  { slug: "sewe-consulting", title: "Sewe Consulting", type: "Site client", year: "2022", description: "Un site vitrine pensé pour clarifier une offre de conseil et faciliter la prise de contact.", stack: ["HTML5", "CSS3", "JavaScript"], status: "Client" },
];

export const education = [
  { title: "Licence en Systèmes Informatiques et Logiciels", place: "Formation supérieure", year: "" },
  { title: "Licence en Anglais", place: "Formation supérieure", year: "" },
  { title: "KAS DIGIT", place: "Formation numérique", year: "" },
  { title: "Data Analysis", place: "LABIS", year: "" },
  { title: "Cybersecurity", place: "LABIS", year: "" },
  { title: "DNSathon / Hackathon", place: "Innovation & collaboration", year: "" },
];
