import {useState, useEffect} from "react";
import BaseTable from "./BaseTable";

const CollectionTable = () => {
  const [collections, setCollections] = useState([]);
  const [columns, setColumns] = useState([]);
  const [formattedData, setFormattedData] = useState([]);

  const getCollectionByLanguange = async (language) => {
    try {
      let url = `${process.env.REACT_APP_BACKEND_URL_DEVELOPEMENT}/list-database?db_location=${language}`;
      const data = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();
      return response.data.output;
    } catch (error) {
      console.error(`Error fetching ${language} collection:`, error.message);
      return null;
    }
  };

  const getCollectionItemFromResponse = (response) => {
    const match = response.match(/\[.*\]/);
    if (match) {
      const arrayString = match[0].replace(/'/g, '"');
      return JSON.parse(arrayString);
    }
    return [];
  };

  const getAllColections = async () => {
    const existingLanguage = ["indonesia", "english", "china", "japan"];

    for (language in existingLanguage) {
      const rawCollections = await getCollectionByLanguange(language);
      const cleanCollections = await getCollectionItemFromResponse(
        rawCollections
      );
      cleanCollections.map((cleanCollection) => {
        setCollections((existingCollections) => [
          ...existingCollections,
          cleanCollection,
        ]);
      });
    }

    console.log({collections});
  };

  getIndonesiaCollections();

  return <BaseTable columns={columns} data={formattedData} />;
};

export default CollectionTable;
