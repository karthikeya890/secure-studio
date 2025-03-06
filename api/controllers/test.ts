import { Request, Response } from "express";
import upload from "../utils/multer";
import { errorResponse, successResponse } from "../middlewares/responseHandler";
import { s3Service } from "../services/upload";


export class TestController {

    async uploadFile(req: Request, res: Response): Promise<void> {
        try {
            // Multer uploads single file with field name "file"
            upload.single("file")(req, res, async (err) => {
                if (err) return errorResponse({ status: 400, message: "File upload failed" }, res);
                let fileUrl;
                if (req.file) {
                    const file = req.file;
                    const bucketParamKey = `${process.env.APP_NAME}/${process.env.ENVIRONMENT}/documents/test/${file.filename}`;
                    const filePath = file.path;
                    const contentType = file.mimetype;
                    fileUrl = await s3Service.uploadFile(bucketParamKey, filePath, contentType);
                }
                successResponse(res, "File uploaded successfully", { url: fileUrl });
            });
        } catch (error: any) {
            console.log(`🚫  Error: ${error}`);
            errorResponse(error, res);
        }
    }

    async replaceFile(req: Request, res: Response): Promise<void> {
        try {
            // Multer uploads single file with field name "file"
            upload.single("file")(req, res, async (err) => {
                if (err) return errorResponse({ status: 400, message: "File upload failed" }, res);
                let fileUrl;
                if (req.file) {
                    const file = req.file;
                    const previousFileUrl = req.body.url;
                    const filePath = file.path;
                    const contentType = file.mimetype;
                    fileUrl = await s3Service.replaceFile(previousFileUrl, filePath, contentType);
                }
                successResponse(res, "File replaced uploaded successfully", { url: fileUrl });
            });
        } catch (error: any) {
            console.log(`🚫  Error: ${error}`);
            errorResponse(error, res);
        }
    }

    async deleteFile(req: Request, res: Response): Promise<void> {
        try {
            const fileUrl = await s3Service.deleteFile(req.body.url);
            successResponse(res, "File Deleted uploaded successfully", { url: fileUrl });
        } catch (error: any) {
            console.log(`🚫  Error: ${error}`);
            errorResponse(error, res);
        }
    }
}

export const testController = new TestController();
