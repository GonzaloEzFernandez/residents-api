import { client } from "../db.js";

// get residents //
export const getResidents = async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM resident_data");
    return res.json(result.rows);
  } catch (error) {
    res.status(500).send("something goes wrong");
  }
};

// get one resident //
export const getResident = async (req, res) => {
  try {
    const result = await client.query(
      "SELECT * FROM resident_data WHERE id = $1",
      [req.params.id]
    );
    if (result.rows.length <= 0)
      return res.status(500).json({ message: "not residents found" });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).send({ message: "something goes wrong" });
  }
};

// create resident //
export const createResident = async (req, res) => {
  const { firstName, lastName, age, DNI, price } = req.body;
  try {
    const result = await client.query(
      "INSERT INTO resident_data (firstName, lastName, age, DNI, price) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [firstName, lastName, age, DNI, price]
    );
    if (result.rowCount <= 0)
      return res.status(500).json({ message: "Error creating resident" });
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al crear residente:", error);
    res.status(500).send("something goes wrong");
  }
};

// update residents//
export const updateResident = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age, DNI, price } = req.body;

  try {
    const result = await client.query(
      "UPDATE resident_data SET firstName = COALESCE($1, firstName), lastName = COALESCE($2, lastName), age = COALESCE($3, age), DNI = COALESCE($4, DNI), price = COALESCE($5, price) WHERE id = $6 RETURNING *",
      [firstName, lastName, age, DNI, price, id]
    );
    if (result.rowCount <= 0)
      return res.status(404).json({ message: "Not resident fount" });
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.json({ message: "Something goes wrong" });
  }
};

// delete resident //
export const deleteResident = async (req, res) => {
  try {
    const result = await client.query(
      "DELETE FROM resident_data WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    if (result.rows <= 0 || result.rows.length <= 0)
      return res.status(404).json({ message: "Not resident found" });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send("something goes wrong");
  }
};
