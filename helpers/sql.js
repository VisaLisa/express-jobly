const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.

// Calling this function will allow the SQL to update the name & age set
//dataToUpdate (Object) - new Valuess
//jsToSql (Object) - maps data fields to database column names; example { firstName: "bob", age: "1" }

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map(
    (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );

  //returning (object) {SetCols, dataToUpdate} in
  // {firstName: 'Aliya', age: 32} =>
  // { setCols: '"first_name"=$1, "age"=$2',
  //    values: ['Aliya', 32] }
  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
