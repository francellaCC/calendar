import { useEffect, useState } from "react";
import "./App.css";
import { useCalendar } from "./hook/useCalendar";

function App() {
  const {
    month,
    initCalendar,
    prevMonthDay,
    days,
    nextDaysMount,
    nextMonth,
    prevMonth,
    showModal,
    handleDayClick,
    closeModal,
    eventTime,
    setEventTime,
    eventTex,
    setEventText,
  } = useCalendar();

  useEffect(() => {
    initCalendar();
    console.log("aja");
  }, []);

  return (
    <>
      <div className="calendar">
        <div>
          <h2>Calendar</h2>
        </div>
        {/* <div>
          <form className='calendar_form'>
            <div>
              <input type="text" name="searchDate" id="searchDate" placeholder='09/12/2024'/>
            </div>
            <button type="submit">Search</button>
          </form>
        </div> */}
        <div className="calendar_month">
          <button onClick={() => prevMonth()}>
            <img className="arrow" src="./arrowback.svg" />
          </button>
          <p>{month}</p>

          <button onClick={() => nextMonth()}>
            <img className="arrow" src="./arrownext.svg" />
          </button>
        </div>
        <div className="calendar_weekdays">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tues</div>
          <div>Wend</div>
          <div>Thurs</div>
          <div>Frid</div>
          <div>Satur</div>
        </div>
        <div className="calendar_days">
          {prevMonthDay.map((prevDay) => (
            <div  className="day prev_date">
              {prevDay}
            </div>
          ))}
          {days.map((day) => (
            <div
              onClick={() => handleDayClick(day.day)}
              className={`${day.isToday ? "today" : ""} day`}
            >
              {day.day}
            </div>
          ))}
          {nextDaysMount.map((nextDay) => (
            <div  className="day next_date">
              {nextDay}
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div>
            <div className="modal_content">
              <div className="modal_head">
                <h2>Nueva Tarea</h2>
                <button type="button" onClick={() => closeModal()}>
                  X
                </button>
              </div>
              <div className="modal_body">
                <div className="modal_element_time">
                  <label htmlFor="hour" className="modal_element_subtitle">
                    Time:{" "}
                  </label>
                  <input type="number" name="hours" id=""  min={0} max={24} value={eventTime.hours} onChange={(e) => setEventTime({...eventTime, hours: e.target.value})}/>
                  <input type="number" name="minutes" id="" min={0} max={60} value={eventTime.minutes} onChange={(e) => setEventTime({...eventTime, minutes: e.target.value})} />
                </div>
                <div className="modal_element_note">
                  <label htmlFor="eventTex" className="modal_element_subtitle">
                    Notes:{" "}
                  </label>
                  <textarea name="eventTex" id="" value={eventTex} onChange={(e) => }></textarea>
                </div>
              </div>
              <div>
                <button className="modal_button_save" type="button">
                  Guardar Tarea
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
