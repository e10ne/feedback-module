import format from "date-fns/format";
import nl from "date-fns/locale/nl";
import { Scalars } from "../../graphql/generated/graphql";

export function fullFormat(date: Scalars["DateTime"]) {
  return format(new Date(date), "PPPP", {
    locale: nl,
  });
}

export function normalFormat(date: Scalars["DateTime"]) {
  return format(new Date(date), "dd-MM-yyyy");
}
