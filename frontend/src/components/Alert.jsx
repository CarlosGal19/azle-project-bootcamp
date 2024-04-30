const Alert = (alert) => {
    return (
      <>
          <div className= { `${alert.type === 'alert' ? 'bg-red-600' : 'bg-indigo-600'} alert alert-danger text-center block text-white text-bold text-xl rounded-2xl py-5 my-5`} role="alert">
              {alert.msg}
          </div>
      </>
    )
  }

  export default Alert
