import { useNavigate, useRouteError } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError() //Returns an object with data of the error page like status:404 or the message

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message  }</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default NotFound;
