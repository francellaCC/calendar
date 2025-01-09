import { useState } from "react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const useCalendar = () => {
  let today = new Date();

  const [mes, setMes] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState("");
  const [prevMonthDay, setPrevMonthDay] = useState([]);
  const [days, setDays] = useState([]);
  const [nextDaysMont, setNextDaysMonth] = useState([]);
  const [selectDate, setSelectedDay] = useState(today);
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventTime, setEventTime] = useState({ hours: "00", minutes: "00" });
  const [eventTex, setEventText] = useState("");
  const [hasEvent, setHasEvent] = useState(false);

  const initCalendar = () => {
    const firttsDay = new Date(year, mes, 1);
    const lastDay = new Date(year, mes + 1, 0);
    const prevLastDay = new Date(year, mes, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firttsDay.getDate();
    const nextDays = 7 - lastDay.getDay() - 1;
    let dateMonth = months[mes] + " " + year;

    setMonth(dateMonth);

    // prev month day

    let prevDaysMonth = [];
    console.log(day);
    for (let index = day; index > 0; index--) {
      console.log(day);
      console.log(index);
      prevDaysMonth.push(prevDays - index + 1);
    }

    setPrevMonthDay(prevDaysMonth);
    // current month day

    let daysMonth = [];
    for (let index = 1; index <= lastDate; index++) {
      if (events.length) {
        console.log("no entre");
        if (
          index === events.date.getDay() &&
          mes + 1 === events.date.getMonth() &&
          year === events.date.getFullYear()
        ) {
          console.log("no entre");
          setHasEvent(true);
        }
      }
      if (
        index === new Date().getDate() &&
        year === new Date().getFullYear() &&
        mes === new Date().getMonth()
      ) {
        daysMonth.push({
          isToday: true,
          day: index,
        });
      } else {
        daysMonth.push({
          isToday: false,
          day: index,
        });
      }
    }
    setDays(daysMonth);

    let nextDay = [];
    console.log(nextDay);
    for (let index = 1; index < nextDays; index++) {
      nextDay.push(index);
    }

    setNextDaysMonth(nextDay);
  };

  //

  const handleDayClick = (day) => {
    const clickedDate = new Date(year, mes, day);
    const currentDay = new Date();

    if (
      clickedDate >= currentDay ||
      (clickedDate.getFullYear() === currentDay.getFullYear() &&
        clickedDate.getMonth() === currentDay.getMonth() &&
        clickedDate.getDate() === currentDay.getDate())
    ) {
      setSelectedDay(clickedDate);
      setShowModal(true);
      setEventTime({ hours: "00", minutes: "00" });
      setEventText(" ");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleEventsSubmit = () => {
    const newEvent = {
      date: selectDate,
      time: `${eventTime.hours.padStart(2, "0")} : ${eventTime.minutes.padStart(
        2,
        "0"
      )} `,
      text: eventTex,
    };

    setEvents([...events, newEvent]);
    setEventText("");
    setEventTime({ hours: "00", minutes: "00" });
    setShowModal(false);
   
  };
  function prevMonth() {
    let newMonth = mes - 1;
    console.log("newMonth" + newMonth);
    if (newMonth < 0) {
      newMonth = 11;
      console.log("newMonth" + newMonth);
      setYear((preveState) => preveState - 1);
    }

    console.log("mes" + mes);
    console.log(year);
    setMes(newMonth);
    console.log("mes" + mes);
    initCalendar();
  }
  function nextMonth() {
    setMes((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setYear((prevYear) => (mes === 11 ? prevYear + 1 : prevYear));
    initCalendar();
  }

  const showEvent = (date) => {
    if (
      date === events.date.getDay() &&
      mes + 1 === events.date.getMonth() &&
      year === events.date.getFullYear()
    ) {
    }
  };

  return {
    month,
    initCalendar,
    prevMonthDay,
    days,
    nextDaysMont,
    nextMonth,
    prevMonth,
    showModal,
    handleDayClick,
    closeModal,
    eventTime,
    setEventTime,
    eventTex,
    setEventText,
    events,
    hasEvent,
    handleEventsSubmit,
  };
};
