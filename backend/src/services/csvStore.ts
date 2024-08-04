import AppDataSource from "../config/database";
import { Person } from "../models/persons";

export class StoreService {
  private personRepository = AppDataSource.getRepository(Person);
  private readonly BATCH_SIZE = 1000;

  async savePersons(persons: Person[]): Promise<void> {
    try {
      for (let i = 0; i < persons.length; i += this.BATCH_SIZE) {
        const batch = persons.slice(i, i + this.BATCH_SIZE);

        await this.personRepository
          .createQueryBuilder()
          .insert()
          .into(Person)
          .values(batch)
          .execute();
      }
    } catch (error) {
      console.error("Error saving persons:", error);
      throw error;
    }
  }
}
