import { Get, Route, Query, Controller } from "tsoa";
import { PersonsService } from "../services/personService";

@Route("Persons")
export class PersonController extends Controller {
  private personService = new PersonsService();
  @Get("/")
  public async queryUsers(
    @Query() select?: string,
    @Query() aggregate?: string,
    @Query() where?: string,
    @Query() groupBy?: string,
    @Query() orderBy?: string,
    @Query() limit?: number
  ) {
    try {
      console.log(where);
      const data = await this.personService.QueryPersons({
        select,
        aggregate,
        where,
        groupBy,
        orderBy,
        limit,
      });
      return data;
    } catch (error) {
      console.error(error);
      return { error: "bad query" };
    }
  }
}
