//Testaa yksittäisen noten virheettömyyttä
const NoteValidator = (note, _index) => {
  let printerrors = false;
  const logger = (msg) => {
    if (printerrors === true) {
      console.log(msg);
    }
  };
  logger("Checking note " + _index);
  let valid = true;
  if (typeof note !== "object") {
    logger("Note not of type object");
    return false;
  }
  let template_shape = {
    id: "number",
    text: "string",
    course: {
      id: "number",
      name: "string",
    },
    timestamp: "string",
  };
  let template_size = Object.getOwnPropertyNames(template_shape).length;
  let note_size = Object.getOwnPropertyNames(note).length;
  if (note_size !== template_size) {
    logger("Note wrong size (" + note_size + ") expected " + template_size);
    valid = false;
  } else {
    // Käy läpi jokainen template alkio
    for (const key in template_shape) {
      //Jos template alkio on object
      if (typeof template_shape[key] === "object") {
        //Onko notessa samanniminen avain?
        if (note.hasOwnProperty(key)) {
          //Onko notesta löytynyt avain objekti?
          if (typeof note[key] === "object") {
            //Käy läpi templaten objektin aliavaimet
            for (const subkey in template_shape[key]) {
              //Onko noten objektissa sama aliavain
              if (note[key].hasOwnProperty(subkey)) {
                //Onko aliavain väärää tyyppiä?
                if (typeof note[key][subkey] !== template_shape[key][subkey]) {
                  logger(
                    `The type of note[${key}][${subkey}](${note[key][subkey]}) NEQ ${template_shape[key][subkey]}`
                  );
                  //Virheellinen tyyppi
                  valid = false;
                }
              } else {
                //Virheellinen objekti. Aliavain puuttuu.
                logger("note[" + key + "] does NOT have subkey " + subkey);
                valid = false;
              }
            }
          }
          //Käy läpi templaten objektin aliavaimet
        }
        //Ei objekti.
        //Onko notessa avain?
      } else if (note.hasOwnProperty(key)) {
        //Notessa on avain. Onko väärää tyyppiä?
        if (typeof note[key] !== template_shape[key]) {
          //Virheellinen tyyppi
          valid = false;
          logger(
            `Type of note[${key}](${note[key]}) which is (${typeof note[key]}) NEQ ${
              template_shape[key]
            }`
          );
        }
      } else {
        logger("Note key " + key + " does NOT exist");
        //Avain puuttuu
        valid = false;
      }
    }
  }
  if (!valid) {
    logger("Note at index " + _index + " is NOT valid");
  }
  return valid;
};

export default NoteValidator;
