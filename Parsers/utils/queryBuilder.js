const pgPool = require("../db/pg-pool");
const { log } = require("../logger");
const convertRowsToColumns = require("./convert-rows-to-columns");
const queries = require("./queries");

async function bulkInsert(data, manufacturer, modality, file, version, sme) {
  try {
    const query = queries[`${manufacturer}`][`${modality}`][`${version}`];

    console.log("Version: " + version);
    console.log(
      "SME: " + sme,
      "Manufacturer: " + manufacturer,
      "Modality: " + modality,
      "File Path: " + file
    );
    const payload = await convertRowsToColumns("1", sme, data, file);

    await log("info", "NA", `${sme}`, "bulkInsert", "FN CALL", {
      query: JSON.stringify(query),
    });

    await pgPool.query(query, payload);
  } catch (error) {
    console.log(error);
    await log("error", "NA", "NA", "bulkInsert", `FN CALL`, {
      error,
      file: file,
    });
  }
}

module.exports = bulkInsert;
