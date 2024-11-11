import mySqlConnectionQuery from "../../Core/Database.js";
import paginations from "../../Core/utilities/paginations.js";

class ExercisesModel {
  static table_name = "exercises";

  static async getAll(req) {
    let query = `SELECT * FROM ${this.table_name}`;

    let name = req.name ?? null;
    let target = req.target ?? null;
    let bodyPart = req.bodyPart ?? null;
    let filters = [];

    if (name) {
      query += ` WHERE name LIKE CONCAT(?,'%')`;
      filters.push(name);
    }
    if (target) {
      query += `${name ? " AND" : " WHERE"} target LIKE CONCAT(?,'%')`;
      filters.push(target);
    }
    if (bodyPart) {
      query += ` ${
        name || target ? " AND" : " WHERE"
      } bodyPart LIKE CONCAT(?,'%')`;
      filters.push(bodyPart);
    }
    if (name) {
      query += " ORDER BY name";
    } else if (target) {
      query += " ORDER BY target";
    } else if (bodyPart) {
      query += " ORDER BY bodyPart";
    } else {
      query += " ORDER BY id";
    }
    if (Object.keys(req).includes("page")) {
      let params = paginations(req);
      query += ` LIMIT ${params.maxData} OFFSET ${params.offsetData}`;
    }
    console.log(query);

    return await mySqlConnectionQuery(query, filters);
  }

  static async getExercise(id) {
    const query = `SELECT * FROM ${this.table_name} WHERE id = ?`;
    return await mySqlConnectionQuery(query, id);
  }

  static async createExercise(data) {
    const query = `INSERT INTO ${this.table_name} (name,target, gifUrl, instructions, bodyPart, secondaryMuscles, equipment) VALUES (?,?,?,?,?,?,?)`;

    const dataInDatabase = await mySqlConnectionQuery(
      `SELECT * FROM ${this.table_name}`
    );
    const duplicateExercise = dataInDatabase.find(
      (exercise) => exercise.name.toLowerCase() === data.name.toLowerCase()
    );
    if (duplicateExercise) {
      throw new Error("Duplicate Exercise");
    }

    let body = [
      data.name,
      data.target,
      data.gifUrl,
      JSON.stringify(data.instructions),
      data.bodyPart,
      JSON.stringify(data.secondaryMuscles),
      data.equipment,
    ];

    return await mySqlConnectionQuery(query, body);
  }

  static async createMultiExercises(data) {
    const query = `INSERT INTO ${this.table_name} (name,target, gifUrl, instructions, bodyPart, secondaryMuscles, equipment) VALUES (?,?,?,?,?,?,?)`;

    data.forEach((exercise) => {
      (exercise.instructions = JSON.stringify(exercise.instructions)),
        (exercise.secondaryMuscles = JSON.stringify(exercise.secondaryMuscles));
    });

    let exercisesInDB = [];
    for (const exercise of data) {
      let [exerciseDb] = await mySqlConnectionQuery(
        `SELECT * FROM ${this.table_name} WHERE name = ?`,
        exercise.name
      );
      if (exerciseDb) {
        exercisesInDB.push(exerciseDb);
        console.error(`Exercise ${exerciseDb.name} already exists in database`);
      }
    }

    let exerciseToInsert = data.filter((exercise) => {
      return !exercisesInDB.some(
        (exerciseDB) => exerciseDB.name === exercise.name
      );
    });

    let newExercises = [];
    for (const exercise of exerciseToInsert) {
      let exerciseValue = Object.values(exercise);
      try {
        newExercises.push(await mySqlConnectionQuery(query, exerciseValue));
      } catch (error) {
        console.error(error);
      }
    }
    return newExercises;
  }

  static async updateExercise(currentData, newData) {
    const query = `UPDATE ${this.table_name} SET name = ?, target = ?, gifUrl = ?, instructions = ?, bodyPart = ?, secondaryMuscles = ?, equipment = ? WHERE id = ?`;
    let body = [
      newData.name ?? currentData.name,
      newData.target ?? currentData.target,
      newData.gifUrl ?? currentData.gifUrl,
      JSON.stringify(newData.instructions) ?? currentData.instructions,
      newData.bodyPart ?? currentData.bodyPart,
      JSON.stringify(newData.secondaryMuscles) ?? currentData.secondaryMuscles,
      newData.equipment ?? currentData.equipment,
      currentData.id,
    ];
    return await mySqlConnectionQuery(query, body);
  }

  static async deleteExercise(id) {
    const query = `DELETE FROM ${this.table_name} WHERE id = ?`;
    const [deletedExercise] = await this.getExercise(id);
    const result = await mySqlConnectionQuery(query, id);
    return [deletedExercise, result];
  }

  //! USATA X LOAD EXER IN DB TOGETHER
  /* static async syncFun() {
    const exercises = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), "/exercisesDatabaseList copy.json")
      )
    );
    exercises.forEach((exercise) => {
      (exercise.instructions = JSON.stringify(exercise.instructions)),
        (exercise.secondaryMuscles = JSON.stringify(exercise.secondaryMuscles));
    });
    const query = `INSERT INTO ${this.table_name} (name,target, gifUrl, instructions, bodyPart, secondaryMuscles, equipment) VALUES (?,?,?,?,?,?,?)`;

    for (const exercise of exercises) {
      let exerciseValue = Object.values(exercise);
      try {
        await mySqlConnectionQuery(query, exerciseValue);
      } catch (error) {
        console.error(error);
      }
    }
  } */
}

export default ExercisesModel;
