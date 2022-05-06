import './index.css'

const AppointmentItem = props => {
  const {appointmentItem, starredAppointment} = props
  const {id, title, date, isStarred} = appointmentItem

  const onStarredAppointment = () => {
    starredAppointment(id)
  }

  const addStarredImage = isStarred ? (
    <img
      src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
      alt="star"
    />
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
      alt="star"
    />
  )

  return (
    <li className="appointment-card">
      <div className="appointment-container">
        <p className="title">{title}</p>
        <button
          type="button"
          className="fav-button"
          onClick={onStarredAppointment}
          testid="star"
        >
          {addStarredImage}
        </button>
      </div>
      <p className="date">{date}</p>
    </li>
  )
}

export default AppointmentItem
