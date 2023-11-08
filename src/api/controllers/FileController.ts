import { Service } from "typedi";
import { FileService } from "../services/FileService";
import { JsonController, Post, UseBefore } from "routing-controllers";
import { isAuthenticated } from "../middlewares/IsAuthenticated";
import { responseFormatter } from "../utils";

@Service()
@JsonController('/files')
@UseBefore(isAuthenticated)
export class FileController {
    constructor(private fileService: FileService) { }

    @Post()
    public async getSignature() {
        return responseFormatter(await this.fileService.getSignature());
    }
}