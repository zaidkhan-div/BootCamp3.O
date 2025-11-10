// utils/apiPaths.js

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
    GET_CASE_HISTORY: "/api/v1/patient/case-history",
    CANCEL_APPOINTMENT: (id) => `/api/v1/patient/cancel-appointment/${id}`,
  },

  DOCTOR: {
    GET_APPOINTMENTS: "/api/v1/doctor/appointments",
    UPDATE_APPOINTMENT_STATUS: (id) => `/api/v1/doctor/update-status/${id}`,
    GET_PATIENTS: "/api/v1/doctor/patients",
    GET_SCHEDULE: "/api/v1/doctor/schedule",
  },

  ADMIN: {
    ADD_DOCTOR: "/api/v1/admin/addDoctor",
    GET_ALL_DOCTORS:"/api/v1/admin/getAllDoctors",
    UPDATE_DOCTOR: (id) => `/api/v1/admin/update-doctor/${id}`,
    REMOVE_DOCTOR: (id) => `/api/v1/admin/remove-doctor/${id}`,
    ASSIGN_ROOM: "/api/v1/admin/assign-room",
    GET_ROOMS: "/api/v1/admin/rooms",
    SET_SCHEDULE: "/api/v1/admin/set-schedule",
    GET_APPOINTMENTS: "/api/v1/admin/appointments",
  },

  APPOINTMENT: {
    GET_ALL: "/api/v1/appointments/all",
    GET_BY_ID: (id) => `/api/v1/appointments/${id}`,
    CREATE: "/api/v1/appointments/create",
    UPDATE: (id) => `/api/v1/appointments/update/${id}`,
    CANCEL: (id) => `/api/v1/appointments/cancel/${id}`,
  },
};
