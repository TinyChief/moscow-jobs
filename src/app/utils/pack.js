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
    last_name: surname,
    surname: secondname,
    phone,
    password,
  };
}

export function unpackUser({ first_name, last_name, role, surname, ...rest }) {
  return {
    surname: last_name,
    name: first_name,
    secondname: surname,
    role,
    roleName: getRoleName(role),
    ...rest,
  };
}
//

export function unpackUserInfo({
  birthdate: birthday,
  gender,
  city,
  district,
  education_institution: universityName,
  education_city: universityCity,
  faculty,
  speciality,
  graduation_year: universityYear,
  education_level: educationLevel,
  job_experience: jobExperience,
  has_job_experience: hasJobExperience,
  has_volunteer_experience: hasVolunteerExperience,
  citizenship: citizen,
  photo_url: photoUrl,
  vk_id: vkId,
  telegram_id: telegramId,
  job_status: jobStatus,
  skills,
  departments,
}) {
  return {
    birthday,
    gender,
    city,
    district,
    universityName,
    universityYear,
    universityCity,
    faculty,
    speciality,
    educationLevel,
    photoUrl,
    vkId,
    telegramId,
    jobExperience,
    hasJobExperience,
    hasVolunteerExperience,
    jobStatus,
    skills,
    departments,
    citizen,
  };
}

export function packUserInfo({
  birthday: birthdate,
  gender,
  city,
  district,
  universityName: education_institution,
  universityYear: graduation_year,
  universityCity: education_city,
  faculty,
  speciality,
  educationLevel: education_level,
  photoUrl: photo_url,
  vkId: vk_id,
  telegramId: telegram_id,
  jobExperience: job_experience,
  hasJobExperience: has_job_experience,
  hasVolunteerExperience: has_volunteer_experience,
  jobStatus: job_status,
  skills,
  departments,
  citizen: citizenship,
}) {
  return {
    birthdate,
    gender,
    city,
    district,
    education_institution,
    education_city,
    faculty,
    speciality,
    graduation_year,
    education_level,
    job_experience,
    has_job_experience,
    has_volunteer_experience,
    citizenship,
    photo_url,
    vk_id,
    telegram_id,
    job_status,
    skills,
    departments,
  };
}

export const ROLES = {
  CANDIDATE: "CANDIDATE",
  INTERN: "INTERN",
  CURATOR: "CURATOR",
  STAFF: "STAFF",
  MENTOR: "MENTOR",
};

function getRoleName(role) {
  const ROLES = {
    CANDIDATE: "кандидат",
    INTERN: "стажер",
    CURATOR: "куратор",
    STAFF: "сотрудник кадров",
    MENTOR: "наставник",
  };
  return ROLES[role] || role;
}

export function unpackDepartmentApplication({
  id,
  name,
  description,
  organization_id: organizationId,
  test,
  status,
}) {
  return {
    id,
    name,
    description,
    organizationId,
    test,
    status,
  };
}
// “id”: 1,
// “email”: “string”,
// “phone”: “string”,
// “name”: “string”,
// “description”: “string”,
// “address”: “string”

export function unpackOrganization({
  id,
  email,
  phone,
  name,
  description,
  address,
}) {
  return {
    id,
    name,
    description,
    address,
    email,
    phone,
  };
}

export function unpackJobApplication({
  id,
  request_id: applicationId,
  request_name: applicationName,
  organization_name: organizationName,
  status,
}) {
  return {
    id,
    applicationId,
    status,
    applicationName,
    organizationName,
  };
}
