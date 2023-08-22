const File = require('../modals/file_schema');

module.exports.home = async function (req, res) {
  try {
    // Await the query to ensure it's resolved before proceeding
    let files = await File.find({});

    return res.render('home', {
      files: files,
      title: "CSV VIEWER"
    });

  } catch (err) {
    console.log("Error in home controller", err);
    return;
  }
};




