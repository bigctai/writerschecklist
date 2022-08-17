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
  userId,
}) => {
  const [pressed, setPressed] = useState(false);
  useEffect(() => {
    retrieveAdded();
  }, []);
  const [added, setAdded] = useState();
  if (deadline) {
    deadline = deadline.substring(0, 10);
  }

  const retrieveAdded = () => {
    ChecklistService.filter(userId).then((response) => {
      setAdded(
        response.data.findIndex(
          (element) => element.journal_name === journal_name
        ) >= 0
          ? true
          : false
      );
    });
  };

  const handleAdd = () => {
    setPressed(!pressed);
    setAdded(!added);
    if (!added) {
      const user_journal = {
        user_id: userId,
        journal_id: id,
      };
      ChecklistService.create(user_journal);
    } else {
      ChecklistService.removeSingleJournal(userId, id);
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
