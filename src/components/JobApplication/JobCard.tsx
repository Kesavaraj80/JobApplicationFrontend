import { PencilIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/20/solid";
import { ApplicationsI } from "../../types/jobApplication";
import { deleteApplicationById } from "../../controllers/jobApplications";
import { useState } from "react";
import JobApplicationModal from "./JobApplicationModal";

interface Props {
  application: ApplicationsI;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const JobCard = ({ application, setRefetch }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = (id: string) => {
    deleteApplicationById(id)
      .then(() => setRefetch(true))
      .catch((err) => console.error(err));
  };
  return (
    <div className="h-60 w-64 border rounded-lg shadow-lg bg-white">
      <div className="h-[80%] w-full p-4 space-y-2">
        <h1 className="text-xl font-semibold text-gray-800">
          {application.jobTitle}
        </h1>
        <h2 className="text-lg font-medium text-gray-600">
          {application.companyName}
        </h2>
        <h3 className="text-sm text-gray-500">Date: {application.date}</h3>
        <h4 className="text-sm font-medium">Status: {application.status}</h4>
      </div>
      <div className="h-[20%] w-full flex border-t border-gray-200">
        <button
          className="w-[50%] flex justify-center items-center py-2 hover:bg-blue-50"
          onClick={() => setIsOpen(true)}
        >
          <PencilIcon className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-blue-600 font-medium">Edit</span>
        </button>
        <button
          className="w-[50%] flex justify-center items-center py-2 hover:bg-red-50"
          onClick={() => handleDelete(application._id)}
        >
          <TrashIcon className="h-6 w-6 text-red-500" />
          <span className="ml-2 text-red-500 font-medium">Delete</span>
        </button>
      </div>
      {isOpen && (
        <JobApplicationModal
          isOpen={isOpen}
          setRefetch={setRefetch}
          setIsOpen={setIsOpen}
          application={application}
        />
      )}
    </div>
  );
};

export default JobCard;
