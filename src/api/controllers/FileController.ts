import { Service } from "typedi";
import { FileService } from "../services/FileService";
import { Get, JsonController } from "routing-controllers";

@Service()
@JsonController('/files')
export class FileController {
    constructor(private fileService: FileService) { }

    @Get()
    public getAll() {
        return this.fileService.find();
    }
}