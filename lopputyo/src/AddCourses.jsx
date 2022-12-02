import { useHookstate } from "@hookstate/core";
import { CoursesState } from "./Courses";
import { SetViewState } from "./SetView";
import FindNextID from "./FindNextID";

const AddCourses = () => {
  const globalSetView = useHookstate(SetViewState);
  const Courses = useHookstate(CoursesState);
  const savedCourse = useHookstate(null);
  const goBack = (_e) => {
    globalSetView.set("MainView");
  };
  const course = useHookstate("");
  const saveHandler = (_e) => {
    if (course.get() === "") {
      return;
    } else {
      TryAdd(course.get());
    }
  };
  const TryAdd = (candidate) => {
    let dup = false;
    for (let i = 0; i < Courses.get().length && dup == false; i++) {
      if (Courses.get()[i].name == candidate) {
        dup = true;
      }
    }
    //Jos ei oo duplikaatti, voidaan lisätä.
    if (dup === false) {
      let nextID = FindNextID(Courses.get());
      // console.log("nextID = " + nextID);
      let newCourse = { id: nextID, name: candidate };
      savedCourse.set(newCourse);
      Courses.merge([newCourse]);
      course.set("");
    }
  };
  const saveButtonHandler = (e) => {
   var keyCode = ('which' in e) ? e.which : e.keyCode; 
    if(keyCode == 13){
      saveHandler();
    }
  };
  return (
    <div>
      <h2>Add course</h2>
      <button id="backBtn" onClick={goBack}>
        Back to main menu
      </button>
      <br />
      <input
        type="text"
        name="course"
        placeholder="course"
        value={course.get()}
        onChange={(e) => course.set(e.target.value)}
        onKeyDown={saveButtonHandler}
        autoFocus={true}
      />
      <button onClick={saveHandler}>Save</button>
      {savedCourse.get() !== null && (
        <p>
          Opintojakso {savedCourse.get().name} lisätty id:llä {savedCourse.get().id}
        </p>
      )}
    </div>
  );
};

export default AddCourses;
