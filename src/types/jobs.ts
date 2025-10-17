export type JobListing = {
  title: string;
  link?: string;
  date?: string;
  companyName?: string;
  location?: string;
  salary?: string;
  created?: string | number;
};

export type JobsResponse = {
  jobs?: JobListing[];
  updatedAt?: string;
};
