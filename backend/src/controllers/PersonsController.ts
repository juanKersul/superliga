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
      data.forEach(person => {
        if (person.Person_nombre !== undefined) person.nombre = person.Person_nombre;
        if (person.Person_edad !== undefined) person.edad = person.Person_edad;
        if (person.Person_equipo !== undefined) person.equipo = person.Person_equipo;
        if (person.Person_estadoCivil !== undefined) person.estadoCivil = person.Person_estadoCivil;
        if (person.Person_nivelDeEstudios !== undefined) person.nivelDeEstudios = person.Person_nivelDeEstudios;
        delete person.Person_nombre;
        delete person.Person_edad;
        delete person.Person_equipo;
        delete person.Person_estadoCivil;
        delete person.Person_nivelDeEstudios;
        delete person["?column?"];
      });

      return data;
    } catch (error) {
      console.error(error);
      return { error: "bad query" };
    }
  }
}
