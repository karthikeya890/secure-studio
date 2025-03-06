import multer, { StorageEngine } from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from "uuid";

// Directory where files will be stored
const uploadDir = path.join(process.cwd(), "utils", "../uploads");

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer disk storage
const storage: StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Directory where files will be stored
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = uuidv4();
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

// Create multer instance
const upload = multer({ storage });

export default upload;
