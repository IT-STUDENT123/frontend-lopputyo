import { hookstate } from "@hookstate/core";

// const NotesData = hookstate([])

//Kovakoodattu. Haetaan API:sta MainComponent:issa
const NotesData = hookstate([
  {
    text: "Lorem ipsum dolor sit amet, qui minim labore",
    course: {
      id: "id",
      name: "liirum laarum",
    },
    timestamp: "2022-01-01T00:00:00",
  },
  {
    id: 0,
    text: "add lisää",
    course: {
      id: 0,
      name: "versionhallinta",
    },
    timestamp: "2022-11-23T13:13:13",
  },
  {
    id: 1,
    text: "commit tallenta",
    course: {
      id: 0,
      name: "versionhallinta",
    },
    timestamp: "2022-11-23T13:33:13",
  },
  {
    id: 2,
    text: "push työntää muutokset remoteen",
    course: {
      id: 0,
      name: "versionhallinta",
    },
    timestamp: "2022-11-24T13:13:13",
  },
  {
    id: 3,
    text: "talar du svenska",
    course: {
      id: 2,
      name: "ruotsi",
    },
    timestamp: "2022-11-22T08:23:12",
  },
  {
    id: 9,
    text: "lkjdsfjfdslkjfds",
    course: {
      id: 0,
      name: "asdasd",
    },
    timestamp: "2022-01-01T00:00:00",
  },
  {},
  {
    id: 200,
    text: "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.",
    course: {
      id: 10,
      name: "liirum laarum",
    },
    timestamp: "2022-12-01T22:08:00",
  },
]);

export { NotesData };
