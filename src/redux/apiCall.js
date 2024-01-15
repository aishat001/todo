import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setTasks } from "./todoReducer";

const useFetch = () => {
  const dispatch = useDispatch();
const [initData, setInitData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://mocki.io/v1/dc24708b-5cc8-4e47-80d6-6f4693d37e86');
        console.log(res.data);
        setInitData(res.data)
        dispatch(setTasks(res.data.tasks));
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return {initData};
};

export default useFetch;
