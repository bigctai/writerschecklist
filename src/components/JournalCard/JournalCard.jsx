import React, { useState, useEffect } from "react";
import "./JournalCard.css";
import { Button } from "../Button/Button";
import ChecklistService from "../../services/ChecklistService";
import UserService from "../../services/UserService";
import useToken from "../useToken";

export const JournalCard = ({
  id,
  journal_name,
  word_count,
  deadline,
  age_range,
  isAdded,
}) => {
  useEffect(() => {
    retrieveUser();
  }, [isAdded]);
  const [added, setAdded] = useState(isAdded);
  let user_id = 0;
  const retrieveUser = () => {
    console.log(isAdded);
    setAdded(isAdded);
    UserService.checkUser(token).then((response) => {
      user_id = response.data.id;
    });
  };

  const token = useToken();

  const handleAdd = () => {
    setAdded(!added);
    if (!added) {
      const user_journal = {
        user_id: user_id,
        journal_id: id,
      };
      ChecklistService.create(user_journal);
    }
  };
  return (
    <div className="journals-display">
      <div className="product-wrap">
        <img src={`${journal_name}.png`} alt={`${journal_name}`}></img>
        <div className="buttons">
          <Button
            className="btn-add"
            buttonStyle={`${added ? "btn--red" : "btn--primary"}`}
            children={`${added ? "Remove From Checklist" : "Add to Checklist"}`}
            onClick={handleAdd}
          ></Button>
          <Button
            className="btn-add"
            children="Read More"
            buttonStyle="btn--blue"
            buttonSize="btn--small"
          ></Button>
        </div>
      </div>
      <div className="description">
        <h4 className="journal-name">{journal_name}</h4>
        <div className="descriptors">
          <p className="descriptor">{`Deadline: ${deadline}`}</p>
          <p className="descriptor">{`Word Count: ${
            word_count ? word_count : "None"
          }`}</p>
          <p className="descriptor">{`Age Range: ${age_range}`}</p>
        </div>
      </div>
    </div>
  );
};
