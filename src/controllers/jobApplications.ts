import axios from "axios";
import { CreateApplicationI } from "../types/jobApplication";

export const getJobApplicationsAPI = async (query: string, sort: string) => {
  const res = await axios.get(
    `http://localhost:8000/api/v1/applications?${query}&${sort}`
  );
  return res.data;
};

export const createJobApplicationAPI = async (data: CreateApplicationI) => {
  const res = await axios.post(
    "http://localhost:8000/api/v1/applications",
    data
  );
  return res.data;
};

export const deleteApplicationById = async (id: string) => {
  const res = await axios.delete(
    `http://localhost:8000/api/v1/applications/${id}`
  );
  return res.data;
};

export const updateJobApplicationAPI = async (
  id: string,
  data: CreateApplicationI
) => {
  const res = await axios.put(
    `http://localhost:8000/api/v1/applications/${id}`,
    data
  );
  return res.data;
};
