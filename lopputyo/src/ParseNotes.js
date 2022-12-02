//Tein tämmösen mikä palauttaa vaan ne muistiinpanot joille löytyy kurssi
//ja joista löytyy tarvittavat avaimet/tiedot.

import NoteValidator from "./NoteValidator";
const ParseNotes = (notes, courses) => {
  // const printerrors = false;
  if (
    Object.getOwnPropertyNames(notes).length == 0 ||
    Object.getOwnPropertyNames(courses).length == 0 ||
    typeof courses !== "object" ||
    typeof notes !== "object"
  ) {
    //huono input
    return [];
  }
  //Vertaa kahden kurssin yhtäläisyyttä
  const CourseEq = (course1, course2) => {
    return course1.id === course2.id && course1.name === course2.name;
  };
  // const logger = (msg) => {
  //   if (printerrors === true) {
  //     console.log(msg);
  //   }
  // };

  //en tiedä onko oikea deep copy mutta ei räjähdä
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
  //Kurssit jotka on jo tarkistettu.
  let checked = [];
  //Oikeanmuotoiset muistiinpanot
  let notes_ok = [];
  notes.map((item, _index) => {
    if (NoteValidator(item, _index) === true) {
      let already_checked = checked.some((check) => CourseEq(check, item.course));
      if (already_checked) {
        let copy = DeepCopyNote(item);
        //tää kaatuu
        // let copy = item;
        notes_ok = [...notes_ok, copy];
      }
      if (!already_checked) {
        let some = courses.some((course) => CourseEq(course, item.course));
        if (some) {
          let copy = DeepCopyNote(item);
          // let copy = item;
          checked = [...checked, item.course];
          notes_ok = [...notes_ok, copy];
        }
      }
    }
  });
  return notes_ok;
};

export default ParseNotes;
