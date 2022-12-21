export const genderOptions = [
  {id: 1, value: 'Male'},
  {id: 2, value: 'Female'},
  {id: 3, value: 'Others'}
]
 
export const genderFilter = [
  {
    key: 1,
    name: 'Male',
    objName: 'gender',
    value: 'Male',
  },
  {
    key: 2,
    name: 'Female',
    value: 'Female',
    objName: 'gender'
  },
  {
    key: 3,
    name: 'Other',
    value: 'Other',
    objName: 'gender'
  }
]

export const bestInOptions = [
  { id: 1, value: "Negative Shade" },
  { id: 2, value: "Positive Shade" },
  { id: 3, value: "Comedy" },
  { id: 4, value: "Action" },
  { id: 5, value: "Emotional Drama" },
  { id: 6, value: "Mimicry" }
]

export const extraTalent = [
  {
    id: 1,
    value: 'Horse riding' 
  },
  {
    id: 2,
    value: 'Martial art' 
  },
  {
    id: 3,
    value: 'Singing' 
  },
  {
    id: 4,
    value: 'Driving' 
  },
  {
    id: 5,
    value: 'Boxing' 
  },
]

export const eyeColors = [
  {
    id: 1,
    value: 'Black' 
  },
  {
    id: 2,
    value: 'Brown' 
  },
  {
    id: 3,
    value: 'Blue' 
  },
  {
    id: 4,
    value: 'Dark brown' 
  },
]

export const availableOptions = [
  {
    id: 1,
    value: 'Available' 
  },
  {
    id: 2,
    value: 'Not Available' 
  }
]

export const hairColors = [
  {
    id: 1,
    value: 'Black' 
  },
  {
    id: 2,
    value: 'White' 
   },
  {
    id: 3,
    value: 'Brown' 
  }
]

export const skinColors = [
  {
   id: 1,
   value: 'White' 
  },
  {
    id: 2,
    value: 'Fair' 
   },
   {
    id: 3,
    value: 'Brown' 
   }
]

export const languageOptions = [
  {id: 1, value: 'Punjabi'},
  {id: 2, value: 'Hindi'},
  {id: 3, value: 'English'}
]

export const languageFilter = [
  {
    key: 1,
    name: 'Hindi',
    objName: 'languages',
    value: 'Hindi',
  },
  {
    key: 2,
    name: 'English',
    value: 'English',
    objName: 'languages'
  },
  {
    key: 3,
    name: 'Spanish',
    value: 'Spanish',
    objName: 'languages'
  }
]

export const experienceFilter = [...Array(21)].map((item, idx) => {
  return {
    key: idx,
    name: idx,
    objName: 'experience',
    value: idx
  }
})

export const ageFilter = [...Array(101)].map((item, idx) => {
  return {
    key: idx,
    name: idx,
    objName: 'age',
    value: idx
  }
})



export const adminTabs = [
  {
    title: 'Manage States',
    Component: 'state',
  },
  {
    title: 'Manage Categories',
    Component: 'categories',
  },
  {
    title: 'Manage Users',
    Component: 'users',
  },
  {
    title: 'Manage Filters',
    Component: 'filters',
  }
]