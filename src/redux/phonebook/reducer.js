const initialState = {
  departments: [
    { id: 1, name: "1 группа", people: [], timestamp: 0 },
    { id: 2, name: "1 группа", people: [], timestamp: 0 },
    { id: 3, name: "1 группа", people: [], timestamp: 0 },
    { id: 4, name: "1 группа", people: [], timestamp: 0 },
  ],
  activeDepartmentId: 1,
  loading: false,
  search: {
    value: "",
    selectedId: "",
  },
  allPeople: [],
};

const phonebook = (state = initialState, action) => {
  const copyDeps = [...state.departments];
  switch (action.type) {
    case "PHB_ACTIVE_DEPARTMENT":
      if (state.activeDepartmentId === action.payload) {
        return { ...state };
      }
      return {
        ...state,
        activeDepartmentId: action.payload,
      };

    case "PHB_DEPARTMENT_DATA": {
      const { id, payload } = action.payload;
      // если сотрудников в подразделении нет. На случай изменения подразделения последнего сотрудника
      copyDeps[id - 1].people = payload;
      copyDeps[id - 1].timestamp = Date.now();
      return { ...state, departments: copyDeps };
    }

    case "PHB_DELETE_PERSON": {
      const { id, dep } = action.payload;
      copyDeps[action.payload.dep - 1].people = copyDeps[dep - 1].people.filter(
        (person) => person.id !== id
      );
      return {
        ...state,
        departments: copyDeps,
      };
    }

    case "PHB_PHONEBOOK_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "PHB_ALL_PEOPLE_DATA": {
      let copyAllPeople = [...state.allPeople];
      copyAllPeople.length = 0;
      copyAllPeople = action.payload;

      copyDeps.map((dep) => (dep.people.length = 0));
      action.payload.map((person) => {
        return copyDeps[person.dep - 1].people.push(person);
      });

      return {
        ...state,
        departments: copyDeps,
        allPeople: copyAllPeople,
      };
    }

    case "PHB_SEARCH_VALUE": {
      return { ...state, search: { ...state.search, ...action.payload } };
    }

    default:
      return state;
  }
};

export default phonebook;
