import { useState, useEffect } from "react";
import BaseTable from "./BaseTable";

export const getCollectionByLanguage = async (language) => {
  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/list-database?db_location=${language}`;
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

export const getCollectionItemFromResponse = (response) => {
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

const CollectionTable = () => {
  const [collections, setCollections] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsloading] = useState(true);

  const existingLanguages = ["indonesia", "english", "china", "japan"];

  const getAllCollections = async () => {
    console.log({isDeleting});
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
            // action: "dummy action",
          });
          index++;
        });
      }
    }

    setCollections(allCollections);
    sessionStorage.setItem("collections", JSON.stringify(allCollections));
    setIsloading(false);
  };

  const deleteCollection = async (language, collectionName) => {
    const isConfirm = confirm("Are you sure?");

    if (!isConfirm) return;

    const requestData = new FormData();
    requestData.append("language", language);
    requestData.append("collection_name", collectionName);

    const deleteCollectionUrl = `${process.env.REACT_APP_BACKEND_URL}/delete-database`;

    try {
      setIsDeleting(true);
      const response = await fetch(deleteCollectionUrl, {
        method: "POST",
        body: requestData,
      });

      setCollections((collections) =>
        collections.filter(
          (collection) =>
            collection.collectionName !== collectionName ||
            collection.databaseLocation !== language
        )
      );

      alert(`Success deleted ${collectionName} in ${language} database`);
      setIsDeleting(false)
    } catch (error) {
      console.log(error);
    }
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
      id: "action",
      cell: !isDeleting
        ? ({ row }) => (
            <button
              className="px-4 py-2 rounded bg-black text-white"
              onClick={() =>
                deleteCollection(
                  row.original.databaseLocation,
                  row.original.collectionName
                )
              }
            >
              Delete
            </button>
          )
        : ({ row }) => (
            <button
              className="px-4 py-2 rounded bg-gray-800 text-white"
              disabled
            >
              Deleting collection...
            </button>
          ),
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
