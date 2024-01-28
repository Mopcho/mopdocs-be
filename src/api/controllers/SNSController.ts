import { Service } from "typedi";
import { FileService } from "../services/FileService";
import { Body, Controller, Post } from "routing-controllers";
import { responseFormatter } from "../utils";
import { S3Service } from "../services/S3Service";

interface SNSBody {
    Type: string,
    MessageId: string,
    TopicArn: string,
    Subject: string,
    Message: string
    Timestamp: string,
    SignatureVersion: string,
    Signature: string,
    SigningCertURL: string,
    UnsubscribeURL: string
}

interface SNSUserIdentity {
    principalId: string;
}

interface SNSRequestParameters {
    sourceIPAddress: string;
}

interface SNSResponseElements {
    "x-amz-request-id": string,
    "x-amz-id-2": string;
}

interface SNSS3 {
    s3SchemaVersion: string;
    bucket: SNSBucket,
    object: SNSObject
}

interface SNSBucket {
    name: string;
    ownerIdentity: SNSUserIdentity;
    arn: string;
}

interface SNSObject {
    key: string;
    size: number;
    eTag: string;
    sequencer: string;
}
interface SNSRecord {
    eventVersion: string,
    eventSource: string,
    awsRegion: string,
    eventTime: string,
    eventName: string,
    userIdentity: SNSUserIdentity,
    requestParameters: SNSRequestParameters,
    responseElements: SNSResponseElements,
    s3: SNSS3,
    configurationId: string,
}

interface SNSMessage {
    Records: SNSRecord[]
}

@Service()
@Controller('/sns')
export class SNSController {
    constructor(private fileService: FileService, private s3Service: S3Service) { }

    @Post('/object-created')
    public async objectCreated(@Body() body: SNSBody) {
        const snsMessage: SNSMessage = JSON.parse(body.Message);
        const messageRecords = snsMessage.Records;

        let response = [];
        for (const record of messageRecords) {
            const metadata = await this.s3Service.fetchMetadataForFile(record.s3.object.key);

            const file = await this.fileService.createFile({
                awsKey: record.s3.object.key,
                contentType: metadata.ContentType,
                ownerId: metadata.Metadata.userid
            });

            response.push(file);
        }

        return responseFormatter(response);
    }
}