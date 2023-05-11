import { getCurrentUser } from "../../Utils/Constants";

export const Profile = () => {
    const currentUser = getCurrentUser();
   return <>
   <img style={{ width: "40px", marginRight: "12px" }} src={currentUser.imageUrl} />
   <div>{currentUser.username}</div>
   <div>{currentUser.subscriptionLevelId}</div>
   </>
}
