export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params?.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    editable: true
  },

  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
];

export const userRows = [
  {
    id: 1,
    username: 'Snow',
    email: 'snow@gmail.com',
    img: "https://tse1.mm.bing.net/th?id=OIP.4rtF__HjmHI8cRxRlQLVowHaHa&pid=Api&P=0&h=220",
    country: "Pakistan",
    city: "Karachi",
    phone: "+923471132204"
  },
  {
    id: 2,
    username: 'Snow',
    email: 'snow@gmail.com',
    img: "https://tse1.mm.bing.net/th?id=OIP.4rtF__HjmHI8cRxRlQLVowHaHa&pid=Api&P=0&h=220",
    country: "Pakistan",
    city: "Karachi",
    phone: "+923471132204"
  }, {
    id: 3,
    username: 'Snow',
    email: 'snow@gmail.com',
    img: "https://tse1.mm.bing.net/th?id=OIP.4rtF__HjmHI8cRxRlQLVowHaHa&pid=Api&P=0&h=220",
    country: "Pakistan",
    city: "Karachi",
    phone: "+923471132204"
  }, {
    id: 4,
    username: 'Snow',
    email: 'snow@gmail.com',
    img: "https://tse1.mm.bing.net/th?id=OIP.4rtF__HjmHI8cRxRlQLVowHaHa&pid=Api&P=0&h=220",
    country: "Pakistan",
    city: "Karachi",
    phone: "+923471132204"
  },
 
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];
