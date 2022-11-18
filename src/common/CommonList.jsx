import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Card } from "antd";
import 'react-calendar/dist/Calendar.css';
import './style.less'
import { mapStates, mapCities } from '../common/utils';
import { FiltersContext } from "../App";
import Requirements from "../components/requirements/Requirements";
import FormSelect from "./inputs/FormSelect";
import { getMyFavouritesApi } from "../api/favourites";
import CommonCard from "./common-card";

const { Meta } = Card;

const requirements = [
  {
    required: 1,
    what: 'camera',
    description: 'need one camera',
    location: 'mohali'
  },
  {
    required: 2,
    what: 'actors',
    description: 'need 2 funny female leads',
    location: 'mohali'
  },
  {
    required: 1,
    what: 'director',
    description: 'need one director',
    location: 'mohali'
  },
  {
    required: 1,
    what: 'spot boy',
    description: 'need one spot boy',
    location: 'mohali'
  },
  {
    required: 1,
    what: 'camera',
    description: 'need one camera',
    location: 'mohali'
  },
]

const DATA_TAB = {
  LIST_FORM: "list_form",
  GRID_FORM: 'grid_form'
}

export default function CommonList({ users, isFav }) {
  const [activeTab, setActiveTab] = useState(DATA_TAB.LIST_FORM);
	const [location, setLocation] = useState(undefined);
	const [selectedState, setSelectedState] = useState(null);
	const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({});
  const [formDataErrors, setFormDataErrors] = useState({});

  const { selectedSubCategories, states } = useContext(FiltersContext);

  const userId = localStorage.getItem('user');
  const [ favList, setFavList ] = useState([]);
  const getFavList = async () => {
      const data = await getMyFavouritesApi(userId);
      setFavList(data);
  }

  console.log(users, 'users');

  useEffect(() => {
      getFavList()
  }, []);

  useEffect(() => {
		const data = mapStates(states)
		setLocation(data);
	},[states])

	useEffect(() => {
		if(selectedState) {
			const cities = mapCities(states, selectedState)
			setCities(cities);
		}
	},[selectedState])
  
  return (
    <div className="list-container">
      <Row>
        {/* <Col span={18}> */}
        <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0 auto' }}>
          {
            users?.length ? users.map((user) => 
              <CommonCard user={user} favList={favList} getFavList={getFavList} isFav={isFav}/>
            ) : <h4>No Data</h4>
          }
        </div>
        {/* </Col> */}
        {/* <Col span={5}>
          <Requirements requirements={requirements} />
        </Col> */}
      </Row>
    </div>
  )
}
