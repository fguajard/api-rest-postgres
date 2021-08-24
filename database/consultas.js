const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "toysstore",
  port: 5432,
});

const getAll = async () => {
  const { rows } = await pool.query("select * from productos");
  return rows;
};

const getOne = async (id) => {
  const { rows, rowCount } = await pool.query(
    "select * from productos where id = $1",
    [id]
  );
  if (!rowCount)
    throw { message: "No existe este producto en la base de datos" };
  return rows[0];
};

const addOne = async (values) => {
  const consulta = {
    text: `INSERT INTO productos values (DEFAULT,$1,$2) RETURNING *`,
    values,
  };
  const {
    rows: [productos],
  } = await pool.query(consulta);
  return productos;
};

const changeOne = async (values, id) => {
  const consulta = {
    text: `update productos set name = $2, price = $3 where id = $1 RETURNING *`,
    values: [id, ...values],
  };
  const modificado = await pool.query(consulta);
  if (!modificado.rowCount)
    throw { message: "No existe este producto en la base de datos" };
  const {
    rows: [productos],
  } = modificado;
  return productos;
};

const deleteOne = async (id) => {
  const consulta = {
    text: `delete from productos where id = $1 RETURNING *`,
    values: [id],
  };
  const eliminado = await pool.query(consulta);
  if (!eliminado.rowCount)
    throw { message: "No existe este producto en la base de datos" };
  const {
    rows: [productos],
  } = eliminado;
  return productos;
};

module.exports = { getAll, getOne, addOne, changeOne, deleteOne };
