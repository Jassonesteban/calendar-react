import { useCalendarStore, useUiSotre } from "../../hooks"


export const FabDelete = () => {

    const {StartDeleteEvent, hasEventSelected} = useCalendarStore();

    const handleDelete = () => {
        StartDeleteEvent();    
    }

    return (
        <button className="btn btn-danger fab-danger" onClick={handleDelete} style={{display: hasEventSelected ? '' : 'none'}}>
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}
