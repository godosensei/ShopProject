const db = require("../db"); // Your knex instance

class BaseDb {
  constructor() {}

  async add(table, dto) {
    return await db(table).insert(dto).returning("*");
  }

  async count(table) {
    const result = await db(table).count("* as count");
    return result[0].count;
  }

  async countById(table, where) {
    const result = await db(table)
      .where({ ...where, deleted_at: null })
      .count("* as count");
    return result[0].count;
  }

  async select(table, where) {
    return await db(table).where({ ...where, deleted_at: null });
  }

  async selectOne(table, where) {
    return await db(table)
      .where({ ...where, deleted_at: null })
      .first();
  }

  async update(table, where, updateValues) {
    return await db(table)
      .where({ ...where, deleted_at: null })
      .update(updateValues)
      .returning("*");
  }

  async deleteById(table, where) {
    return await db(table)
      .where({ ...where, deleted_at: null })
      .del();
  }

  async alreadyDeleted(table, where, select) {
    const row = await db(table)
      .select(select)
      .where({ ...where, deleted_at: null })
      .first();

    if (!row) {
      throw new Error("Not Found");
    }
    return row[select] !== null;
  }
}

module.exports = BaseDb;
