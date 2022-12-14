import React, { useState, useEffect, useMemo, useRef } from "react";
import ChecklistDataService from "../services/ChecklistService";
import { useTable } from "react-table";
import { Title } from "./Title/Title";
import { Button } from "./Button/Button";
import { CheckBox } from "./CheckBox/CheckBox";
import "./UserJournalsList.css";
import useToken from "./useToken";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserJournalsList = (props) => {
  const [journals, setJournals] = useState([]);
  const [searchJournalName, setSearchJournalName] = useState("");
  const journalsRef = useRef();
  journalsRef.current = journals;
  const { token, setToken } = useToken();
  console.log(token);
  useEffect(() => {
    retrieveJournals();
  }, [token]);

  const onChangeSearchJournalName = (e) => {
    const searchJournalName = e.target.value;
    setSearchJournalName(searchJournalName);
  };
  const refreshList = () => {
    retrieveJournals();
    window.location.reload(false);
  };
  const removeAllJournals = () => {
    ChecklistDataService.removeForUser(token)
      .then((response) => {
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const deleteJournal = (rowIndex) => {
    const journal_id = journalsRef.current[rowIndex].id;
    ChecklistDataService.removeSingleJournal(token, journal_id)
      .then((response) => {
        let newJournals = [...journalsRef.current];
        newJournals.splice(rowIndex, 1);
        setJournals(newJournals);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const retrieveJournals = () => {
    console.log("hey");
    ChecklistDataService.get(token)
      .then((response) => {
        if (response.data.length) {
          setJournals(response.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const findByJournalName = () => {
    ChecklistDataService.findByJournalName(searchJournalName)
      .then((response) => {
        setJournals(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const updateSubmitted = (rowIndex, submitted) => {
    let journal = {
      ...journalsRef.current[rowIndex],
      ["submitted"]: submitted,
    };
    ChecklistDataService.update(
      journalsRef.current[rowIndex].id,
      token,
      journal
    );
    retrieveJournals();
  };

  //JournalsRef returns the journal as it currently is, so it doesn't account for a change in submitted if submitted was changed earlier
  const updateHeardBack = (rowIndex, heardBack) => {
    let journal = {
      ...journalsRef.current[rowIndex],
      ["heard_back"]: heardBack,
    };
    ChecklistDataService.update(
      journalsRef.current[rowIndex].id,
      token,
      journal
    );
  };
  const columns = useMemo(
    () => [
      {
        Header: "Literary Journal",
        accessor: "journal_name",
      },
      {
        Header: "Genre",
        accessor: "genre",
      },
      {
        Header: "Deadline",
        accessor: "deadline",
        Cell: (props) => {
          if (props.value) return props.value.substring(0, 10);
        },
      },
      {
        Header: "Submitted",
        accessor: "submitted",
        Cell: (props) => {
          return (
            <CheckBox
              onClick={() => updateSubmitted(props.row.id, !props.value)}
              checked={props.value ? true : false}
            />
          );
        },
      },
      {
        Header: "Heard Back",
        accessor: "heard_back",
        Cell: (props) => {
          return (
            <CheckBox
              onClick={() => updateHeardBack(props.row.id, !props.value)}
              checked={props.value ? true : false}
            />
          );
        },
      },
      {
        Header: "Delete",
        accessor: "delete",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => deleteJournal(rowIdx)}>
                <FontAwesomeIcon
                  className="discard"
                  icon={faTrash}
                ></FontAwesomeIcon>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: journals,
    });
  return (
    <div className="checklist-container">
      <Title
        className="ttl"
        titleName="Your Checklist"
        color="orange"
        size="small"
      ></Title>
      <div className="search">
        <input
          type="search"
          className="form-control"
          placeholder="Search"
          value={searchJournalName}
          onChange={onChangeSearchJournalName}
        ></input>
        <Button children="Search" onClick={findByJournalName}></Button>
      </div>
      <div className="table-container">
        <table className="table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="bottom-section">
        <Button
          children="Remove All"
          onClick={removeAllJournals}
          buttonStyle="btn--red"
        ></Button>
        <Button destination="/Explore" children="Explore More"></Button>
      </div>
    </div>
  );
};
export default UserJournalsList;
