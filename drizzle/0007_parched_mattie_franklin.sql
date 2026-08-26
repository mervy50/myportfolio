CREATE TABLE `portfolio_education` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(240) NOT NULL,
	`place` varchar(160) NOT NULL,
	`year` varchar(4),
	`displayOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `portfolio_education_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `portfolio_site_content` (
	`id` int NOT NULL,
	`homeAvailability` varchar(240) NOT NULL,
	`homeTitleLine1` varchar(160) NOT NULL,
	`homeTitleLine2` varchar(160) NOT NULL,
	`homeAboutTitle` varchar(240) NOT NULL,
	`homeAboutAccent` varchar(240) NOT NULL,
	`homeAboutCta` varchar(160) NOT NULL,
	`homeFeaturedTitle` varchar(240) NOT NULL,
	`homeFeaturedAccent` varchar(240) NOT NULL,
	`homeContactTitle` varchar(240) NOT NULL,
	`homeContactAccent` varchar(240) NOT NULL,
	`aboutTitleLine1` varchar(160) NOT NULL,
	`aboutTitleLine2` varchar(160) NOT NULL,
	`aboutAvailability` varchar(240) NOT NULL,
	`aboutLocation` varchar(240) NOT NULL,
	`aboutQuote` varchar(500) NOT NULL,
	`aboutSkillsNote` varchar(500) NOT NULL,
	`aboutEducationNote` varchar(500) NOT NULL,
	`portfolioTitleLine1` varchar(160) NOT NULL,
	`portfolioTitleLine2` varchar(160) NOT NULL,
	`portfolioDescription` varchar(500) NOT NULL,
	`contactTitleLine1` varchar(160) NOT NULL,
	`contactTitleLine2` varchar(160) NOT NULL,
	`contactIntro` varchar(500) NOT NULL,
	`footerBrand` varchar(120) NOT NULL,
	`footerCopy` varchar(240) NOT NULL,
	`navHomeLabel` varchar(80) NOT NULL,
	`navAboutLabel` varchar(80) NOT NULL,
	`navPortfolioLabel` varchar(80) NOT NULL,
	`navContactLabel` varchar(80) NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `portfolio_site_content_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `portfolio_projects` ADD `githubUrl` varchar(500);--> statement-breakpoint
ALTER TABLE `portfolio_projects` ADD `detailTagline` varchar(240);--> statement-breakpoint
ALTER TABLE `portfolio_projects` ADD `detailHeadline` varchar(500);--> statement-breakpoint
ALTER TABLE `portfolio_projects` ADD `detailBody` text;--> statement-breakpoint
ALTER TABLE `portfolio_projects` ADD `detailFeatures` text;