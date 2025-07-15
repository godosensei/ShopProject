//

const db = require(`../db`);

//
class BaseDb {
  constructor() {}

  //insert
  async insert(table, dto) {
    await db(table).insert(dto).returning("*");
  }

  //count
  async count(table) {
    await db(table).count("* as count");
  }

  //select
  async select(table, property) {
    await db(table).where({ property }).select("*");
  }

  //selectbyid
  async selectById(table, id, prop) {
    await db(table).where(prop, id).first();
  }

  //deletebyid
  async deleteById(table, id) {
    await db(table).where(`id`, id).del();
  }

  //
}

module.exports = BaseDb;
