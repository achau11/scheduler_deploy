export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(val => val.name === day);
  const arr = [];

  filteredDays.map(day => {
    day.appointments.map(appointment => {
      arr.push(state.appointments[appointment]);
    });
  });
  
  return arr;
}
//Get interviewers for a specific day
export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter(val => val.name === day);
  const arr = [];

  filteredDays.map(day => {
    day.interviewers.map(interviewer => {
      arr.push(state.interviewers[interviewer]);
    });
  });
  
  return arr;
}

export function getInterview(state, interview) {
  const obj = {}

  for(let key in state.interviewers) {
    if (interview === null) return null;

    if (state.interviewers[key].id === interview.interviewer) {
      obj['student'] = interview.student;
      obj['interviewer'] = state.interviewers[key];
    }
  }

  return obj;
}