import path from "path";
import fs from "fs/promises";

const FEATURED_FILE = path.join(process.cwd(), "data", "featured.json");

export async function readFeatured(): Promise<string[]> {
  try {
    const raw = await fs.readFile(FEATURED_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.featured) ? parsed.featured : [];
  } catch {
    return [];
  }
}

export async function writeFeatured(ids: string[]): Promise<void> {
  await fs.writeFile(FEATURED_FILE, JSON.stringify({ featured: ids }, null, 2), "utf-8");
}
