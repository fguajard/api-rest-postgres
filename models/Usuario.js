const {
  getAll,
  getOne,
  addOne,
  changeOne,
  deleteOne,
} = require("../database/consultas");

class Users {
  async all() {
    const users = await getAll();
    return users.map((user) => ({
      name: user.name,
      src: `http://localhost:3000/api/usuarios/${user.id}`,
    }));
  }

  async findOne(id) {
    const user = await getOne(id);
    return user;
  }

  async addOne(values) {
    const user = await addOne(values);
    return user;
  }

  async updateOne(values, id) {
    const user = await changeOne(values, id);
    return user;
  }

  async deleteOne(id) {
    const user = await deleteOne(id);
    return user;
  }
}

module.exports = Users;
