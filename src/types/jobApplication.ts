export interface ApplicationsI {
  _id: string;
  jobTitle: string;
  companyName: string;
  date: string;
  status: string;
}

export interface CreateApplicationI {
  jobTitle: string;
  companyName: string;
  status: string;
}
