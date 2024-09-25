import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { getJobApplicationsAPI } from "../../controllers/jobApplications";
import { ApplicationsI } from "../../types/jobApplication";
import { Select } from "../Common/Input/DropDown";
import { Pagination } from "../Common/Pagination";
import JobApplicationModal from "./JobApplicationModal";
import JobCard from "./JobCard";

interface response {
  data: ApplicationsI[];
  totalPages: number;
}
const Dashboard = () => {
  const [applications, setApplications] = useState<ApplicationsI[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const query = `page=${currentPage}&status=${
      statusFilter !== "" ? statusFilter : null
    }`;
    getJobApplicationsAPI(query, "")
      .then((res) => {
        const { data, totalPages } = res as unknown as response;
        setApplications(data);
        setTotalPages(totalPages);
        setRefetch(false);
      })
      .catch((err) => console.error(err));
  }, [currentPage, refetch, statusFilter]);

  return (
    <div className="h-[90%] w-full ">
      <div className="h-[10%] w-full flex border-b">
        <div className="h-full w-11/12  flex items-center">
          <div>
            <Select
              className="w-44"
              name=""
              options={[
                { label: "Applied", value: "applied" },
                { label: "Interviewing", value: "interviewing" },
                { label: "Accepted", value: "accepted" },
                { label: "Rejected", value: "rejected" },
              ]}
              onChange={(e) =>
                e.target.value !== "Select" && setStatusFilter(e.target.value)
              }
            />
          </div>
        </div>
        <div className="h-full w-96 flex justify-center items-center">
          <button onClick={() => setIsOpen(true)} className="flex items-center">
            <PlusCircleIcon className="h-10 w-10 text-blue-900" />
            <span className="ml-2 text-blue-900 text-lg">Add Job</span>
          </button>
        </div>
      </div>
      <div className="h-[80%] w-full grid p-4 grid-cols-1 overflow-auto md:grid-cols-7">
        {applications.length > 0 &&
          applications.map((item: ApplicationsI, index: number) => {
            return (
              <JobCard
                application={item}
                key={`${index}_card`}
                setRefetch={setRefetch}
              />
            );
          })}
      </div>
      {totalPages > 1 && (
        <div className="h-[10%] w-full border-t">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            perPage={1}
            onPageChange={(page: number) => {
              setCurrentPage(page);
            }}
          />
        </div>
      )}
      {isOpen && (
        <JobApplicationModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setRefetch={setRefetch}
        />
      )}
    </div>
  );
};

export default Dashboard;
