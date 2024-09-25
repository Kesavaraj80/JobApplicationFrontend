import * as Yup from "yup";

export const CreateJobApplicationSchema = Yup.object().shape({
  jobTitle: Yup.string().required("Job Title Required"),
  companyName: Yup.string().required("Company Name Required"),
  status: Yup.string().required("Status Required"),
});
