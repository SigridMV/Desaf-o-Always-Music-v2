// index.js
const { connectDB, disconnectDB } = require("./dbConnections");
const queries = require("./queries");

const connection = async () => {
  let client;
  try {
    client = await connectDB();

    const arg_accion = process.argv[2];
    const args = process.argv.slice(6);

    if (arg_accion === "nuevo") {
      const res = await queries.insertStudent(client, args);
      console.log(`El estudiante ${res.nombre} fue agregado con éxito.`);
    } else if (arg_accion === "rut") {
      const res = await queries.getStudentByRut(client, args[0]);
      console.log(res);
    } else if (arg_accion === "consulta") {
      const res = await queries.getAllStudents(client);
      console.log("Registro actual:");
      console.log(res);
    } else if (arg_accion === "editar") {
      const res = await queries.updateStudent(client, args);
      console.log(`El estudiante ${res.nombre} fue editado con éxito.`);
    } else if (arg_accion === "eliminar") {
      const res = await queries.deleteStudent(client, args[0]);
      console.log(`Registro de estudiante con rut ${res.rut} eliminado.`);
    } else {
      console.log("Acción no reconocida.");
    }
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    if (client) {
      await disconnectDB(client);
    }
  }
};

connection();
