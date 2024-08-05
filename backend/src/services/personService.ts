import AppDataSource from "../config/database";
import { Person } from "../models/persons";

interface QueryParams {
  select?: string | undefined;
  aggregate?: string | undefined;
  where?: string | undefined;
  groupBy?: string | undefined;
  orderBy?: string | undefined;
  limit?: number | undefined;
}
export class PersonsService {
  private personrepository = AppDataSource.getRepository(Person);
  async QueryPersons(params: QueryParams) {
    let query = this.personrepository.createQueryBuilder();
    if (params.select) {
      const select = params.select.split(",").map((field) => `Person.${field}`);
      query.select(select);
    }
    else {
      query.select("1");
    }
    if (params.aggregate) {
      const aggregates = params.aggregate.split(",");
      aggregates.forEach((aggregate) => {
        const [type, field] = aggregate.split(":").map((part) => part.trim());
        switch (type.toUpperCase()) {
          case "COUNT":
            query.addSelect(`COUNT(Person.${field})`, "count");
            break;
          case "AVG":
            query.addSelect(`AVG(Person.${field})`, "average");
            break;
          case "SUM":
            query.addSelect(`SUM(Person.${field})`, "sum");
            break;
          case "MIN":
            query.addSelect(`MIN(Person.${field})`, "min");
            break;
          case "MAX":
            query.addSelect(`MAX(Person.${field})`, "max");
            break;
        }
      });
    }
    if (params.where) {
      const conditions = params.where.split(",");
      if (conditions.length > 0) {
        const [firstCondition, ...additionalConditions] = conditions;
        const [firstField, firstValue] = firstCondition.split("=");
        query.where(`Person.${firstField} = :${firstField}`, {
          [firstField]: firstValue,
        });

        additionalConditions.forEach((condition) => {
          const [field, value] = condition.split("=");
          query.andWhere(`Person.${field} = :${field}`, { [field]: value });
        });
      }
    }
    if (params.groupBy) {
      const groupByFields = params.groupBy
        .split(",")
        .map((field) => `Person.${field.trim()}`);
      if (groupByFields.length > 0) {
        query.groupBy(groupByFields.shift()!);
        groupByFields.forEach((field) => query.addGroupBy(field));
      }
    }
    if (params.orderBy) {
      const [field, order] = params.orderBy
        .split(":")
        .map((part) => part.trim());
      query.orderBy(`Person.${field}`, order.toUpperCase() as "ASC" | "DESC");
    }
    if (params.limit) {
      query.limit(params.limit);
    }
    console.log(query.getQueryAndParameters());
    const data = await query.getRawMany();
    return data;
  }
}
