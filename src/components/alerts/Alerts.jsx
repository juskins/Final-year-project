          // NotificationList.js
          import React from "react";
          import "./alerts.scss"; // Add CSS for styling
          import warning from "../../assets/warning.png";

          import {
            NovuProvider,
            PopoverNotificationCenter,
            NotificationBell,
          } from '@novu/notification-center';
          
          const user = JSON.parse(localStorage.getItem("user"))
          const NotificationList = ({ isVisible, toggleVisibility }) => {
            console.log(NotificationBell)
            return (
              <div 
              //  className={`notification-list  border-[0.5px] bg-white border-[#000] overflow-y-scroll h-[70vh]  ${
              //    isVisible ? "visible" : ""
              //  }`}
               >

    <NovuProvider subscriberId={user?.uid} applicationIdentifier={'I5h57DWc1jEB'}>
      <PopoverNotificationCenter colorScheme={'light'}>
        {({ unseenCount }) => <NotificationBell className="text-white"  unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
    </NovuProvider>
  
 



              {/* //   <div className="border-b-[0.5px] border-[#000] lg:p-2 xl:p-4">
              //     <div className="flex items-center gap-3 text-xs">
              //       <img src={warning} alt="warning" />
              //       <h5 className="font-poppins text-[#5E5454] xl:text-base text-xs">Expiry date tracker</h5>
              //     </div>
              //     <div>
              //       <h5 className="mt-3 font-semibold text-[#5E5454] xl:text-base text-xs">1 item will expire in 3 days.</h5>
              //       <h5 className="xl:text-[13px] mt-2 text-[#5E5454]  text-xs">Peak Milk will expire in 3 days</h5>
              //     </div>
               // </div> */}
           
             
             
              </div>
            );
          };
          
          export default NotificationList;