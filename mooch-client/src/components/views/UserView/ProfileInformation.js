import { getCurrentUser } from "../../Utils/Constants";

export const Profile = () => {
    const currentUser = getCurrentUser();
   return <>
      <div>{currentUser.username}</div>
      <img style={{ width: "40px", marginRight: "12px" }} src={currentUser.imageUrl} />
      <div>{currentUser.subscriptionLevelId}</div>
   </>
}
