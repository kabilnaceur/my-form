export type Input = {
  id: number;
  type: string;
};

export type Element = {
  id: string;
  name: string;
  type: string;
  isRequired: boolean;
  options?: string[] | null;
  style: {
    borderRadius: string;
    borderColor: string;
    fontSize: string;
    color: string;
    backgroud: string;
  };
};

export type Form = {
  id: string;
  name: string;
  description: string;
  elements: Element[];
};
