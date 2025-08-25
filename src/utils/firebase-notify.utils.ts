import axios from "axios";

export async function fcmMessanger(
  fcm: string,
  title: string,
  msg: string
) {
  try {
    const payload = await axios.post(
      "https://fcm.googleapis.com/fcm/send",
      {
        to: fcm,
        data: {
          body: msg,
          title: title,
          sound: "default",
          type: 1,
        },
        notification: {
          body: msg,
          title: title,
          sound: "default",
          type: 1,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "key=AAAAb_OSNro:APA91bELh1SNMY-6NTqh5Wx7a_54SUwoVtxrzLcakX0RX2GIMyd6bXtcJ8zHqJanRsV6DrdTm4LqjhGsavbqWOFvcZ7sSbcO2J4fVFAakVIeUHaVkU8DIfjs0UQUzRqdUUpyeeT8BArm",
        },
      }
    );
    return payload.data;
  } catch (error) {
    return { Stauts: "Error", Details: null };
  }
}
