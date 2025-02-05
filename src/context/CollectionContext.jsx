import { createContext, useContext, useState } from "react";

const CollectionContext = createContext();

export const useCollections = () => useContext(CollectionContext);

export const CollectionProvider = ({ children }) => {
  const [collections, setCollections] = useState([]);

  const addCollection = (newCollection) => {
    setCollections((prev) => [newCollection, ...prev]);
  };

  const removeCollection = (language, collectionName) => {
    setCollections((prev) => [
      ...prev.filter(
        (collection) =>
          collection.collectionName !== collectionName &&
          collection.databaseLocation !== language
      ),
    ]);
  };

  return (
    <CollectionContext.Provider
      value={{ collections, addCollection, removeCollection, setCollections }}
    >
      {children}
    </CollectionContext.Provider>
  );
};
