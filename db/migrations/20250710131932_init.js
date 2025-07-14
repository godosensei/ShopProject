const { table } = require("../db");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function (knex) {
  await knex.schema.createTable(`container`, (table) => {
    table.increments(`id`).primary();
    table.integer(`number_of_products`);
    table.integer(`container_number`);
    table.string(`dilivered_from`);
    table.string(`means_of_transport`);
    table.timestamps(true, true);
  });

  await knex.schema.createTable(`products`, (table) => {
    table.increments(`id`).primary();
    table.string(`product_type`);
    table.integer(`current_products`);
    table.integer(`total_products`);
    table
      .integer(`container_id`)
      .unsigned()
      .references(`id`)
      .inTable(`container`)
      .onDelete(`CASCADE`);
  });

  await knex.schema.createTable(`Customer`, (table) => {
    table.increments(`id`).primary();
    table.string(`name`);
    table.string(`email`);
    table.string(`password`);
    table.string(`role`);
  });

  await knex.schema.createTable(`Admin`, (table) => {
    table.increments(`id`).primary();
    table.string(`name`);
    table.string(`email`);
    table.string(`password`);
    table.string(`role`);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("Admin");
  await knex.schema.dropTableIfExists("Customer");
  await knex.schema.dropTableIfExists("products");
  await knex.schema.dropTableIfExists("container");
};
