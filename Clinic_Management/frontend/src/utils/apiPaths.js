export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/v1/auth/register",
    LOGIN: "/api/v1/auth/login",
    PROFILE: "/api/v1/auth/getUserProfile",
  },

  PATIENT: {
    GET_PATIENTS: "/api/v1/patient/getAllPatients",
    BOOK_APPOINTMENT: "/api/v1/patient/book-appointment",
    GET_APPOINTMENTS: "/api/v1/patient/appointments",
    GET_CASE_HISTORY: "/api/v1/case-history/patient", // ✅ patient case histories
    CANCEL_APPOINTMENT: (id) => `/api/v1/patient/cancel-appointment/${id}`,
    DELETE_CASE_HISTORY: (id) => `/api/v1/case-history/${id}`, // ✅ patient deletes own case history
  },

  DOCTOR: {
    GET_APPOINTMENTS: "/api/v1/doctor/appointments",
    UPDATE_APPOINTMENT_STATUS: (id) => `/api/v1/doctor/update-status/${id}`,
    GET_PATIENTS: "/api/v1/doctor/patients",
    GET_SCHEDULE: "/api/v1/doctor/schedule",
    CREATE_CASE_HISTORY: "/api/v1/case-history", // ✅ doctor creates case history
    GET_OWN_CASE_HISTORY: "/api/v1/case-history/doctor", // ✅ doctor views own
  },

  ADMIN: {
    ADD_DOCTOR: "/api/v1/doctor/addDoctor",
    GET_ALL_DOCTORS: "/api/v1/doctor/getAllDoctors",
    UPDATE_DOCTOR: (id) => `/api/v1/admin/update-doctor/${id}`,
    REMOVE_DOCTOR: (id) => `/api/v1/admin/remove-doctor/${id}`,
    ASSIGN_ROOM: "/api/v1/admin/assign-room",
    GET_ROOMS: "/api/v1/admin/rooms",
    SET_SCHEDULE: "/api/v1/admin/set-schedule",
    GET_APPOINTMENTS: "/api/v1/appointments/all",
    GET_ALL_CASE_HISTORY: "/api/v1/case-history/all", // ✅ admin sees all case histories
  },

  APPOINTMENT: {
    GET_ALL: "/api/v1/appointments/all",
    GET_BY_ID: (id) => `/api/v1/appointments/user/${id}`,
    CREATE: "/api/v1/appointments/create",
    CANCEL: (id) => `/api/v1/appointments/cancel/${id}`,
  },

  ROOM: {
    GET_ALL: "/api/v1/room/all",
    CREATE: "/api/v1/room/create",
    DELETE: (id) => `/api/v1/room/delete/${id}`,
  },
};
