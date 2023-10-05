import { Controller, Get } from "routing-controllers";
import { FileService } from "../services/FileService";
import { Service } from "typedi";

@Service()
@Controller('/files')
export class FileController {
    constructor(private fileService: FileService) { }

    @Get('/test')
    getAll() {
        return this.fileService.find();
    }
}   