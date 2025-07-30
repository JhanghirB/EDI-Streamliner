# EDI Runner & Metadata Logger (Angular + Node.js)


Provides a user-friendly interface to run EDI parsing JAR files and record user input as metadata, simplifying the execution and tracking of healthcare claim processing tasks.

The project focuses on:
- Creating a seamless Angular + Node.js workflow
- Triggering JAR files with a click
- Logging metadata for traceability

---

## Frontend (Angular)

- Built using Angular CLI
- Collects user input:
  - `User ID`
  - `Claim Type`
  - `Source Folder`
  - `Destination Folder`
- Allows users to:
  - Select claim type (835 or 837)
  - Run the corresponding `.jar` file with a single click
  - View backend responses or processing results

---

## Backend (Node.js)

- Built with Node.js and Express
- Uses `child_process.exec()` to run:
  - `Edi835.jar`
  - `Edi837.jar`
- Generates a `EdiMetadata.txt` file logging:
  - User ID
  - Claim Type
  - Source and Destination folder paths

---

## JAR Integration

- The EDI parsing logic is within the jar files themselves, converting EDI to JSON.
- Backend handles:
  - Executing the JAR file
  - Sending file paths and inputs
  - Logging metadata

---

## Main Use Case

- Abstracts away command-line operations
- Enables non-technical users to process EDI files from a browser
- Adds structured metadata logging for auditing and recordkeeping
- Simplifies the workflow of claim processing in healthcare data environments
