import { asc, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  faqs,
  inquiries,
  projectImages,
  projects,
  services,
  testimonials,
  type Inquiry,
  type Project,
  type ProjectImage,
  type Service,
} from "@/db/schema";
import { ensureSeeded } from "@/db/seed";

export async function getServices(): Promise<Service[]> {
  await ensureSeeded();
  return db.select().from(services).orderBy(asc(services.sortOrder));
}

export async function getService(slug: string): Promise<Service | undefined> {
  await ensureSeeded();
  const rows = await db.select().from(services).where(eq(services.slug, slug)).limit(1);
  return rows[0];
}

export async function getProjects(): Promise<Project[]> {
  await ensureSeeded();
  return db.select().from(projects).orderBy(desc(projects.featured), desc(projects.id));
}

export async function getProject(slug: string): Promise<
  | {
      project: Project;
      images: ProjectImage[];
    }
  | undefined
> {
  await ensureSeeded();
  const rows = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
  const project = rows[0];
  if (!project) return undefined;
  const images = await db
    .select()
    .from(projectImages)
    .where(eq(projectImages.projectId, project.id))
    .orderBy(asc(projectImages.sortOrder));
  return { project, images };
}

export async function getTestimonials() {
  await ensureSeeded();
  return db.select().from(testimonials).orderBy(desc(testimonials.featured), desc(testimonials.id));
}

export async function getFaqs() {
  await ensureSeeded();
  return db.select().from(faqs).orderBy(asc(faqs.sortOrder));
}

export async function getInquiries(): Promise<Inquiry[]> {
  await ensureSeeded();
  return db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
}

export async function getInquiry(id: number): Promise<Inquiry | undefined> {
  await ensureSeeded();
  const rows = await db.select().from(inquiries).where(eq(inquiries.id, id)).limit(1);
  return rows[0];
}
