import { useHookstate } from "@hookstate/core";
import { CoursesState } from "./Courses";
import Muistiinpano from "./Muistiinpano";
// import { NotesData } from "./Notes";
import { SetViewState } from "./SetView";
// import ParseNotes from "./ParseNotes";

const ListNotes = ({ Notes, deleter }) => {
  const Courses = useHookstate(CoursesState);
  const CourseSelected = useHookstate({ id: -1, name: "all" });
  const GlobalSetView = useHookstate(SetViewState);
  //"Ei muistiinpanoja"
  const EmptySelection = useHookstate(true);
  const goBack = (_e) => {
    GlobalSetView.set("MainView");
  };
  const SelectFilterChanged = (e) => {
    // let count = 0;
    CourseSelected.set({ id: -1, name: "all" });
    for (let item of Courses.get()) {
      if (item.id == e.target.value) {
        // count++;
        CourseSelected.set({ id: item.id, name: item.name });
      }
    }
  };
  const CourseEq = (course1, course2) => {
    if (course1.id == course2.id && course1.name == course2.name) {
      return true;
    }
    return false;
  };
  const isSelected = (item) => {
    if (!item.hasOwnProperty("course")) {
      return false;
    }
    let bool = false;
    bool =
      CourseEq(item.course, CourseSelected.get()) | (CourseSelected.get().id == "-1");
    return bool;
  };
  const FilterNotes = (notes) => {
    // console.log("ListNotes() " + notes.length);
    let out = [];
    notes.map((item, _index) => {
      if (isSelected(item)) {
        out = [...out, item];
        EmptySelection.set(false);
      }
    });
    if (out.length == 0) {
      EmptySelection.set(true);
    }
    return out;
  };
  return (
    <div>
      <h2>Saved notes</h2>
      <button id="backBtn" onClick={goBack}>
        Back to main menu
      </button>
      <br />
      <label htmlFor="CourseSelector">Course:</label>
      <select name="" id="CourseSelector" onChange={SelectFilterChanged}>
        <option value="-1" key="-1">
          all
        </option>
        {Courses.get().map((p, i) => {
          return (
            <option value={p.id} key={i}>
              {p.name}
            </option>
          );
        })}
      </select>
      <div className="MuistiinpanoParent">
        {FilterNotes(Notes, Courses.get()).map((item, _index) => {
          return <Muistiinpano key={_index} item={item} deleter={deleter} />;
        })}
        {EmptySelection.get() === true && <p>Ei muistiinpanoja</p>}
      </div>
    </div>
  );
};

export default ListNotes;
