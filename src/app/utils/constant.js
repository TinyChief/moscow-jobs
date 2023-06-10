export const topBarHeight = 64
export const sideNavWidth = 260
export const navbarHeight = 60
export const sidenavCompactWidth = 80
export const containedLayoutWidth = 1200

export const ROUTES = {
	APPLICATION: '/candidate/application',
	CANDIDATES_APPLICATIONS: '/curator/candidates/applications',
	DEPARTMENTS_APPLICATIONS:"/curator/departments/applications",
	CURATOR_DEPARTMENTS_APPLICATIONS_ID:"/curator/departments/applications/:applicationId",
	CURATOR_MENTORS:"/curator/mentors",
	CURATOR_STATISTICS_CANDIDATES:"/curator/statistics/candidates",
	CURATOR_STATISTICS_INTERNS:"/curator/statistics/interns",
	CURATOR_STATISTICS_DEPARTMENTS:"/curator/statistics/departments",
	PROFILE:"/profile",
	DEPARTMENT:"/staff/department",
	DEPARTMENT_APPLICATION_CREATE:"/staff/department/application/create",
	DEPARTMENT_APPLICATION_EDIT:"/staff/department/application/edit",
	DEPARTMENT_APPLICATIONS:"/staff/department/applications",
	DEPARTMENT_APPLICATIONS_ID:"/staff/department/applications/:applicationId",
	DEPARTMENT_APPLICATIONS_RESPONSES:"/staff/department/applications/responses",
	INTERN_JOBS:"/intern/jobs",
	INTERNS_JOBS_ID:"/intern/jobs/:jobId",
	INTERN_JOBS_APPLICATIONS:"/intern/jobs/applications",
	INTERN_MENTOR:"/intern/mentor",
	MENTOR_MY_INTERN:"/mentor/my-intern",
	MENTOR_MY_INTERN_SCHEDULE:"/mentor/my-intern/schedule",
}

export const STAGES = {
	REQUEST: "REQUEST",
	SCHOOL: "SCHOOL",
	TEST: "TEST",
	CASE: "CASE",
	CHOICE: "CHOICE",
	WORK: "WORK"
}