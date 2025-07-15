const db = require(`../db`);

class BaseDb {
  constructor() {}

  // INSERT: returns inserted row(s)
  async add(table, dto) {
    return await db(table).insert(dto).returning("*");
  }

  // COUNT: returns count of all rows
  async count(table) {
    const result = await db(table).count("* as count");
    return result[0].count;
  }

  // COUNTbyid
  async countById(table, where) {
    const result = await db(table).where(where).count("* as count");
    return result[0].count;
  }

  // SELECT
  async select(table, where) {
    return await db(table).where(where).first();
  }

  // UPDATE
  async update(table, where, updateValues) {
    return await db(table).where(where).update(updateValues).returning("*");
  }

  // DELETE
  async deleteById(table, where) {
    return await db(table).where(where).del();
  }
}

module.exports = BaseDb;
