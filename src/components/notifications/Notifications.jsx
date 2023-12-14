// import React from "react";
// import "./notification.scss";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
// import StarIcon from "@mui/icons-material/Star";

// export const Notifications = () => {
//   return (
//     <div className="notify">
//       <Sidebar />
//       <div className="newContainer">
//         <Navbar />
//         <div className="top">
//           <h1>Notification</h1>
//           <div className="flex">
//             <p>You have 3 unread notifications</p>
//             <button>Mark all as read</button>
//           </div>
//         </div>

//         <div className="bottom">
//           <div className="all">
//             <p>All</p>
//             <p>New</p>
//             <p>Unread</p>
//           </div>

//           <div className="alerts">
//             <div className="alert">
//               <div className="first">
//                 <div className="logo">
//                   <StarIcon />
//                 </div>
//                 <div>
//                   <p>You have 3 days to the expiration of Beer - Blue </p>
//                   <div className="group">
//                     <small>
//                       <b>Batch No: 121</b>
//                     </small>
//                     <small>
//                       <b>Quantity: 20</b>
//                     </small>
//                   </div>
//                 </div>
//               </div>
//               <div className="last">
//                 <div>24/09/2023</div>
//                 <button>Delete</button>
//               </div>
//             </div>
//           </div>

//           <div className="alerts">
//             <div className="alert">
//               <div className="first">
//                 <div className="logo">
//                   <StarIcon />
//                 </div>
//                 <div>
//                   <p>You have 3 days to the expiration of Beer - Blue </p>
//                   <div className="group">
//                     <small>
//                       <b>Batch No: 121</b>
//                     </small>
//                     <small>
//                       <b>Quantity: 20</b>
//                     </small>
//                   </div>
//                 </div>
//               </div>
//               <div className="last">
//                 <div>24/09/2023</div>
//                 <button>Delete</button>
//               </div>
//             </div>
//           </div>

//           <div className="alerts">
//             <div className="alert">
//               <div className="first">
//                 <div className="logo">
//                   <StarIcon />
//                 </div>
//                 <div>
//                   <p>You have 3 days to the expiration of Beer - Blue </p>
//                   <div className="group">
//                     <small>
//                       <b>Batch No: 121</b>
//                     </small>
//                     <small>
//                       <b>Quantity: 20</b>
//                     </small>
//                   </div>
//                 </div>
//               </div>
//               <div className="last">
//                 <div>24/09/2023</div>
//                 <button>Delete</button>
//               </div>
//             </div>
//           </div>

//           <div className="alerts">
//             <div className="alert">
//               <div className="first">
//                 <div className="logo">
//                   <StarIcon />
//                 </div>
//                 <div>
//                   <p>You have 3 days to the expiration of Beer - Blue </p>
//                   <div className="group">
//                     <small>
//                       <b>Batch No: 121</b>
//                     </small>
//                     <small>
//                       <b>Quantity: 20</b>
//                     </small>
//                   </div>
//                 </div>
//               </div>
//               <div className="last">
//                 <div>24/09/2023</div>
//                 <button>Delete</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };



import React from 'react';
import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from '@novu/notification-center';

export const Notifications = () => {
  return (
    <NovuProvider subscriberId={'657784a9214a003916909b73'} applicationIdentifier={'I5h57DWc1jEB'}>
      <PopoverNotificationCenter colorScheme={'light'}>
        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
    </NovuProvider>
  );
};  


