import { S3, PutObjectCommand, PutObjectCommandInput, ObjectCannedACL, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { createReadStream, promises as fsPromises } from "fs";
import url from "url";

const s3Client = new S3({
    forcePathStyle: false,
    endpoint: process.env.S3_ENDPOINT_URL,
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
});

const bucketName = `${process.env.ENVIRONMENT}-${process.env.S3_BUCKET_PREFIX}`;

export class S3Service {
    async uploadFile(bucketParamKey: string, filePath: string, contentType: string): Promise<string> {
        if (!bucketParamKey || !filePath) {
            console.debug("Key or filePath not received");
            return "";
        }

        const fileStream = createReadStream(filePath);
        const bucketParams: PutObjectCommandInput = {
            Bucket: bucketName,
            Key: bucketParamKey,
            Body: fileStream,
            ContentType: contentType,
            ACL: "public-read" as ObjectCannedACL,
        };

        try {
            const data = await s3Client.send(new PutObjectCommand(bucketParams));
            console.log("Uploaded data", data);
            return `https://${bucketName}.${process.env.S3_REGION}.cdn.digitaloceanspaces.com/${bucketParamKey}`;
        } catch (err) {
            console.error("File Upload Failed:", err);
            return "";
        } finally {
            await fsPromises.unlink(filePath);
        }
    }

    async deleteFile(fileUrl: string): Promise<boolean> {
        try {
            const parsedUrl = new URL(fileUrl);
            const fileKey = decodeURIComponent(parsedUrl.pathname.substring(1));
    
            if (!fileKey) {
                console.error("Invalid file URL format");
                return false;
            }
    
            await s3Client.send(new DeleteObjectCommand({ Bucket: bucketName, Key: fileKey }));
            console.log("File deleted successfully:", fileKey);
            return true;
        } catch (err) {
            console.error("File Deletion Failed:", err);
            return false;
        }
    }

    async replaceFile(previousFileUrl: string, filePath: string, contentType: string): Promise<string> {
        const isDeleted = await this.deleteFile(previousFileUrl);
        
        if (!isDeleted) {
            console.error("Failed to delete previous file, skipping upload");
            return "";
        }
    
        // Extract file key and upload a new file with the same key
        const parsedUrl = new URL(previousFileUrl);
        const fileKey = decodeURIComponent(parsedUrl.pathname.substring(1));
    
        return await this.uploadFile(fileKey, filePath, contentType);
    }
}

export const s3Service = new S3Service();