const { sequelize, Character } = require('./database');

const seedData = async () => {
  try {
    // Sincronizar la base de datos
    await sequelize.sync({ force: true });

    // Datos de ejemplo
    const characters = [
      { name: "Luke Skywalker", movie: "Star Wars" },
      { name: "Frodo Baggins", movie: "The Lord of the Rings" },
      { name: "Harry Potter", movie: "Harry Potter and the Philosopher's Stone" },
      { name: "Tony Stark", movie: "Iron Man" },
      { name: "Bruce Wayne", movie: "The Dark Knight" },
      { name: "Indiana Jones", movie: "Indiana Jones and the Raiders of the Lost Ark" },
      { name: "Darth Vader", movie: "Star Wars" },
      { name: "Peter Parker", movie: "Spider-Man" },
      { name: "Marty McFly", movie: "Back to the Future" },
      { name: "Neo", movie: "The Matrix" },
    ];

    // Poblar la base de datos
    await Character.bulkCreate(characters);
    console.log("Base de datos poblada con éxito");

    // Cerrar la conexión
    await sequelize.close();
  } catch (error) {
    console.error("Error populando la base de datos:", error);
  }
};

seedData();
