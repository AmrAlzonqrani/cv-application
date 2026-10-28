import { useState } from "react";
import { SECTIONS_TYPES as TYPES } from "../config";
import delIcon from "../assets/delete.svg?no-inline#delete";

function ControlledInput({ type, name, value }) {
  const [inputValue, setInputValue] = useState(value ?? "");

  return (
    <input
      type={type}
      name={name}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}

function ControlledTextarea({ name, value }) {
  const [textareaValue, setTextareaValue] = useState(value ?? "");
  return (
    <textarea
      name={name}
      value={textareaValue}
      onChange={(e) => setTextareaValue(e.target.value)}
    ></textarea>
  );
}

function AddEduEntity({ id, children, values }) {
  const prefix = TYPES.education + "-";
  return (
    <li>
      <div className="controls">
        <label>
          <span>Institution:</span>
          <ControlledInput
            type="text"
            name={prefix + id + "-institution"}
            value={values.institution}
          />
        </label>
        <label>
          <span>Study title:</span>
          <ControlledInput
            type="text"
            name={prefix + id + "-title"}
            value={values.title}
          />
        </label>
        <label>
          <span>Date:</span>
          <ControlledInput
            type="date"
            name={prefix + id + "-date"}
            value={values.date}
          />
        </label>
      </div>
      {children ?? null}
    </li>
  );
}

function AddWorkEntity({ id, children, values }) {
  const prefix = TYPES.work + "-";
  return (
    <li>
      <div className="controls">
        <label>
          <span>Institution:</span>
          <ControlledInput
            type="text"
            name={prefix + id + "-institution"}
            value={values.institution}
          />
        </label>
        <label>
          <span>Position title:</span>
          <ControlledInput
            type="text"
            name={prefix + id + "-title"}
            value={values.title}
          />
        </label>
        <label>
          <span>Job responsibilities:</span>
          <ControlledTextarea
            name={prefix + id + "-responsibility"}
            value={values.responsibilities}
          ></ControlledTextarea>
        </label>
        <label>
          <span>From:</span>
          <ControlledInput
            type="date"
            name={prefix + id + "-from"}
            value={values.from}
          />
        </label>
        <label>
          <span>Until:</span>
          <ControlledInput
            type="date"
            name={prefix + id + "-until"}
            value={values.until}
          />
        </label>
      </div>
      {children ?? null}
    </li>
  );
}

function DeleteButton({ onClick }) {
  return (
    <button
      aria-label="delete item"
      type="button"
      className="delete-btn"
      onClick={onClick}
    >
      <svg aria-hidden="true" width={40} height={40}>
        <use href={delIcon}></use>
      </svg>
    </button>
  );
}

export default function ExperienceSection({
  type,
  title,
  values,
  className,
  index,
}) {
  const valuesExist = values && values !== null;
  const [entitiesCount, setEntitiesCount] = useState(
    valuesExist ? values.length : 1,
  );
  const AddEntity =
    type === TYPES.education
      ? AddEduEntity
      : type === TYPES.work
        ? AddWorkEntity
        : null;

  function handleDelete() {
    setEntitiesCount(entitiesCount - 1);
  }

  return (
    <section className={"exp-section " + className} data-section-index={index}>
      <h2>{title} experience</h2>
      <ul>
        {Array.from({ length: entitiesCount }).map((item, index, array) => {
          if (index + 1 === array.length)
            return (
              <AddEntity
                key={index}
                id={index}
                values={valuesExist && values[index] ? values[index] : {}}
                children={<DeleteButton onClick={handleDelete} />}
              />
            );
          return (
            <AddEntity
              key={index}
              id={index}
              values={valuesExist && values[index] ? values[index] : {}}
            />
          );
        })}
        <li className="add-new">
          <button
            type="button"
            onClick={() => setEntitiesCount(entitiesCount + 1)}
          >
            + Add new
          </button>
        </li>
      </ul>
      <input
        type="hidden"
        name={type.toLowerCase() + "No"}
        value={entitiesCount}
      />
    </section>
  );
}
