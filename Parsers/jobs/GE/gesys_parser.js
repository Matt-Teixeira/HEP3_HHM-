("use strict");
require("dotenv").config({ path: "../../.env" });
const fs = require("node:fs").promises;
const { log } = require("../../logger");
const filterToArrays = require("../../utils/GE/geys_mroc_helpers");
const { get_sme_modality } = require("../../utils/regExHelpers");
const bulkInsert = require("../../utils/queryBuilder");
const { ge_re } = require("../../utils/parsers");
const mapDataToSchema = require("../../utils/map-data-to-schema");
const { ge_mri_gesys_schema } = require("../../utils/pg-schemas");

async function ge_mri_gesys(filePath) {
  const manufacturer = "ge";
  const version = "gesys_mroc";
  const containsBoxData = [];
  const noBoxData = [];
  const exceptionClassData = [];
  const taskIdData = [];
  const sme_modality = get_sme_modality(filePath);
  const SME = sme_modality.groups.sme;
  const modality = sme_modality.groups.modality;

  await log("info", "NA", `${SME}`, "ge_mri_gesys", "FN CALL", {
    sme: SME,
    modality,
    file: filePath,
  });

  try {
    const fileData = (await fs.readFile(filePath)).toString();

    let matches = fileData.matchAll(ge_re.gesys_mroc.block);
    let matchesArray = [...matches];

    for await (let match of matchesArray) {
      filterToArrays(
        SME,
        match,
        containsBoxData,
        noBoxData,
        exceptionClassData,
        taskIdData
      );
    }

    const concatData = [...containsBoxData, ...noBoxData, ...exceptionClassData, ...taskIdData];

    const mappedData = mapDataToSchema(concatData, ge_mri_gesys_schema);
    console.log(mappedData[0])
    const dataToArray = mappedData.map(({ ...rest }) => Object.values(rest));

    await bulkInsert(
      dataToArray,
      manufacturer,
      modality,
      filePath,
      version,
      SME
    );
  } catch (error) {
    console.log(error);
    await log("error", "NA", `${SME}`, "ge_mri_gesys", "FN CALL", {
      sme: SME,
      manufacturer,
      modality,
      file: filePath,
      error: error.message,
    });
  }
}

module.exports = ge_mri_gesys;