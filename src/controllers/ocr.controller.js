import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ocrService } from "../services/ocr.service.js";

const aadharOcr = asyncHandler(async (req, res) => {
    // Get the image from the request
    //Send the image for ocr from service tessaract
    // Get response from ocr service
    // Send the response back to the client
    const aadharLocalFilePath = req.files?.aadhar[0]?.path;

    if (!aadharLocalFilePath) {
        throw new ApiError(401, "No File Uploaded! upload AAdhar card image");
    }

    const ocrResponse = await ocrService(aadharLocalFilePath);




    res.status(200)
        .json(new ApiResponse(
            200,
            {
                aadhaarNumber: ocrResponse.aadhaarNumber,
                name: ocrResponse.name,
            },
            "Success"));
});

export { aadharOcr };
