import {Component} from 'react'
import './index.css'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem/index'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    isFilterActive: false,
  }

  starredAppointment = id => {
    const {appointmentsList} = this.state
    const starredAppointmentList = appointmentsList.map(eachApp => {
      if (eachApp.id === id) {
        return {...eachApp, isStarred: !eachApp.isStarred}
      }
      return eachApp
    })

    this.setState({appointmentsList: starredAppointmentList})
  }

  updateAppointmentList = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const convertedDate = format(new Date(dateInput), 'dd MMMM yyyy, EEEE')

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: convertedDate,
      isStarred: false,
    }

    this.setState(prevList => ({
      appointmentsList: [...prevList.appointmentsList, newAppointment],
    }))
  }

  getTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  getDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  filterStarredAppointments = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  render() {
    const {appointmentsList, isFilterActive} = this.state
    let filteredList = appointmentsList

    if (isFilterActive) {
      filteredList = appointmentsList.filter(
        eachApp => eachApp.isStarred === true,
      )
    }

    const addhighlightedButton = isFilterActive ? 'highlighted-button' : ''

    return (
      <div className="bg-container">
        <div className="bg-card">
          <form onSubmit={this.updateAppointmentList}>
            <h1>Add Appointment</h1>
            <div className="input-container">
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                type="text"
                placeholder="Title"
                id="title"
                className="input"
                onChange={this.getTitleInput}
              />
            </div>
            <div className="input-container">
              <label htmlFor="date" className="label">
                DATE
              </label>
              <input
                type="date"
                id="date"
                className="input"
                onChange={this.getDateInput}
              />
            </div>
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
          <hr />
          <div className="appointment-heading-container">
            <h1 className="appointment-heading">Appointments</h1>
            <button
              type="button"
              className={`starred-button ${addhighlightedButton}`}
              onClick={this.filterStarredAppointments}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-list-container">
            {filteredList.map(eachApp => (
              <AppointmentItem
                appointmentItem={eachApp}
                key={eachApp.id}
                starredAppointment={this.starredAppointment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
