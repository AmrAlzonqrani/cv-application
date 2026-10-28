import { useState } from "react";
import {
  SECTIONS_TYPES as TYPES,
  SECTIONS_COUNT,
  STATUSES,
} from "../config.js";
import ExperienceSection from "./experienceSection.jsx";
import GeneralSection from "./generalSection.jsx";
import "../styles/form.css";
import icons from "../assets/arrows.svg?no-inline";

function extractEntitiesInfo(data, type) {
  const count = parseInt(data[type + "No"]);
  const entitiesData = [];
  const prefix = type + "-";

  for (let i = 0; i < count; i++) {
    if (type === TYPES.education) {
      entitiesData[i] = {
        institution: data[prefix + i + "-institution"],
        title: data[prefix + i + "-title"],
        date: data[prefix + i + "-date"],
      };
    } else if (type === TYPES.work) {
      entitiesData[i] = {
        institution: data[prefix + i + "-institution"],
        title: data[prefix + i + "-title"],
        from: data[prefix + i + "-from"],
        until: data[prefix + i + "-until"],
        responsibilities: data[prefix + i + "-responsibility"],
      };
    }
  }

  return entitiesData;
}

export default function CvForm({ onSubmit, existingData }) {
  const editingData = existingData.status === STATUSES.editing;

  const [sectionIndex, setSectionIndex] = useState(0);
  const [submitActive, setSubmitActive] = useState(editingData);

  const sectionsClasses = new Array(SECTIONS_COUNT).fill("form-section");
  const circleClasses = new Array(SECTIONS_COUNT).fill("circle");

  sectionsClasses[sectionIndex] = sectionsClasses[sectionIndex] + " active";
  circleClasses[sectionIndex] = circleClasses[sectionIndex] + " active";

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const inputs = form.querySelectorAll("input");
    let invalidSubmit = false;

    inputs.forEach((input) => {
      const isValid = input.checkValidity();
      if (isValid) return;

      const section = input.closest("section[data-section-index]");
      const index = parseInt(section.dataset.sectionIndex);
      setSectionIndex(index);
      input.focus();

      invalidSubmit = true;
    });

    if (invalidSubmit) return;

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const cvData = {};

    cvData.general = { name: data.name, email: data.email, phone: data.phone, profile: data.profile };
    cvData.education = extractEntitiesInfo(data, TYPES.education);
    cvData.work = extractEntitiesInfo(data, TYPES.work);

    onSubmit(cvData);
  }

  return (
    <>
      <div className="heading">
        <h1>Make your CV</h1>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-sections">
          <GeneralSection
            className={sectionsClasses[0]}
            index={0}
            values={editingData ? existingData.general : null}
          />
          <ExperienceSection
            className={sectionsClasses[1]}
            type={TYPES.education}
            title={"Educational"}
            index={1}
            values={editingData ? existingData[TYPES.education] : null}
          />
          <ExperienceSection
            className={sectionsClasses[2]}
            type={TYPES.work}
            title={"Work"}
            index={2}
            values={editingData ? existingData[TYPES.work] : null}
          />
        </div>
        <div className="form-footer">
          <div
            className="form-nav"
            aria-label="form section navigation"
            role="group"
          >
            {sectionIndex > 0 && (
              <button
                aria-label="previous section"
                type="button"
                className="prev-section"
                onClick={() => setSectionIndex(sectionIndex - 1)}
              >
                <svg aria-hidden="true" width={40} height={40}>
                  <use href={`${icons}#arrow-prev`}></use>
                </svg>
              </button>
            )}
            <div className="sections-indicator">
              <div className={circleClasses[0]} aria-hidden="true"></div>
              <div className={circleClasses[1]} aria-hidden="true"></div>
              <div className={circleClasses[2]} aria-hidden="true"></div>
              <p className="sr-only">
                step {sectionIndex + 1} of {SECTIONS_COUNT}
              </p>
            </div>
            {sectionIndex < 2 && (
              <button
                type="button"
                aria-label="next section"
                className="next-section"
                onClick={() => {
                  setSectionIndex(sectionIndex + 1);
                  if (sectionIndex + 1 === 2) setSubmitActive(true);
                }}
              >
                <svg aria-hidden="true" width={40} height={40}>
                  <use href={`${icons}#arrow-next`}></use>
                </svg>
              </button>
            )}
          </div>
          {submitActive ? (
            <button type="submit" className="submit-btn">
              Create CV
            </button>
          ) : (
            <button type="submit" className="submit-btn" disabled>
              Create CV
            </button>
          )}
        </div>
      </form>
    </>
  );
}
