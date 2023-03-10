import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { calendarAPI } from "../api";
import { convertEventsToDate } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async(calendarEvent) => {

        try {
            if (calendarEvent.id) {
                await calendarAPI.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return;
            }
            const { data } = await calendarAPI.post('/events', calendarEvent);
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
            Swal.fire('Se ha creado el evento correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }
    }

    const StartDeleteEvent = async() => {
        try {
            await calendarAPI.delete(`/events/${activeEvent.id}`);
            dispatch(onDeleteEvent());
            Swal.fire('El evento se ha eliminado del calendario', '', 'success');
        } catch (error) {
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }

    }
    const startLoadingEvents = async() => {
        try {
            const { data } = await calendarAPI.get('/events');
            const events = convertEventsToDate(data.eventos);
            dispatch(onLoadEvents(events));

        } catch (error) {
            Swal.fire('Error al cargar los eventos', error.response.data.msg, 'question');
        }
    }

    return {
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        setActiveEvent,
        startSavingEvent,
        StartDeleteEvent,
        startLoadingEvents
    }
}
