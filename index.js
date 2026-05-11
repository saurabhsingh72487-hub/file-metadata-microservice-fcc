const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();

app.use(cors());

const upload = multer({ dest: 'uploads/' });

app.get('/', (req, res) => {
  res.send(`
    <h2>File Metadata Microservice</h2>
    <form action="/api/fileanalyse" method="post" enctype="multipart/form-data">
      <input type="file" name="upfile" />
      <button type="submit">Upload</button>
    </form>
  `);
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});