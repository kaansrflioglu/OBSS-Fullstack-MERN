const Alert = ({ type = "danger", message, onClose }) => {
  if (!message) return null;

  return (
    <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
      {message}
      <button type="button" className="btn-close" onClick={onClose}></button>
    </div>
  );
};

export default Alert;