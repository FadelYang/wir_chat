import {useState, useEffect} from "react";
import BaseTable from "./BaseTable";

const CollectionTable = () => {
  const [collections, setCollections] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  const getCollectionByLanguage = async (language) => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL_DEVELOPEMENT}/list-database?db_location=${language}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const data = await response.json();
      return data.data.output;
    } catch (error) {
      console.error(`Error fetching ${language} collection:`, error.message);
      return null;
    }
  };

  const getCollectionItemFromResponse = (response) => {
    try {
      const match = response.match(/\[.*\]/);
      if (match) {
        const arrayString = match[0].replace(/'/g, '"');
        return JSON.parse(arrayString);
      }
      return [];
    } catch (error) {
      console.error("Error parsing collection response:", error.message);
      return [];
    }
  };

  const existingLanguages = ["indonesia", "english", "china", "japan"];

  const getAllCollections = async () => {
    const allCollections = [];
    let index = 1;

    for (let language of existingLanguages) {
      const rawCollections = await getCollectionByLanguage(language);
      if (rawCollections) {
        const cleanCollections = getCollectionItemFromResponse(rawCollections);
        cleanCollections.forEach((collection) => {
          allCollections.push({
            id: index,
            collectionName: collection,
            databaseLocation: language,
            action: "dummy action",
          });
          index++;
        });
      }
    }

    setCollections(allCollections);
    sessionStorage.setItem("collections", JSON.stringify(allCollections));
    setIsloading(false);
  };

  const collectionTableDefinition = [
    {
      header: "id",
      accessorKey: "id",
    },
    {
      header: "Collection Name",
      accessorKey: "collectionName",
    },
    {
      header: "Database Location",
      accessorKey: "databaseLocation",
    },
    {
      header: "Action",
      accessorKey: "action",
    },
  ];

  useEffect(() => {
      getAllCollections();
  }, []);

  return (
    <>
      {!isLoading ? (
        <BaseTable columns={collectionTableDefinition} data={collections} />
      ) : (
        <div className="text-center">Loading collections data...</div>
      )}
    </>
  );
};

export default CollectionTable;
