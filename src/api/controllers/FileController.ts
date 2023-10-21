import { Service } from "typedi";
import { FileService } from "../services/FileService";

@Service()
export class FileController {
    constructor(private fileService: FileService) { }

    getAll() {
        return this.fileService.find();
    }
}