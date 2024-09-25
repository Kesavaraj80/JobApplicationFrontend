import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  createJobApplicationAPI,
  updateJobApplicationAPI,
} from "../../controllers/jobApplications";
import { CreateJobApplicationSchema } from "../../forms/jobApplicationForm";
import { ApplicationsI, CreateApplicationI } from "../../types/jobApplication";
import Button from "../Common/Button";
import { DropDown } from "../Common/Input/DropDown";
import Input from "../Common/Input/TextField";
import Modal from "../Common/Modal";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  application?: ApplicationsI;
}

const Title = () => {
  return (
    <div className="h-[10%] w-full flex items-center">
      <h1 className="text-lg font-semibold">Create Job</h1>
    </div>
  );
};

const Body = ({
  setIsOpen,
  setRefetch,
  application,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  application?: ApplicationsI;
}) => {
  const createJobApplicationForm = useForm<CreateApplicationI>({
    mode: "onChange",
    resolver: yupResolver(CreateJobApplicationSchema),
  });

  useEffect(() => {
    if (application) {
      createJobApplicationForm.setValue("jobTitle", application.jobTitle);
      createJobApplicationForm.setValue("companyName", application.companyName);
      createJobApplicationForm.setValue("status", application.status);
      createJobApplicationForm.trigger();
    }
  }, [application, createJobApplicationForm]);

  const handleSubmit = (data: CreateApplicationI) => {
    if (application) {
      updateJobApplicationAPI(application._id, data)
        .then((res) => {
          console.log(res);
          setIsOpen(false);
          setRefetch(true);
        })
        .catch((err) => {
          console.log(err);
          setIsOpen(false);
          setRefetch(true);
        });
    } else {
      createJobApplicationAPI(data)
        .then((res) => {
          console.log(res);
          setIsOpen(false);
          setRefetch(true);
        })
        .catch((err) => {
          console.log(err);
          setIsOpen(false);
          setRefetch(true);
        });
    }
  };

  const onSubmit: SubmitHandler<CreateApplicationI> = (data) =>
    handleSubmit(data);

  return (
    <div className="h-[90%] w-full">
      <FormProvider {...createJobApplicationForm}>
        <form onSubmit={createJobApplicationForm.handleSubmit(onSubmit)}>
          <div className="h-auto md:h-[90%]">
            <div className="mt-2">
              <Input
                name="jobTitle"
                variant="primary"
                className="w-full md:w-[420px]"
                label="Job Title"
                required={true}
                placeholder="Enter Job Title"
              />
            </div>

            <div className="mt-2">
              <Input
                name="companyName"
                variant="primary"
                className="w-full md:w-[420px]"
                label="Company Name"
                required={true}
                placeholder="Enter Company Name"
              />
            </div>

            <div className="mt-2">
              <DropDown
                label="Status"
                className={"w-full md:w-[420px]"}
                name="status"
                addDefaultKey={false}
                options={[
                  { label: "Applied", value: "applied" },
                  { label: "Interviewing", value: "interviewing" },
                  { label: "Accepted", value: "accepted" },
                  { label: "Rejected", value: "rejected" },
                ]}
              />
            </div>
          </div>
          <div className="mt-2 h-[10%] flex justify-end space-x-2">
            <Button
              variant="secondary"
              className="w-20"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="w-20"
              variant="primary"
              disabled={!createJobApplicationForm.formState.isValid}
              type="submit"
            >
              Confirm
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

const JobApplicationModal = ({
  isOpen,
  setIsOpen,
  setRefetch,
  application,
}: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      baseClassName="h-auto w-[90%] md:h-[50%] md:w-[25%] max-w-lg"
      setIsOpen={setIsOpen}
      title={<Title />}
      body={
        <Body
          setIsOpen={setIsOpen}
          setRefetch={setRefetch}
          application={application}
        />
      }
    />
  );
};

export default JobApplicationModal;
