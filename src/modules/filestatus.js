const addstate = (Taskarray, Checkbox, index) => {
  const minus = index - 1;
  if (Checkbox.checked) {
    Taskarray[minus].checked = true;
  } else {
    Taskarray[minus].checked = false;
  }
};

export default addstate;
