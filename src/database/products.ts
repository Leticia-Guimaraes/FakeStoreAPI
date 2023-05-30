import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("products", function (table) {
    table.increments();
    table.string("title").notNullable();
    table.string("price").notNullable();
    table.string("description").notNullable();
    table.string("category").notNullable();
    table.string("image").notNullable();
    table.string("rate").notNullable();
    table.string("count").notNullable();
    table.integer("category_id");
    table.foreign("category_id").references("categories.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("products");
}
