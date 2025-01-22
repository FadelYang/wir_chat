import {useState} from "react";
import DashboardTemplate from "../../templates/cms/DashboardTemplate";
import HeaderMenu from "../../organism/cms/HeaderMenu";
import LanguageTable from "../../organism/cms/datatables/LanguageTable";
import BaseModal from "../../molecules/BaseModal";

const LanguageMenu = () => {
  const breadcrumbPath = [
    {name: "Dashboard", path: "/dashboard"},
    {name: "Languages", path: "/dashboard/languages"},
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <DashboardTemplate>
      <HeaderMenu name={`Languages`} breadcrumbPath={breadcrumbPath} />
      <div className="mt-14">
        <div className="flex justify-end">
          <button
            className="px-4 py-2 text-sm text-white bg-gray-700 rounded hover:bg-gray-750"
            onClick={() => modalToggle()}
            disabled
          >
            Add new laguage
          </button>
        </div>
        <div className="mt-5">
          <LanguageTable />
        </div>
      </div>

      {isModalOpen && (
        <BaseModal>
          <div>
            <div className="flex justify-between mb-5 font-bold text-md">
              <h1 className="">Add new language</h1>
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
                  for="languageName"
                >
                  Language Name
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="languageName"
                  type="text"
                  placeholder="Languange name"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  for="selectedCollections"
                >
                  Selected Collection
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
                  Add Language
                </button>
              </div>
            </form>
          </div>
        </BaseModal>
      )}
    </DashboardTemplate>
  );
};

export default LanguageMenu;
