export type Path = {
  id: number;
  name: string;
  isDraft: boolean;
  draftContentSet: Content[];
  publishContentSet: Content[];
  majorId: number;
};

export type Content = {
  id: number;
  rtf: string;
  level: string;
  pathId: number | null;
};

export type Major = {
  Id: number;
  id: number;
  major: number;
  majorTxt: string;
  college: number;
  collegeTxt: string;
  fourYearPlan: string;
  paths: Path[];
};

export type CreateInfoType = {
  isError: boolean;
  isLoading: boolean;
  newId: number;
};

export type SetCurrentContent = React.Dispatch<React.SetStateAction<String>>;
