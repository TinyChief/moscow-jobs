export function packUser({
  email,
  name,
  surname,
  secondname,
  phone,
  password,
}) {
  return {
    email,
    first_name: name,
    patronymic: secondname,
    last_name: surname,
    phone,
    password,
  };
}

export function unpackUser({
  first_name,
  last_name,
  patronymic,
  role,
  ...rest
}) {
  return {
    name: first_name,
    surname: last_name,
    secondname: patronymic,
    role: getRoleName(role),
    ...rest,
  };
}
//
export function unpackUserInfo({
  birthday,
  university_name: universityName,
  university_year: universityYear,
  job_experience: jobExperience,
  job_status: jobStatus,
  skills,
  departments,
  citizenship: citizen
}) {
  return {
    birthday,
    universityName,
    universityYear,
    jobExperience,
    jobStatus,
    skills,
    departments,
    citizen
  };
}

export function packUserInfo({
  birthday,
  universityName: university_name,
  universityYear: university_year,
  jobExperience: job_experience,
  jobStatus: job_status,
  citizen: citizenship,
  skills,
  departments,
}) {
  return {
    birthday,
    university_name,
    university_year,
    job_experience,
    job_status,
    skills,
    departments,
    citizenship
  };
}

export const roleNames = {
  CANDIDATE: "кандидат",
  INTERN: "стажер",
  CURATOR: "куратор",
  STAFF: "кадры",
  MENTOR: "наставник",
};

function getRoleName(role) {
  const roleNames = {
    CANDIDATE: "кандидат",
    INTERN: "стажер",
    CURATOR: "куратор",
    STAFF: "кадры",
    MENTOR: "наставник",
  };
  return roleNames[role] || role;
}
