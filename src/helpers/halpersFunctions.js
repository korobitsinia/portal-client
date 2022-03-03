export const fieldsToObj = (e) => {
  e.preventDefault();
  let data = {};
  const fields = [...e.target.elements]
    .filter(
      (elem) =>
        elem.tagName === "INPUT" ||
        elem.tagName === "SELECT" ||
        elem.tagName === "TEXTAREA"
    )
    .map((elem) => (data[elem.id] = elem.value), "");
  if (!fields) {
    console.log(fields);
  }
  return data;
};

export const statesToObject = (...args) => {
  let data = {};
  for (let i = 0; i <= args.length; i++) {
    Object.assign(data, args[i]);
  }
  return data;
};

export const arraySearch = (array, query) => {
  if (query.length < 3) {
    return array;
  }
  let result = array.filter((item) => {
    return Object.values(item)
      .join(" ")
      .replace(/-/g, "")
      .toLowerCase()
      .includes(query.toLowerCase());
  });
  if (result.length === 1) {
    let dep = result[0].dep;
    let group = result[0].dep_group;
    return array.filter((item) => item.dep === dep && item.dep_group === group);
  } else {
    return result;
  }
};
