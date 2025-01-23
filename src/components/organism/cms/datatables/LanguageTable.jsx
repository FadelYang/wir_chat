import React, { useEffect, useState } from "react";
import BaseTable from "./BaseTable";
import {
  getLanguages,
  updateSelectedCollection,
} from "../../../../firebase/languageService";
import BaseModal from "../../../molecules/BaseModal";
import {
  getCollectionByLanguage,
  getCollectionItemFromResponse,
} from "./CollectionTable";

const LanguageTable = () => {
  const [languages, setLanguages] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [collectionsBySelectedLanguage, setCollectionBySelectedLanguage] =
    useState([]);
  const [isLoadingCollections, setIsLoadingCollections] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedDatabaseLocation, setSelectedDatabaseLocation] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");
  const [selectedLanguageId, setSelectedLanguageId] = useState("");
  const [isUpdatting, setIsUpdatting] = useState(false);

  const fetchLanguages = async () => {
    const data = await getLanguages();
    setLanguages(data);
  };

  const openEditModal = (selectedRow) => {
    setSelectedRow(selectedRow);
    setSelectedLanguage(selectedRow["language"]);
    setSelectedDatabaseLocation(selectedRow["db_location"]);
    setSelectedCollection(selectedRow["selected_collection"]);
    setSelectedLanguageId(selectedRow["id"]);
    setIsEditModalOpen(true);
  };

  const loadCollectionData = async (language) => {
    setSelectedCollection("loading data...");
    const rawCollectionData = await getCollectionByLanguage(language);
    const collectionData = getCollectionItemFromResponse(rawCollectionData);

    const updatedCollectionData = [
      ...collectionData,
      selectedRow
        ? selectedRow["selected_collection"]
        : "No collection selected",
    ];

    setCollectionBySelectedLanguage(updatedCollectionData);
    setSelectedCollection(
      selectedRow
        ? selectedRow["selected_collection"]
        : "No collection selected"
    );
  };

  const updateLanguage = async (language, newSelectedCollection) => {
    const isConfirm = window.confirm(
      "Are you sure? Please check the input again before submitting"
    );

    if (!isConfirm) {
      setIsEditModalOpen(false);
      return;
    }

    try {
      setIsUpdatting(true);
      await updateSelectedCollection(language, newSelectedCollection);
      setIsUpdatting(false);
      alert(`Success updated ${selectedLanguage} collections`);
      fetchLanguages();
      setIsEditModalOpen(false);
    } catch (error) {
      alert(`Error: ${error.message || "Failed to edit selected collection"}`);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  useEffect(() => {
    const fetchCollectionData = async () => {
      if (!selectedDatabaseLocation) {
        setCollectionsBySelectedLanguage([]);
        return;
      }

      setIsLoadingCollections(true);
      setSelectedCollection("loading data...");

      await loadCollectionData(selectedDatabaseLocation);

      if (selectedRow) {
        setSelectedCollection(selectedRow["selected_collection"]);
      }

      setIsLoadingCollections(false);
    };

    fetchCollectionData();
  }, [selectedDatabaseLocation, selectedRow]);

  const languageTableDefinition = [
    {
      Header: 'Index',
      id: 'index',
      cell: ({ row }) => row.index + 1
    },
    {
      header: "Language",
      accessorKey: "language",
    },
    {
      header: "Selected Collection",
      accessorKey: "selected_collection",
    },
    {
      header: "Database Location",
      accessorKey: "db_location",
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }) => (
        <button
          className="px-4 py-2 text-sm text-white bg-gray-900 rounded hover:bg-gray-950"
          onClick={() => openEditModal(row.original)}
        >
          Edit
        </button>
      ),
    },
  ];

  return (
    <>
      <BaseTable data={languages} columns={languageTableDefinition} />
      {isEditModalOpen && (
        <BaseModal>
          <div>
            <div className="flex justify-between mb-5 font-bold text-md w-full">
              <h1>Edit Selected Collection</h1>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedRow(null);
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form action="#">
              {/* language */}
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="language"
                >
                  Language
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="collectionFile"
                  name="language"
                  type="text"
                  disabled
                  value={selectedLanguage}
                />
              </div>
              {/* store db location */}
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="databaseLocation"
                >
                  Store DB location
                </label>
                <div className="relative">
                  <select
                    className="block w-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="databaseLocation"
                    name="databaseLocation"
                    value={selectedDatabaseLocation}
                    onChange={(e) => setSelectedDatabaseLocation(e.target.value)}
                  >
                    <option value="indonesia">Indonesia</option>
                    <option value="english">English</option>
                    <option value="china">China</option>
                    <option value="japan">Japan</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                    <svg
                      className="w-4 h-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              {/* selected collection */}
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="selectedCollection"
                >
                  Selected Collection
                </label>
                <div className="relative">
                  <select
                    className="block w-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="selectedCollection"
                    name="selectedCollection"
                    value={selectedCollection}
                    onChange={(e) => setSelectedCollection(e.target.value)}
                  >
                    {isLoadingCollections ? (
                      <option disabled value={"loading data..."}>
                        loading data...
                      </option> // or show a spinner/loading state
                    ) : (
                      collectionsBySelectedLanguage.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))
                    )}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                    <svg
                      className="w-4 h-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <button
                  className="px-4 py-2 text-sm font-bold text-white bg-gray-900 rounded hover:bg-gray-950 focus:outline-none focus:shadow-outline disabled:bg-gray-500"
                  type="submit"
                  disabled={isUpdatting}
                  onClick={() =>
                    updateLanguage(selectedLanguageId, selectedCollection)
                  }
                >
                  {isUpdatting ? "Editting..." : "Edit"}
                </button>
              </div>
            </form>
          </div>
        </BaseModal>
      )}
    </>
  );
};

export default LanguageTable;
