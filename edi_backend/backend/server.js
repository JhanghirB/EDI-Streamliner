const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const { exec } = require('child_process');
const { writeFile, appendFile } = require('fs');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

function doesDataExist(filePath, data) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return fileContent.includes(data);
  } catch (err) {
    console.error('Error reading the file:', err);
    return false;
  }
}


app.use(bodyParser.json());
app.use(cors()); // Enable CORS

app.get('/', (req, res) => {
  res.send('Welcome to the JAR execution server');
});

app.post('/check-combo', (req, res) => {
  const { orgID, claimType } = req.body;
  const filePath = 'C:/Users/Jhang/Desktop/EDIAngular/EdiMetadata.txt'; // Update this path to the actual file path

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err}`);
      return res.status(500).send(`Error reading file: ${err.message}`);
    }

    const lines = data.split('\n');
    const line = lines.find(line => line.startsWith(`${orgID}-`) && line.endsWith(`-${claimType}`));

    if (line) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  });
});

app.post('/remove-line', (req, res) => {
  const { orgID, claimType } = req.body;
  const filePath = 'C:/Users/Jhang/Desktop/EDIAngular/EdiMetadata.txt'; // Update this path to the actual file path

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err}`);
      return res.status(500).send(`Error reading file: ${err.message}`);
    }

    const lines = data.split('\n');
    const filteredLines = lines.filter(line => !(line.startsWith(`${orgID}-`) && line.endsWith(`-${claimType}`)));
    const newData = filteredLines.join('\n');

    fs.writeFile(filePath, newData, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing file: ${err}`);
        return res.status(500).send(`Error writing file: ${err.message}`);
      }

      return res.status(200).json({ message: 'Line removed successfully' });
    });
  });
});


app.post('/run-jar', (req, res) => {
  const { source, destination, claimType, orgID } = req.body;
  const jarPathRemits = 'C:/Users/Jhang/Desktop/EDIAngular/Edi835.jar';
  const jarPathClaims = 'C:/Users/Jhang/Desktop/EDIAngular/Edi837.jar';
  const filePath = 'C:/Users/Jhang/Desktop/EDIAngular/EdiMetadata.txt'; // Update this path to the actual file path

  if (source && destination && claimType && orgID) {
    // When all information is provided
    const jarPath = claimType === '837' ? jarPathClaims : jarPathRemits;
    const command = `java -jar ${jarPath} ${source} ${destination}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing JAR: ${error}`);
        return res.status(500).send(`Error: ${error.message}`);
      }

      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      res.json({ message: 'JAR executed successfully', details: 'Files have been saved.' });

      const metadata = `${orgID}-${source}-${destination}-${claimType}\n`;

      if (!doesDataExist(filePath, metadata)) {
        fs.appendFile(filePath, metadata, (err) => {
          if (err) {
            console.error(`Error appending file: ${err}`);
          }
        });
      }
    });
  } else if (orgID && claimType && !source && !destination) {
    // When only orgID and claimType are provided
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file: ${err}`);
        return res.status(500).send(`Error reading file: ${err.message}`);
      }

      const lines = data.split('\n');
      const line = lines.find(line => line.startsWith(`${orgID}-`) && line.endsWith(`-${claimType}`));

      if (!line) {
        return res.status(404).send('OrgID and ClaimType combination not found in the file.');
      }

      const [foundOrgID, sourceFolder, destinationFolder, foundClaimType] = line.split('-');
      const jarPath = foundClaimType === '837' ? jarPathClaims : jarPathRemits;
      const command = `java -jar ${jarPath} "${sourceFolder}" "${destinationFolder}"`;

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing JAR: ${error}`);
          return res.status(500).send(`Error: ${error.message}`);
        }

        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        res.json({ message: 'JAR executed successfully', details: 'Files have been saved.' });

        const metadata = `${orgID}-${sourceFolder}-${destinationFolder}-${foundClaimType}\n`;

        if (!doesDataExist(filePath, metadata)) {
          fs.appendFile(filePath, metadata, (err) => {
            if (err) {
              console.error(`Error appending file: ${err}`);
            }
          });
        }
      });
    });
  } else {
    res.status(400).send('Invalid request. Required parameters are missing.');
  }
});




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
