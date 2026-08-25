CREATE TABLE `portfolio_profile` (
	`id` int NOT NULL,
	`name` varchar(200) NOT NULL,
	`role` varchar(160) NOT NULL,
	`bio` text NOT NULL,
	`email` varchar(320) NOT NULL,
	`github` varchar(320) NOT NULL,
	`linkedin` varchar(320) NOT NULL,
	`photoUrl` varchar(500),
	`cvUrl` varchar(500),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `portfolio_profile_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `portfolio_skills` (
	`id` int AUTO_INCREMENT NOT NULL,
	`groupName` varchar(120) NOT NULL,
	`name` varchar(120) NOT NULL,
	`displayOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `portfolio_skills_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `portfolio_projects` ADD `displayOrder` int DEFAULT 0 NOT NULL;