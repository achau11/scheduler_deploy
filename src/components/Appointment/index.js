import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Status from "../Appointment/Status";
import Confirm from './Confirm';
import Error from './Error';
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";

import 'components/Appointment/styles.scss';


export default function Appointment(props) {
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = 'DELETING';
  const CONFIRM = 'CONFRIM';
  const EDIT = "EDIT";
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  //Save appointments 
  function save(name, interviewer) {
  
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  //Delete appointments
  function remove() {
    
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {mode === SAVING && <Status message="Saving" />}
      {mode === ERROR_SAVE && <Error message='Could not save appointment' onClose={back}/>}
      {mode === ERROR_DELETE && <Error message='Could not delete appointment' onClose={back}/>}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}  
      {mode === CREATE && <Form name={props.name} value={props.value} interviewers={props.interviewers} onCancel={back} onSave={save}/>}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === CONFIRM && (
        <Confirm 
          message={"Are you sure you would like to delete?"}
          onCancel={back}
          onConfirm={remove}
        />
      )}
    </article>
  );
} 