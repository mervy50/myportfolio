CREATE TABLE `portfolio_analytics_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`eventType` enum('visit','cv_download') NOT NULL,
	`sessionId` varchar(128) NOT NULL,
	`path` varchar(200) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `portfolio_analytics_events_id` PRIMARY KEY(`id`)
);
