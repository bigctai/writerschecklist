import React, { useState, useEffect, useMemo, useRef } from "react";
import JournalDataService from "../services/JournalService";
import { JournalCard } from "./JournalCard/JournalCard";
import "./Journals.css";
import Title from "./Title/Title";
import ChecklistService from "../services/ChecklistService";
import UserService from "../services/UserService";
import useToken from "./useToken";

const Journals = ({ props, words, range }) => {
  const [journals, setJournals] = useState([]);
  const [addedJournals, setAddedJournals] = useState([]);
  useEffect(() => {
    retrieveAddedJournals();
  });
  useEffect(() => {
    retrieveJournals();
  }, []);
  const { token, setToken } = useToken();
  const retrieveJournals = () => {
    if (words && range) {
      JournalDataService.filter(words, range)
        .then((response) => {
          setJournals(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (words) {
      JournalDataService.filter(words)
        .then((response) => {
          setJournals(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      JournalDataService.getAll()
        .then((response) => {
          setJournals(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  //THE PROBLEM IS  THAT THIS IS BEING CONTINUOUSLY CALLED, BUT IF IT ISN'T, THEN IT WILL NOT UPDATE ISADDED WHICH IS UNDER JOURNALCARD
  //BASICALLY, THE PAGE IS BEING CONTINUOSLY UPDATED NOW
  const retrieveAddedJournals = () => {
    let user_id = 0;
    UserService.checkUser(token).then((response) => {
      user_id = response.data.id;
      ChecklistService.filter(user_id).then((response) => {
        setAddedJournals(response.data);
      });
    });
  };
  return (
    <div className="journal-container">
      <Title
        className="ttl"
        titleName="Literary Journals"
        color="orange"
        size="small"
      ></Title>
      <div className="journals">
        {journals &&
          journals.map((journal) => (
            <JournalCard
              id={journal.id}
              journal_name={journal.journal_name}
              word_count={journal.word_count}
              deadline={journal.deadline}
              age_range={journal.range}
              isAdded={
                addedJournals.findIndex(
                  (element) => element.journal_name === journal.journal_name
                ) > 0
              }
            ></JournalCard>
          ))}
      </div>
    </div>
  );
};
export default Journals;
