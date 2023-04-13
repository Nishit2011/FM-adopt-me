import React, { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import Results from "./Results";
import useBreedList from "./useBreedList";

import fetchSearch from "./fetchSearch";
import AdoptedPetContext from "./AdoptedPetContext";

const ANIMALS = ["dog", "cat", "bird", "reptile", "rabbit"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [adoptedPet] = useContext(AdoptedPetContext);

  const breeds = useBreedList(animal);
  console.log("---", requestParams);

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal"),
            breed: formData.get("breed"),
            location: formData.get("location"),
          };
          setRequestParams(obj);
        }}
      >
        {adoptedPet ? (
          <div className="adopted-pet">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="Location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            name="animal"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select id="breed" disabled={breeds.length === 0} name="breed">
            {breeds[0].map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>

      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
