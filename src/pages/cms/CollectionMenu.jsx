import {useState, useEffect} from "react";
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
  const [formData, setFormData] = useState({
    collectionFile: "",
    collectionName: "",
    databaseLocation: "",
  });

  const handleFormChange = (event) => {
    const {name, value, type, files} = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const isConfirm = confirm(
      "are you sure, please check the input again  before submit"
    );
    if (!isConfirm) return;

    const postCollectionFormData = new FormData();

    postCollectionFormData.append("file", formData.collectionFile);
    postCollectionFormData.append("collection_name", formData.collectionName);
    postCollectionFormData.append(
      "store_db_location",
      formData.databaseLocation
    );
    postCollectionFormData.append("components", "File-h8zKv");

    fetch("http://172.20.12.200:5000/upload-collection", {
      method: "POST",
      body: postCollectionFormData,
    }).then(
      (res) => {
        if (res.ok) {
          alert("Success upload new collection!");
        } else {
          console.log(res);
          alert(`something error ${res}`);
        }
      },
      (e) => {
        console.log(e);
        alert(`something error ${e}`);
      }
    );
  };

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
            <form
              className=""
              onSubmit={handleFormSubmit}
              encType={"multipart/form-data"}
              action="#"
            >
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="collectionFile"
                >
                  Collection File
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="collectionFile"
                  name="collectionFile"
                  value={formData.collectionFile}
                  onChange={handleFormChange}
                  type="file"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="collectionName"
                >
                  Collection Name
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="collectionName"
                  name="collectionName"
                  value={formData.collectionName}
                  onChange={handleFormChange}
                  type="text"
                  placeholder="Collection name"
                  required
                />
              </div>
              <div className="mb-6">
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
                    value={formData.databaseLocation}
                    onChange={handleFormChange}
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
              <div className="flex items-center justify-end">
                <button
                  className="px-4 py-2 text-sm font-bold text-white bg-gray-900 rounded hover:bg-gray-950 focus:outline-none focus:shadow-outline"
                  type="submit"
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
