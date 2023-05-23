import { MeQuery } from "../../graphql/generated/graphql";

export interface PageProps {
  data: MeQuery | undefined;
  fetching: boolean;
}
