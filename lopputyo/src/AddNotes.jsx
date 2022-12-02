import { useHookstate } from "@hookstate/core";
import { SetViewState } from "./SetView";
// import { CoursesState } from "./Courses";
import { NotesData } from "./Notes";
import FindNextID from "./FindNextID";
import { useEffect } from "react";

const AddNotes = ({ courses }) => {
  //Navigointia varten. ( back to main menu )
  const globalSetView = useHookstate(SetViewState);
  const Notes = useHookstate(NotesData);
  const CurrentSelection = useHookstate(String(courses.at(0).id));
  // const CourseSelected = useHookstate();
  
  let CourseSelected = {
    name: courses
      .filter((curse) => parseInt(curse.id) === parseInt(CurrentSelection.get()))
      .pop().name,
    id: parseInt(CurrentSelection.get()),
  };

  const SelectionLock = useHookstate(false);
  const goBack = (_e) => {
    globalSetView.set("MainView");
  };
  const sessionNotes = useHookstate([]);
  const noteData = useHookstate("");
  const DeepCopyNote = (note) => {
    let CopyOfNote = {
      id: note.id,
      text: note.text,
      course: {
        id: note.course.id,
        name: note.course.name,
      },
      timestamp: note.timestamp,
    };
    return CopyOfNote;
  };
  const saveHandler = (_e) => {
    let data = noteData.get();
    if (data.length > 0) {
      let nextID = FindNextID(Notes.get());
      let aika = new Date().toISOString();
      let note = {
        id: nextID,
        text: data,
        course: {
          id: parseInt(CourseSelected.id),
          name: CourseSelected.name,
        },
        timestamp: aika,
      };
      Notes.merge([note]);
      SelectionLock.set(true);
      sessionNotes.merge([DeepCopyNote(note)]);
      noteData.set("");
    }
  };
  const saveBtnHandler = (e) => {
    var keyCode = "which" in e ? e.which : e.keyCode;
    if (keyCode == 13 &&e.ctrlKey) {
      saveHandler();
    }
  };
  const SelectFilterChanged = (e) => {
    // console.log("selection value: " + Number.parseInt(e.target.value));
    CurrentSelection.set(e.target.value);
  };

  const UpdateSelectedCourse = () => {
    let sel_id = parseInt(CurrentSelection.get());
    let course = courses.filter((c) => c.id === sel_id);
    course = course.pop();
    // console.log("Tried to set course id to " + course.id + " name to " + course.name);
  };
  useEffect(() => {
    UpdateSelectedCourse();
  }, [CurrentSelection]);
  return (
    <div>
      <h2>Add Notes</h2>
      <button id="backBtn" onClick={goBack}>
        Back to main menu
      </button>
      <br />
      <label htmlFor="CourseSelector">Course:</label>
      <select
        disabled={SelectionLock.get()}
        name=""
        id="CourseSelector"
        onChange={SelectFilterChanged}
        value={CurrentSelection.get()}
      >
        {courses.map((item, index) => {
          return (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          );
        })}
      </select>
      <br />
      <textarea
        rows="8"
        cols="40"
        type="text"
        name="note"
        placeholder="new notes..."
        value={noteData.get()}
        onChange={(e) => noteData.set(e.target.value)}
        onKeyDown={saveBtnHandler}
        autoFocus={true}
      />
      <button
        className="AddNotesSaveBtn"
        disabled={courses.length == 0}
        onClick={saveHandler}
      >
        Save
      </button>
      <div className="sessionDiv">
        {sessionNotes.get().map((item, index) => {
          return (
            <p key={index} className="sessionNote">
              {item.text}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default AddNotes;
