import { FileService } from "../services/FileService";

export class FileController {
    constructor(private fileService: FileService) { }

    getAll() {
        return this.fileService.find();
    }
}