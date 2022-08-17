import { useState } from 'react';
import "./UserJournalsList.css";
import useToken from "./useToken";
import UserService from "../services/UserService";
  
export default function useId() {
    const retrieveUser = () => {
        UserService.checkUser(token).then((response) => {
            setId((id) => (id = response.data.id));
        });
    };
    const { token, setToken } = useToken();
    const [id, setId] = useState(retrieveUser);

    const saveId = id =>{
        setId(id)
    }
    

  return {
    setId: saveId,
    id: id
  }
}