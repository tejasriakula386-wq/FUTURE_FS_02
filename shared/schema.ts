import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define the structure of a Product from FakeStoreAPI for type safety
export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string(),
  rating: z.object({
    rate: z.number(),
    count: z.number(),
  }).optional(),
});

export type Product = z.infer<typeof productSchema>;

export const cartItemSchema = productSchema.extend({
  quantity: z.number(),
});

export type CartItem = z.infer<typeof cartItemSchema>;

// DB table for Orders
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  address: text("address").notNull(),
  total: integer("total").notNull(), // Storing in cents or just raw number
  status: text("status").notNull().default("pending"),
  items: jsonb("items").$type<CartItem[]>().notNull(),
});

export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, status: true });

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
