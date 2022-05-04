import { Event } from "../../interfaces/event";
import axios from "../../utils/axios";

const uploadReportAndMedia = async (
  eventID: string,
  report: any,
  images: any
) => {
  console.log(report);

  try {
    let formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("eventImages", images[i].image);
    }
    formData.append("eventReport", report);
    formData.append("eventID", eventID);

    const res = await axios.post("events/reportAndMedia", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const fetchEventById = async (id: string): Promise<Event> => {
  const res = axios.get(
    process.env.REACT_APP_SERVER_URL + "events/getEvent/" + id
  );
  const data = (await res).data;
  if (data.status === -1) {
    throw Error(data.response);
  } else {
    return data.response;
  }
};
export { uploadReportAndMedia, fetchEventById };
