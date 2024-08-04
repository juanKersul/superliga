import { Post, Route, UploadedFile } from "tsoa";
import { CSVService } from "../services/csvParser";
import { StoreService } from "../services/csvStore";
import { Readable } from "stream";

interface UploadResponse {
  message: string;
  fileName: string;
  data?: any[];
}

@Route("Csv")
export default class UploadController {
  private csvService = new CSVService();
  private storeService = new StoreService();

  @Post("/")
  public async uploadFile(
    @UploadedFile() file: Express.Multer.File
  ): Promise<UploadResponse> {
    try {
      const fileStream = Readable.from(file.buffer);
      const data = await this.csvService.parseCSVStream(fileStream);
      await this.storeService.savePersons(data);

      return {
        message: "File uploaded and saved to database successfully",
        fileName: file.originalname
      };
    } catch (error) {
      console.error("Error processing CSV file:");
      return {
        message: "Error processing CSV file",
        fileName: file.originalname,
      };
    }
  }
}
