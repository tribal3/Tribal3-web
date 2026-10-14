import { promises as fs } from "node:fs";
import { randomUUID } from "node:crypto";
import path from "node:path";

export type CatalogType = "product" | "portfolio" | "job";

export interface CatalogItemData {
  _id: string;
  type: CatalogType;
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  seats: number;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CatalogItemInput {
  type: CatalogType;
  title: string;
  description: string;
  imageUrl?: string;
  url?: string;
  seats?: number;
  order?: number;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "catalog.json");

export const CATALOG_TYPES: CatalogType[] = ["product", "portfolio", "job"];

async function readAll(): Promise<CatalogItemData[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.items)
      ? parsed.items.map((item: CatalogItemData) => ({ ...item, seats: item.seats ?? 0 }))
      : [];
  } catch {
    return [];
  }
}

async function writeAll(items: CatalogItemData[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify({ items }, null, 2), "utf-8");
}

function sortItems(items: CatalogItemData[]): CatalogItemData[] {
  return [...items].sort(
    (a, b) => a.order - b.order || b.createdAt.localeCompare(a.createdAt)
  );
}

export async function getCatalogItems(type?: CatalogType): Promise<CatalogItemData[]> {
  const items = await readAll();
  return sortItems(type ? items.filter((item) => item.type === type) : items);
}

export async function createCatalogItem(input: CatalogItemInput): Promise<CatalogItemData> {
  const items = await readAll();
  const now = new Date().toISOString();
  const item: CatalogItemData = {
    _id: randomUUID(),
    type: input.type,
    title: input.title,
    description: input.description,
    imageUrl: input.imageUrl || "",
    url: input.url || "",
    seats: input.seats ?? 0,
    order: input.order || 0,
    createdAt: now,
    updatedAt: now,
  };
  await writeAll([item, ...items]);
  return item;
}

export async function updateCatalogItem(
  id: string,
  input: CatalogItemInput
): Promise<CatalogItemData | null> {
  const items = await readAll();
  const index = items.findIndex((item) => item._id === id);
  if (index === -1) return null;

  const updated: CatalogItemData = {
    ...items[index],
    title: input.title,
    description: input.description,
    imageUrl: input.imageUrl || "",
    url: input.url || "",
    seats: input.seats ?? items[index].seats ?? 0,
    order: input.order ?? items[index].order,
    updatedAt: new Date().toISOString(),
  };
  items[index] = updated;
  await writeAll(items);
  return updated;
}

export async function deleteCatalogItem(id: string): Promise<boolean> {
  const items = await readAll();
  const remaining = items.filter((item) => item._id !== id);
  if (remaining.length === items.length) return false;
  await writeAll(remaining);
  return true;
}
