const queries = {
  async insertStudent(client, args) {
    try {
      const query = {
        name:'ingresar-usuario',
        text: `INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *`,
        values: args,
      };
      const res = await client.query(query);
      return res.rows[0];
    } catch (error) {
      console.error("Error al insertar estudiante:", error.message);
      throw error;
    }
  },

  async getStudentByRut(client, rut) {
    try {
      const query = {
        name:'consulta-por-rut',
        text: `SELECT * FROM estudiantes WHERE rut = $1`,
        values: [rut],
      };
      const res = await client.query(query);
      return res.rows[0];
    } catch (error) {
      console.error("Error al obtener estudiante por rut:", error.message);
      throw error;
    }
  },

  async getAllStudents(client) {
    try {
      const query = {
        name:'consultar-usuarios',
        text: `SELECT * FROM estudiantes`,
        values: [],
      };
      const res = await client.query(query);
      return res.rows;
    } catch (error) {
      console.error("Error al obtener todos los estudiantes:", error.message);
      throw error;
    }
  },

  async updateStudent(client, args) {
    try {
      const query = {
        name:'editar-usuario',
        text: `UPDATE estudiantes SET nombre = $1, curso = $3, nivel = $4 WHERE rut = $2 RETURNING *`,
        values: args,
      };
      const res = await client.query(query);
      return res.rows[0];
    } catch (error) {
      console.error("Error al actualizar estudiante:", error.message);
      throw error;
    }
  },

  async deleteStudent(client, rut) {
    try {
      const query = {
        name:'eliminar-usuario',
        text: `DELETE FROM estudiantes WHERE rut = $1 RETURNING *`,
        values: [rut],
      };
      const res = await client.query(query);
      return res.rows[0];
    } catch (error) {
      console.error("Error al eliminar estudiante:", error.message);
      throw error;
    }
  },
};

module.exports = queries;
