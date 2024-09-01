import { Router } from "express";
import { aadharOcr } from "../controllers/ocr.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route("/aadhar").post(
    upload.fields([
        { name: "aadhar", maxCount: 1 },
    ]),
    aadharOcr
);

export default router;

