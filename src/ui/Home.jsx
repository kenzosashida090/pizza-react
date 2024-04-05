import CreateUser from "../features/user/CreateUser";
import {useSelector} from "react-redux"
import Button from "./Button";
function Home() {
  const username = useSelector((state) => state.user.username)
  return (
    <div className="my-10 text-center px-4">
      <h1 className="text-xl text-stone-700 font-semibold  mb-8 md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">

        Straight out of the oven, straight to you.
        </span>
      </h1>
      {username ? <Button to="/menu" type="primary"> Continue Ordering, {username}</Button>  :<CreateUser/>}
    </div>
  );
  }
export default Home;
