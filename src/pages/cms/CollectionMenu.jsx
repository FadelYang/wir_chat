import {useState} from "react";
import DashboardTemplate from "../../components/templates/cms/DashboardTemplate";
import HeaderMenu from "../../components/organism/cms/HeaderMenu";
import CollectionTable from "../../components/organism/cms/datatables/CollectionTable";
import BaseModal from "../../components/molecules/BaseModal";

const CollectionMenu = () => {
  const breadcrumbPath = [
    {name: "Dashboard", path: "/dashboard"},
    {name: "Collections", path: "/dashboard/collections"},
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <DashboardTemplate>
      <HeaderMenu name={`Collections`} breadcrumbPath={breadcrumbPath} />
      <div className="mt-14">
        <div className="flex justify-end">
          <button
            className="px-4 py-2 text-sm text-white bg-gray-900 rounded hover:bg-gray-950"
            onClick={() => modalToggle()}
          >
            Add new collections
          </button>
        </div>
        <div className="mt-5">{/* <CollectionTable /> */}</div>
      </div>

      {isModalOpen && (
        <BaseModal>
          <div>
            <div className="flex justify-between mb-5 font-bold text-md">
              <h1 className="">Add new collection</h1>
              <div>
                <button onClick={() => modalToggle()}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
            <form className="">
            <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  for="collectionFile"
                >
                  Collection Name
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="collectionFile"
                  type="file"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  for="languageName"
                >
                  Collection Name
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="collectionName"
                  type="text"
                  placeholder="Collection name"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  for="selectedCollections"
                >
                  Store DB location
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="selectedCollections"
                  type="text"
                  placeholder="Selected collections"
                />
              </div>
              <div className="flex items-center justify-end">
                <button
                  className="px-4 py-2 text-sm font-bold text-white bg-gray-900 rounded hover:bg-gray-950 focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Add collection
                </button>
              </div>
            </form>
          </div>
        </BaseModal>
      )}
    </DashboardTemplate>
  );
};

export default CollectionMenu;
