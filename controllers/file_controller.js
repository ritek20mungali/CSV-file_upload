// IMPORTING PACKAGE/MODELS
const fs = require('fs');
const csvParser = require('csv-parser');
const CSV = require('../modals/file_schema');
const path = require('path');

// EXPORTING FUNCTION To upload a file
module.exports.upload = async function(req, res) {
    try {
        // file is not present
        if(!req.file) {
            return res.status(400).send('No files were uploaded.');
        }
        // file is not csv
        if(req.file.mimetype != "text/csv") {
            return res.status(400).send('Select CSV files only.');
        }
        // console.log(req.file);
        let file = await CSV.create({
            fileName: req.file.originalname,
            filePath: req.file.path,
            file: req.file.filename
        });
        return res.redirect('/');
    } catch (error) {
        console.log('Error in fileController/upload', error);
        res.status(500).send('Internal server error');
    }
}


module.exports.view = async function (req, res) {
    try {
      let csvFile = await CSV.findOne({ file: req.params.id });
  
      const itemsPerPage = 10; // Number of items (rows) per page
      const page = parseInt(req.query.page) || 1; // Get the requested page from query
  
      const results = [];
      const header = [];
      let startIndex = (page - 1) * itemsPerPage;
      let endIndex = startIndex + itemsPerPage;
  
      fs.createReadStream(csvFile.filePath)
        .pipe(csvParser())
        .on('headers', (headers) => {
          headers.map((head) => {
            header.push(head);
          });
        })
        .on('data', (data) => results.push(data))
        .on('end', () => {
          const paginatedData = results.slice(startIndex, endIndex);
           
          res.render('file_view', {
            title: 'File Viewer',
            fileName: csvFile.fileName,
            head: header,
            data: paginatedData,
            length: results.length,
            currentPage: page,
            totalPages: Math.ceil(results.length / itemsPerPage),
          });
        });

        console.log(Object.keys);
    } catch (error) {
      console.log('Error in fileController/view', error);
      res.status(500).send('Internal server error');
    }
  };

// EXPORTING FUNCTION To delete the file
module.exports.delete = async function(req, res) {
    try {
        // console.log(req.params);
        let isFile = await CSV.findOne({file: req.params.id});

        if(isFile){
         //for deleting it form the main File system
           fs.unlink(isFile.filePath,(err)=>{
            if (err) {
              console.error('Error deleting file:', err);
          } else {
              console.log('File deleted successfully.');
          }
           })
            await CSV.deleteOne({file: req.params.id});            
            return res.redirect("/");
        }else{
            console.log("File not found");
            return res.redirect("/");
        }
    } catch (error) {
        console.log('Error in fileController/delete', error);
        return;
    }
}