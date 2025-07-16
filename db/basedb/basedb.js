class BaseDb {
  constructor(model) {
    this.model = model;
  }

  //
  async add(dto) {
    const doc = new this.model(dto);
    return await doc.save();
  }

  // count
  async count() {
    return await this.model.countDocuments();
  }

  // count by id
  async countById(where) {
    return await this.model.countDocuments(where);
  }

  // select
  async select(where) {
    return await this.model.find(where);
  }

  // select one
  async selectOne(where) {
    return await this.model.findOne(where);
  }

  // update
  async update(where, updateValues) {
    await this.model.updateMany(where, updateValues);
    return await this.model.find(where);
  }

  // deletebyid
  async deleteById(where) {
    return await this.model.deleteMany(where);
  }
}

module.exports = BaseDb;
