import { getMyFavouritesApi } from '../../api/favourites';
// import CommonCard from 'common/common-card';
import CommonDataBaseList from '../../common/common-database-list';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const ShortListedProfiles = ({ users }) => {
    const userId = localStorage.getItem('user');
    const history = useHistory();
    const [ favList, setFavList ] = useState([]);

    const getFavList = async () => {
        const data = await getMyFavouritesApi(userId);
        setFavList(data);
    }

    useEffect(() => {
        getFavList()
    }, []);

    return (
      <>
        <CommonDataBaseList allUsers={favList} isFav/>
      </>
    )
}

export default ShortListedProfiles;