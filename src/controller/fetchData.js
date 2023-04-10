import axios from "axios";

const fetchTicketData = async (bookingNumber) => {
  try {
    const { data } = await axios.post(
      `https://dev.budiman.io/api/v2/search-ticket/cetak-tiket/invoice`,
      {
        invoice: bookingNumber,
      },
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzMDc2ODg4LCJpYXQiOjE2ODA0ODQ4ODgsImp0aSI6IjFlODMyMTY0MjFmMzQzMmI5YTAxOTVkNzdiMmU5YzMwIiwidXNlcl9pZCI6MTExNTR9.pK3s6sQac9Lg5auSCbDAUkVTc6-s9H_-meeaXl5ek7E`,
        },
      }
    );
    console.log(data.list_ticket);
    return data.list_ticket;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export { fetchTicketData };
