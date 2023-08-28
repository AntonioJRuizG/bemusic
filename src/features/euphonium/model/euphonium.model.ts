import { UserProps } from "../../user/model/user.model";

export type EuphoniumProps = {
  id: string;
  alias: string;
  manufacturer: string;
  instrumentModel: string;
  valves: number;
  material: string;
  marchingBand: boolean;
  image: string;
  creator: Partial<UserProps>;
};

export type EuphoniumResponseBody = {
  results: EuphoniumProps[];
};
