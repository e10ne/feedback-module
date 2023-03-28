import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Scalars } from "../../graphql/generated/graphql";

export function fullFormat(date: Scalars["DateTime"]) {
  return format(new Date(date), "PPPP", {
    locale: nl,
  });
}
