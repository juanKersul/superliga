import { parse } from "@fast-csv/parse";
import { Readable } from "stream";

export class CSVService {
  async parseCSVStream(stream: Readable): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const rows: any[] = [];
      stream
        .pipe(parse({ headers: ['nombre','edad','equipo','estadoCivil','nivelDeEstudios'], delimiter:';'}))
        .on("data", (row) => {
          rows.push(row);
        })
        .on("end", () => {
          resolve(rows);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }
}
