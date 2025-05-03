

// import { Button, Dropdown, MenuProps } from "antd";
// import Link  from "next/link";
// import React from "react";


// function AdminMenu(){
//     const items: MenuProps['items'] = [
//         {
//           key: '1',
//           label: <Link href="/admin/templates">Templates</Link>,
//         },
//         {
//           key: '2',
//           label:  <Link href="/admin/users">Users</Link>,
//         },
//         {
//           key: '3',
//           label:  <Link href="/admin/subscriptions">Subscriptions</Link>,
//         },
//       ];

//     return (
//         <div>
//            <Dropdown menu = {
//             {
//                 items
//             }
//            }
//            placement="bottomLeft"
//            trigger={
//             ["click"]
//            }>
//               <Button size="small">
//                 Admin
//               </Button>
//             </Dropdown> 
//         </div>
//     )
// }


// export default AdminMenu;


// import { Button, Dropdown, MenuProps } from "antd";
// import Link from "next/link";
// import React from "react";

// function AdminMenu() {
//   const items: MenuProps["items"] = [
//     {
//       key: "1",
//       label: <Link href="/admin/templates">Templates</Link>,
//     },
//     {
//       key: "2",
//       label: <Link href="/admin/users">Users</Link>,
//     },
//     {
//       key: "3",
//       label: <Link href="/admin/subscriptions">Subscriptions</Link>,
//     },
//   ];

//   return (
//     <div>
//       <Dropdown menu={{ items }} placement="bottomLeft" trigger={["click"]}>
//         <Button
//           type="primary"
//           shape="round"
//           style={{
//             backgroundColor: "#1677ff",
//             border: "none",
//             padding: "6px 12px",
//             fontWeight: 500,
//             transition: "all 0.3s ease",
//           }}
//           onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#125ecf")}
//           onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1677ff")}
//         >
//           Admin
//         </Button>
//       </Dropdown>
//     </div>
//   );
// }

// export default AdminMenu;

import { Button, Dropdown, MenuProps } from "antd";
import Link from "next/link";
import React from "react";

function AdminMenu() {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href="/admin/templates">Templates</Link>,
    },
    {
      key: "2",
      label: <Link href="/admin/users">Users</Link>,
    },
    {
      key: "3",
      label: <Link href="/admin/subscriptions">Subscriptions</Link>,
    },
  ];

  // Using CSS-in-JS approach compatible with React 19
  const buttonStyles = {
    backgroundColor: "#1677ff",
    border: "none",
    padding: "6px 12px",
    fontWeight: 500,
    transition: "all 0.3s ease",
    ":hover": {
      backgroundColor: "#125ecf",
    },
    ":focus": {
      backgroundColor: "#125ecf",
    },
  };

  return (
    <div>
      <Dropdown menu={{ items }} placement="bottomLeft" trigger={["click"]}>
        <Button
          type="primary"
          shape="round"
          style={buttonStyles}
        >
          Admin
        </Button>
      </Dropdown>
    </div>
  );
}

export default AdminMenu;
