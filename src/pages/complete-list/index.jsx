import React, { useEffect } from "react";
import CommonDataBaseList from "../../common/common-database-list";
import { useUserQuery } from "../../api/user";

export default function CompleteList() {
  const { data } = useUserQuery()
  return (
    <CommonDataBaseList allUsers={data} />
  )
}