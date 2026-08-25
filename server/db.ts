import { asc, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { contactMessages, InsertContactMessage, InsertPortfolioCertification, InsertPortfolioProfile, InsertPortfolioProject, InsertPortfolioSkill, InsertUser, portfolioCertifications, portfolioProfile, portfolioProjects, portfolioSkills, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createContactMessage(message: InsertContactMessage) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const result = await db.insert(contactMessages).values(message);
  return { id: Number(result[0].insertId) };
}

export async function listPortfolioProjects() {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  return db.select().from(portfolioProjects).orderBy(asc(portfolioProjects.displayOrder), desc(portfolioProjects.createdAt));
}

export async function getPortfolioProjectBySlug(slug: string) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const rows = await db.select().from(portfolioProjects).where(eq(portfolioProjects.slug, slug)).limit(1);
  return rows[0];
}

export async function createPortfolioProject(project: InsertPortfolioProject) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const result = await db.insert(portfolioProjects).values(project);
  return { id: Number(result[0].insertId) };
}

export async function updatePortfolioProject(id: number, project: Partial<InsertPortfolioProject>) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.update(portfolioProjects).set(project).where(eq(portfolioProjects.id, id));
  return { id };
}

export async function deletePortfolioProject(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.delete(portfolioProjects).where(eq(portfolioProjects.id, id));
  return { id };
}

export async function listPortfolioCertifications() {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  return db.select().from(portfolioCertifications).orderBy(desc(portfolioCertifications.createdAt));
}

export async function createPortfolioCertification(certification: InsertPortfolioCertification) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const result = await db.insert(portfolioCertifications).values(certification);
  return { id: Number(result[0].insertId) };
}

export async function updatePortfolioCertification(id: number, certification: Partial<InsertPortfolioCertification>) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.update(portfolioCertifications).set(certification).where(eq(portfolioCertifications.id, id));
  return { id };
}

export async function deletePortfolioCertification(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.delete(portfolioCertifications).where(eq(portfolioCertifications.id, id));
  return { id };
}

export async function getPortfolioProfile() {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const rows = await db.select().from(portfolioProfile).where(eq(portfolioProfile.id, 1)).limit(1);
  return rows[0];
}

export async function upsertPortfolioProfile(profile: Omit<InsertPortfolioProfile, "id">) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.insert(portfolioProfile).values({ id: 1, ...profile }).onDuplicateKeyUpdate({ set: profile });
  return { id: 1 };
}

export async function deletePortfolioProfile() {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.delete(portfolioProfile).where(eq(portfolioProfile.id, 1));
  return { id: 1 };
}

export async function listPortfolioSkills() {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  return db.select().from(portfolioSkills).orderBy(asc(portfolioSkills.groupName), asc(portfolioSkills.displayOrder), asc(portfolioSkills.name));
}

export async function createPortfolioSkill(skill: InsertPortfolioSkill) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const result = await db.insert(portfolioSkills).values(skill);
  return { id: Number(result[0].insertId) };
}

export async function updatePortfolioSkill(id: number, skill: Partial<InsertPortfolioSkill>) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.update(portfolioSkills).set(skill).where(eq(portfolioSkills.id, id));
  return { id };
}

export async function deletePortfolioSkill(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.delete(portfolioSkills).where(eq(portfolioSkills.id, id));
  return { id };
}

export async function reorderPortfolioProjects(order: Array<{ id: number; displayOrder: number }>) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await Promise.all(order.map(item => db.update(portfolioProjects).set({ displayOrder: item.displayOrder }).where(eq(portfolioProjects.id, item.id))));
  return { updated: order.length };
}
