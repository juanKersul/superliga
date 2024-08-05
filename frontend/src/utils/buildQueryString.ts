export interface QueryParams {
  select?: string;
  aggregate?: string;
  where?: string;
  groupBy?: string;
  orderBy?: string;
  limit?: number;
}

export const buildQueryString = (params: QueryParams) => {
  const queryString = Object.entries(params)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value
          .map((val) => `${key}=${encodeURIComponent(val)}`)
          .join("&");
      } else if (value !== undefined && value !== null) {
        return `${key}=${encodeURIComponent(value)}`;
      }
      return "";
    })
    .filter(Boolean)
    .join("&");

  return queryString ? `?${queryString}` : "";
};
