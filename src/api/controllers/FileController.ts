import { Service } from "typedi";
import { FileService } from "../services/FileService";
import { Delete, Get, JsonController, Param, Post, QueryParam, Session, UseBefore } from "routing-controllers";
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
    public async findFiles(@QueryParam('page') page, @QueryParam('pageSize') pageSize, @Session() session) {
        return responseFormatter(await this.fileService.findFiles(session.user.id, { page, pageSize }));
    }

    @Delete()
    public async deleteAllFiles() {
        return responseFormatter(await this.fileService.deleteAllFiles());
    }

    @Delete('/:id')
    public async deleteOne(@Param("id") id: string, @Session() session) {
        return responseFormatter(await this.fileService.deleteOne(id, session.user.id));
    }
}