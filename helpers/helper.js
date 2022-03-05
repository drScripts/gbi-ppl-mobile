import moment from "moment";

export const userResponseFormatter = (data, token) => {
  return {
    id: data.id,
    fullName: data.full_name,
    phoneNumber: data.phone_number,
    cabangId: data.cabag_id,
    specialCode: data.special_code,
    address: data.address,
    role: data.role,
    picturePath: data.picture_path,
    token: token,
  };
};

export const currentScheduleFormatter = (data) => {
  return {
    date: moment(data.schedule.date_event).format("dddd DD, MMMM YYYY"),
    regionPlace: `GBI PPL - ${data.schedule.region.name}`,
    time:
      moment(data.schedule.event_begin).format("HH:mm") +
      " - " +
      moment(data.schedule.event_end).format("HH:mm"),
    persons: data.persons + " Persons",
  };
};

export const schedulesFormatter = (datas) => {
  return datas.map((value, _) => {
    return {
      id: value.id,
      regionPlace: `GBI PPL - ${value.region.name}`,
      date: moment(value.date_event).format("dddd DD, MMMM YYYY"),
      time:
        moment(value.event_begin).format("HH:mm") +
        " - " +
        moment(value.event_end).format("HH:mm"),
      persons: value.current_people + " / " + value.max_people + " Persons",
      currentPeople: value.current_people,
      maxPeople: value.max_people,
    };
  });
};
