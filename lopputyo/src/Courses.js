import { hookstate } from "@hookstate/core";

// const CoursesState = hookstate([]);

const CoursesState = hookstate([
  {
    id: 0,
    name: "versionhallinta",
  },
  {
    id: 1,
    name: "java",
  },
  {
    id: 2,
    name: "ruotsi",
  },
  {
    id: 3,
    name: "ohjelmointi 1",
  },
  {
    id: 10,
    name: "liirum laarum",
  },
]);

export { CoursesState };
