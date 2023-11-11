import { Service } from "typedi";
import { FileService } from "../services/FileService";
import { Delete, Get, JsonController, Post, Session, UseBefore } from "routing-controllers";
import { isAuthenticated } from "../middlewares/IsAuthenticated";
import { responseFormatter } from "../utils";

@Service()
@JsonController('/files')
@UseBefore(isAuthenticated)
export class FileController {
    constructor(private fileService: FileService) { }

    @Post()
    public async generatePutPreSignedUrl(@Session() session) {
        return responseFormatter(await this.fileService.generatePutPreSignedUrl(session.user.id));
    }

    @Get()
    public async findFiles() {
        return responseFormatter(await this.fileService.findFiles());
    }

    @Delete()
    public async deleteAllFiles() {
        return responseFormatter(await this.fileService.deleteAllFiles());
    }
}