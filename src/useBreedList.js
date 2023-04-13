import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";

export default function useBreedList(animal) {
  console.log(animal);
  const results = useQuery(["breeds", animal], fetchBreedList);
  console.log(results);
  return [results?.data?.breeds ?? [], results.status];
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   const [breedList, setBreedList] = useState([]);
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   const [status, setStatus] = useState("unloaded");

  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   useEffect(() => {
  //     if (!animal) {
  //       setBreedList([]);
  //     } else if (localCache[animal]) {
  //       setBreedList(localCache[animal]);
  //     } else {
  //       requestBreedList();
  //     }
  //     async function requestBreedList() {
  //       setBreedList([]);
  //       setStatus("loading");

  //       const res = await fetch(
  //         `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
  //       );
  //       const json = await res.json();

  //       localCache[animal] = json.breeds || [];
  //       setBreedList(localCache[animal]);
  //       setStatus("loaded");
  //     }
  //   }, [animal]);

  //return [breedList, status];
}
