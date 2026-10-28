import '../styles/cvTemp.css';
import editIcon from '../assets/edit.svg?no-inline#edit';
import emailIcon from '../assets/email.svg?no-inline#email';
import phoneIcon from '../assets/phone.svg?no-inline#phone';

function DecorativeLine () {
  return <div aria-hidden="true" className="decorative-line"></div>
}

function EducationExperience({ institution, title, date }) {
  return (
    <li>
      <DecorativeLine />
      <h3>
        {institution} {date && <span>({new Date(date).getFullYear()})</span>}
      </h3>
      <h4>{title}</h4>
    </li>
  );
}

function WorkExperience({ institution, title, from, until, responsibilities }) {
  return (
    <li>
      <DecorativeLine />
      <h3>
        {institution}{" "}
        {from && <span>
          ({new Date(from).getFullYear()}{until && ` - ${new Date(until).getFullYear()}`})
        </span>}
      </h3>
      <h4>{title}</h4>
      <p>{responsibilities}</p>
    </li>
  );
}

export default function CvTemp({
  name,
  phone,
  email,
  profile,
  work,
  education,
  onEdit,
}) {
  return (
    <div className='temp-wrapper'>
      <button
        className='edit-btn' 
        onClick={onEdit}
      >
        <svg 
          aria-hidden="true" 
          width={30} 
          height={30}
        >
          <use href={editIcon}></use>
        </svg>
        <span>Edit</span>
      </button>
      <div className="name">
        <h1>{name}</h1>
      </div>
      <section className="contact-section">
        <h2>Contact</h2>
        <ul>
          {email &&
          <li>
            <svg width={20} height={20}>
              <use href={emailIcon}></use>
            </svg>
            {email}
          </li>}
          {phone && 
          <li>
            <svg width={20} height={20}>
              <use href={phoneIcon}></use>
            </svg>
            {phone}
          </li>}
        </ul>
      </section>
      {profile && <section className='profile-section'>
        <h2>Profile</h2>
        <div className="profile-para">  
          <DecorativeLine />
          <p>{profile}</p>
        </div>
      </section>}
      {work && work.length > 0 && (
        <section
          className='work-section'
        >
          <h2>Work experience</h2>
          <ul>
            {work.map((ex, index) => (
              <WorkExperience
                key={index}
                institution={ex.institution}
                title={ex.title}
                from={ex.from}
                until={ex.until}
                responsibilities={ex.responsibilities}
              />
            ))}
          </ul>
        </section>
      )}
      {education && education.length > 0 && (
        <section
          className='education-section'
        >
          <h2>Education</h2>
          <ul>
            {education.map((ex, index) => (
              <EducationExperience
                key={index}
                institution={ex.institution}
                title={ex.title}
                date={ex.date}
              />
            ))}
          </ul>
        </section>
      )}
      <div className="separator"></div>
    </div>
  );
}
