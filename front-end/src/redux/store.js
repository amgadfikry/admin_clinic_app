import { configureStore } from '@reduxjs/toolkit'
import profileStateReducer from './profile'
import doctorsStateReducer from './doctors'
import testimonialStateReducer from './testimonial'
import appointmentStateReducer from './appointment'
import specialitiesStateReducer from './specialities'
import offersStateReducer from './offers'

export const store = configureStore({
  reducer: {
    profile: profileStateReducer,
    doctors: doctorsStateReducer,
    testomonial: testimonialStateReducer,
    appointments: appointmentStateReducer,
    specialities: specialitiesStateReducer,
    offers: offersStateReducer,
  },
})