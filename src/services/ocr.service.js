import fs from 'fs';
import { createWorker } from 'tesseract.js';

export async function ocrService(imagePath) {
    try {
        const worker = await createWorker("eng");

        const { data: { text } } = await worker.recognize(imagePath);
        await worker.terminate();

        // Regular expression patterns for extracting Aadhaar number and name
        const aadhaarPattern = /\b\d{4}\s\d{4}\s\d{4}\b/;
        const namePattern = /([A-Z]{3,}\s[A-Z]{2,}\s?[A-Z]*)/;

        const aadhaarNumberMatch = text.match(aadhaarPattern);
        const aadhaarNumber = aadhaarNumberMatch ? aadhaarNumberMatch[0] : null;

        const nameMatches = text.match(namePattern);
        const name = nameMatches ? nameMatches[0] : null;
        fs.unlinkSync(imagePath);

        return { name, aadhaarNumber, fullText: text };
    } catch (error) {
        fs.unlinkSync(imagePath);
    }
}
