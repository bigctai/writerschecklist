import http from "../http-common";
const getAll = () => {
  return http.get("/journals");
};
const get = (id) => {
  return http.get(`/journals/${id}`);
};
const create = (data) => {
  return http.post("/journals", data);
};
const filter = (word_count, range) =>{
  return http.get(`/journals?word_count=${word_count}&range=${range}`);
}
const findByJournalName = (journal_name) => {
  return http.get(`/journal?journal_name=${journal_name}`);
};
const JournalService = {
  getAll,
  get,
  create,
  filter,
  findByJournalName,
};
export default JournalService;