import http from "../http-common";
const getAll = () => {
  return http.get("/checklist");
};
const filter = (user_id, journal_id) => {
  return http.get(`/checklist?user_id=${user_id}&journal_id=${journal_id}`)
}
const get = (id) => {
  return http.get(`/checklist/${id}`);
};
const create = (data) => {
  return http.post("/checklist", data);
};
const update = (journal_id, user_id, data) => {
  return http.put(`/checklist/${user_id}/${journal_id}`, data);
};
const removeForUser = (id) => {
  return http.delete(`/checklist/${id}`);
};
const removeSingleJournal = (user_id, journal_id) => {
  return http.delete(`/checklist/${user_id}/${journal_id}`);
};
const ChecklistService = {
  getAll,
  filter,
  get,
  create,
  update,
  removeForUser,
  removeSingleJournal,
};
export default ChecklistService;