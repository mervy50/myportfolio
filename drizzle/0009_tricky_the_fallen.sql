ALTER TABLE `portfolio_site_content` ADD `portfolioProjectsLabel` varchar(80) DEFAULT 'Projets' NOT NULL;--> statement-breakpoint
ALTER TABLE `portfolio_site_content` ADD `portfolioCertificationsLabel` varchar(80) DEFAULT 'Certifications' NOT NULL;--> statement-breakpoint
ALTER TABLE `portfolio_site_content` ADD `portfolioTechStackLabel` varchar(80) DEFAULT 'Tech Stack' NOT NULL;--> statement-breakpoint
ALTER TABLE `portfolio_site_content` ADD `contactFormTitle` varchar(120) DEFAULT 'Envoyer un message' NOT NULL;--> statement-breakpoint
ALTER TABLE `portfolio_site_content` ADD `contactNameLabel` varchar(120) DEFAULT 'Votre nom' NOT NULL;--> statement-breakpoint
ALTER TABLE `portfolio_site_content` ADD `contactEmailLabel` varchar(120) DEFAULT 'Votre adresse e-mail' NOT NULL;--> statement-breakpoint
ALTER TABLE `portfolio_site_content` ADD `contactMessageLabel` varchar(120) DEFAULT 'Votre message' NOT NULL;--> statement-breakpoint
ALTER TABLE `portfolio_site_content` ADD `contactSubmitLabel` varchar(120) DEFAULT 'Envoyer le message' NOT NULL;--> statement-breakpoint
ALTER TABLE `portfolio_site_content` ADD `homeProjectsLabel` varchar(120) DEFAULT 'Projets réalisés' NOT NULL;--> statement-breakpoint
ALTER TABLE `portfolio_site_content` ADD `homeTechnologiesLabel` varchar(120) DEFAULT 'Technologies' NOT NULL;--> statement-breakpoint
ALTER TABLE `portfolio_site_content` ADD `homeCuriosityLabel` varchar(120) DEFAULT 'Curiosité' NOT NULL;--> statement-breakpoint
ALTER TABLE `portfolio_site_content` ADD `homeProjectsCta` varchar(120) DEFAULT 'Voir mes projets' NOT NULL;--> statement-breakpoint
ALTER TABLE `portfolio_site_content` ADD `homeAboutCtaLabel` varchar(120) DEFAULT 'À propos de moi' NOT NULL;