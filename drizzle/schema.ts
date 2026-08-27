import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const contactMessages = mysqlTable("contact_messages", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  message: text("message").notNull(),
  isRead: boolean("isRead").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = typeof contactMessages.$inferInsert;

export const portfolioProjects = mysqlTable("portfolio_projects", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  title: varchar("title", { length: 160 }).notNull(),
  type: varchar("type", { length: 160 }).notNull(),
  year: varchar("year", { length: 4 }).notNull(),
  description: text("description").notNull(),
  stack: text("stack").notNull(),
  status: varchar("status", { length: 120 }).notNull(),
  githubUrl: varchar("githubUrl", { length: 500 }),
  detailTagline: varchar("detailTagline", { length: 240 }),
  detailHeadline: varchar("detailHeadline", { length: 500 }),
  detailBody: text("detailBody"),
  detailFeatures: text("detailFeatures"),
  displayOrder: int("displayOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PortfolioProject = typeof portfolioProjects.$inferSelect;
export type InsertPortfolioProject = typeof portfolioProjects.$inferInsert;

export const portfolioCertifications = mysqlTable("portfolio_certifications", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  provider: varchar("provider", { length: 160 }).notNull(),
  year: varchar("year", { length: 4 }),
  description: text("description"),
  attestationImageUrl: varchar("attestationImageUrl", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PortfolioCertification = typeof portfolioCertifications.$inferSelect;
export type InsertPortfolioCertification = typeof portfolioCertifications.$inferInsert;

export const portfolioProfile = mysqlTable("portfolio_profile", {
  id: int("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  role: varchar("role", { length: 160 }).notNull(),
  bio: text("bio").notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  github: varchar("github", { length: 320 }).notNull(),
  linkedin: varchar("linkedin", { length: 320 }).notNull(),
  photoUrl: varchar("photoUrl", { length: 500 }),
  aboutPhotoUrl: varchar("aboutPhotoUrl", { length: 500 }),
  cvUrl: varchar("cvUrl", { length: 500 }),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PortfolioProfile = typeof portfolioProfile.$inferSelect;
export type InsertPortfolioProfile = typeof portfolioProfile.$inferInsert;

export const portfolioSiteContent = mysqlTable("portfolio_site_content", {
  id: int("id").primaryKey(),
  homeAvailability: varchar("homeAvailability", { length: 240 }).notNull(),
  homeTitleLine1: varchar("homeTitleLine1", { length: 160 }).notNull(),
  homeTitleLine2: varchar("homeTitleLine2", { length: 160 }).notNull(),
  homeAboutTitle: varchar("homeAboutTitle", { length: 240 }).notNull(),
  homeAboutAccent: varchar("homeAboutAccent", { length: 240 }).notNull(),
  homeAboutCta: varchar("homeAboutCta", { length: 160 }).notNull(),
  homeFeaturedTitle: varchar("homeFeaturedTitle", { length: 240 }).notNull(),
  homeFeaturedAccent: varchar("homeFeaturedAccent", { length: 240 }).notNull(),
  homeContactTitle: varchar("homeContactTitle", { length: 240 }).notNull(),
  homeContactAccent: varchar("homeContactAccent", { length: 240 }).notNull(),
  aboutTitleLine1: varchar("aboutTitleLine1", { length: 160 }).notNull(),
  aboutTitleLine2: varchar("aboutTitleLine2", { length: 160 }).notNull(),
  aboutAvailability: varchar("aboutAvailability", { length: 240 }).notNull(),
  aboutLocation: varchar("aboutLocation", { length: 240 }).notNull(),
  aboutQuote: varchar("aboutQuote", { length: 500 }).notNull(),
  aboutSkillsNote: varchar("aboutSkillsNote", { length: 500 }).notNull(),
  aboutEducationNote: varchar("aboutEducationNote", { length: 500 }).notNull(),
  portfolioTitleLine1: varchar("portfolioTitleLine1", { length: 160 }).notNull(),
  portfolioTitleLine2: varchar("portfolioTitleLine2", { length: 160 }).notNull(),
  portfolioDescription: varchar("portfolioDescription", { length: 500 }).notNull(),
  contactTitleLine1: varchar("contactTitleLine1", { length: 160 }).notNull(),
  contactTitleLine2: varchar("contactTitleLine2", { length: 160 }).notNull(),
  contactIntro: varchar("contactIntro", { length: 500 }).notNull(),
  headerBrand: varchar("headerBrand", { length: 120 }).notNull(),
  footerBrand: varchar("footerBrand", { length: 120 }).notNull(),
  footerCopy: varchar("footerCopy", { length: 240 }).notNull(),
  navHomeLabel: varchar("navHomeLabel", { length: 80 }).notNull(),
  navAboutLabel: varchar("navAboutLabel", { length: 80 }).notNull(),
  navPortfolioLabel: varchar("navPortfolioLabel", { length: 80 }).notNull(),
  navContactLabel: varchar("navContactLabel", { length: 80 }).notNull(),
  portfolioProjectsLabel: varchar("portfolioProjectsLabel", { length: 80 }).default("Projets").notNull(),
  portfolioCertificationsLabel: varchar("portfolioCertificationsLabel", { length: 80 }).default("Certifications").notNull(),
  portfolioTechStackLabel: varchar("portfolioTechStackLabel", { length: 80 }).default("Tech Stack").notNull(),
  contactFormTitle: varchar("contactFormTitle", { length: 120 }).default("Envoyer un message").notNull(),
  contactNameLabel: varchar("contactNameLabel", { length: 120 }).default("Votre nom").notNull(),
  contactEmailLabel: varchar("contactEmailLabel", { length: 120 }).default("Votre adresse e-mail").notNull(),
  contactMessageLabel: varchar("contactMessageLabel", { length: 120 }).default("Votre message").notNull(),
  contactMessagePlaceholder: varchar("contactMessagePlaceholder", { length: 240 }).default("Parlez-moi de votre projet...").notNull(),
  contactSubmitLabel: varchar("contactSubmitLabel", { length: 120 }).default("Envoyer le message").notNull(),
  homeProjectsLabel: varchar("homeProjectsLabel", { length: 120 }).default("Projets réalisés").notNull(),
  homeTechnologiesLabel: varchar("homeTechnologiesLabel", { length: 120 }).default("Technologies").notNull(),
  homeCuriosityLabel: varchar("homeCuriosityLabel", { length: 120 }).default("Curiosité").notNull(),
  homeProjectsCta: varchar("homeProjectsCta", { length: 120 }).default("Voir mes projets").notNull(),
  homeAboutCtaLabel: varchar("homeAboutCtaLabel", { length: 120 }).default("À propos de moi").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PortfolioSiteContent = typeof portfolioSiteContent.$inferSelect;
export type InsertPortfolioSiteContent = typeof portfolioSiteContent.$inferInsert;

export const portfolioEducation = mysqlTable("portfolio_education", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 240 }).notNull(),
  place: varchar("place", { length: 160 }).notNull(),
  year: varchar("year", { length: 4 }),
  displayOrder: int("displayOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PortfolioEducation = typeof portfolioEducation.$inferSelect;
export type InsertPortfolioEducation = typeof portfolioEducation.$inferInsert;

export const portfolioSkills = mysqlTable("portfolio_skills", {
  id: int("id").autoincrement().primaryKey(),
  groupName: varchar("groupName", { length: 120 }).notNull(),
  name: varchar("name", { length: 120 }).notNull(),
  iconKey: varchar("iconKey", { length: 80 }),
  iconColor: varchar("iconColor", { length: 20 }),
  iconUrl: varchar("iconUrl", { length: 500 }),
  displayOrder: int("displayOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PortfolioSkill = typeof portfolioSkills.$inferSelect;
export type InsertPortfolioSkill = typeof portfolioSkills.$inferInsert;

export const portfolioAnalyticsEvents = mysqlTable("portfolio_analytics_events", {
  id: int("id").autoincrement().primaryKey(),
  eventType: mysqlEnum("eventType", ["visit", "cv_download", "github_click", "linkedin_click"]).notNull(),
  sessionId: varchar("sessionId", { length: 128 }).notNull(),
  path: varchar("path", { length: 200 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PortfolioAnalyticsEvent = typeof portfolioAnalyticsEvents.$inferSelect;
export type InsertPortfolioAnalyticsEvent = typeof portfolioAnalyticsEvents.$inferInsert;
