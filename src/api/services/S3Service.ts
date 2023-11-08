import { Inject, Service } from 'typedi';
import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const bucketName = process.env.AWS_BUCKET_NAME;

@Service()
export class S3Service {

    constructor(@Inject('s3Client') private readonly s3Client: S3) { }

    private generateRandomKey() {
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);

        const randomId = `${timestamp}${random}`;

        return randomId;
    }

    public async generatePreSignedUrl() {
        const preSignedUrl = await getSignedUrl(this.s3Client, new PutObjectCommand({ Bucket: bucketName, Key: this.generateRandomKey() }))
        return { preSignedUrl };
    }
}