import React, { useState, useEffect, useMemo, useRef } from "react";
import ChecklistDataService from "../services/ChecklistService";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { Title } from "./Title/Title";
import { Button } from "./Button/Button";
import "./UserJournalsList.css";
import useToken from "./useToken";
import UserService from "../services/UserService";

const UserJournalsList = (props) => {
  const [journals, setJournals] = useState([]);
  const [searchJournalName, setSearchJournalName] = useState("");
  const journalsRef = useRef();
  journalsRef.current = journals;
  const { token, setToken } = useToken();
  const [id, setId] = useState(0);
  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    retrieveUser();
  }, []);

  const retrieveUser = () => {
    UserService.checkUser(token).then((response) => {
      const id = response.data.id;
      retrieveJournals(id);
    });
  };
  const onChangeSearchJournalName = (e) => {
    const searchJournalName = e.target.value;
    setSearchJournalName(searchJournalName);
  };
  const retrieveJournals = (id) => {
    ChecklistDataService.get(id)
      .then((response) => {
        setJournals(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const refreshList = () => {
    retrieveJournals();
  };
  const removeAllJournals = () => {
    ChecklistDataService.removeForUser(id)
      .then((response) => {
        console.log(response.data);
        refreshList();
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
  const deleteJournal = (rowIndex) => {
    const journal_id = journalsRef.current[rowIndex].id;
    ChecklistDataService.removeSingleJournal(id, journal_id)
      .then((response) => {
        props.history.push("/user_journals");
        let newJournals = [...journalsRef.current];
        newJournals.splice(rowIndex, 1);
        setJournals(newJournals);
      })
      .catch((e) => {
        console.log(e);
      });
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
      },
      {
        Header: "Submitted",
        accessor: "submitted",
        Cell: (props) => {
          return props.value ? "Yes" : "No";
        },
      },
      {
        Header: "Heard Back",
        accessor: "heard_back",
        Cell: (props) => {
          return props.value ? "Yes" : "No";
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
