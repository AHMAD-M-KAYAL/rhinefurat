import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// تحويل __dirname في ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// دالة للحصول على جميع الملفات داخل مجلد بما في ذلك المجلدات الفرعية
function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return [];
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });
  return arrayOfFiles;
}

// دالة لمقارنة حجم الصور قبل وبعد الضغط
function compareImageSizes(originalDir, compressedDir) {
  const originalFiles = getAllFiles(originalDir).filter(f => /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(f));
  const compressedFiles = getAllFiles(compressedDir).filter(f => /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(f));

  if (originalFiles.length === 0) return console.log("No images found in original folder!");
  if (compressedFiles.length === 0) return console.log("No images found in compressed folder!");

  console.log('Comparison of image sizes:\n');

  originalFiles.forEach(originalPath => {
    const relativePath = path.relative(originalDir, originalPath);
    const compressedPath = path.join(compressedDir, relativePath);

    if (fs.existsSync(compressedPath)) {
      const originalSize = fs.statSync(originalPath).size;
      const compressedSize = fs.statSync(compressedPath).size;
      const reduction = (((originalSize - compressedSize) / originalSize) * 100).toFixed(2);

      console.log(`${relativePath}: ${originalSize} → ${compressedSize} bytes (${reduction}% reduction)`);
    } else {
      console.log(`${relativePath}: not found in compressed folder`);
    }
  });
}

// المسارات حسب مشروعك
const originalDir = path.join(__dirname, 'public');    // الصور الأصلية
const compressedDir = path.join(__dirname, 'dist');    // الصور بعد الضغط

compareImageSizes(originalDir, compressedDir);




