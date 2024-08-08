import fs from "fs";
import path from "path";
import ExercisesModel from "../App/models/exercisesModel.js";
import mySqlConnectionQuery from "../Core/Database.js";

let jsonData = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "/Api/exercisesDatabaseList.json"))
);

async function createMultiExercises(data) {
  const query = `INSERT INTO ${ExercisesModel.table_name} (name,target, gifUrl, instructions, bodyPart, secondaryMuscles, equipment) VALUES (?,?,?,?,?,?,?)`;

  data.forEach((exercise) => {
    (exercise.instructions = JSON.stringify(exercise.instructions)),
      (exercise.secondaryMuscles = JSON.stringify(exercise.secondaryMuscles));
  });

  let exercisesInDB = [];
  for (const exercise of data) {
    let [exerciseDb] = await mySqlConnectionQuery(
      `SELECT * FROM ${ExercisesModel.table_name} WHERE name = ?`,
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

const importData = async () => {
  try {
    await createMultiExercises(jsonData);
    console.log("Data imported successfully");
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

importData();
