import http from "../http-common";
const checkUser = (email) => {
  return http.get(`/users?email=${email}`);
};
const get = (id) => {
  return http.get(`/users/${id}`);
};
const create = (data) => {
  return http.post("/users", data);
};
const update = (id, data) => {
  return http.put(`/users/${id}`, data);
};
const remove = (id) => {
  return http.delete(`/users/${id}`);
};
const removeAll = () => {
  return http.delete(`/users`);
};

const UserService = {
  checkUser,
  get,
  create,
  update,
  remove,
  removeAll,
};
export default UserService;