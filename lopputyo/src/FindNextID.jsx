//Tein tämmösen mikä etsii sopivan ID:n.
//Jos vaikka jostain välistä puuttuu esim. ( [1, 2, 4, 5] ) puuttuu 3 nii palauttaa 3.
//Jos ei puutu nii palauttaa 0 tai max arvo +1
const FindNextID = (lista) => {
  let nextID = 0;
  let nextID_FOUND = false;
  let maxID = Number.MIN_SAFE_INTEGER;
  let minID = Number.MAX_SAFE_INTEGER;
  let foundIDS = [];
  if (lista.length === 0) {
    return nextID;
  }
  lista.map((item, _index) => {
    if (!foundIDS.includes(item.id)) {
      foundIDS = [...foundIDS, item.id];
    }
    if (_index === 0) {
      minID = item.id;
      maxID = item.id;
    }
    if (item.id > maxID) {
      maxID = item.id;
    }
    if (item.id < minID) {
      minID = item.id;
    }
  });
  foundIDS.sort(function (a, b) {
    return a - b;
  });
  let expecting = minID;
  for (let i = 0; i < foundIDS.length && !nextID_FOUND; i++) {
    if (foundIDS[i] == expecting) {
      expecting++;
    } else {
      //"Puuttuva" numero löytyi
      nextID_FOUND = true;
      nextID = expecting;
    }
  }
  if (!nextID_FOUND) {
    nextID = maxID + 1;
  }
  return nextID;
};

export default FindNextID;
