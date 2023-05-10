export const UserMembershipDetails = 
({membershipId,membershipDescription,membershipImageUrl,organizationId,organizationName,orignizationImageUrl,organizationType}) => {
    return<>
        <div>Membership Id : {membershipId}</div>
        <div>Membership Description : {membershipDescription}</div>
        <img style={{ width: "40px", marginRight: "12px" }} src={membershipImageUrl} />
        <div>Organization Id: {organizationId}</div>
        <div>Organization : {organizationName}</div>
        <img style={{ width: "40px", marginRight: "12px" }} src={orignizationImageUrl} />
        <div>Type : {organizationType}</div>
        </>
}

