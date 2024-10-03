export interface ValidationError {
  type: string;
  title: string;
  status: number;
  errors: {
    [k: string]: string[];
  };
}

export interface HttpError {
  detail?: string;
  status?: number;
}
