import { getAllMemberByGroupId } from "@/services/MemberService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Member() {
  const [members,setMembers]=useState([])
  const {id}=useParams()
  useEffect(()=>{
    const fetCh=async()=>{
      const response=await getAllMemberByGroupId(id)
      if(response.data){
        setMembers(response.data)
      }
    }
    fetCh()
  },[id])
    return (   <div className="p-6">
        <h3 className="text-lg font-semibold text-purple-700 mb-4">
          Group Members
        </h3>
        <ul className="space-y-4">
          {members.map(
            (member, index) => (
              <li key={index} className="flex items-center">
                <img
                  src=""
                  alt={member}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span>{member}</span>
              </li>
            )
          )}
        </ul>
      </div> );
}

export default Member;