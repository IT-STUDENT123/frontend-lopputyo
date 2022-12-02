import ListNotes from "./ListNotes";
import { CoursesState } from "./Courses";
import { NotesData } from "./Notes";
import { useEffect } from "react";
import { useHookstate } from "@hookstate/core";
import AddCourses from "./AddCourses";
import { SetViewState } from "./SetView";
import AddNotes from "./AddNotes";
import ParseNotes from "./ParseNotes";
import NoteValidator from "./NoteValidator";

const MainComponent = () => {
  const SetView = useHookstate(SetViewState);
  const NewNotesButtonDisabled = useHookstate(true);
  const Courses = useHookstate(CoursesState);
  const Notes = useHookstate(NotesData);

  const DeepCopyNote = (note) => {
    let CopyOfNote = {
      id: parseInt(note.id),
      text: note.text,
      course: {
        id: parseInt(note.course.id),
        name: note.course.name,
      },
      timestamp: note.timestamp,
    };
    return CopyOfNote;
  };
  const ValidNotes = (notes) => {
    let valid_notes = [];
    if (typeof notes === "object" && notes.length !== 0) {
      notes.map((note) => {
        if (NoteValidator(note) === true) {
          let copy = DeepCopyNote(note);
          valid_notes = [...valid_notes, copy];
        }
      });
    }
    return valid_notes;
  };
  const ValidCourses = (courses) => {
    if (courses.length > 0) {
      if (typeof courses !== "object") {
        //????
        return [];
      } else {
        let courses_ok = [];
        courses.map((curse, _index) => {
          let valid = true;
          if (!curse.hasOwnProperty("id") || typeof curse.id !== "number") {
            valid = false;
          }
          if (curse.hasOwnProperty("name") && typeof curse.name !== "string") {
            valid = false;
          }
          if (valid) {
            let newcourse = { id: curse.id, name: curse.name };
            courses_ok = [...courses_ok, newcourse];
          }
        });
        return courses_ok;
      }
    }
    return [];
  };
  useEffect(() => {
    const fetchOpintojaksot = async () => {
      const data = await fetch("https://luentomuistiinpano-api.deta.dev/courses/");
      let json = await data.json();
      let valid_courses = ValidCourses(json);
      Courses.set(valid_courses);
    };
    fetchOpintojaksot();
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await fetch("https://luentomuistiinpano-api.deta.dev/notes/");
      let json = await data.json();
      let valid_notes = ValidNotes(json);
      Notes.set(valid_notes);
    };
    fetchNotes();
  }, []);

  //Jos kursseja löytyy, voi mennä lisäämään muistiinpanoja
  //Testaa muistiinpanojen oikeellisuus
  useEffect(() => {
    const CourseCheck = () => {
      NewNotesButtonDisabled.set(true);
      if (Courses.get().length > 0) {
        NewNotesButtonDisabled.set(false);
      }
    };
    CourseCheck();
  }, [Courses]);

  useEffect(() => {
    const NotesCheck = () => {
      let valid_notes = [];
      // console.log("notes len before " + Notes.get().length);
      //huom. ei tässä vielä karsi pois kurssin peruseella
      valid_notes = ValidNotes(Notes.get());
      Notes.set(valid_notes);
      // console.log("notes len after " + Notes.get().length);
    };
    NotesCheck();
  }, [NotesData]);
  const SwitchMain = (_e) => {
    SetView.set("MainView");
  };
  const SwitchNewNotes = (_e) => {
    SetView.set("NewNotes");
  };
  const SwitchAddCourse = (_e) => {
    SetView.set("AddCourse");
  };
  const SwitchListNotes = (_e) => {
    SetView.set("ListNotes");
  };

  const NoteDeleter = (toDelete) => {
    // console.log("(MainComponent) Poista id: " + toDelete.id);
    let reducedNotes = [];
    let exists = false;
    Notes.get().map((item, _index) => {
      if (item.id == toDelete.id && item.text == toDelete.text) {
        exists = true;
      } else {
        let keepItem = {
          id: item.id,
          text: item.text,
          course: { id: item.course.id, name: item.course.name },
          timestamp: item.timestamp,
        };
        reducedNotes = [...reducedNotes, keepItem];
      }
    });
    if (exists === true) {
      Notes.set(reducedNotes);
    }
  };

  return (
    <div className="MainComponent">
      <h1>NotesApp</h1>
      {SetView.get() == "MainView" && (
        <div>
          <h2>&nbsp;</h2>
          <button disabled={NewNotesButtonDisabled.get()} onClick={SwitchNewNotes}>
            New Notes
          </button>
          <button onClick={SwitchListNotes}>List Notes</button>
          <button onClick={SwitchAddCourse}>Add course</button>
        </div>
      )}
      <div>
        {SetView.get() === "ListNotes" && (
          <ListNotes
            b={SwitchMain}
            deleter={NoteDeleter}
            Notes={ParseNotes(Notes.get(), Courses.get())}
          />
        )}
        {SetView.get() === "AddCourse" && <AddCourses b={SwitchMain} />}
        {SetView.get() === "NewNotes" && (
          <AddNotes courses={ValidCourses(Courses.get())} />
        )}
      </div>
    </div>
  );
};

export default MainComponent;
