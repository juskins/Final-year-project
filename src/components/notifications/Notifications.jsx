import React , {useEffect, useState} from "react";
import "./notification.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import StarIcon from "@mui/icons-material/Star";
import { useNotifications, NovuProvider, useFetchNotifications } from "@novu/notification-center";
import Alert  from "@mui/material/Alert";
import Skeleton from "@mui/material/Skeleton";
import { Stack } from "@mui/material";
import Snackbar from "@mui/material/Snackbar"
import Notify from "../notify";



const Novu = () =>{

  
const result =  useNotifications()
const initialState = {
  all: false,
  unread: false,
  new: false
};

const [state, setState] = useState(initialState);
const [remove , setRemove] = useState(false)
const [fetch, setFetch] = useState(false);


const handleDelete = async (id) => {
  await removeMessage(id) ;
  setRemove(true)
}

const handleChange = (selectedState) => {
  setState((prev) => ({
    ...initialState,
    [selectedState]: true
  }));
};

useEffect(() =>{
  

  console.table( state)
},[state])

console.log(result)
  const {notifications,
   markAllNotificationsAsRead,
   markNotificationAsRead,
   markNotificationAsSeen,
   markNotificationAsUnRead,
   removeAllMessages,
   removeMessage,
   unreadCount,
   unseenCount,
   isFetching,
   isLoading,
   hasNextPage,
    fetchNextPage,
} = result



const handleMarkAllAsRead = async () => {
  await markAllNotificationsAsRead();
  setFetch(true)
};
const getLocalTime = (isoTime)=>{
return new Date(isoTime).toString().split("GMT")[0]
}

const filteredNotifications = notifications?.filter((notification) => {
  if (state.all) {
    return true; 
  } else if (state.new) {
    return notification == !notification.seen ; 
  } else if (state.unread) {
    return notification.read ==false; 
  }
  return true; 
});

return(
  <>
  
<div className="newContainer">
  
  
    <Notify
    open={remove}
    severity={"success"}
    onClose={()=> setRemove(false)}
    >
      Notification deleted successfully 
    </Notify>
    

        
        {isLoading ? 
        <Stack spacing={2} marginTop={10}>
          <Skeleton   height={100} width={"100%"} variant="rounded" animation="wave" sx={{bgcolor:"#fbadd8", margin:"10 0 0 10"}}/>

          {Array(10).fill(0).map((_, i) => (
    <Skeleton key={i}  height={60} width={"100%"} variant="rounded" animation="wave" sx={{bgcolor:"#fbddd2"}}/>
          ))}
    </Stack>:
   <>
        <div className="top">
          
      
          <h1>Notification</h1>
          <div className="flex gap-3">
            { notifications?.length > 0 ?
            <Alert variant="outlined" severity="warning"  >You have {unreadCount} unread notifications</Alert>
            : <p>You have 0 unread messeges</p>}<button onClick={()=> markAllNotificationsAsRead()}
             className="text-white text-lg shadow-md bg-[#f77343] px-3 py-1 font-semibold hover:[#e95420]">Mark all as read</button>
          </div>
        </div>

        <div className="bottom">
          <div className="all">
            <button className={`${state.all && "bg-black"}`} onClick={() => handleChange("all")}>All</button>
            <button onClick={() =>  handleChange("new")}>New</button>
            <button onClick={() =>  handleChange("unread")}>Unread</button>
          </div>
          <div>

          { filteredNotifications.length >1 ? filteredNotifications.map((notification) => (
                    
          
          <div key={notification.id}
           className={`alerts  ${notification.read == false && "border-2 border-[#e95420]"} `}>
            <div className="alert">
              <div className={`first`}>
                <div className="logo">
                  <StarIcon />
                </div>
                <div>
                  <>
                 {notification?.payload?.daysRemaining > 1 ?  
                 
                  <p>
                    You have {notification?.payload?.daysRemaining} days to the expiration of {notification?.payload.productName} </p>:
                    <p>Your product {notification?.payload.productName} expired {-1 * notification?.payload?.daysRemaining} days ago </p>
                    
                    }
                    </>
                  <div className="group">
                    <small>
                      <b>Batch No: {notification?.payload?.batchNumber}</b>
                    </small>
                    <small>
                      <b>Quantity: {notification?.payload?.quantity}</b>
                    </small>
                  </div>
                </div>
              </div>
              <div className="last">
                <div>{getLocalTime(notification.createdAt)}</div>
                <button onClick={() =>handleDelete(notification.id)}>Delete</button>
              </div>
            </div>
          </div>
        
             )):<p className="text-3xl font-bold w-fit mx-auto m-28">{ "No Notification"}</p>}


          </div>

       
        </div>
        <div className="w-full flex justify-between px-4 py-2 font-bold text-white  ">
          {hasNextPage &&
        <button onClick={() => fetchNextPage()}
         className="relative mx-auto bg-[#e95420] px-4 py-2  shadow-sm shadow-black/[0.2]">More</button>}
         {filteredNotifications.length > 0 &&
         <button onClick={()=> removeAllMessages()}
             className="text-white text-lg shadow-md bg-[#f77343] px-3 py-1 font-semibold hover:[#e95420]">Delete All </button>}
       
        </div>
        </>
       }
      </div>
  </>
)



}

export const Notifications = () => {
  



  
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    
    <div className="notify">
       <NovuProvider
  subscriberId={user.uid}
  applicationIdentifier={'I5h57DWc1jEB'}
  initialFetchingStrategy={{
    fetchUnseenCount: true,
    fetchOrganization: false,
    fetchNotifications: true,
    fetchUserPreferences: true,
  }}
>
  <Novu></Novu>
     
      </NovuProvider>
    </div>
  );
};



