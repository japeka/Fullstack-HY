import { connect } from 'react-redux'

const Notification = (props) => {
  if (props.notification === null) {
    return null
  }
  return (
    props.notification.length > 1 && (
      <div className={props.notification[0]}>
        {props.notification[0] === 'error'
          ? props.notification[1].error
          : props.notification[1]}
      </div>
    )
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
