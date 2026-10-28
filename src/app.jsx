import { useState } from "react";
import { STATUSES } from "./config.js";
import CvForm from "./components/cvForm.jsx";
import CvTemp from "./components/cvTemp.jsx";

export default function App() {
  const [cvData, setCvData] = useState({ status: STATUSES.collecting });

  function handleFormSubmit(data) {
    setCvData({...data, status: STATUSES.viewing});
  }

  function handleEdit() {
    setCvData({ ...cvData, status: STATUSES.editing });
  }

  return (
    <main>
      {cvData.status === STATUSES.viewing ? (
        <CvTemp
          onEdit={handleEdit}
          name={cvData.general.name}
          email={cvData.general.email}
          phone={cvData.general.phone}
          profile={cvData.general.profile}
          work={cvData.work}
          education={cvData.education}
        />
      ) : (
        <CvForm onSubmit={handleFormSubmit} existingData={cvData} />
      )}
    </main>
  );
}
